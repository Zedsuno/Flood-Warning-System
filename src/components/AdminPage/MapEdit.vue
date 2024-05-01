<template>
  <div class="map-wrapper-edit">
    <div id="editMap" class="map-instance-edit">
      <!-- The map will be injected here -->
    </div>
    <div class="map-center-marker">
      <div class="marker-circle"></div>
    </div>
    <!-- Additional tools or overlays for editing can be added here -->
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapEdit",
  props: {
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    this.initMap(this.latitude, this.longitude);
  },
  methods: {
    initMap() {
      const mapCoords = [this.latitude, this.longitude];
      this.map = L.map("editMap").setView(mapCoords, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        
        maxZoom: 18,
      }).addTo(this.map);

      this.map.on("moveend", () => {
        const center = this.map.getCenter();
        this.$emit("update-coordinates", center.lat, center.lng);
      });
    },
    updateMapCenter(lat, lng) {
      const newCoords = [lat, lng];
      if (this.map) {
        this.map.setView(newCoords, this.map.getZoom());
        if (this.marker) {
          this.marker.setLatLng(newCoords);
        } else {
          // If marker doesn't exist, create it
          
        }
      }
    },
  },
  watch: {
    latitude(val) {
      if (this.longitude !== undefined && val !== undefined) {
        this.updateMapCenter(val, this.longitude);
      }
    },
    longitude(val) {
      if (this.latitude !== undefined && val !== undefined) {
        this.updateMapCenter(this.latitude, val);
      }
    },
  },
};
</script>

<style scoped>
.map-wrapper-edit {
  position: relative;
  height: 100%; /* Adjust as needed */
  width: 100%;
}
.map-instance-edit {
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
