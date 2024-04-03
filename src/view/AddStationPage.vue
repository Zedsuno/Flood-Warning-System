<template>
    <div class="add-page">
      <Sidebar />
      <FormAddStation :isEditMode="isEditMode" />
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
  // Include a data property or a computed property for `isEditMode`
  data() {
    return {
      // This could also come from Vuex, props, or a computed property
      isEditMode: false,
    };
  },
  // ... other logic ...
}
</script>
  
  <style scoped>

  </style>
  