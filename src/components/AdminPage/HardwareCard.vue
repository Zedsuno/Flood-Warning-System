<template>
  <div class="relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 mb-4 border border-gray-200 w-full max-w-sm">
    <!-- ชื่อฮาร์ดแวร์และ Equipment ID -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <h2 class="text-lg font-bold text-gray-800">
          {{ hardware.name }}
        </h2>
        <p class="text-xs text-gray-500">ID: {{ hardware.equipmentId }}</p>
      </div>

      <!-- ไอคอนการตั้งค่าที่มุมขวาบนพร้อม Tooltip -->
      <div class="absolute top-2 right-2 group">
        <i class="fas fa-cog text-gray-400 animate-spin-slow hover:text-[#11abcd] cursor-pointer"></i>
        <span class="absolute -top-8 right-0 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
          การตั้งค่า
        </span>
      </div>

      <!-- ปุ่มสถานะการเชื่อมต่อ -->
      <button
        @click="toggleConnection"
        :class="[
          'flex items-center px-2 py-1 rounded-full text-xs transition duration-300 shadow-sm',
          hardware.isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
        ]"
        class="text-white"
      >
        <i
          :class="[
            'mr-1 transition-transform duration-500 transform',
            hardware.isConnected ? 'fas fa-plug' : 'fas fa-unlink'
          ]"
        ></i>
        {{ hardware.isConnected ? 'เชื่อมต่อแล้ว' : 'ไม่ได้เชื่อมต่อ' }}
      </button>
    </div>

    <!-- ประเภท (Type) ของฮาร์ดแวร์ -->
    <div class="flex items-center mb-3">
      <i class="fas fa-water text-[#25adfc] mr-2"></i>
      <p class="text-sm text-gray-700">
        ประเภท: <span class="font-semibold text-[#11abcd]">{{ hardware.sensorType }}</span>
      </p>
    </div>
      <!-- ข้อมูลการเชื่อมต่อกับสถานี -->
    <div class="flex items-center mb-3">
      <i class="fas fa-map-marker-alt text-[#11abcd] mr-2"></i>
      <p class="text-sm text-gray-700">
        สถานี: <span class="font-semibold text-[#25adfc]">{{ hardware.stationName }}</span>
      </p>
    </div>

    <!-- เซ็นเซอร์ที่เชื่อมต่อ (Readings) -->
    <div class="mb-3">
      <h3 class="text-sm font-bold text-gray-800 mb-1">การอ่านค่าที่เชื่อมต่อ:</h3>
      <div v-if="hardware.readings && hardware.readings.length > 0" class="grid grid-cols-2 gap-2">
        <!-- Badge Style with Icons and Animations -->
        <div
          v-for="(reading, index) in hardware.readings"
          :key="index"
          class="flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <i :class="getIconClass(reading.type)" class="text-[#11abcd] mr-2"></i>
          <div class="flex flex-col">
            <span class="text-xs text-gray-700">{{ reading.type }}</span>
            <span class="text-sm font-bold text-gray-900 animate-bounce">{{ reading.value }} cm</span>
            <span class="text-[10px] text-gray-400">{{ formatTimestamp(reading.timestamp) }}</span>
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">ไม่มีข้อมูลการอ่านค่าที่เชื่อมต่อ</p>
    </div>

  

    <!-- ปุ่มการกระทำ (แก้ไขและลบ) -->
    <div class="flex justify-end space-x-2 mt-3">
      <!-- ปุ่มแก้ไขพร้อมไอคอน -->
      <button
        @click="editHardware"
        class="flex items-center bg-[#11abcd] hover:bg-[#25adfc] text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-300 transform hover:-translate-y-0.5 shadow-sm"
      >
        <i class="fas fa-edit mr-1"></i> แก้ไข
      </button>
      <!-- ปุ่มลบพร้อมไอคอน -->
      <button
        @click="deleteHardware"
        class="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-300 transform hover:-translate-y-0.5 shadow-sm"
      >
        <i class="fas fa-trash-alt mr-1"></i> ลบ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HardwareCard',
  props: {
    hardware: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleConnection() {
      // ส่ง event เพื่อเปลี่ยนสถานะการเชื่อมต่อของฮาร์ดแวร์
      this.$emit('toggle-connection', this.hardware);
    },
    editHardware() {
      // ส่ง event เพื่อแก้ไขฮาร์ดแวร์
      this.$emit('edit-hardware', this.hardware);
    },
    deleteHardware() {
      // ส่ง event เพื่อลบฮาร์ดแวร์
      this.$emit('delete-hardware', this.hardware);
    },
    getIconClass(type) {
      // Return icon class based on reading type
      switch (type) {
        case 'Temperature':
          return 'fas fa-thermometer-half';
        case 'Humidity':
          return 'fas fa-tint';
        case 'Pressure':
          return 'fas fa-tachometer-alt';
        default:
          return 'fas fa-sensor';
      }
    },
    formatTimestamp(timestamp) {
      // Format the timestamp to a more readable, compact format
      const date = new Date(timestamp);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
  },
};
</script>

<style scoped>
/* ชะลอการหมุนของแอนิเมชั่น */
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* เพิ่มแอนิเมชั่น bounce */
.animate-bounce {
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
