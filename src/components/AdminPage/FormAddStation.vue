<template>
  <div class="Div-Add-Station-All">
    <div class="Div-Add-Station">
      <div class="Div-Header-Text">
        <div class="Blog-Text-Add-Header">
          <div class="Text-Header-Add">
            <div v-if="!isEditMode" class="css-0">
              <h1 class="Add-Station-h1-Text">เพิ่มสถานี</h1>
            </div>
            <div v-else class="edit-station-container">
              <div class="station-header">
                <h3 class="station-label">สถานี</h3>
                <h1 class="station-title"></h1>
              </div>
              <div class="station-details">
                <div class="station-status-container">
                  <div class="station-status-badge">
                    <div
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="popover-154"
                      class="station-status-text"
                    >
                      ไม่ได้ใช้งาน
                    </div>
                  </div>
                </div>
                <p class="station-id-text">
                  ชื่อสถานี: {{ stationData.stationId }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="botton-Save-All">
          <button
            v-if="isEditMode"
            @click="deleteStation"
            type="button"
            aria-label="Delete Station"
            class="css-1r8mp7n"
          >
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              role="presentation"
              class="css-19a9efo"
            >
              <g fill="currentColor">
                <path
                  d="M19.452,7.5H4.547a.5.5,0,0,0-.5.545L5.334,22.181A2,2,0,0,0,7.326,24h9.347a2,2,0,0,0,1.992-1.819L19.95,8.045a.5.5,0,0,0-.129-.382A.5.5,0,0,0,19.452,7.5Zm-9.2,13a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Zm5,0a.75.75,0,0,1-1.5,0v-9a.75.75,0,0,1,1.5,0Z"
                ></path>
                <path
                  d="M22,4H17.25A.25.25,0,0,1,17,3.75V2.5A2.5,2.5,0,0,0,14.5,0h-5A2.5,2.5,0,0,0,7,2.5V3.75A.25.25,0,0,1,6.75,4H2A1,1,0,0,0,2,6H22a1,1,0,0,0,0-2ZM9,3.75V2.5A.5.5,0,0,1,9.5,2h5a.5.5,0,0,1,.5.5V3.75a.25.25,0,0,1-.25.25H9.25A.25.25,0,0,1,9,3.75Z"
                ></path>
              </g>
            </svg>
          </button>
          <div class="Botton-Save">
            <button
              @click="isEditMode ? updateStation() : saveStation()"
              class="Botton-Save-Text"
            >
              {{ isEditMode ? "อัพเดทสถานี" : "สร้างสถานี" }}
            </button>
          </div>
        </div>
      </div>

      <div class="Space-Btw"></div>
      <form @submit.prevent="isEditMode ? updateStation() : saveStation()">
        <StationProfile
          :existingData="stationData"
          @update-profile="updateStationProfile"
        />
        <StationLocation
          :existingData="stationData.location"
          @update-location="updateStationLocation"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StationProfile from "./StationProfile.vue";
import StationLocation from "./StationLocation.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    StationProfile,
    StationLocation,
  },
  props: {
    isEditMode: {
      type: Boolean,
      default: false,
    },
    stationId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      stationData: this.defaultStationData(),
    };
  },
  created() {
    if (this.isEditMode && this.stationId) {
      this.fetchStation(this.stationId)
        .then((response) => {
          this.stationData = response.data;
          // Ensure `location` is defined even if it's not present in the response
          if (!this.stationData.location) {
            this.stationData.location = this.defaultStationData().location;
          }
        })
        .catch((error) => {
          console.error("Failed to fetch station data", error);
        });
    }
  },
  computed: {
    ...mapState({
      currentStation: (state) => state.stations.currentStation,
    }),
  },
  watch: {
    stationId(newVal) {
      if (this.isEditMode && newVal) {
        this.fetchStation(newVal);
      }
    },
    currentStation(newVal) {
      if (this.isEditMode && newVal) {
        this.stationData = { ...newVal };
      }
    },
  },
  methods: {
    ...mapActions("stations", [
      "fetchStation",
      "saveStation",
      "updateStationData",
    ]),
    defaultStationData() {
      return {
        _id: null,
        stationId: "",
        hardware: [],
        software: "",
        active: false, // Assuming new stations are active by default
        waterLevel: "100  ", // Starting water level, adjust as needed
        referenceArea: "500", // The area the station is monitoring
        waterLevelThreshold: "", // The threshold for alerts
        status: "active",
        location: {
          address: "",
          river: "",
          state: "",
          postalCode: "",
          latitude: null,
          longitude: null,
          elevation: null,
          precision: "",
        },
      };
    },
    updateStationProfile(profileData) {
      this.stationData = { ...this.stationData, ...profileData };
    },
    updateStationLocation(locationData) {
      if (this.stationData && locationData) {
        this.stationData.location = {
          ...this.stationData.location,
          ...locationData,
        };
      } else {
        console.error("Station data or location data is undefined.");
      }
    },
    async fetchStationData() {
      this.loading = true;
      try {
        const response = await axios.get(
          `http://localhost:3001/api/stations/${this.stationId}`
        );
        this.stationData = response.data;
      } catch (error) {
        console.error("Error fetching station data:", error);
        // Handle error appropriately
      } finally {
        this.loading = false;
      }
    },
    // Call this method when the save button is clicked
    async saveStation() {
      if (!this.isEditMode) {
        // Creating a new station
        const postData = { ...this.stationData };
        delete postData._id; // Remove _id when creating a new document
        try {
          const response = await axios.post(
            "http://localhost:3001/api/stations",
            postData
          );
          this.$emit("station-saved", response.data);
          this.$router.push("/Admin");
        } catch (error) {
          console.error("Error saving the station:", error.response.data);
        }
      } else {
        // Updating an existing station
        await this.updateStation();
      }
    },
    async updateStation() {
      try {
        const updateData = { ...this.stationData };
        // Don't delete _id here since it's required for identifying the document to update
        const response = await axios.put(
          `http://localhost:3001/api/stations/${updateData._id}`,
          updateData
        );
        console.log("Station updated:", response.data);
        this.$router.push("/Admin");
      } catch (error) {
        console.error("Error updating the station:", error.response.data);
      }
    },
    async deleteStation() {
      if (confirm("คุณแน่ใจใช่มั้ยว่าจะลบสถานีแห่งนี้")) {
        axios
          .delete(`http://localhost:3001/api/stations/${this.stationData._id}`)
          .then(() => {
            console.log("Station deleted successfully");
            this.$router.push("/Admin");
          })
          .catch((error) => {
            console.error("Error deleting the station:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 62em) {
  .Div-Add-Station-All {
    overflow-y: scroll;
  }
}
.Div-Add-Station-All {
  overflow-y: auto;
  background-color: rgb(219, 226, 226);
  -webkit-box-flex: 1;
  flex-grow: 1;
  z-index: 1;
  min-height: 100vh;
  padding-left: 300px;
  box-sizing: border-box;
}
.Div-Add-Station {
  padding: 16px;
}
@media screen and (min-width: 30em) {
  .Div-Add-Station {
    padding: 32px;
  }
}

@media screen and (min-width: 62em) {
  .Div-Add-Station {
    padding: 64px;
  }
}

.Div-Header-Text {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 0px;
}

.Blog-Text-Add-Header {
  margin-right: 8px;
}

.Text-Header-Add {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}

.Station-h3-Text {
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 700;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  color: rgb(153, 153, 153);
}

@media screen and (min-width: 62em) {
  .Add-Station-h1-Text {
    font-size: 3rem;
  }
}

.Add-Station-h1-Text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 700;
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.Botton-Save {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}
.Botton-Save-Text {
  border-radius: 9999px;
  font-weight: 700;
  display: inline-flex;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 2.5rem;
  min-width: 2.5rem;
  font-size: 0.875rem;
  padding-left: 32px;
  padding-right: 32px;
  background-color: rgb(35, 187, 241);
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
}

@media screen and (min-width: 62em) {
  .Space-Btw {
    margin-bottom: 32px;
  }
}
.Space-Btw {
  height: 2px;
  margin-top: 8px;
  margin-bottom: 16px;
  background-color: rgb(59, 63, 68);
}

.Div-Input-Add-Station {
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
  margin-left: -16px;
}

.botton-Save-All {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}

.css-1r8mp7n {
  border-radius: 9999px;
  font-weight: 700;
  width: 44px;
  display: inline-flex;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 44px;
  min-width: 2.5rem;
  font-size: 0.875rem;
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgb(40, 43, 46);
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-right: 16px;
}

.css-1r8mp7n:hover {
  background-color: #ff4d4d; /* red background */
  color: white; /* white text */
}

.css-19a9efo:not(:root) {
  overflow: hidden;
}
.css-19a9efo {
  width: 18px;
  height: 18px;
  color: currentcolor;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  backface-visibility: hidden;
}

.edit-station-container {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}

.station-header {
  margin-right: 16px;
}

.station-label {
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 700;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  color: rgb(153, 153, 153);
}

@media screen and (min-width: 62em) {
  .station-title {
    font-size: 3rem;
  }
}
.station-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 700;
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.station-details {
  display: flex;
  flex-direction: column;
}

.station-status-container {
  margin-bottom: 8px;
}

.station-status-badge {
  position: relative;
}

.station-status-text {
  display: inline-block;
  padding-left: 4px;
  padding-right: 4px;
  text-transform: uppercase;
  font-size: 0.75rem;
  border-radius: 0.125rem;
  font-weight: 700;
  white-space: nowrap;
  vertical-align: middle;
  box-shadow: rgb(113, 128, 150) 0px 0px 0px 1px inset;
  color: rgb(113, 128, 150);
}

.station-id-text {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;
  font-size: 0.75rem;
  color: rgb(153, 153, 153);
}
</style>
