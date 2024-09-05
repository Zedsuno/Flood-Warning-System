<template>
  <div class="p-6" :class="{ 'fullscreen': isFullScreen }">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">ข้อมูลสถานีในรูปแบบตาราง</h2>
      <p class="text-gray-500 text-sm">แสดงข้อมูลสถานีในรูปแบบตารางพร้อมรายละเอียดทั้งหมด</p>
      <!-- Full-Screen Toggle Button -->
      <button
        @click="toggleFullScreen"
        class="bg-[#11abcd] text-white py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-0.5"
      >
        <i :class="isFullScreen ? 'fas fa-compress' : 'fas fa-expand'"></i> {{ isFullScreen ? 'Exit Full Screen' : 'Full Screen' }}
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <table class="min-w-full bg-white">
        <!-- Enhanced Thead Section -->
        <thead>
          <tr class="bg-gradient-to-r from-[#11abcd] to-[#25adfc] text-white text-left text-sm uppercase font-semibold tracking-wider">
            <th class="py-3 px-4 text-left">
              <i class="fas fa-map-marked-alt"></i> ชื่อสถานี
            </th>
            <th class="py-3 px-4 text-left">
              <i class="fas fa-location-arrow"></i> ที่ตั้งสถานี
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-tint"></i> ระดับน้ำปัจจุบัน
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-percent"></i> ระดับน้ำ %
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-wave-square"></i> Bank Level
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-ruler-vertical"></i> ระยะห่างเซนเซอร์
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-stream"></i> ระดับตลิ่ง
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-exclamation-circle"></i> ค่าเกณฑ์สถานะ
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-signal"></i> สถานะ
            </th>
            <th class="py-3 px-4 text-center">
              <i class="fas fa-cog"></i> จัดการ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(station, index) in paginatedStations"
            :key="station._id"
            class="hover:bg-gray-50 transition duration-200 transform hover:scale-[1.01] cursor-pointer"
            @click="toggleExpand(index)"
          >
            <td class="py-3 px-4 text-left text-gray-700">{{ station.stationName }}</td>
            <td class="py-3 px-4 text-left text-gray-700">
              <div class="text-sm text-gray-700 leading-tight">
                {{ station.location.address }}<br />
                {{ station.location.river }}, {{ station.location.state }}
              </div>
            </td>
            <td class="py-3 px-4 text-center text-blue-600 font-bold">{{ station.waterLevel }} cm</td>
            <td class="py-3 px-4 text-center text-blue-600 font-bold">{{ station.waterLevelPercentage }}%</td>
            <td class="py-3 px-4 text-center text-gray-700">{{ station.bankLevel }} cm</td>
            <td class="py-3 px-4 text-center text-gray-700">{{ station.sensorDistance }} cm</td>
            <td class="py-3 px-4 text-center text-gray-700">{{ station.waterline }} cm</td>
            <td class="py-3 px-4 text-center">
              <span class="inline-block py-1 px-3 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {{ getStatus(station) || 'ไม่ได้ส่ง Data เข้ามา' }}
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <i
                :class="station.active ? 'fas fa-check-circle text-green-500 animate-pulse' : 'fas fa-times-circle text-red-500 animate-bounce'"
                class="text-xl"
              ></i>
            </td>
            <td class="py-3 px-4 text-center">
              <router-link
                to="/Station"
                class="inline-block bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition duration-200 mr-2"
              >
                <i class="fas fa-tachometer-alt"></i>
              </router-link>
              <router-link
                :to="{ name: 'EditStation', params: { stationId: station._id }}"
                class="inline-block bg-yellow-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-yellow-600 transition duration-200"
              >
                <i class="fas fa-edit"></i>
              </router-link>
            </td>
          </tr>

          <!-- Expandable Row Details -->
          <tr v-if="expandedRows[index]" class="bg-gray-100">
            <td colspan="10" class="p-4">
              <div class="text-sm text-gray-700">
                <strong>สถานีรายละเอียดเพิ่มเติม:</strong>
                <p>อุปกรณ์เซนเซอร์: {{ station.sensorDetails }}</p>
                <p>ระดับความลึก: {{ station.depthLevel }} cm</p>
                <!-- Add more details as needed -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Section -->
    <div class="flex items-center justify-between mt-6">
      <div class="text-gray-600">{{ pageInfo }}</div>
      <div class="flex space-x-2">
        <button
          class="bg-[#11abcd] text-white py-1 px-3 rounded-lg hover:bg-[#25adfc] transition duration-200"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          ‹
        </button>
        <button
          v-for="pageNum in paginationRange"
          :key="pageNum"
          class="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-lg hover:bg-gray-200 transition duration-200"
          :class="{ 'bg-[#11abcd] text-white': currentPage === pageNum }"
          @click="changePage(pageNum)"
        >
          {{ pageNum }}
        </button>
        <button
          class="bg-[#11abcd] text-white py-1 px-3 rounded-lg hover:bg-[#25adfc] transition duration-200"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'TebularNew',
  props: {
    allStations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      isFullScreen: false,
      expandedRows: reactive({}),
    };
  },
  computed: {
    paginatedStations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.allStations.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.allStations.length / this.itemsPerPage);
    },
    paginationRange() {
      let rangeStart = this.currentPage - 2;
      let rangeEnd = this.currentPage + 2;
      if (rangeStart < 1) {
        rangeStart = 1;
        rangeEnd = Math.min(5, this.totalPages);
      }
      if (rangeEnd > this.totalPages) {
        rangeEnd = this.totalPages;
        rangeStart = Math.max(1, this.totalPages - 4);
      }
      return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);
    },
    pageInfo() {
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, this.allStations.length);
      return `Showing ${startItem} to ${endItem} of ${this.allStations.length} items.`;
    },
  },
  methods: {
    getStatus(station) {
      return station.status;
    },
    changePage(newPage) {
      this.currentPage = newPage;
    },
    toggleExpand(index) {
      if (this.expandedRows[index]) {
        this.expandedRows[index] = false;
      } else {
        this.expandedRows[index] = true;
      }
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      if (this.isFullScreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
};
</script>

<style scoped>
.p-6 {
  padding: 1.5rem;
}
.bg-[#11abcd] {
  background-color: #11abcd;
}
.text-white {
  color: #fff;
}
.text-gray-700 {
  color: #4a4a4a;
}
.text-blue-600 {
  color: #1e90ff;
}
.text-green-500 {
  color: #38a169;
}
.text-red-500 {
  color: #e53e3e;
}
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
.transition {
  transition: all 0.2s ease-in-out;
}
.hover\:scale-\[1\.01\]:hover {
  transform: scale(1.01);
}
.rounded-lg {
  border-radius: 0.5rem;
}
.inline-block {
  display: inline-block;
}
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
  }
  50% {
    transform: translateY(0);
  }
}
.animate-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  overflow: auto;
  padding: 20px;
}
</style>
