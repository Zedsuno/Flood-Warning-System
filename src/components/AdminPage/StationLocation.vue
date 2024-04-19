<template>
  <div class="Div_Location_Form_All">
    <div class="Div_Location_Form">
      <div class="Header_Location_Form">
        <h2 class="H2_Header_Location">สถานที่ตั้ง</h2>
        <!-- <div role="radiogroup" class="Radio_Group_Ad_Co">
          <button
            @click="setCurrentView('Address')"
            type="button"
            :aria-checked="currentView === 'Address'"
            role="radio"
            name="radio-201"
            tabindex="0"
            class="Radio_Botton_Address"
          >
            ที่อยู่</button
          ><button
            @click="setCurrentView('Coordinate')"
            type="button"
            :aria-checked="currentView === 'Coordinate'"
            role="radio"
            name="radio-201"
            tabindex="-1"
            class="Radio_Botton_Coordinate"
          >
            พิกัด
          </button>
        </div> -->
      </div>
      <div class="Div-All-Form">
        <div class="Div-Form-Input-Location">
          <div class="Div-Input-info-form">
            <div class="css-uyzs9k">
              <div class="Div_Map_location">
                <MapEdit
                  v-if="
                    isEditMode &&
                    existingData &&
                    existingData.latitude != null &&
                    existingData.longitude != null
                  "
                  :key="'map-edit'"
                  :latitude="existingData.latitude"
                  :longitude="existingData.longitude"
                  @update-coordinates="updateMapCenter"
                />
                <MapBlog
                  v-else
                  :key="'map-blog'"
                  @update-coordinates="updateMapCenter"
                />
              </div>
            </div>
            <p class="text-p-mapblog">
              แพนและ/หรือซูมเพื่อตั้งศูนย์กลางแผนที่ใหม่ พิกัดสถานีของคุณ
              จะได้รับการอัปเดตโดยใช้พิกัดกึ่งกลางปัจจุบันของแผนที่ ข้างบน.

              <template v-if="isEditMode">
                การเปลี่ยนตำแหน่งจะรีเซ็ตสถานะสถานีของคุณ
                ซึ่งหมายความว่าอาจใช้เวลาถึงห้าวันจึงจะพร้อมให้บริการอีกครั้งบน
                หลังจากส่งข้อมูลที่เชื่อถือได้ที่เกี่ยวข้องกับตำแหน่งใหม่นี้
                สถานีของคุณจะแสดงอีกครั้ง
              </template>
            </p>
            <div class="Div-coordinates-blog">
              <div class="Div-coordinates-latitude" disabled="">
                <label class="Label-Text-name">ละติจูด</label>
                <div class="Div-input-info-blog">
                  <input
                    v-model="latitude"
                    class="input-information"
                    type="number"
                    @blur="updateData"
                  />
                </div>
              </div>
              <div class="Div-coordinates-longtitude" disabled="">
                <label class="Label-Text-name">ลองติจูด</label>
                <div class="Div-input-info-blog">
                  <input
                    v-model="longitude"
                    class="input-information"
                    type="number"
                    @blur="updateData"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="sl-precision-container">
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
                  ปรับความแม่นยำของพิกัดของสถานีเมื่อใด
                  แสดงต่อสาธารณะบนแผนที่หรือภายในผลลัพธ์ API แม่นยำน้อยลง
                  ความแม่นยำจะส่งผลให้สถานีของคุณปรากฏมากขึ้น
                  ตำแหน่งทั่วไปในระดับบล็อกเมืองหรือพื้นที่ใกล้เคียง
                </p>
              </div>
            </div> -->
            <!-- <div class="elevation-section">
              <div class="elevation-control">
                <div class="elevation-input-wrapper">
                  <label class="Label-Text-name">ระดับความสูง</label>
                  <div class="elevation-input-container">
                    <input
                      required=""
                      type="number"
                      step="any"
                      min="0"
                      class="elevation-input"
                      v-model="elevation"
                      @blur="updateData"
                    />
                  </div>
                </div>
                <p class="elevation-units">feet</p>
                <button
                  @click="lookupElevation"
                  aria-disabled="false"
                  type="button"
                  class="elevation-button"
                >
                  Lookup
                </button>
              </div>
              <p class="elevation-description">
                ระบุระดับความสูงของสถานีหรือดำเนินการค้นหา
                กำหนดระดับความสูงโดยอัตโนมัติ พิกัดด้านบน.
                พิกัดละติจูด/ลองจิจูดที่ถูกต้อง
                จำเป็นข้างต้นเพื่อกำหนดระดับความสูง
              </p>
            </div> -->
          </div>
        </div>
        <div v-show="currentView === 'Address'" class="Div-Form-Input-Location">
          <div class="Div-Text">
            <p class="Text-P">
              ระบุที่อยู่ของสถานีของคุณด้านล่าง ที่
              สามารถกำหนดพิกัดละติจูด/ลองจิจูดได้โดยอัตโนมัติ
              ตามที่อยู่ที่คุณให้ไว้โดยใช้ "Geocode Address"
            </p>
          </div>
          <div class="Div-Botton-Geo">
            <button @click="reverseGeocode" type="button" class="Botton-Geo">
              Geocode Address
            </button>
          </div>
          <div class="Div-Input-info-all">
            <div class="Div-Input-info-form">
              <div value="river" class="Div-Text">
                <label class="Label-Text-name">แหล่งน้ำ</label>
                <div class="Div-input-select">
                  <select
                    v-model="river"
                    class="selection-info"
                    @change="updateData"
                  >
                    <option value="">เลือกแหล่งน้ำ</option>
                    <option value="แม่น้ำโขง">แม่น้ำโขง</option>
                    <option value="แม่น้ำกก">แม่น้ำกก</option>
                    <option value="แม่น้ำอิง">แม่น้ำอิง</option>
                    <option value="แม่น้ำคำ">แม่น้ำคำ</option>
                    <option value="แม่น้ำลาว">แม่น้ำลาว</option>
                    <option value="แม่น้ำสาย">แม่น้ำสาย</option>
                    <option value="แม่น้ำรวก">แม่น้ำรวก</option>
                    <option value="แม่น้ำจัน">แม่น้ำจัน</option>
                  </select>
                  <div class="arrow-selection">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      role="presentation"
                      aria-hidden="true"
                      class="arrow-selection-svg"
                    >
                      <path
                        fill="currentColor"
                        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="Div-Text">
                <label class="Label-Text-name">รายละเอียดที่อยู่สถานี</label>
                <div class="Div-input-info-blog">
                  <input
                    v-model="address"
                    class="input-information"
                    @blur="updateData"
                  />
                </div>
              </div>
              <div value="" class="Div-Text">
                <label class="Label-Text-name">อำเภอ</label>
                <div class="Div-input-select">
                  <select
                    v-model="state"
                    class="selection-info"
                    @change="updateData"
                  >
                    <option value="">เลือกอำเภอ</option>
                    <option value="อำเภอเมือง">อำเภอเมือง</option>
                    <option value="อำเภอเชียงของ">อำเภอเชียงของ</option>
                    <option value="อำเภอเทิง">อำเภอเทิง</option>
                    <option value="อำเภอพาน">อำเภอพาน</option>
                    <option value="อำเภอแม่จัน">อำเภอแม่จัน</option>
                    <option value="อำเภอเชียงแสน">อำเภอเชียงแสน</option>
                    <option value="อำเภอแม่สาย">อำเภอแม่สาย</option>
                    <option value="อำเภอแม่สรวย">อำเภอแม่สรวย</option>
                    <option value="อำเภอเวียงป่าเป้า">อำเภอเวียงป่าเป้า</option>
                    <option value="อำเภอป่าแดด">อำเภอป่าแดด</option>
                    <option value="อำเภอเวียงชัย">อำเภอเวียงชัย</option>
                    <option value="อำเภอพญาเม็งราย">อำเภอพญาเม็งราย</option>
                    <option value="กิ่งอำเภอเวียงแก่น">
                      กิ่งอำเภอเวียงแก่น
                    </option>
                    <option value="กิ่งอำเภอแม่ฟ้าหลวง">
                      กิ่งอำเภอแม่ฟ้าหลวง
                    </option>
                    <option value="กิ่งอำเภอขุนตาล">กิ่งอำเภอขุนตาล</option>
                    <option value="กิ่งอำเภอแม่ลาว">กิ่งอำเภอแม่ลาว</option>
                  </select>
                  <div class="arrow-selection">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      role="presentation"
                      aria-hidden="true"
                      class="arrow-selection-svg"
                    >
                      <path
                        fill="currentColor"
                        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="css-0">
                <label class="Label-Text-name">รหัสไปรษณีย์</label>
                <div class="Div-input-info-blog">
                  <input
                    v-model="postalCode"
                    class="input-information"
                    @blur="updateData"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-show="currentView === 'Coordinate'"
          class="Div-Form-Input-Location"
        >
          <Coordinate />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapBlog from "../AdminPage/MapBlogStation";
import MapEdit from "../AdminPage/MapEdit";
import axios from "axios";

export default {
  // Register the child component(s) used within this component
  components: {
    MapBlog,
    MapEdit,
  },
  // Define the props that are expected to be passed to this component from its parent
  props: {
    existingData: {
      type: Object,
      default: () => ({
        // Default object structure if the prop is not provided
        latitude: "",
        longitude: "",
        address: "",
        river: "",
        state: "",
        postalCode: "",
        precision: "",
        elevation: "",
      }),
    },

    isEditMode: {
      type: Boolean,
      default: false, // Default mode is not edit mode
    },
  },
  // Component's internal data properties
  data() {
    return {
      // Initialize the data properties, either with existing data (if available) or defaults
      address: this.existingData ? this.existingData.address : "",
      river: this.existingData ? this.existingData.river : "",
      state: this.existingData ? this.existingData.state : "",
      postalCode: this.existingData ? this.existingData.postalCode : "",
      latitude: this.existingData ? this.existingData.latitude : "",
      longitude: this.existingData ? this.existingData.longitude : "",
      elevation: this.existingData ? this.existingData.elevation : "",
      currentView: "Address", // Default to 'Address' view

      // Other properties are initialized in a similar fashion...
    };
  },
  // Watchers for reactive properties
  watch: {
    // When 'existingData' changes, this function updates the component's data properties
    existingData: {
      handler(newData) {
        // newData is the new value of existingData
        this.address = newData.address;
        this.river = newData.river;
        this.state = newData.state;
        this.postalCode = newData.postalCode;
        this.latitude = newData.latitude;
        this.longitude = newData.longitude;
        this.elevation = newData.elevation;

        // Other properties are updated in a similar fashion...
      },
      deep: true,
      immediate: true, // Watch for nested property changes within the object
    },
    isEditMode(newVal) {
      console.log("Edit mode changed to:", newVal);
    },
  },
  methods: {
    // Method called to update latitude and longitude after the map has been moved
    updateMapCenter(lat, lng) {
      console.log(`updateCoordinates called with lat: ${lat}, lng: ${lng}`);
      this.latitude = lat.toFixed(6); // Set precision to 6 decimal places for latitude
      this.longitude = lng.toFixed(6); // Set precision to 6 decimal places for longitude
      this.updateData(); // Cal l updateData to emit an event with the updated data
    },

    // Method called to emit updated location data to the parent component
    updateData() {
      this.$emit("update-location", {
        address: this.address,
        river: this.river,
        state: this.state,
        postalCode: this.postalCode,
        latitude: this.latitude,
        longitude: this.longitude,
        precision: this.precision,
        elevation: this.elevation,
      });
    },
    // Method called to fetch elevation data from an external API
    async lookupElevation() {
      // Check if latitude and longitude are not null
      if (this.latitude && this.longitude) {
        // Construct the API endpoint using the provided latitude and longitude
        const apiEndpoint = `https://elevation-api.service.com/elevation?lat=${this.latitude}&lng=${this.longitude}`;
        try {
          const response = await axios.get(apiEndpoint);
          // Set the elevation data with the value returned from the API
          this.elevation = response.data.elevation;
          this.updateData(); // Emit event to update the parent component with the new data
        } catch (error) {
          // Error handling
        }
      } else {
        // Error handling for when latitude and longitude are not provided
      }
    },
    // Method called to update the view (e.g., between 'Address' and 'Coordinate' view modes)
    setCurrentView(view) {
      this.currentView = view; // Update the currentView data property with the new view
    },
    mounted() {
      console.log(this.existingData); // Check the entire structure
      console.log(this.isEditMode); // Confirm mode
    },

    async reverseGeocode() {
  // Ensure that latitude and longitude are numbers and not empty strings
  const lat = parseFloat(this.latitude);
  const lon = parseFloat(this.longitude);

  if (!lat || !lon) {
    console.error("Invalid latitude or longitude for reverse geocoding.");
    return;
  }

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat: lat,
        lon: lon,
        format: "json"
      }
    });

    // Check if response has address details and update the relevant fields
    if (response.data.address) {
      this.address = `${response.data.address.amenity || ''},${response.data.address.road || ''}, `;
      this.state = `${response.data.address.town || ''}`;
      this.postalCode = response.data.address.postcode || '';
      
      
      
      // Emit an event or call a method to update the parent data
      // this.$emit('update-address-data', { address: this.address, state: this.state, postalCode: this.postalCode });
    }
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
  }
},
    // ... (other methods)
  },
};
</script>

<style scoped>
.Div_Location_Form_All {
  box-sizing: border-box;
  flex-direction: row;
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
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid #e7eaf3; /* Subtle border like login card */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); /* Shadow like login card */
  border-radius: 10px; /* Rounded corners like login card */
  margin-bottom: 16px;
  padding: 16px;
  transition: transform 0.1s ease-in-out;
  position: relative;
  display: flex; /* Flex layout */
  flex-direction: column;
  
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
  font-family: "Prompt", sans-serif;
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

.Radio_Botton_Address,
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
  height: 2rem;
  min-width: 2.5rem;
  font-size: 1rem;
  padding-left: 12px;
  padding-right: 12px;
  background-color: transparent;
  border: 2px solid transparent;
  color: rgb(255, 255, 255);
  font-family: "Prompt", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
}

.Radio_Botton_Address[aria-checked="true"],
.Radio_Botton_Coordinate[aria-checked="true"] {
  background-color: #11abcd; /* Active button background color */
  color: #ffffff; /* Active button text color */
  border-color: #11abcd; /* Active button border color */
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
  font-family: "Prompt", sans-serif;
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
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1rem;
  height: 2.5rem;
  background-color: transparent;
  border-radius: 0px;
  border: none; /* Removes the border */
  border-bottom: 2px solid #aaa; /* Default color for the bottom border */
}
.selection-info:focus {
  border-bottom: 2px solid #11abcd; /* Change #00f to the color you want */
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

.css-uyzs9k {
  position: relative;
  height: 300px;
  margin-bottom: 8px;
}

.Div_Map_location {
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
  font-family: "Prompt", sans-serif;
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
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1rem;
  height: 2.5rem;
  background-color: transparent;
  border-radius: 0px;
  border: none; /* Removes the border */
  border-bottom: 2px solid #aaa; /* Default color for the bottom border */
}
.input-information:focus {
  border-bottom: 2px solid #11abcd; /* Change #00f to the color you want */
}
.elevation-input {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.2s ease 0s;
  outline: none;
  appearance: none;
  font-size: 1rem;
  height: 2.5rem;
  background-color: transparent;
  border-radius: 0px;
  border: none; /* Removes the border */
  border-bottom: 2px solid #aaa; /* Default color for the bottom border */
}
.elevation-input:focus {
  border-bottom: 2px solid #11abcd; /* Change #00f to the color you want */
}
.sl-precision-container {
  margin-top: 16px;
  margin-bottom: 8px;
  margin-left: 0; /* Remove any margin on the left */
  padding-left: 0; /* Remove any padding on the left */
}
.Label-Text-name {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 700;
  font-size: 1rem;
}
.sl-precision-radiogroup {
  padding-top: 8px;
  padding-left: 0;
}

.sl-radio-option {
  display: block;
  margin-bottom: 8px;
  margin-left: 0;
  padding-left: 0;
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
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  color: rgb(153, 153, 153);
}

.sl-radio-label {
  display: flex;
  align-items: center;
  margin-left: 50px;
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
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 400;
  font-size: 0.875rem;
  color: rgb(153, 153, 153);
}

.sl-description {
  font-family: "Prompt", sans-serif;
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
  font-family: "Prompt", sans-serif;
  margin: 0px 16px 0px 0px;
  font-weight: 400;
  font-size: 1rem;
}
.Botton-Geo:hover{
  background-color: #0f9cb7;
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
.Botton-Geo {
  border-radius: 9999px;
  font-weight: bold; /* Make the font bolder */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 2rem; /* Increased height for a larger button */
  min-width: 3rem; /* Increased minimum width */
  font-size: 0.75rem; /* Increased font size for readability */
  padding: 0.75rem 1rem; /* Increased padding for a larger button */
  background-image: linear-gradient(to right, #11abcd, #25adfc); 
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: "Prompt", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: add shadow for depth */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Optional: add text shadow for better contrast */
}

.elevation-button {
  border-radius: 9999px;
  font-weight: bold; /* Make the font bolder */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 2rem; /* Increased height for a larger button */
  min-width: 3rem; /* Increased minimum width */
  font-size: 0.75rem; /* Increased font size for readability */
  padding: 0.75rem 1rem; /* Increased padding for a larger button */
  background-image: linear-gradient(to right, #11abcd, #25adfc); 
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: "Prompt", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: add shadow for depth */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Optional: add text shadow for better contrast */
}

.elevation-description {
  font-family: "Prompt", sans-serif;
  margin: 8px 0px 0px;
  font-weight: 400;
  font-size: 0.75rem;
  color: rgb(153, 153, 153);
}
</style>
