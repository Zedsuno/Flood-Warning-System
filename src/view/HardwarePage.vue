<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <Sidebar ></Sidebar>
  
      <!-- Main content area -->
      <div class="flex-1 ml-64 p-6">

        <HardwareList />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from "../components/AdminPage/Sidebar.vue";
  import AddHardware from "../components/AdminPage/HardwareList.vue";
import HardwareList from "../components/AdminPage/HardwareList.vue";
  
  export default {
    components: {
      Sidebar,
      AddHardware,
      HardwareList
    }
  };
  </script>
  
  <style scoped>
  /* Ensure height is set to 100% for the full viewport */
  body,
  html,
  #app {
    height: 100%;
    margin: 0;
  }
  </style>
  