<template>
    <div class="container-map-main">
      
      <DynamicMap />
    </div>
  </template>
  
  <script>
  import DynamicMap from '../components/MapPage/DynamicMap.vue';
  
  export default {
    name: 'MapPage',
    components: {
    
        DynamicMap,
    },
  };
  </script>
  
  <style>
  /* Include styles that affect the overall layout of the map page */
  </style>