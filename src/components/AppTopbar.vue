<template>
  <nav class="bg-white shadow-md z-50 ">
    <div class="container mx-auto flex items-center justify-between px-4 py-4">
      <a class="flex items-center space-x-2 text-gray-900">
        <img src="@/assets/Logo/Logo (Replace).png" alt="Logo" class="h-8 w-auto">
        <span class="text-xl font-bold">เตือนภัยน้ำท่วม</span>
      </a>
      
      <!-- User profile dropdown -->
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2 text-gray-900 focus:outline-none">
          <img class="h-10 w-10 rounded-full" src="@/assets/Logo/avatar.png" alt="Guest avatar">
          <span>ADMIN</span>
          <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <ul v-show="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-60">
          <li>
            <a href="#/help" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">ช่วยเหลือ</a>
          </li>
          <li>
            <router-link to="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">เข้าสู่ระบบ</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
};
</script>

<style scoped>
/* No additional styles required, managed by Tailwind CSS */
</style>
