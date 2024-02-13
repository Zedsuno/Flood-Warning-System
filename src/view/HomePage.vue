<template>
    <div>
      <HeroSection />
      <InforSection />
      <FooterSection/>
      <!-- ... other sections ... -->
    </div>
  </template>
  
  <script>
  import HeroSection from '../components/HomePage/HeroSection.vue';
  import InforSection from '../components/HomePage/InforSection.vue';
  import FooterSection from "../components/HomePage/Footer.vue";
  // ... other imports ...
  
  export default {
    name: 'HomePage',
    components: {
      HeroSection,InforSection,FooterSection
      // ... other components ...
    },
    // ... other options ...
  };
  </script>
  