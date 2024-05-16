<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-instance">
      <!-- The map will be injected here -->
    </div>
    <!-- Centered marker overlay -->
    <div class="map-center-marker">
      <div class="marker-circle" :style="{ 'background-color': markerColor }"></div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapDash',
  props: {
    status: String,
    latitude: Number,
    longitude: Number,
    waterLevel: Number,
    waterline: Number,
  },
  data() {
    return {
      map: null,
      markerColor: '#23BBF1', // Default blue color
    };
  },
  watch: {
    status(newVal) {
      this.updateMarkerColor(newVal);
    },
    latitude(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setMapCenter([newVal, this.longitude]);
      }
    },
    longitude(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setMapCenter([this.latitude, newVal]);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      if (this.status) {
        this.updateMarkerColor(this.status);
      }
    });
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    initMap() {
      if (this.$refs.mapContainer) {
        const mapCenter = [this.latitude, this.longitude].every(Boolean) ? [this.latitude, this.longitude] : [0, 0]; // Default to 0,0 if no valid coords
        this.map = L.map(this.$refs.mapContainer, {
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          dragging: true,
        }).setView(mapCenter, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
      } else {
        console.error("Map container element not found");
      }
    },
    setMapCenter(coords) {
      if (this.map) {
        this.map.setView(coords, this.map.getZoom());
      }
    },
    updateMarkerColor(status) {
      console.log(`Updating color for status: ${status}`);
      switch (status) {
        case 'น้อยวิกฤต':
          this.markerColor = '#A52A2A'; // Red
          break;
        case 'น้อย':
          this.markerColor = '#FFFF00'; // Orange
          break;
        case 'ปกติ':
          this.markerColor = '#008000'; // Green
          break;
        case 'มาก':
          this.markerColor = '#800080'; // Blue
          break;
        case 'ล้นตลิ่ง':
          this.markerColor = '#FF0000'; // Indigo
          break;
        default:
          this.markerColor = '#23BBF1'; // Default blue
      }
      console.log(`Marker color updated to: ${this.markerColor} for status: ${status}`);
    }
  }
};
</script>

<style scoped>
.map-wrapper {
  position: relative;
  height: 150px;
  width: 100%;
}
.map-instance {
  height: 100%;
  width: 100%;
}
.map-center-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.marker-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(35, 187, 241);
  border: 3px solid #fff;
  animation: pulseAnimation 2s infinite;
}
@keyframes pulseAnimation {
  0% { box-shadow: 0 0 0 0 rgba(35, 187, 241, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(35, 187, 241, 0); }
  100% { box-shadow: 0 0 0 20px rgba(35, 187, 241, 0); }
}
</style>