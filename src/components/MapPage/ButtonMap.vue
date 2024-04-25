<template>
  <div class="custom-button-map-container" @click="onClick">
    <div class="inner-wrapper">
      <div class="centered-container">
        <button class="custom-button">
          <div class="content-container">
            <div class="outer-ring"></div>

            <div class="white-ring-container">
              <div class="white-ring"></div>
            </div>
            <div class="inner-ring-container">
              <div class="inner-ring"></div>
            </div>
            <div class="temperature-container">
              <div class="temperature-display">
                <p class="temperature-text">{{ waterLevel }}</p>
              </div>
            </div>
            <div class="name-display-container">
              <svg viewBox="0 0 200 22" class="name-display-svg">
                <text x="100" y="17" class="station-name-text">
                  {{ stationId }}
                </text>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonMap",
  props: {
    stationId: String,
    waterLevel: Number,
  },
  methods: {
    onClick() {
      this.$emit("station-selected", {
        stationId: this.stationId,
        waterLevel: this.waterLevel,
        latitude: this.latitude,
      longitude: this.longitude
      });
    },
  },
};
</script>

<style scoped>
.custom-button-map-container {
  position: absolute;
  background-color: transparent;
  margin-left: -38px;
  margin-top: -38px;
  width: 76px;
  height: 76px;
  transform: translate3d(0px, 0px, 0px);
  z-index: 1;
  /* Other styles remain unchanged */
}

.centered-container {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.custom-button {
  outline: none;
}
.content-container {
  pointer-events: none;
}

.outer-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 9999px;
}
.white-ring-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 42px;
  height: 42px;
}
.white-ring {
  width: 42px;
  height: 42px;
  background-color: rgb(255, 255, 255);
  border-radius: 9999px;
}
.inner-ring-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
}
.inner-ring {
  width: 36px;
  height: 36px;
  background-color: #11abcd;
  border-radius: 9999px;
}

.temperature-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.temperature-display {
  top: auto;
  left: auto;
}

.temperature-text {
  font-family: 'Prompt', sans-serif;
  margin: 0px;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 0.025em;
  line-height: normal;
  color: rgb(242, 242, 242);
}
.name-display-container {
  position: absolute;
  top: 53px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 20px;
}
.name-display-svg {
  width: 200px;
  height: 20px;
}
.station-name-text {
  font-family: 'Prompt', sans-serif;
  font-weight: 800;
  font-size: 20px;
  fill: #333;
  text-anchor: middle;
  stroke: #fff; /* White outline, can help with readability on complex backgrounds */
  stroke-width: 5px; /* The width of the outline - adjust as needed */
  paint-order: stroke; /* This ensures the stroke is drawn behind the fill */
  text-rendering: optimizeLegibility; /* Improves text rendering */
}
</style>
