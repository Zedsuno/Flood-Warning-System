<template>
  <div class="Div-Add-Station-All">
    <div class="Div-Add-Station">
      <div class="Div-Header-Text">
        <div class="Blog-Text-Add-Header">
          <div class="Text-Header-Add">
            <div class="css-0">
              <h3 class="Station-h3-Text">Station</h3>
              <h1 class="Add-Station-h1-Text">Add a station</h1>
            </div>
          </div>
        </div>
        <div class="botton-Save-All">
          <div class="Botton-Save">
            <button
              aria-disabled="false"
              type="button"
              class="Botton-Save-Text"
            >
              Save Station
            </button>
          </div>
        </div>
      </div>
    
    <div class="Space-Btw"></div>
    <form method="get" data-="[object object]" class="css-0">
      <div class="Div-Input-Add-Station">
        <StationProfile />
        <StationLocation/>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import StationProfile from "../AdminPage/StationProfile.vue";
import StationLocation from "./StationLocation.vue";
export default {
  components: {
    StationProfile,StationLocation,

    // Include other components here
  },

  data() {
    return {
      station: {
        name: "",
        location: "",
      },
    };
  },
  methods: {
    addStation() {
      // Add your logic to save the station data
      console.log("Station added:", this.station);
      // Reset the form
      this.station.name = "";
      this.station.location = "";
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
</style>
