<template>
  <div class="css-0">
    <div class="css-uxk7rl">
      <button
        @click="onClick"
        class="css-1cw47z8"
      >
        <div class="circle-container">
          <div :style="{ backgroundColor: markerColor }" class="circle">
            <p class="circle-text">{{ waterLevel }}</p>
          </div>
          <p class="station-name">{{ StationName }}</p>
        </div>
      </button>
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
.css-uxk7rl {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}
.css-1cw47z8 {
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}
.circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.circle {
    width: 56px;
    height: 56px;
    background-color: #b80000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.circle-text {
    font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0;
    font-weight: 600;
    font-size: 22px;
    color: rgb(242, 242, 242);
}
.station-name {
    margin-top: 4px;
    text-align: center;
    font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 700;
    font-size: 16px;
    color: #333;
}
</style>
