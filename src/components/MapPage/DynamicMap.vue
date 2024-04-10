<template>
  <div class="map-container" ref="mapContainer" >
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
import axios from 'axios';
import ButtonMap from './ButtonMap.vue';
import CardPopupMap from './CardPopupMap.vue';
import { createApp } from 'vue';

export default {
  name: "DynamicMap",
  components: {
    CardPopupMap
  },
  data() {
    return {
      map: null,
      allStations: [],
      selectedStation: null,
      popupPosition: { x: 0, y: 0 }, // Track popup position
    };
  },
  methods: {
    async fetchAllStations() {
      try {
        const response = await axios.get("http://localhost:3001/api/stations");
        this.allStations = response.data;
        this.initMarkers();
      } catch (error) {
        console.error("Error fetching all stations:", error);
      }
    },
    initMap() {
      this.map = L.map(this.$refs.mapContainer).setView([19.91048, 99.840576], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '... your attribution ...',
      }).addTo(this.map);
    },
    initMarkers() {
      this.allStations.forEach(station => {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';

        const markerApp = createApp(ButtonMap, {
          stationId: station.stationId,
          waterLevel: station.waterLevel,
        });
        markerApp.mount(markerElement);

        const customMarker = L.divIcon({
          className: 'custom-div-icon',
          html: markerElement.outerHTML,
        });

        const marker = L.marker([station.location.latitude, station.location.longitude], { icon: customMarker }).addTo(this.map);
        marker.on('click', () => {
          // Calculate position for the popup
          const { x, y } = this.map.latLngToContainerPoint(marker.getLatLng());
          this.popupPosition = { x, y };
          this.selectedStation = station;
        });
      });
    },
    ClosePopup() {
    console.log('Popup should close now');
    this.selectedStation = null;
  }
  },
  mounted() {
    this.initMap();
    this.fetchAllStations();
  },
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
    /* Apply your ButtonMap.vue styles here */
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
    /* Additional styling as needed */
  }

  .custom-div-icon {
    /* Custom div icon styling */
  }
  </style>