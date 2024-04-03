<template>
  <div class="station-map-card" v-if="stationData && !loading && !error">
    <div class="map-container" v-if="stationData.location">
      <div class="map-overlay">
        <div class="Div_Map">
          <MapDash
            v-if="stationData && stationData.location"
            :latitude="stationData.location.latitude"
            :longitude="stationData.location.longitude"
          />
        </div>
      </div>
    </div>
    <div class="station-details">
      <div class="station-status">
        <span class="status-indicator" :class="{ active: stationData.active }"
          >ไม่ได้ใช้งาน</span
        >
        <p class="station-name">{{ stationData.stationId }}</p>
      </div>
      <p class="station-location">{{ stationData.location.address }},{{ stationData.location.state }},{{ stationData.location.river }},{{ stationData.location.postalCode }}</p>
      <div class="separator"></div>
      <div class="station-info">
        <p class="data-status">
          {{ stationData.dataStatus || "ไม่ได้ส่ง Data เข้ามา"}}
        </p>
      </div>
      <div class="station-actions">
        <button type="button" class="action-btn dashboard">Dashboard</button>
        <button
          type="button"
          class="action-btn edit"
          @click="navigateToEditStation(stationData._id)"
        >
          แก้ไข
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MapDash from "../AdminPage/MapDash";

export default {
  components: { MapDash },
  emits: ["stationSaved"],
  props: {
    stationId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      stationData: null,
      loading: false,
      error: null,
    };
  },
  watch: {
    stationId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchStationData(newVal);
      }
    },
  },
  methods: {
    navigateToEditStation(stationId) {
    // Optionally, you can include additional logic here before navigating.
    this.$router.push({ name: 'EditStation', params: { stationId } });
  },
    async fetchStationData(stationId) {
      if (!stationId) {
        console.error("fetchStationData was called without a stationId.");
        return;
      }
      this.loading = true;
      try {
        const response = await axios.get(
          `http://localhost:3001/api/stations/${stationId}`
        );
        this.stationData = response.data;
        this.error = null;
        this.$emit("stationSaved", this.stationData);
      } catch (error) {
        console.error("Error fetching station data:", error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    if (this.stationId) {
      this.fetchStationData(this.stationId);
    } else {
      console.log("Component mounted without a stationId.");
    }
  },
};
</script>

<style scoped>
@media screen and (min-width: 62em) {
  .station-map-card {
    border-radius: 0em;
  }
}

@media screen and (min-width: 30em) {
  .station-map-card {
    border-radius: 0em;
    padding: 16px;
    width: 300px;
    min-height: 350px;
  }
}
.station-map-card {
  background-color: #333740; /* Dark background color for the card */
  color: #ffffff; /* White text color for legibility */
  border: 2px solid #2d2f33; /* Dark border for definition */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Shadow for depth */
  border-radius: 0px; /* Rounded corners as seen in the image */
  overflow: hidden; /* Ensure content does not overflow the card boundaries */
  transition: transform 0.1s ease-in-out; /* Smooth transition for hover effect */
  position: relative; /* Relative positioning for internal positioning */
  display: flex; /* Flex layout for internal structure */
  flex-direction: column; /* Stack children vertically */
  margin-right: 16px;
  margin-bottom: 16px;
  border-color: transparent;
  border-width: 3px; /* Space below the card */
}

.map-container {
  position: relative; /* Changed to relative positioning */
  top: 0;
  left: 0;
  right: 0;
  height: 150px; /* Fixed height for the map */
  background-color: #263238; /* Background color for the map area */
  margin: 0; /* Reset margin */
  padding: 0; /* Reset padding */
  overflow: hidden; /* Hide overflow */
}

.map-overlay {
  border-radius: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.3
  ); /* Semi-transparent overlay on the map */
}

.leaflet-container {
  position: relative; /* Changed to relative */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  border-radius: 0; /* Remove any border radius */
  background-color: #ddd; /* Leaflet map background */
}

.map-loader {
  border-radius: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-svg .awxjs__fill-path {
  fill: #23bbf1; /* Loader color to match theme */
}

.station-details {
  border-radius: 0;
  padding: 16px; /* Padding around the station details */
}

.station-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px; /* Space between status and station name */
}

.status-indicator {
  border-radius: 0;
  background-color: #1a1c1e; /* Background for status indicator */
  color: #909296; /* Color for the status text */
  border-radius: 15px; /* Rounded corners for the status indicator */
  padding: 6px 12px; /* Padding inside the status indicator */
  font-size: 14px; /* Font size for status text */
}

.station-name {
  font-weight: 700;
  font-size: 24px; /* Larger font size for the station name */
}

.station-location {
  font-size: 16px; /* Font size for location */
  color: rgb(153, 153, 153); /* Lighter color for the location text */
}

.separator {
  height: 1px; /* Height of the separator */
  background-color: #2d2f33; /* Color for the separator */
  margin: 12px 0; /* Margin around the separator */
}

.station-actions .action-btn {
  border-radius: 0;
  background-color: #23bbf1; /* Background color for buttons */
  color: #fff; /* Text color for buttons */
  border: none; /* No border for buttons */
  padding: 8px 16px; /* Padding inside the buttons */
  font-size: 14px; /* Font size for button text */
  margin-right: 8px; /* Right margin for buttons */
  cursor: pointer;
  text-transform: uppercase; /* Uppercase text for buttons */
  border-radius: 9999px; /* Fully rounded corners for buttons */
}

.dashboard {
  background-color: #4a90e2; /* Different background color for dashboard button */
}

.edit {
  background-color: #f5a623; /* Different background color for edit button */
}

/* Additional styles for hover effects and other interactive elements */
.station-map-card:hover {
  transform: scale(1.02); /* Slightly scale up the card on hover */
  border-color: #23bbf1; /* Highlight border color on hover */
}


/* Add any more custom styles needed to fine-tune the UI */
</style>