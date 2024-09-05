<!-- AlertsTable.vue -->
<template>
    <div class="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              สถานี
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              ระดับน้ำ (%)
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              เกณฑ์ที่ฝ่าฝืน
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              ประเภทการแจ้งเตือน
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              ผู้รับ
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              เวลาที่ส่ง
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alert in alerts" :key="alert._id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ alert.stationId?.stationName || 'Unknown Station' }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ alert.waterLevelPercentage }}%
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ alert.thresholdBreached }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ alert.alertType }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ alert.recipient }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ new Date(alert.timestamp).toLocaleString() }}
            </td>
          </tr>
          <!-- If no data available, display a message -->
          <tr v-if="alerts.length === 0">
            <td colspan="6" class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              No alerts found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      alerts: Array,
    },
    watch: {
    alerts(newVal) {
      console.log('New Alerts Data:', newVal);
    }}
  };
  </script>
  
  <style scoped>
  /* Additional scoped styles (optional) */
  </style>
  