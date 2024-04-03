<template>
  <div class="Div_Location_Form_All">
    <div class="Div_Location_Form">
      <div class="Header_Location_Form">
        <h2 class="H2_Header_Location">Location</h2>
        <div role="radiogroup" class="Radio_Group_Ad_Co">
          <button
            @click="setCurrentView('Address')"
            type="button"
            :aria-checked="currentView === 'Address'"
            role="radio"
            name="radio-201"
            tabindex="0"
            class="Radio_Botton_Address"
          >
            Address</button
          ><button
            @click="setCurrentView('Coordinate')"
            type="button"
            :aria-checked="currentView === 'Coordinate'"
            role="radio"
            name="radio-201"
            tabindex="-1"
            class="Radio_Botton_Coordinate"
          >
            Coordinate
          </button>
        </div>
      </div>
      <div class="Div-All-Form">
        <div class="Div-Form-Input-Location">
          <div class="Div-Text">
            <p class="Text-P">
              ระบุที่อยู่ของสถานีของคุณด้านล่าง ที่
              สามารถกำหนดพิกัดละติจูด/ลองจิจูดได้โดยอัตโนมัติ
              ตามที่อยู่ที่คุณให้ไว้โดยใช้ "Geocode Address"
            </p>
          </div>
        </div>
        <div class="Div-Form-Input-Location">
          <div class="Div-Input-info-form">
            <div class="Div-update-Map">
              <div v-show="currentView === 'Coordinate'" class="Div_Map">
                <MapBlog @update-coordinates="updateCoordinates" />
              </div>
            </div>
            <p class="text-p-mapblog">
              แพนและ/หรือซูมเพื่อตั้งศูนย์กลางแผนที่ใหม่ พิกัดสถานีของคุณ
              จะได้รับการอัปเดตโดยใช้พิกัดกึ่งกลางปัจจุบันของแผนที่ ข้างบน.
            </p>
            <div class="Div-coordinates-blog">
              <div class="Div-coordinates-latitude" disabled="">
                <label class="Label-Text-name">ละติจูด</label>
                <div class="Div-input-info-blog">
                  <input
                    required=""
                    name="location.latitude"
                    type="number"
                    step="any"
                    class="input-information"
                    value=""
                    disabled=""
                    v-model="latitude"
                  />
                </div>
              </div>
              <div class="Div-coordinates-longtitude" disabled="">
                <label class="Label-Text-name">ลองติจูด</label>
                <div class="Div-input-info-blog">
                  <input
                    required=""
                    name="location.longitude"
                    type="number"
                    step="any"
                    class="input-information"
                    value=""
                    disabled=""
                    v-model="longitude"
                  />
                </div>
              </div>
            </div>
            <div class="sl-precision-container">
              <div class="css-0">
                <label class="Label-Text-name">Precision</label>
                <div role="radiogroup" class="sl-precision-radiogroup">
                  <div class="sl-radio-option">
                    <label class="sl-radio-label"
                      ><input
                        type="radio"
                        name="location.precision"
                        class="sl-radio-input"
                        value="6"
                        checked=""
                      />
                      <div
                        type="radio"
                        aria-hidden="true"
                        class="sl-radio-custom"
                      >
                        <span class="sl-radio-inner"></span>
                      </div>
                      <div class="sl-radio-text">Precise</div></label
                    >
                  </div>
                  <div class="sl-radio-option">
                    <label class="sl-radio-label"
                      ><input
                        type="radio"
                        name="location.precision"
                        class="sl-radio-input"
                        value="3"
                      />
                      <div
                        type="radio"
                        aria-hidden="true"
                        class="sl-radio-custom"
                      >
                        <span class="sl-radio-inner"></span>
                      </div>
                      <div class="sl-radio-text">
                        Block <span class="Text-P">(40.043, -96.327)</span>
                      </div></label
                    >
                  </div>
                  <div class="sl-radio-option">
                    <label class="sl-radio-label"
                      ><input
                        type="radio"
                        name="location.precision"
                        class="sl-radio-input"
                        value="2"
                      />
                      <div
                        type="radio"
                        aria-hidden="true"
                        class="sl-radio-custom"
                      >
                        <span class="sl-radio-inner"></span>
                      </div>
                      <div class="sl-radio-text">
                        Neighborhood
                        <span class="Text-P">(40.04, -96.33)</span>
                      </div></label
                    >
                  </div>
                </div>
                <p class="sl-description">
                  Adjust the precision of the station’s coordinate when
                  displayed publicly on a map or within API results. Less exact
                  precision will result in your station appearing at a more
                  generalized location at a city block or neighborhood level.
                </p>
              </div>
            </div>
            <div class="elevation-section">
              <div class="elevation-control">
                <div class="elevation-input-wrapper">
                  <label class="Label-Text-name">Elevation</label>
                  <div class="elevation-input-container">
                    <input
                      required=""
                      name="location.elevation"
                      type="number"
                      step="any"
                      min="0"
                      class="elevation-input"
                      value="NaN"
                    />
                  </div>
                </div>
                <p class="elevation-units">feet</p>
                <button
                  aria-disabled="false"
                  type="button"
                  class="elevation-button"
                >
                  Lookup
                </button>
              </div>
              <p class="elevation-description">
                Provide the station elevation or perform a lookup to
                automatically determine the elevation based on the current
                coordinates above. A valid latitude/longitude coordinate is
                required above to determine the elevation via the lookup option.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapBlog from "../AdminPage/MapBlogStation";
export default {
  components: { MapBlog },

  name: "StationLocation",

  data() {
    return {
      // ... (other data properties)
      latitude: "", // initial value
      longitude: "", // initial value
    };
  },
  methods: {
    // Handler for the update-coordinates event
    updateCoordinates(lat, lng) {
      this.latitude = lat.toFixed(6); // toFixed(6) for a precision of 6 decimal places
      this.longitude = lng.toFixed(6);
    },
  },
};
</script>

<style scoped>
.Div_Location_Form_All {
  box-sizing: border-box;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%;
}

@media screen and (min-width: 62em) {
  .Div_Location_Form {
    border-radius: 0.75em;
    padding: 32px;
  }
}
.Div_Location_Form {
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 1px 4px 0px;
  margin-bottom: 16px;
  border-radius: 0.5rem;
  padding: 16px;
  width: 100%;
}

.Header_Location_Form {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 16px;
}

@media screen and (min-width: 62em) {
  .H2_Header_Location {
    margin-top: 0px;
  }
}
.H2_Header_Location {
  font-size: 1.875rem;
  line-height: 1;
  font-weight: 700;
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin-bottom: 0px;
  margin-top: 8px;
  margin-right: 32px;
}

.Radio_Group_Ad_Co {
  display: flex;
  background-color: rgb(23, 25, 28);
  padding: 2px;
  border-radius: 9999px;
  margin-top: -8px;
}
.Radio_Botton_Address {
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
  background-color: rgb(23, 25, 28);
  border-color: rgb(255, 255, 255);
  border-style: solid;
  border-width: 2px;
  color: rgb(255, 255, 255);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-right: 0px;
}

.Radio_Botton_Coordinate {
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
  color: rgb(255, 255, 255);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
}

.Div-All-Form {
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
  margin-left: -16px;
}

@media screen and (min-width: 768px) {
  .Div-Form-Input-Location {
    flex-basis: 100%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 100%;
  }
}
.Div-Form-Input-Location {
  box-sizing: border-box;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%;
}

.Text-P {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  color: rgb(153, 153, 153);
}

@media screen and (min-width: 62em) {
  .Div-Input-info-all {
    margin-bottom: 0px;
  }
}
.Div-Input-info-all {
  margin-bottom: 32px;
}

.Div-Input-info-form {
  display: flex;
  flex-direction: column;
}

.Div-input-select {
  position: relative;
  width: 100%;
}

.selection-info {
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1rem;
  padding-right: 2rem;
  height: 2.5rem;
  border-radius: 0px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: inherit;
  background-color: transparent;
  line-height: normal;
  color: inherit;
}

.arrow-selection {
  position: absolute;
  display: inline-flex;
  width: 1.5rem;
  height: 100%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  right: 0.5rem;
  top: 50%;
  pointer-events: none;
  z-index: 2;
  transform: translateY(-50%);
  color: inherit;
}

arrow-selection-svg:not(:root) {
  overflow: hidden;
}
.arrow-selection-svg {
  width: 1.25rem;
  height: 1.25rem;
  color: currentcolor;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  backface-visibility: hidden;
}

.Div-Text {
  margin-bottom: 32px;
}

.Div-Botton-Geo {
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
}

@media screen and (min-width: 768px) {
  .Div-Form-Input-Location {
    flex-basis: 100%;
    -webkit-box-flex: 0;
    flex-grow: 0;
    max-width: 100%;
  }
}
.Div-Form-Input-Location {
  box-sizing: border-box;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%;
}

.Div-Input-info-form {
  display: flex;
  flex-direction: column;
}

.Div-update-Map {
  position: relative;
  height: 300px;
  margin-bottom: 8px;
}

.Div_Map {
  background-color: rgb(113, 122, 132);
  height: 100%;
}

.css-12are65 {
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text-p-mapblog {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px 0px 8px;
  font-weight: 400;
  font-size: 0.75rem;
  color: rgb(153, 153, 153);
}

.Div-coordinates-blog {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 8px;
}

.Div-coordinates-latitude {
  min-width: 100px;
  margin-right: 32px;
}

.Div-coordinates-longtitude {
  min-width: 100px;
}

.Div-input-info-blog {
  display: flex;
  position: relative;
}
.elevation-input-container {
  display: flex;
  position: relative;
}

.input-information {
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 0px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: inherit;
  background-color: transparent;
}

.elevation-input {
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 0px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: inherit;
  background-color: transparent;
}

.sl-precision-container {
  margin-top: 16px;
  margin-bottom: 8px;
}
.Label-Text-name {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  font-size: 0.875rem;
}
.sl-precision-radiogroup {
  padding-top: 8px;
}

.sl-radio-option {
  display: block;
  margin-bottom: 8px;
}

input[type="radio"]:checked + .sl-radio-custom,
input[type="radio"][aria-checked="mixed"] + .sl-radio-custom {
  background-color: rgb(49, 130, 206);
  border-color: rgb(49, 130, 206);
}

.sl-radio-custom {
  user-select: none;
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  border-radius: 9999px;
  border-color: inherit;
  transition: background-color 120ms ease 0s, box-shadow 250ms ease 0s;
  color: rgb(255, 255, 255);
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-shrink: 0;
}

input[type="radio"]:checked + .sl-radio-custom > *,
input[type="radio"][aria-checked="mixed"] + .sl-radio-custom > * {
  opacity: 1;
}

.Text-P {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  color: rgb(153, 153, 153);
}

.sl-radio-label {
  display: inline-flex;
  vertical-align: top;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
}

.sl-radio-input {
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
}

.sl-radio-custom {
  user-select: none;
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  border-radius: 9999px;
  border-color: inherit;
  transition: background-color 120ms ease 0s, box-shadow 250ms ease 0s;
  color: rgb(255, 255, 255);
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-shrink: 0;
}

.sl-radio-inner {
  background-color: currentcolor;
  border-radius: 9999px;
  width: 50%;
  height: 50%;
}

.sl-radio-text {
  margin-left: 8px;
  font-size: 1rem;
  user-select: none;
  opacity: 1;
}

.Text-P {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  color: rgb(153, 153, 153);
}

.sl-description {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 4px 0px;
  font-weight: 400;
  font-size: 0.75rem;
  color: rgb(132, 142, 154);
}

.elevation-control {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 16px;
}

@media screen and (min-width: 62em) {
  .elevation-input-wrapper {
    width: 120px;
  }
}
.elevation-input-wrapper {
  width: 80px;
  margin-right: 16px;
}

@media screen and (min-width: 62em) {
  .elevation-units {
    font-size: 1.125rem;
  }
}
.elevation-units {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px 16px 0px 0px;
  font-weight: 400;
  font-size: 1rem;
}

.Botton-Geo {
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
  background-color: rgb(40, 43, 46);
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 30px;
}

.elevation-button {
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
  background-color: rgb(40, 43, 46);
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 30px;
}

.elevation-description {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 8px 0px 0px;
  font-weight: 400;
  font-size: 0.75rem;
  color: rgb(153, 153, 153);
}
</style>
