<template>
  <div class="css-1xypeq2">
    <div class="css-1nn4z8s">
      <div class="css-1o3fej">
        <div class="css-o5rbxo">
          <div class="css-uwwqev">
            <div
              id="map"
              style="width: 100%; height: 100%; position: relative"
              class="leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom awxjs__ia-map"
              tabindex="0"
            >
              <div
                class="leaflet-pane leaflet-map-pane"
                style="transform: translate3d(14px, -4px, 0px)"
              >
                <div class="leaflet-pane leaflet-tile-pane"></div>
                <div class="leaflet-pane leaflet-shadow-pane"></div>
                <div class="leaflet-pane leaflet-overlay-pane"></div>
                <div class="leaflet-pane leaflet-marker-pane">
                  <div
                    class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"
                    tabindex="0"
                    style="
                      margin-left: -21px;
                      margin-top: -21px;
                      width: 42px;
                      height: 42px;
                      transform: translate3d(210px, 287px, 0px);
                      z-index: 287;
                    "
                  >
                    <div class="css-0">
                      <div class="css-uxk7rl">
                        <button
                          data-observation='{"loc":{"lat":14.581330299377,"long":100.75499725342},"ob":{"tempF":96,"tempC":35.6,"dewpointF":75.2,"dewpointC":24,"feelslikeF":108.4,"feelslikeC":42.4,"dateTimeISO":"2024-02-28T15:15:00+07:00","pressureMB":1006.6,"pressureIN":29.73,"spressureMB":1005.4,"spressureIN":29.69,"altimeterMB":1006.7,"altimeterIN":29.73,"humidity":51,"precipMM":0,"precipIN":0,"windSpeedMPH":2,"windSpeedKPH":3.2,"windGustMPH":6,"windGustKPH":9.7,"windDir":"SW","windDirDEG":214},"id":"MID_F0368"}'
                          class="css-1cw47z8"
                        >
                          <div class="css-1ixbp0l">
                            <div style="line-height: 1.2" class="css-nsoy96">
                              <div class="css-dhxo5y">
                                <div class="css-4wgmlj"></div>
                              </div>
                              <div class="css-b9ntko">
                                <div class="css-14u9ysz"></div>
                              </div>
                              <div class="css-1tijgc9">
                                <div class="css-1t7r5hi"></div>
                              </div>
                              <div class="css-3hcm5q">
                                <div class="css-zgocvj">
                                  <p class="css-1pqzto4">36</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="leaflet-pane leaflet-tooltip-pane"></div>
                <div class="leaflet-pane leaflet-popup-pane"></div>
                <div
                  class="leaflet-proxy leaflet-zoom-animated"
                  style="transform: translate3d(12755px, 7431px, 0px) scale(32)"
                ></div>
                <div
                  class="leaflet-pane leaflet-base-pane"
                  style="z-index: 199"
                >
                  <div class="leaflet-layer" style="z-index: 1; opacity: 1">
                    <div
                      class="leaflet-tile-container leaflet-zoom-animated"
                      style="
                        z-index: 17;
                        transform: translate3d(1px, 0px, 0px) scale(2);
                      "
                    ></div>
                  </div>
                </div>
                <div
                  class="leaflet-pane leaflet-admin-pane"
                  style="z-index: 210"
                ></div>
              </div>
              <div class="leaflet-control-container">
                <div class="leaflet-top leaflet-left"></div>
                <div class="leaflet-top leaflet-right"></div>
                <div class="leaflet-bottom leaflet-left"></div>
                <div class="leaflet-bottom leaflet-right">
                  <div class="leaflet-control-attribution leaflet-control">
                    <a
                      href="http://leafletjs.com"
                      title="A JS library for interactive maps"
                      previewlistener="true"
                      >Leaflet</a
                    >
                    | ©
                    <a href="http://osm.org/copyright" previewlistener="true"
                      >OpenStreetMap</a
                    >
                    contributors
                  </div>
                </div>
              </div>
              <div v-if="loading" class="awxjs__loader">
                <svg
                  version="1.1"
                  class="awxjs__filler-loader"
                  width="60"
                  height="60"
                  style="margin-top: -30px; margin-left: -30px"
                ></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RadioCurrent />
    </div>
  </div>
</template>
<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RadioCurrent from "../StationPage/Radiocurrent";

export default {
  components: {
    RadioCurrent,
    // ... other components ...
  },
  name: "LeafletMap",
  data() {
    return {
      map: null,
      loading: true, // Initialize map loading state
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const chiangRaiCoords = [19.91048, 99.840576];
      const map = L.map("map").setView(chiangRaiCoords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
      setTimeout(() => {
        this.mapLoaded = true; // Set map as loaded
      }, 2000);
      // Add any additional Leaflet logic here
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 48em) {
  .css-1xypeq2 {
    flex-basis: 100%;
  }
}
.css-1xypeq2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

@media screen and (min-width: 62em) {
  .css-1nn4z8s {
    border-radius: 0.75em;
  }
}
.css-1nn4z8s {
  border-radius: 0.5rem;
  padding: 0px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 1px 4px 0px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  width: 100%; /* Make sure the container takes full width */
  height: 500px; /* Define a fixed height or use a percentage based on the parent's height */
}

.css-1o3fej {
  height: 100%;
  position: relative;
}

.css-o5rbxo {
  z-index: 0;
  position: relative;
  height: 100%;
}

.css-uwwqev {
  width: 100%;
  height: 100%;
  position: relative; /* Position relative allows you to position the map's children, like zoom buttons, absolutely within it */
  z-index: 1;
}

.css-faoyen {
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
  height: 1.5rem;
  min-width: 2.5rem;
  font-size: 0.625rem;
  padding-left: 12px;
  padding-right: 12px;
  background-color: transparent;
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-right: 0px;
}
</style>
