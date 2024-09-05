<!-- AlertsHistory.vue -->
<template>
    <div class="bg-white rounded-lg p-6">
      <h1 class="text-2xl font-semibold mb-4 text-center md:text-left">Alerts History</h1>
      <div class="flex justify-end mt-4">
  <button @click="exportToCSV" class="px-4 py-2 bg-green-500 text-white rounded-md mr-2">Export CSV</button>
</div>
      <!-- Filters Section -->
      <AlertFilters
        :start-date="startDate"
        :end-date="endDate"
        :selected-station="selectedStation"
        :selected-alert-type="selectedAlertType"
        @applyFilters="applyFilters"
        @resetFilters="resetFilters"
      />
  
      <!-- Alerts Table -->
      <AlertTable
        :alerts="filteredAlerts"
        :current-page="currentPage"
        :total-pages="totalPages"
        @changePage="changePage"
      />
  
      <!-- Pagination Section -->
      <div class="flex flex-col items-center md:flex-row justify-between mt-4">
    <span class="text-sm text-gray-700">
      Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
      {{ Math.min(currentPage * itemsPerPage, totalItems) }} of {{ totalItems }} results
    </span>
  
        <!-- Pagination Controls -->
        <div class="flex items-center space-x-2">
          <!-- Previous Button -->
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="px-3 py-1 bg-gray-200 rounded-md"
          >
            Previous
          </button>
  
          <!-- Page Numbers -->
          <button
            v-for="page in visiblePages"
            :key="page"
            :class="{
              'bg-blue-500 text-white': currentPage === page,
              'bg-gray-200': currentPage !== page
            }"
            class="px-3 py-1 rounded-md"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
  
          <!-- Next Button -->
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="px-3 py-1 bg-gray-200 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import AlertFilters from '../Alert/AlertFilters.vue';
import AlertTable from '../Alert/AlertsTable.vue';
import axios from 'axios';
import socket from '@/services/socketService'; // Import your Socket.IO client instance

export default {
  components: {
    AlertFilters,
    AlertTable,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      selectedStation: '',
      selectedAlertType: '',
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      totalPages: 0,
      filteredAlerts: [],
    };
  },
  computed: {
    visiblePages() {
      const maxPagesToShow = 5;
      let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
    paginatedAlerts() {
      return this.filteredAlerts.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    }
  },
  methods: {
    async loadAlerts() {
      try {
        const response = await axios.get('http://localhost:3001/api/alerts', {
          params: {
            page: this.currentPage,
            limit: this.itemsPerPage
          }
        });

        console.log('API Response:', response.data);

        this.filteredAlerts = response.data.alerts;
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.totalItems;

        console.log('Filtered Alerts:', this.filteredAlerts);
      } catch (error) {
        console.error('Error loading alerts:', error);
      }
    },
    handleNewAlert(alert) {
      // Prepend new alert to the current list
      this.filteredAlerts.unshift(alert);

      if (this.filteredAlerts.length > this.itemsPerPage) {
        this.filteredAlerts.pop(); // Remove the last item if the length exceeds the itemsPerPage limit
      }
    },
    exportToCSV() {
      const csvData = this.filteredAlerts.map(alert => ({
        station: alert.stationId.stationName || 'Unknown Station',
        waterLevelPercentage: alert.waterLevelPercentage,
        thresholdBreached: alert.thresholdBreached,
        alertType: alert.alertType,
        recipient: alert.recipient,
        timestamp: new Date(alert.timestamp).toLocaleString()
      }));

      const csvContent = [
        ["Station", "Water Level (%)", "Threshold Breached", "Alert Type", "Recipient", "Timestamp"],
        ...csvData.map(alert => Object.values(alert))
      ].map(e => e.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "alert-history.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.loadAlerts();
      }
    },
    applyFilters() {
      this.currentPage = 1;
      this.loadAlerts();
    },
    resetFilters() {
      this.startDate = null;
      this.endDate = null;
      this.selectedStation = '';
      this.selectedAlertType = '';
      this.applyFilters();
    }
  },
  mounted() {
    this.loadAlerts();

    // Listen for new alerts via Socket.IO
    socket.on('newAlert', (alert) => {
      this.handleNewAlert(alert);
    });
  },
  beforeUnmount() {
    if (socket) {
      socket.off('newAlert'); // Remove the event listener when component is destroyed
    }
  }
};
</script>
  
  <style scoped>
  /* Additional scoped styles (optional) */
  </style>
  