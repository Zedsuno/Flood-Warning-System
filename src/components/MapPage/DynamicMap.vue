<template>
  <div class="map-container" ref="mapContainer">
    <CardPopupMap
      v-if="selectedStation"
      :station-data="selectedStation"
      @ClosePopup="ClosePopup"
      :style="{ top: popupPosition.y + 'px', left: popupPosition.x + 'px' }"
    />
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createApp, defineComponent } from 'vue';
import ButtonMap from './ButtonMap.vue';
import CardPopupMap from './CardPopupMap.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: "DynamicMap",
  components: {
    CardPopupMap,
  },
  data() {
    return {
      map: null,
      selectedStation: null,
      popupPosition: { x: 0, y: 0 },
    };
  },
  computed: {
    ...mapState('stations', ['allStations', 'selectedStation']),
  },
  methods: {
    ...mapActions('stations', ['fetchAllStations', 'selectStation', 'deselectStation']),
    ...mapActions('waterLevels', ['fetchSensorData', 'calculateWaterLevels', 'applyThresholds']),

    initMap() {
      this.map = L.map(this.$refs.mapContainer, { center: [19.91048, 99.840576], zoom: 13 });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors'
      }).addTo(this.map);
      this.initMarkers();
    },

    initMarkers() {
      this.allStations.forEach(station => {
        const markerElement = this.createMarkerApp(station);
        const customMarker = L.divIcon({
          className: 'custom-div-icon',
          html: markerElement.outerHTML,
        });
        const marker = L.marker(
          [station.location.latitude, station.location.longitude],
          { icon: customMarker }
        ).addTo(this.map);

        marker.on('click', () => {
          const { x, y } = this.map.latLngToContainerPoint(marker.getLatLng());
          this.popupPosition = { x, y };
          this.selectStation(station._id);
        });
      });
    },
    calculatePopupPosition(latitude, longitude) {
    // Dummy function for demonstration: adjust as needed
    return { x: longitude, y: latitude };
  },
  selectStation(stationId) {
    const station = this.allStations.find(s => s._id === stationId);
    if (station && station.location && station.location.latitude) {
      this.selectedStation = station;
      this.updatePopupPosition(station.location.latitude, station.location.longitude);
    } else {
      console.error("Station data is incomplete:", station);
    }
  },
  updatePopupPosition(latitude, longitude) {
    const position = this.calculatePopupPosition(latitude, longitude);
    this.popupPosition = position;
  },
    createMarkerApp(station) {
      const propsData = {
        stationId: station._id,
        StationName: station.stationName, // Ensure the correct prop name
        waterLevel: station.waterLevel,
        latitude: station.location.latitude,
        longitude: station.location.longitude,
      };

      console.log('Creating marker app with props:', propsData); // Additional logging

      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      const MarkerComponent = defineComponent({
        extends: ButtonMap,
        data() {
          return { ...propsData };
        }
      });

      const app = createApp(MarkerComponent);
      app.use(this.$store);
      app.mount(markerElement);
      return markerElement;
    },

    ClosePopup() {
  this.selectedStation = null;  // This will hide the popup by making v-if="selectedStation" false
},
  },
  mounted() {
    this.fetchAllStations();
    this.initMap();
  }
};
</script>

<style>
.map-container {
  width: 100%;
  height: 100vh;
}

.station-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.station-indicator {
  background-color: red;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.station-name {
  margin-top: 5px;
}

.custom-div-icon {
}
</style>
