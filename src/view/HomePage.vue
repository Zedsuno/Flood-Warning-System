<template>
    <div>
      <HeroSection />
      <InforSection />
      <FooterSection/>
      <!-- ... other sections ... -->
    </div>
  </template>
  
  <script>
  import HeroSection from '../components/HeroSection.vue';
  import InforSection from '../components/InforSection.vue';
  import FooterSection from "../components/Footer.vue";
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
  