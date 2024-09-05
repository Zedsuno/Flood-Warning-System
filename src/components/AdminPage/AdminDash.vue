<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">การจัดการสถานี</h1>
      
      <!-- ปุ่ม Add New Station -->
      <router-link
        to="/Admin/AddStation"
        class="bg-[#11abcd] hover:bg-[#25adfc] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-0.5"
      >
        + เพิ่มสถานีใหม่
      </router-link>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex items-center justify-between mb-4">
      <!-- Search Bar -->
      <div class="flex items-center w-1/2 bg-white border border-gray-300 rounded-lg shadow-sm p-2">
        <i class="fas fa-search text-gray-400 mr-2"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="ค้นหาสถานี..."
          class="w-full bg-transparent focus:outline-none text-gray-700"
        />
      </div>

      <!-- Filter and Sort Options -->
      <div class="flex items-center space-x-4">
        <select v-model="filter" class="bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-gray-700">
          <option value="all">ทั้งหมด</option>
          <option value="active">ใช้งานอยู่</option>
          <option value="inactive">ไม่ได้ใช้งาน</option>
        </select>
        <select v-model="sort" class="bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-gray-700">
          <option value="name">เรียงตามชื่อ</option>
          <option value="date">เรียงตามวันที่เพิ่ม</option>
        </select>
      </div>
    </div>

    <!-- Station Statistics Section -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-100 p-4 rounded-lg text-center shadow-sm">
        <p class="text-lg font-bold text-[#11abcd]">{{ totalStations }}</p>
        <p class="text-sm text-gray-600">สถานีทั้งหมด</p>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center shadow-sm">
        <p class="text-lg font-bold text-green-600">{{ activeStations }}</p>
        <p class="text-sm text-gray-600">ใช้งานอยู่</p>
      </div>
      <div class="bg-red-100 p-4 rounded-lg text-center shadow-sm">
        <p class="text-lg font-bold text-red-600">{{ inactiveStations }}</p>
        <p class="text-sm text-gray-600">ไม่ได้ใช้งาน</p>
      </div>
    </div>

    <!-- View Toggle Section (Grid and Tabular) -->
    <div class="flex items-center justify-end mb-6">
      <button
        @click="setCurrentView('grid')"
        :class="currentView === 'grid' ? 'bg-[#11abcd] text-white' : 'bg-white text-gray-700'"
        class="font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        กล่อง
      </button>
      <button
        @click="setCurrentView('tabular')"
        :class="currentView === 'tabular' ? 'bg-[#11abcd] text-white' : 'bg-white text-gray-700'"
        class="ml-2 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        ตาราง
      </button>
    </div>

    <!-- Grid View -->
    <div v-show="currentView === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AddStationDash
        v-for="station in filteredAndSortedStations"
        :key="station._id"
        :stationId="station._id"
        @stationSaved="handleStationSaved"
      />
    </div>

    <!-- Tabular View -->
    <div v-show="currentView === 'tabular'">
      <TebularNew :allStations="filteredAndSortedStations" />
    </div>
  </div>
</template>

<script>
import TebularNew from "../AdminPage/TebularNew.vue";
import AddStationDash from "../AdminPage/AddStationDash";
import axios from "axios";

export default {
  name: "AdminDash",
  components: {
    TebularNew,
    AddStationDash,
  },
  data() {
    return {
      currentView: "grid", // Default view is grid
      searchQuery: '',
      filter: 'all',
      sort: 'name',
      currentStationId: null,
      allStations: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    filteredAndSortedStations() {
      let filtered = this.allStations.filter(station => {
        if (this.filter === 'active') {
          return station.active;
        } else if (this.filter === 'inactive') {
          return !station.active;
        }
        return true;
      });

      filtered = filtered.filter(station =>
        station.stationName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sort === 'name') {
        filtered.sort((a, b) => a.stationName.localeCompare(b.stationName));
      } else if (this.sort === 'date') {
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      }

      return filtered;
    },
    totalStations() {
      return this.allStations.length;
    },
    activeStations() {
      return this.allStations.filter(station => station.active).length;
    },
    inactiveStations() {
      return this.allStations.filter(station => !station.active).length;
    },
  },
  async mounted() {
    await this.fetchAllStations();
  },
  methods: {
    setCurrentView(view) {
      this.currentView = view; // Set the current view based on button click
    },
    handleStationSaved(newStation) {
      this.fetchAllStations(); // Refetch the entire list after saving
    },
    async fetchAllStations() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3001/api/stations");
        this.allStations = response.data;
        if (this.allStations.length > 0 && !this.currentStationId) {
          this.currentStationId = this.allStations[0]._id; // Set to the first station by default
        }
        this.loading = false;
      } catch (error) {
        console.error("Error fetching all stations:", error);
        this.error = error;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add consistent styles for the Admin Dash similar to HardwareList */
.p-6 {
  padding: 1.5rem;
}
.bg-[#11abcd] {
  background-color: #11abcd;
}
.bg-[#25adfc] {
  background-color: #25adfc;
}
.grid {
  display: grid;
}
.font-semibold {
  font-weight: 600;
}
.text-white {
  color: #fff;
}
.text-gray-800 {
  color: #2d3748;
}
.text-gray-600 {
  color: #718096;
}
.text-green-600 {
  color: #38a169;
}
.text-red-600 {
  color: #e53e3e;
}
</style>
