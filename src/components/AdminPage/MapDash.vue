<template>
  <div class="map-wrapper">
    <div id="map" class="map-instance">
      <!-- The map will be injected here -->
    </div>
    <!-- Centered marker overlay -->
    <div class="map-center-marker">
      <div class="marker-icon"></div>
      <div class="marker-circle"></div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapDash',
  props: {
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const mapCenter = this.latitude && this.longitude
        ? [this.latitude, this.longitude]
        : [19.91048, 99.840576]; // Default coords if props not provided

      this.map = L.map('map').setView(mapCenter, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      // Add a marker at the given coordinates
      L.marker(mapCenter).addTo(this.map);
    },
  },
};
</script>

<style scoped>
.map-wrapper {
  position: relative;
  height: 150px; /* Adjust height as needed */
  width: 100%;
}

.map-instance {
  height: 100%;
  width: 100%;
}

/* Centered marker overlay styles */
.map-center-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Ensure it's above the map */
}

.marker-icon {
  width: 40px;
  height: 40px;
}

.marker-circle {
  width: 20px;
  height: 20px;
  background-color: rgb(35, 187, 241);
  border-color: rgb(255, 255, 255);
  border-width: 3px;
  border-style: solid;
  border-radius: 9999px;
}
</style>
