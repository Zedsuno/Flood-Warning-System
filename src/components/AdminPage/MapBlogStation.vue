<template>
  <div class="map-wrapper-add">
    <div id="map" class="map-instance">
      <!-- The map will be injected here -->
    </div>
    <!-- Centered marker overlay -->
    <div class="map-center-marker">

      <div class="marker-circle"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapBlogStation",
  props: {
  latitude: {
    type: Number,
    default: 19.91048, // Default latitude if not provided
  },
  longitude: {
    type: Number,
    default: 99.840576, // Default longitude if not provided
  },
},

mounted() {
  this.initMap(this.latitude, this.longitude);
},
methods: {
  initMap(lat, lng ) {
    const mapCoords = [lat, lng]; // Default coordinates if none are provided
    this.map = L.map("map").setView(mapCoords, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(this.map);
      this.map.on("moveend", () => {
        const center = this.map.getCenter();
        this.$emit("update-coordinates", center.lat, center.lng);
      });
    },
  },
  watch: {
  latitude(newLat) {
    this.updateMapCenter(newLat, this.longitude);
  },
  longitude(newLng) {
    this.updateMapCenter(this.latitude, newLng);
  }
},
};
</script>

<style scoped>
.map-wrapper-add {
  position: relative;
  height: 100%; /* Adjust height as needed */
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
  border-radius: 50%;
  background: rgb(35, 187, 241);
  border: 3px solid #fff;
  animation: pulseAnimation 2s infinite;
  /* Adjust the box-shadow to create a marker pin effect */
 
}

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
