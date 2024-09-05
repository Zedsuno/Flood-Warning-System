<template>
  <div class="popup-wrapper">
    <div class="popup-box">
      <div class="popup-body">
        <div class="popup-header">
          <p class="popup-title">{{ stationData.stationName }}</p>
          <button
            type="button"
            aria-label="Close Panel"
            class="popup-close-btn"
            @click="closePopup"
          >
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              role="presentation"
              aria-hidden="true"
              class="popup-close-icon"
            >
              <circle cx="12" cy="12" r="11" fill="currentColor"></circle>
            </svg>
          </button>
        </div>
        <p class="popup-time-update">{{ lastUpdated }}</p>
        <div class="popup-content">
          <div class="css-0">
            <div class="popup-section">
              <i
                :class="['fa', 'fa-tint', waterLevelColor , 'water-level-icon']"
                aria-hidden="true"
              ></i>

              <div class="popup-weather-info">
                <div class="popup-temperature">
                  <p class="popup-temp-value">{{ stationData.waterLevel }}</p>
                  <p class="css-1vdfwj5">ซม.</p>
                </div>
                <div class="css-1pzn42j">
                  <p class="popup-weather-condition" >
                    {{   stationData.status || "ไม่ได้ส่ง Data เข้ามา" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="css-1pzn42j">
          <div class="css-1ja7mm4">
            <div class="popup-section">
              <svg
                viewBox="0 0 69 100"
                focusable="false"
                role="presentation"
                class="css-11jisnp"
              >
                <g fill="currentColor">
                  <path
                    d="M32.4 68.2c-2.3 3.3-4.1 6.2-4.1 10.5 0 2.1.6 4.1 1.8 5.9.5.8.3 1.9-.5 2.5-.3.2-.6.3-1 .3-.6 0-1.1-.3-1.5-.8-1.5-2.3-2.3-5-2.3-7.8 0-5.4 2.2-8.9 4.8-12.6.6-.8 1.7-1 2.5-.4.6.5.8 1.6.3 2.4zM39 36.1c-9 21.3-21.4 26.6-21.4 42.6 0 11.8 9.5 21.3 21.3 21.3s21.3-9.5 21.3-21.3c.1-16-12.3-21.3-21.2-42.6zM8.5 36.2c-1.3 1.9-2.4 3.5-2.4 6 0 1.2.3 2.3 1 3.3.3.5.2 1.1-.3 1.4-.2.1-.4.2-.6.2-.3 0-.7-.2-.8-.5-.9-1.3-1.3-2.9-1.3-4.5 0-3.1 1.2-5.1 2.7-7.2.3-.5 1-.6 1.4-.2.5.4.6 1 .3 1.5zm3.7-18.4C7.1 30 0 33 0 42.2c0 6.7 5.5 12.2 12.2 12.2s12.2-5.5 12.2-12.2c0-9.2-7.1-12.2-12.2-24.4zM53.1 18.4c-1.3 1.9-2.4 3.5-2.4 6 0 1.2.3 2.3 1 3.3.3.5.2 1.1-.3 1.4-.2.1-.4.2-.6.2-.3 0-.7-.2-.8-.5-.9-1.3-1.3-2.8-1.3-4.4 0-3.1 1.2-5.1 2.7-7.2.3-.5 1-.6 1.4-.2.5.3.6.9.3 1.4zM56.8 0c-5.1 12.2-12.2 15.2-12.2 24.4 0 6.7 5.5 12.2 12.2 12.2S69 31.1 69 24.4c0-9.2-7.1-12.2-12.2-24.4z"
                  ></path>
                </g>
              </svg>
              <div class="css-0">
                <div class="css-1pfve51">
                  <p class="css-6romxb">
                    {{ stationData.waterLevelPercentage }}
                  </p>
                  <p class="css-8nuan8">%</p>
                </div>
                <p class="popup-label">ระดับน้ำปัจจุบัน</p>
              </div>
            </div>
            <div class="popup-section">
              <i class="fa fa-ruler-combined" aria-hidden="true"></i>
              <div class="css-0">
                <div class="css-1pfve51">
                  <p class="css-6romxb">{{ stationData.bankLevel }}</p>
                  <p class="css-8nuan8">ซม</p>
                </div>
                <p class="popup-label">BankLevel</p>
              </div>
            </div>
            <div class="popup-section">
              <i class="fa fa-water" aria-hidden="true"></i>
              <div class="css-0">
                <div class="css-1pfve51">
                  <p class="css-6romxb">{{ stationData.waterline }}</p>
                  <p class="css-8nuan8">ซม</p>
                </div>
                <p class="popup-label">ระดับตลิ่ง</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="popup-action-btn"
            @click="redirectToDashboard"
          >
            แดชบอร์ดสถานี
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapState } from "vuex";

export default {
  name: "CardPopupMap",
  props: {
    stationData: Object,
    status: String,
    stationId: {
    type: String,
    required: true
  }
  },
  computed: {
    ...mapGetters({
      thresholds: "waterLevel/getThresholds", // Use the correct namespace if configured
    }),
    ...mapState('waterLevels', ['stations']),
  
    selectedStationData() {
    const station = this.stations.find(station => station._id === this.stationId);
    if (!station) {
      console.error(`Station with ID ${this.stationId} not found.`);
      return { status: 'ไม่ได้ส่ง Data เข้ามา' }; // Default object if station is not found
    }
    return station;
  },
    waterLevelColor() {
      const thresholds = this.getThresholds;
      if (!this.stationData?.waterLevel || !thresholds) {
        return "#000"; // Return a default color if any data is missing
      }
      const threshold = thresholds.find(
        (t) => this.stationData.waterLevel <= t.upperLimit
      );
      return threshold ? threshold.color : "#000";
    },
    
  },
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
     redirectToDashboard() {
    if (this.stationData && this.stationData._id) {
      this.$router.push({ name: 'Station', params: { stationId: this.stationData._id } });
    } else {
      console.error('Station data is missing or incomplete');
    }
  }
  },
  mounted() {
  if (this.stationId) {
    this.fetchStationData(this.stationId); // Make sure such method exists or is implemented correctly
  }
},
  data() {
    return {
      lastUpdated: new Date().toLocaleTimeString(),
    };
  },
};
</script>

<style scoped>
@media screen and (min-width: 48em) {
  .popup-wrapper {
    top: 20px;
    left: 20px;
    right: auto;
  }
}

.popup-wrapper {
  position: absolute;
  top: 50px;
  /* Adjust this value to position the popup lower or higher */
  left: 100px;
  /* Adjust this value to position the popup left or right */
  z-index: 1000;
  /* Ensure the dimensions and other positioning styles are set correctly */
}

@media screen and (min-width: 48em) {
  .popup-box {
    width: 400px;
  }
}

.popup-box {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 4px 16px 0px;
  background-color: rgb(255, 255, 255);
  color: rgb(51, 51, 51);
  border-radius: 0.5rem;
}

@media screen and (min-width: 48em) {
  .popup-body {
    padding: 16px;
  }
}

.popup-body {
  padding: 32px;
}

.popup-header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.popup-title {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 700;
  font-size: 1.5rem;
}

.popup-close-btn {
  border-radius: 0.25rem;
  font-weight: 600;
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: background-color 250ms ease, color 250ms ease;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.2;
  outline: none;
  height: 2.5rem;
  min-width: 2.5rem;
  font-size: 1rem;
  color: rgb(189, 196, 203);
  /* Subtle color by default */
  padding: 0px;
  margin-top: -16px;
  margin-right: -16px;
  background-color: transparent;
  /* Transparent background by default */
  border: none;
  cursor: pointer;
  /* Show a pointer cursor by default */
}

.popup-close-btn:hover,
.popup-close-btn:focus {
  background-color: rgba(0, 0, 0, 0.1);
  /* Light gray background on hover and focus for feedback */
  color: rgb(0, 0, 0);
  /* Darker color text on hover and focus for better visibility */
}

.popup-close-icon:not(:root) {
  overflow: hidden;
}

.popup-close-icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  backface-visibility: hidden;
  transition: fill 250ms ease;
  /* Smooth transition for color fill */
}

/* Ensure the SVG icon has a transition and reacts to parent's hover */
.popup-close-btn:hover .popup-close-icon,
.popup-close-btn:focus .popup-close-icon {
  fill: rgb(0, 0, 0);
  /* Darker fill on hover and focus */
}

@media screen and (min-width: 48em) {
  .popup-time-update {
    margin-top: 0px;
  }
}

.popup-time-update {
  font-family: "Prompt", sans-serif;
  margin: -8px 0px 0px;
  font-weight: 400;
  font-size: 0.75rem;
  color: rgb(132, 142, 154);
}

.popup-content {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.popup-section {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

@media screen and (min-width: 48em) {
  .popup-weather-icon {
    width: 60px;
    height: 60px;
  }
}

.popup-weather-icon {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

@media screen and (min-width: 48em) {
  .popup-weather-info {
    width: auto;
  }
}

.popup-weather-info {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 80px;
}

@media screen and (min-width: 48em) {
  .popup-temperature {
    height: 36px;
  }
}

.popup-temperature {
  display: flex;
  flex-direction: row;
  -webkit-box-align: baseline;
  align-items: baseline;
  height: 22px;
  margin-bottom: 8px;
}

@media screen and (min-width: 48em) {
  .popup-temp-value {
    font-size: 3rem;
  }
}

.popup-temp-value {
  font-family: "Prompt", sans-serif;
  margin: 0px 3px 0px 0px;
  font-weight: 600;
  font-size: 1.875rem;
  letter-spacing: 0.025em;
  line-height: 1;
}

@media screen and (min-width: 48em) {
  .css-1vdfwj5 {
    font-size: 1.25rem;
    height: 36px;
  }
}

.css-1vdfwj5 {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 400;
  font-size: 1.125rem;
  height: 22px;
}

.popup-weather-condition {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 400;
  font-size: 0.875rem;
}

.css-79elbk {
  position: relative;
}

.css-1jnczdm {
  position: absolute;
  top: 18px;
  width: 100%;
  text-align: center;
}

.css-187h9kc {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 700;
  font-size: 11px;
}

.css-1pbcwnc {
  position: absolute;
  height: 100%;
  width: 100%;
  top: -2px;
  padding: 5px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.css-jq41fl {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid rgb(235, 237, 239);
}

.css-bwa3g6 {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  padding: 9px 16px 16px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.css-ox858j {
  width: 24px;
  height: 115px;
  transform: rotate(188deg) scale(0.7);
  transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1) 0s;
  z-index: 0;
}

.css-17ghwul {
  height: 100px;
  width: 100px;
  margin: 0px auto;
  position: relative;
}

.css-1xfv1ma {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
}

.css-1c0mkoe {
  fill: none;
  stroke-linecap: round;
}

.css-1cklb6d {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
}

.css-181krat {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 0.025em;
  line-height: 24px;
  color: rgb(51, 51, 51);
  bottom: auto;
  left: auto;
}

.css-rk55iw {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}

.css-17frgt3 {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 400;
  font-size: 11px;
  color: rgb(87, 91, 96);
  bottom: auto;
  left: auto;
}

.css-5ka3wh {
  font-family: "Prompt", sans-serif;
  margin: -8px 0px 0px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;
  font-size: 0.75rem;
  color: rgb(51, 51, 51);
  text-align: center;
}

@media screen and (min-width: 48em) {
  .css-1ja7mm4 {
    margin-top: 32px;
  }
}

.css-1pzn42j .popup-weather-condition {
  font-size: smaller;
}

.popup-time-update {
  text-align: left;
}

.css-1ja7mm4 {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
}

.popup-section {
  display: flex;
  margin-right: 32px;
  align-items: center;
}
.css-1pfve51 {
  display: flex;
  flex-direction: row;
  -webkit-box-align: baseline;
  align-items: baseline;
  font-size: 1.25rem;
  margin-top: 3px;
}
.css-6romxb {
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px 3px 0px 0px;
  font-weight: 500;
  font-size: 1.25rem;
  color: rgb(51, 51, 51);
}
.css-8nuan8 {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 400;
  font-size: 0.75rem;
  color: rgb(87, 91, 96);
}
.popup-label {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;
  font-size: 0.625rem;
  color: rgb(87, 91, 96);
}
.css-1pfve51 {
  display: flex;
  flex-direction: row;
  -webkit-box-align: baseline;
  align-items: baseline;
  font-size: 1.25rem;
  margin-top: 3px;
}

.fa {
  font-size: 30px; /* Adjust the size as needed */
  
  /* Example color */
}
.water-level-icon {
  font-size: 60px;  /* Larger font size for visibility */
  margin-right: 16px;
  width: 80px;
    height: 80px;
    margin-top: 16px;
}

.popup-action-btn {
  border-radius: 9999px;
  font-weight: 700;
  width: 100%;
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
  background-color: rgb(58, 186, 80);
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: "Prompt", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.fa-tint.low {
  color: #ff0000;
}
.fa-tint.medium {
  color: #ffa500;
}
.fa-tint.high {
  color: #008000;
}
.fa-tint.very-high {
  color: #0000ff;
}
.fa-tint.extreme {
  color: #4b0082;
}
</style>
