<template>
  <nav class=" bg-white shadow-md z-40">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-start items-center">
        <ul class="flex items-center space-x-8">
          <li>
            <router-link to="/" class="text-xl font-semibold text-gray-700 hover:text-blue-600">
              <i class="fa fa-home mr-2"></i> หน้าแรก
            </router-link>
          </li>
          <li>
            <router-link to="/Map" class="text-xl font-semibold text-gray-700 hover:text-blue-600">
              <i class="fa fa-map mr-2"></i> แผนที่
            </router-link>
          </li>
          <li>
            <router-link to="/WaterResource" class="text-xl font-semibold text-gray-700 hover:text-blue-600">
              <i class="fa fa-water mr-2"></i> แหล่งน้ำ
            </router-link>
          </li>
          <li class="relative group">
            <button class="text-xl font-semibold text-gray-700 hover:text-blue-600 flex items-center">
              <i class="fa fa-database mr-2"></i> ข้อมูล
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <ul class="absolute hidden group-hover:block mt-2 bg-white shadow-md rounded-md py-2 w-48 text-gray-700 z-50">
              <li>
                <router-link to="/FloodManage" class="block px-4 py-2 hover:bg-gray-100">การบริหารจัดการน้ำท่วม</router-link>
              </li>
              <li>
                <router-link to="/HisTory" class="block px-4 py-2 hover:bg-gray-100">ประวัติเหตุการณ์น้ำท่วม</router-link>
              </li>
              <li>
                <router-link to="/FloodBook" class="block px-4 py-2 hover:bg-gray-100">คู่มือสถานการณ์น้ำท่วม</router-link>
              </li>
              <li>
                <router-link to="/DefendFlood" class="block px-4 py-2 hover:bg-gray-100">วิธีป้องกันน้ำท่วม</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
/* Navbar styles to ensure stickiness and layering */
</style>
