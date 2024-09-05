<!-- AddStationDash.vue -->
<template>
  <div class="relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 mb-4 border border-gray-200 w-full max-w-sm">
    <!-- Section: Map -->
    <div class="relative mb-4">
      <MapDash
        v-if="stationData && stationData.location"
        :latitude="stationData.location.latitude"
        :longitude="stationData.location.longitude"
        :status="stationData.status || 'unknown'"
        :waterLevel="stationData.waterLevel"
        :waterline="stationData.waterline"
      />
    </div>

    <!-- Section: Station Name and Status -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <h2 class="text-lg font-bold text-gray-800">{{ stationData?.stationName || "ชื่อสถานี" }}</h2>
        <p class="text-xs text-gray-500">{{ stationData?.location?.address || "ไม่พบที่อยู่" }}</p>
      </div>
      <!-- Station Active Status Badge -->
      <span
        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
        :class="stationData?.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
      >
        {{ stationData?.active ? 'ใช้งานอยู่' : 'ไม่ได้ใช้งาน' }}
      </span>
    </div>

    <!-- Section: Station Location Details -->
    <div class="flex items-center mb-3">
      <i class="fas fa-map-marker-alt text-[#25adfc] mr-2"></i>
      <p class="text-sm text-gray-700">
        {{ stationData?.location?.state || "ไม่มีข้อมูลรัฐ" }}, {{ stationData?.location?.river || "ไม่มีข้อมูลแม่น้ำ" }}, {{ stationData?.location?.postalCode || "ไม่มีรหัสไปรษณีย์" }}
      </p>
    </div>

    <!-- Section: Water Level Status -->
    <div class="mb-3">
      <h3 class="text-sm font-bold text-gray-800 mb-1">ระดับน้ำปัจจุบัน:</h3>
      <p class="text-sm text-gray-700">{{ stationData?.status || 'ไม่ได้ส่ง Data เข้ามา' }}</p>
    </div>

    <!-- Section: Actions (Dashboard and Edit) -->
    <div class="flex justify-end space-x-2 mt-3">
      <router-link to="/Station" class="flex items-center bg-[#11abcd] hover:bg-[#25adfc] text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-300 transform hover:-translate-y-0.5 shadow-sm">
        <i class="fas fa-tachometer-alt mr-1"></i> แดชบอร์ดสถานี
      </router-link>
      <button
        type="button"
        @click="navigateToEditStation(stationData._id)"
        class="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-300 transform hover:-translate-y-0.5 shadow-sm"
      >
        <i class="fas fa-edit mr-1"></i> แก้ไข
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MapDash from "../AdminPage/MapDash";

export default {
  name: "AddStationDash",
  components: { MapDash },
  emits: ["stationSaved"],
  props: {
    stationId: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      stationData: null,
      loading: false,
      error: null,
    };
  },
  watch: {
    stationId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchStationData(newVal);
      }
    },
  },
  methods: {
    navigateToEditStation(stationId) {
      this.$router.push({ name: "EditStation", params: { stationId } });
    },
    async fetchStationData(stationId) {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3001/api/stations/${stationId}`);
        this.stationData = response.data;
        this.stationData.active = this.stationData.hardware.length > 0; // Update station active status
        this.$emit("stationSaved", this.stationData);
        this.updateWaterLevel(); // Update water level
      } catch (error) {
        console.error(`Error fetching station data for ID ${stationId}:`, error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateWaterLevel() {
      if (!this.stationId) return;
      try {
        const response = await axios.post(`http://localhost:3001/api/stations/updateWaterLevel`, {
          _id: this.stationId,
        });
        this.stationData = response.data;
        this.stationData.active = this.stationData.hardwareID ? true : false;
        this.$emit("stationSaved", this.stationData);
      } catch (error) {
        console.error(`Error updating water level for station ID ${this.stationId}:`, error);
      }
    },
  },
  mounted() {
    if (this.stationId) {
      this.fetchStationData(this.stationId);
    }
  },
};
</script>

<style scoped>
/* Card styling similar to HardwareCard.vue */
.relative {
  position: relative;
}

.bg-white {
  background-color: white;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.transition-shadow {
  transition: box-shadow 0.3s ease-in-out;
}

.duration-300 {
  transition-duration: 300ms;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-4 {
  padding: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.border {
  border-width: 1px;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.w-full {
  width: 100%;
}

.max-w-sm {
  max-width: 24rem;
}

.text-gray-800 {
  color: #1f2937;
}

.text-gray-500 {
  color: #6b7280;
}

.bg-green-500 {
  background-color: #10b981;
}

.bg-red-500 {
  background-color: #ef4444;
}

.text-white {
  color: #ffffff;
}

.hover\:bg-[#25adfc]:hover {
  background-color: #25adfc;
}

.bg-[#11abcd] {
  background-color: #11abcd;
}

.bg-orange-500 {
  background-color: #f59e0b;
}

.hover\:bg-orange-600:hover {
  background-color: #d97706;
}
</style>
