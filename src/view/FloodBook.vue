<template>
    <!-- Hero Section -->
    <FloodHero />
    <InforFloodSection/>
</template>

<script>
import FloodHero from '../components/FloodHero.vue';
import InforFloodSection from '../components/InforFloodSection.vue';

// Import your components


export default {
  name: 'FloodBook',
  components: {
    FloodHero,
    InforFloodSection,
   
  }
};
</script>

<style scoped>
/* You might want to add global styles or specific styles for this view */
</style>
