<template>
  <div class="add-page">
    <Sidebar />
    <FormAddStation :isEditMode="isEditMode" :stationId="stationId" />
  </div>
</template>

<script>
import Sidebar from "../components/AdminPage/Sidebar.vue";
import FormAddStation from "../components/AdminPage/FormAddStation.vue";
export default {
  name: "AddStation",
  components: {
    Sidebar,
    FormAddStation,
    // ... other components ...
  },

  // Include a data property or a computed property for `isEditMode`
  props: {
    isEditMode: Boolean,
    stationId: String,
  },

  // ... other logic ...
};
</script>

<style scoped></style>
