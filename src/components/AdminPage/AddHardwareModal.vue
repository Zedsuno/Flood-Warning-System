<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">เพิ่ม Hardware</h2>
        <form @submit.prevent="createHardware">
          <!-- Equipment ID Field -->
          <div class="mb-4">
            <label for="equipmentID" class="block text-gray-700 font-semibold mb-2">Equipment ID:</label>
            <input v-model="equipmentID" required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#11abcd] focus:border-transparent" />
          </div>
          
          <!-- Name Field -->
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-semibold mb-2">Name:</label>
            <input v-model="name" required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#11abcd] focus:border-transparent" />
          </div>
          
          <!-- Sensor Type Field -->
          <div class="mb-4">
            <label for="sensorType" class="block text-gray-700 font-semibold mb-2">Sensor Type:</label>
            <input v-model="sensorType" required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#11abcd] focus:border-transparent" />
          </div>
          
          <!-- Submit Button -->
          <div class="flex justify-center">
            <button type="submit"
              class="bg-[#11abcd] hover:bg-[#25adfc] text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform transform hover:-translate-y-1">
              สร้าง Hardware
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        equipmentID: '',
        name: '',
        sensorType: ''
      };
    },
    methods: {
      async createHardware() {
        try {
          const response = await axios.post('http://localhost:3001/api/hardware', {
            equipment_id: this.equipmentID,
            name: this.name,
            sensorType: this.sensorType
          });
          console.log('Hardware created:', response.data);
        } catch (error) {
          console.error('Error creating hardware:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* เพิ่มสไตล์เฉพาะที่สำหรับฟอร์มเพื่อให้ดูสดใส */
  body {
    background-color: #f0f8ff; /* พื้นหลังสีอ่อน */
  }
  </style>
  