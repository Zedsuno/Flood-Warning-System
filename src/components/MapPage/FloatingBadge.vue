<template>
  <div>
    <!-- Button to toggle visibility of the floating badge -->
    <button 
      @click="toggleVisibility" 
      class="fixed bottom-5 right-5 z-50 p-2 bg-red-600 rounded-full text-white shadow-lg focus:outline-none"
    >
      <i class="fas fa-exclamation-triangle"></i> <!-- FontAwesome icon -->
    </button>

    <!-- Floating badge container, displayed based on visibility state -->
    <div v-if="isVisible" class="bg-white p-4 rounded-lg fixed bottom-16 right-5 z-50 space-y-3 shadow-lg w-64">
      <!-- น้อยวิกฤต (Critical) -->
      <div v-if="summary['น้อยวิกฤต']" class="text-left p-2 bg-red-100 border-l-4" style="border-color: #8B0000; background-color: #FFE5E5; border-left-width: 6px;">
        <span class="font-semibold text-lg" style="color: #8B0000;">
          <i class="fas fa-exclamation-circle"></i> {{ summary['น้อยวิกฤต'] }} สถานี
        </span>
        <p class="text-sm" style="color: #8B0000;">🚨 น้ำน้อยวิกฤติ: สภาวะน้ำแล้ง</p>
      </div>

      <!-- น้อย (Ready) -->
      <div v-if="summary['น้อย']" class="text-left p-2 bg-yellow-100 border-l-4" style="border-color: #FFFF00; background-color: #FFFFE0; border-left-width: 6px;">
        <span class="font-semibold text-lg" style="color: #999900;">
          <i class="fas fa-exclamation-circle"></i> {{ summary['น้อย'] }} สถานี
        </span>
        <p class="text-sm" style="color: #999900;"> ⚠️ น้ำน้อย: สภาวะน้ำน้อย</p>
      </div>

      <!-- ปกติ (Normal) -->
      <div v-if="summary['ปกติ']" class="text-left p-2 bg-green-100 border-l-4" style="border-color: #008000; background-color: #E0F5E0; border-left-width: 6px;">
        <span class="font-semibold text-lg" style="color: #008000;">
          <i class="fas fa-check-circle"></i> {{ summary['ปกติ'] }} สถานี
        </span>
        <p class="text-sm" style="color: #008000;">✅ น้ำปกติ: สภาวะน้ำปกติ</p>
      </div>

      <!-- มาก (Watchful) -->
      <div v-if="summary['มาก']" class="text-left p-2 bg-purple-100 border-l-4" style="border-color: #800080; background-color: #F5E0F5; border-left-width: 6px;">
        <span class="font-semibold text-lg" style="color: #800080;">
          <i class="fas fa-exclamation-triangle"></i> {{ summary['มาก'] }} สถานี
        </span>
        <p class="text-sm" style="color: #800080;">⚠️ น้ำมาก: เฝ้าระวังน้ำท่วม</p>
      </div>

      <!-- ล้นตลิ่ง (Overflow) -->
      <div v-if="summary['ล้นตลิ่ง']" class="text-left p-2 bg-red-100 border-l-4" style="border-color: #FF0000; background-color: #FFE5E5; border-left-width: 6px;">
        <span class="font-semibold text-lg" style="color: #FF0000;">
          <i class="fas fa-water"></i> {{ summary['ล้นตลิ่ง'] }} สถานี
        </span>
        <p class="text-sm" style="color: #FF0000;">🚨 น้ำล้นตลิ่ง: แจ้งเตือนอพยพ</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    summary: Object
  },
  data() {
    return {
      isVisible: false, // Control visibility of the floating badge
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible; // Toggle the floating badge visibility
    }
  }
};
</script>

<style scoped>
/* Additional styling to ensure consistent design */
button {
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.1);
}

button:focus {
  outline: none;
}
</style>
