<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">รายการฮาร์ดแวร์</h1>
      
      <!-- ปุ่ม Add New Hardware -->
      <button
        @click="addNewHardware"
        class="bg-[#11abcd] hover:bg-[#25adfc] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-0.5"
      >
        + เพิ่มฮาร์ดแวร์ใหม่
      </button>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex items-center justify-between mb-4">
      <!-- Search Bar -->
      <div class="flex items-center w-1/2 bg-white border border-gray-300 rounded-lg shadow-sm p-2">
        <i class="fas fa-search text-gray-400 mr-2"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="ค้นหาฮาร์ดแวร์..."
          class="w-full bg-transparent focus:outline-none text-gray-700"
        />
      </div>

      <!-- Filter and Sort Options -->
      <div class="flex items-center space-x-4">
        <select v-model="filter" class="bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-gray-700">
          <option value="all">ทั้งหมด</option>
          <option value="connected">เชื่อมต่อแล้ว</option>
          <option value="disconnected">ไม่ได้เชื่อมต่อ</option>
        </select>
        <select v-model="sort" class="bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-gray-700">
          <option value="name">เรียงตามชื่อ</option>
          <option value="date">เรียงตามวันที่เพิ่ม</option>
        </select>
      </div>
    </div>

    <!-- Hardware Statistics Section -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-100 p-4 rounded-lg text-center shadow-sm">
        <p class="text-lg font-bold text-[#11abcd]">{{ totalHardware }}</p>
        <p class="text-sm text-gray-600">ฮาร์ดแวร์ทั้งหมด</p>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center shadow-sm">
        <p class="text-lg font-bold text-green-600">{{ connectedHardware }}</p>
        <p class="text-sm text-gray-600">เชื่อมต่อแล้ว</p>
      </div>
      <div class="bg-red-100 p-4 rounded-lg text-center shadow-sm">
        <p class="text-lg font-bold text-red-600">{{ disconnectedHardware }}</p>
        <p class="text-sm text-gray-600">ไม่ได้เชื่อมต่อ</p>
      </div>
    </div>

    <!-- Hardware List Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <HardwareCard
        v-for="hardware in filteredAndSortedHardware"
        :key="hardware.id"
        :hardware="hardware"
        @toggle-connection="toggleConnection"
        @edit-hardware="editHardware"
        @delete-hardware="deleteHardware"
      />
    </div>
  </div>
</template>

<script>
import HardwareCard from './HardwareCard.vue';

export default {
  name: 'HardwareList',
  components: {
    HardwareCard,
  },
  data() {
    return {
      searchQuery: '',
      filter: 'all',
      sort: 'name',
      hardwareList:  [
        { id: 1, name: 'Sensor A', equipmentId: 'EQUIP001',readings: [
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          
        ], sensorType: 'Water Level', isConnected: true },
        { id: 2, name: 'Sensor B', equipmentId: 'EQUIP002',readings: [
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          
        ], sensorType: 'Temperature', isConnected: false },
        { id: 3, name: 'Sensor C', equipmentId: 'EQUIP003',readings: [
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          
        ], sensorType: 'Rain Gauge',stationName: 'สถานีที่ 1', isConnected: true },
        { id: 3, name: 'Sensor C', equipmentId: 'EQUIP003',readings: [
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          
        ], sensorType: 'Rain Gauge',stationName: 'สถานีที่ 1', isConnected: true },
        { id: 3, name: 'Sensor C', equipmentId: 'EQUIP003',readings: [
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          {
            id: 1,
            value: 10,
            timestamp: new Date(),
          },
          
        ], sensorType: 'Rain Gauge',stationName: 'สถานีที่ 1', isConnected: true },
        // More items...
      ], // รายการฮาร์ดแวร์ที่ได้จาก API หรือข้อมูลตัวอย่าง
    };
  },
  computed: {
    filteredAndSortedHardware() {
      // ค้นหา, กรอง และเรียงข้อมูลฮาร์ดแวร์ตาม searchQuery, filter และ sort
      let filtered = this.hardwareList.filter(hardware => {
        if (this.filter === 'connected') {
          return hardware.isConnected;
        } else if (this.filter === 'disconnected') {
          return !hardware.isConnected;
        }
        return true;
      });

      filtered = filtered.filter(hardware =>
        hardware.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sort === 'date') {
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      }

      return filtered;
    },
    totalHardware() {
      return this.hardwareList.length;
    },
    connectedHardware() {
      return this.hardwareList.filter(hardware => hardware.isConnected).length;
    },
    disconnectedHardware() {
      return this.hardwareList.filter(hardware => !hardware.isConnected).length;
    },
  },
  methods: {
    addNewHardware() {
      // ฟังก์ชันเพิ่มฮาร์ดแวร์ใหม่
    },
    toggleConnection(hardware) {
      // ฟังก์ชันเปลี่ยนสถานะการเชื่อมต่อ
    },
    editHardware(hardware) {
      // ฟังก์ชันแก้ไขฮาร์ดแวร์
    },
    deleteHardware(hardware) {
      // ฟังก์ชันลบฮาร์ดแวร์
    },
  },
};
</script>

<style scoped>
/* เพิ่มสไตล์สำหรับการ์ด, ส่วนค้นหา, กรอง, และส่วนสถิติ */
.grid {
  display: grid;
}
</style>





