<template>
  <div class="map-wrapper-add">
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
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapBlogStation",
  props: {
  latitude: Number,
  longtitude: Number,
},

mounted() {
  this.initMap(this.latitude, this.longitude);
},
methods: {
  initMap(lat = 19.91048, lng = 99.840576) {
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
  background-color: rgb(35, 187, 241);
  border-color: rgb(255, 255, 255);
  border-width: 3px;
  border-style: solid;
  border-radius: 9999px;
}
</style>
