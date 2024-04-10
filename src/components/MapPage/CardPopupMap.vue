<template>
  <div class="popup-wrapper">
    <div class="popup-box ">
      <div class="popup-body">
        <div class="popup-header">
          <p class="popup-title">{{ stationData.stationId }}</p>
          <button type="button" aria-label="Close Panel" class="popup-close-btn " @click="closePopup">
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              role="presentation"
              aria-hidden="true"
              class="popup-close-icon"
              
            >
              <path
                fill="currentColor"
                d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
              ></path>
            </svg>
          </button>
        </div>
        <p class="popup-time-update">3 minutes ago</p>
        <div class="popup-content">
          <div class="css-0">
            <div class="popup-section">
              <div class="popup-weather-icon">
                <canvas ref="waterLevelCanvas" width="60" height="60"></canvas>
              </div>
              <div class="popup-weather-info">
                <div class="popup-temperature">
                  <p class="popup-temp-value">{{ stationData.waterLevel }}</p>
                  <p class="css-1vdfwj5">ซม.</p>
                </div>
                <div class="css-1pzn42j">
                  <p class="popup-weather-condition">Mostly Sunny</p>
                </div>
              </div>
            </div>
          </div>
          <div class="css-79elbk">
            <div class="css-1jnczdm"><span class="css-187h9kc">S</span></div>
            <div class="css-1pbcwnc"><div class="css-jq41fl"></div></div>
            <div class="css-bwa3g6">
              <div class="css-ox858j">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g transform="rotate(180,12,12)">
                    <path
                      d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"
                      fill="hsl(211, 8%, 10%)"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div class="css-0">
              <div class="css-17ghwul">
                <div class="css-1xfv1ma">
                  <svg width="100" height="100" class="css-0 e1jniu8c0">
                    <g
                      style="
                        transform: rotate(270deg);
                        transform-origin: 50% 50%;
                      "
                    >
                      <path
                        d="M 19.3582222752 24.2884956125 A 40.0000000000 40.0000000000 0 1 1 19.3582222752 75.7115043875"
                        stroke-width="12"
                        stroke="hsl(210, 12%, 93%)"
                        class="css-1c0mkoe e1jniu8c2"
                      ></path>
                      <path
                        d="M 19.3582222752 24.2884956125 A 40.0000000000 40.0000000000 0 1 1 19.3582222752 75.7115043875"
                        stroke-width="8"
                        stroke="rgba(102, 102, 102, 1)"
                        class="css-1c0mkoe e1jniu8c2"
                        stroke-dashoffset="0px"
                        stroke-dasharray="1.9548309326171855px 195.48309326171875px"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div class="css-1cklb6d"><p class="css-181krat">1.1</p></div>
                <div class="css-rk55iw"><p class="css-17frgt3">km/h</p></div>
              </div>
              <p class="css-5ka3wh">Winds</p>
            </div>
          </div>
          
        </div>
        <div class="css-1pzn42j">
          <div class="css-1ja7mm4">
          </div>
          <button type="button" class="popup-action-btn">แดชบอร์ดสถานี</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardPopupMap",
  props: {
    stationData: Object
  },
  data() {
    return {
      waterLevelCondition: '',
    };
  },
  methods: {
    drawWaterLevel() {
    const canvas = this.$refs.waterLevelCanvas;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const level = this.stationData.waterLevel; // Adjust this according to your scale
      const maxLevel = 100; // Maximum water level

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the height of the teardrop based on the water level
      const teardropHeight = (level / maxLevel) * canvas.height;

      // Draw the teardrop shape
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height - teardropHeight);
      ctx.bezierCurveTo(
        canvas.width, canvas.height - teardropHeight,
        canvas.width, canvas.height,
        canvas.width / 2, canvas.height
      );
      ctx.bezierCurveTo(
        0, canvas.height,
        0, canvas.height - teardropHeight,
        canvas.width / 2, canvas.height - teardropHeight
      );
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    }
  },
    updateCondition() {
      // You can put logic here to determine the condition based on waterLevel
      // For example:
      if (this.stationData.waterLevel < 30) {
        this.waterLevelCondition = 'Low';
      } else if (this.stationData.waterLevel < 70) {
        this.waterLevelCondition = 'Moderate';
      } else {
        this.waterLevelCondition = 'High';
      }
    },
    closePopup() {
      this.$emit('close-popup');
    }
  },
  mounted() {
    this.drawWaterLevel();
    this.updateCondition();
  },
  watch: {
    'stationData.waterLevel': function() {
      this.drawWaterLevel();
      this.updateCondition();
    }
  }
};
</script>
<style scoped>
@media screen and (min-width: 48em){

.popup-wrapper {
    top: 20px;
    left: 20px;
    right: auto;
}}

.popup-wrapper {
    position: absolute;
    top: 50px; /* Adjust this value to position the popup lower or higher */
    left: 100px; /* Adjust this value to position the popup left or right */
    z-index: 1000;
    /* Ensure the dimensions and other positioning styles are set correctly */
}

@media screen and (min-width: 48em){
.popup-box  {
    width: 400px;
}}

.popup-box  {
    box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px 0px, rgba(0, 0, 0, 0.16) 0px 4px 16px 0px;
    background-color: rgb(255, 255, 255);
    color: rgb(51, 51, 51);
    border-radius: 0.5rem;
}


@media screen and (min-width: 48em){
.popup-body {
    padding: 32px;
}}
.popup-body {
    padding: 16px;
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
    font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
  color: rgb(189, 196, 203); /* Subtle color by default */
  padding: 0px;
  margin-top: -16px;
  margin-right: -16px;
  background-color: transparent; /* Transparent background by default */
  border: none;
  cursor: pointer; /* Show a pointer cursor by default */
}

.popup-close-btn:hover,
.popup-close-btn:focus {
  background-color: rgba(0, 0, 0, 0.1); /* Light gray background on hover and focus for feedback */
  color: rgb(0, 0, 0); /* Darker color text on hover and focus for better visibility */
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
  transition: fill 250ms ease; /* Smooth transition for color fill */
}

/* Ensure the SVG icon has a transition and reacts to parent's hover */
.popup-close-btn:hover .popup-close-icon,
.popup-close-btn:focus .popup-close-icon {
  fill: rgb(0, 0, 0); /* Darker fill on hover and focus */
}
@media screen and (min-width: 48em){
.popup-time-update {
    margin-top: 0px;
}}
.popup-time-update {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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

@media screen and (min-width: 48em){
.popup-weather-icon {
    width: 60px;
    height: 60px;
}}
.popup-weather-icon {
    width: 40px;
    height: 40px;
    margin-right: 16px;
}

@media screen and (min-width: 48em) {

.popup-weather-info {
    width: auto;
}}

.popup-weather-info {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    width: 80px;
}


@media screen and (min-width: 48em){
.popup-temperature {
    height: 36px;
}}
.popup-temperature {
    display: flex;
    flex-direction: row;
    -webkit-box-align: baseline;
    align-items: baseline;
    height: 22px;
    margin-bottom: 8px;
}

@media screen and (min-width: 48em){
.popup-temp-value {
    font-size: 3rem;
}}
.popup-temp-value {
    font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px 3px 0px 0px;
    font-weight: 600;
    font-size: 1.875rem;
    letter-spacing: 0.025em;
    line-height: 1;
}

@media screen and (min-width: 48em){
.css-1vdfwj5 {
    font-size: 1.25rem;
    height: 36px;
}}
.css-1vdfwj5 {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px;
    font-weight: 400;
    font-size: 1.125rem;
    height: 22px;
}

.popup-weather-condition {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
    font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px;
    font-weight: 400;
    font-size: 11px;
    color: rgb(87, 91, 96);
    bottom: auto;
    left: auto;
}
.css-5ka3wh {
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: -8px 0px 0px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1;
    font-size: 0.75rem;
    color: rgb(51, 51, 51);
    text-align: center;
}

@media screen and (min-width: 48em){
.css-1ja7mm4 {
    margin-top: 32px;
}}
.css-1ja7mm4 {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    margin-bottom: 32px;
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
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
}
</style>

