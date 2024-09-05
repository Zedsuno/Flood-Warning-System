<!-- AlertFilters.vue -->
<template>
    <div class="bg-white rounded-lg p-4 shadow-md">
      <h3 class="text-lg font-semibold mb-1">ฟิลเตอร์การแจ้งเตือน</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="start-date" class="block text-sm font-medium text-gray-700">วันที่เริ่มต้น</label>
          <input
            type="date"
            id="start-date"
            v-model="filters.startDate"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label for="end-date" class="block text-sm font-medium text-gray-700">วันที่สิ้นสุด</label>
          <input
            type="date"
            id="end-date"
            v-model="filters.endDate"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label for="station" class="block text-sm font-medium text-gray-700">สถานี</label>
          <select
            id="station"
            v-model="filters.station"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">ทุกสถานี</option>
            <option v-for="station in stations" :key="station._id" :value="station._id">
              {{ station.stationName }}
            </option>
          </select>
        </div>
        <div>
          <label for="alert-type" class="block text-sm font-medium text-gray-700">ประเภทการแจ้งเตือน</label>
          <select
            id="alert-type"
            v-model="filters.alertType"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">ทุกประเภท</option>
            <option v-for="type in alertTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button @click="applyFilters" class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">ใช้ฟิลเตอร์</button>
        <button @click="resetFilters" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">รีเซ็ต</button>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    name: "AlertFilters",
    data() {
      return {
        filters: {
          startDate: "",
          endDate: "",
          station: "",
          alertType: "",
        },
        stations: [], // This will be populated with station data
        alertTypes: ["LINE", "Email", ], // Available alert types
      };
    },
    methods: {
      applyFilters() {
        // Emit an event to the parent with the filters
        this.$emit("apply-filters", this.filters);
      },
      resetFilters() {
        // Reset the filters
        this.filters = {
          startDate: "",
          endDate: "",
          station: "",
          alertType: "",
        };
        this.$emit("reset-filters"); // Emit reset event
      },
      async fetchStations() {
        // Fetch stations from API
        try {
          const response = await axios.get("http://localhost:3001/api/stations");
          this.stations = response.data;
        } catch (error) {
          console.error("Failed to fetch stations:", error);
        }
      },
    },
    mounted() {
      // Fetch station data when the component is mounted
      this.fetchStations();
    },
  };
  </script>
  
  <style scoped>
  /* Additional scoped styles (optional) */
  </style>
  