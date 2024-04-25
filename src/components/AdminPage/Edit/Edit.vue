<template>
    <div class="add-page">
      <Sidebar />
      <FormAddStation
      :isEditMode="true"
      :editStationData="stationDataToEdit"
    />
    </div>
  </template>
  
  <script>
  import Sidebar from '../Sidebar.vue'
  import FormAddStation from '../FormAddStation.vue'
  export default {
    name: 'AddStation',
    components: {
        Sidebar,
        FormAddStation,
        
        // ... other components ...
      },
      
      methods: {
  editStation(stationId) {
    // Assume `stationDataToEdit` is the data object of the station you want to edit.
    // You would typically fetch this data from your backend based on the stationId
    const stationDataToEdit = this.allStations.find(station => station._id === stationId);

    if (stationDataToEdit) {
      this.$router.push({
        name: 'EditStation',
        params: { id: stationId },
        props: {
          isEditMode: true,
          editStationData: stationDataToEdit
        }
      });
    } else {
      console.error('Station data not found for editing.');
      // Handle the case where the station data isn't found
    }
  }
} // Add your component logic here
  }
  </script>
  
  <style scoped>

  </style>