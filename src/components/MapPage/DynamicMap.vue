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
import { createApp, defineComponent,h } from 'vue';
import ButtonMap from './ButtonMap.vue';
import CardPopupMap from './CardPopupMap.vue';
import axios from 'axios';


export default {
  name: "DynamicMap",
  components: {
    CardPopupMap,
  },
  data() {
    return {
      map: null,
      allStations: [],
      selectedStation: null,
      popupPosition: { x: 0, y: 0 },
    };
  },
  methods: {
    async fetchAllStations() {
      try {
        const response = await axios.get('http://localhost:3001/api/stations');
        this.allStations = response.data;
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    },
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
      return { x: longitude, y: latitude };
    },
    async selectStation(stationId) {
      const station = this.allStations.find(s => s._id === stationId);
      if (station && station.location && station.location.latitude) {
        this.selectedStation = station;
        this.updatePopupPosition(station.location.latitude, station.location.longitude);

        // Call the backend service to update water level and fetch thresholds
        await this.updateWaterLevel(station._id);
      } else {
        console.error("Station data is incomplete:", station);
      }
    },
    async updateWaterLevel(stationId) {
      try {
        const response = await axios.post(`http://localhost:3001/api/stations/updateWaterLevel`, {
          _id: stationId,
        });
        console.log(`Water level updated for station ID ${stationId}:`, response.data);
        this.selectedStation = response.data;
        this.initMap(); // Reinitialize map to update markers
      } catch (error) {
        console.error(`Error updating water level for station ID ${stationId}:`, error);
      }
    },
    updatePopupPosition(latitude, longitude) {
      const position = this.calculatePopupPosition(latitude, longitude);
      this.popupPosition = position;
    },
    createMarkerApp(station) {
  const propsData = {
    waterLevel: station.waterLevel,
    StationName: station.stationName,
    latitude: station.location.latitude,
    longitude: station.location.longitude,
    status: station.status, // Ensure status is passed correctly
  };

  console.log('Creating marker app with props:', propsData);

  const markerElement = document.createElement('div');
  markerElement.className = 'custom-marker';
  const MarkerComponent = defineComponent({
    extends: ButtonMap,
    props: ['waterLevel', 'StationName', 'latitude', 'longitude', 'status'], // Define props explicitly
  });

  const app = createApp({
    render() {
      return h(MarkerComponent, propsData);
    }
  });
  app.mount(markerElement);
  return markerElement;
},
    ClosePopup() {
      this.selectedStation = null;  // This will hide the popup by making v-if="selectedStation" false
    },
  },
  async mounted() {
    await this.fetchAllStations();
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
