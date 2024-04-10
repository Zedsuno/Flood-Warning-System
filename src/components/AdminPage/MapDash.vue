<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-instance">
      <!-- The map will be injected here -->
    </div>
    <!-- Centered marker overlay -->
    <div class="map-center-marker">
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
  data() {
    return {
      map: null,
    };
  },
  watch: {
    latitude(newVal) {
      if (newVal && this.longitude) {
        this.setMapCenter([newVal, this.longitude]);
      }
    },
    longitude(newVal) {
      if (newVal && this.latitude) {
        this.setMapCenter([this.latitude, newVal]);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    initMap() {
  const mapCenter = this.latitude && this.longitude
    ? [this.latitude, this.longitude]
    : [19.91048, 99.840576]; // Default coords if props not provided

  // Disable zoom controls and map interactions
  this.map = L.map(this.$refs.mapContainer, {
    zoomControl: false, // Disable zoom control buttons
    scrollWheelZoom: false, // Disable scroll wheel zoom
    doubleClickZoom: false, // Disable zoom on double-click
    dragging: false, // Disable map dragging
  }).setView(mapCenter, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);

  // Add a marker at the given coordinates
},
    setMapCenter(coords) {
      if (this.map) {
        this.map.setView(coords, this.map.getZoom());
        L.marker(coords).addTo(this.map);
      }
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

.marker-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(35, 187, 241);
  border: 3px solid #fff;
  animation: pulseAnimation 2s infinite;
  /* Adjust the box-shadow to create a marker pin effect */
  
}

/* Keyframes for pulsing animation */
@keyframes pulseAnimation {
  0% {
    box-shadow: 0 0 0 0 rgba(35, 187, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(35, 187, 241, 0); /* Increased maximum spread */
  }
  100% {
    box-shadow: 0 0 0 20px rgba(35, 187, 241, 0);
  }
}
</style>