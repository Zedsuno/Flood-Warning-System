<template>
  <div class="custom-button-map-container" @click="onClick">
    <div class="inner-wrapper">
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
              {{ StationName }}
            </text>
          </svg>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ButtonMap",
  props: {
    waterLevel: {
      type: Number,
      required: true,
    },
    StationName: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      markerColor: this.getMarkerColor(this.status),
    };
  },
  watch: {
    status(newStatus) {
      console.log(`Status changed to: ${newStatus}`);
      this.markerColor = this.getMarkerColor(newStatus);
    },
  },
  methods: {
    getMarkerColor(status) {
      console.log(`Getting color for status: ${status}`);
      switch (status) {
        case "น้อยวิกฤต":
          return "#A52A2A"; // Red
        case "น้อย":
          return "#FFFF00"; // Yellow
        case "ปกติ":
          return "#008000"; // Green
        case "มาก":
          return "#800080"; // Purple
        case "ล้นตลิ่ง":
          return "#FF0000"; // Red
        default:
          return "#23BBF1"; // Default blue
      }
    },
    onClick() {
      console.log("Button clicked. Emitting event.");
      this.$emit("station-selected", {
        StationName: this.StationName,
        waterLevel: this.waterLevel,
        latitude: this.latitude,
        longitude: this.longitude,
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
}

.inner-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.centered-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-button {
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.outer-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
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
  border-radius: 50%;
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
  border-radius: 50%;
}

.content-container {
  position: relative;
  width: 56px;
  height: 56px;
  pointer-events: none;
}

.temperature-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.temperature-display {
  font-size: 14px;
  color: #000;
  font-weight: bold;
}

.temperature-text {
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.025em;
  line-height: normal;
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.name-display-container {
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 22px;
}

.name-display-svg {
  width: 200px;
  height: 22px;
}

.station-name-text {
  font-family: "Calibre", Helvetica, Arial;
  font-weight: 800;
  font-size: 14px;
  fill: #ffffff;
  text-anchor: middle;
  stroke: #000000;
  stroke-width: 1px;
  paint-order: stroke;
  text-rendering: optimizeLegibility;
}
</style>
