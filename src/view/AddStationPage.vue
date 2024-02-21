<template>
    <div class="add-page">
      <Sidebar />
      <FormAddStation />
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/AdminPage/Sidebar.vue';
  import FormAddStation from '../components/AdminPage/FormAddStation.vue';
  export default {
    name: 'AddStation',
    components: {
        Sidebar,
        FormAddStation,
        
        // ... other components ...
      },
    // Add your component logic here
  }
  </script>
  
  <style scoped>

  </style>
  