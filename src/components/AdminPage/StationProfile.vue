<template>
  <div class="DivStationProfileAll">
    <div class="DivStationProfile">
      <h2 class="H2-Profile">รายละเอียดสถานี</h2>
      <div class="Div-From-input">
        <div class="Div-From-input-Station">
          <div class="Div-From-input-blog">
            <label class="Labelname">ชื่อสถานี</label>
            <div class="DivInput">
              <input
                required
                v-model="stationName"
                class="Inputclass"
                @blur="updateData"
              />
            </div>
            <p v-if="errors.stationName" class="error-message">
              {{ errors.stationName }}
            </p>
          </div>
          <p class="TextP">
            ตัวระบุเฉพาะสำหรับสถานี
            สามารถประกอบด้วยตัวอักษรหรือตัวเลขเท่านั้นโดยไม่ต้องเว้นวรรค
          </p>
        </div>
        <div class="Div-From-input-blog-all" v-if="isEditMode">
          <div class="Div-From-input-blog">
            <div class="Div-Text">
              <label class="Labelname">Hardware</label>
              <div class="DivInput">
                <input
                  v-model="hardwareID"
                  class="Inputclass"
                  :placeholder="isHardwareLinked ? '' : 'กรอกรหัสฮาร์ดแวร์ไอดี'"
                  :disabled="isHardwareLinked"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            :class="{
              'linked-style': isHardwareLinked,
              'unlinked-style': !isHardwareLinked,
            }"
            @click="toggleHardwareLink"
          >
            {{ isHardwareLinked ? "ยกเลิกการเชื่อมต่อ" : "เชื่อมโยงเซนเซอร์" }}
          </button>
          <TogglePopup ref="togglePopup" @continue="handleContinue" />
          <ApiToggle
            v-if="showApiPopup"
            @close-api-popup="showApiPopup = false"
          />
        </div>
        <div class="Div-riverprofile-blog">
          <div class="Div-riverprofile-waterline" disabled="">
            <label class="Label-Text-name">ระดับตลิ่ง</label>
            <div class="Div-input-info-blog">
              <input
                v-model="waterline"
                class="input-information"
                type="number"
                @blur="updateData"
              />
            </div>
            <p v-if="errors.waterline" class="error-message">
              {{ errors.waterline }}
            </p>
          </div>
          <div class="Div-riverprofile-Distancesensor" disabled="">
            <label class="Label-Text-name">ระยะห่างเซนเซอร์</label>
            <div class="Div-input-info-blog">
              <input
                v-model="sensorDistance"
                class="input-information"
                type="number"
                @blur="updateData"
              />
            </div>
            <p v-if="errors.sensorDistance" class="error-message">
              {{ errors.sensorDistance }}
            </p>
          </div>
        </div>
        <!-- <div class="Div-From-input-Station">
          <div class="Div-From-input-blog">
            <div class="css-0">
              <label class="Labelname">ซอฟแวร์</label>
              <div class="DivInput">
                <input
                  v-model="software"
                  class="Inputclass"
                  @blur="updateData"
                />
              </div>
            </div>
          </div>
        </div> -->
        <div class="Div-From-input-Station">
          <div class="Div-From-input-blog">
            <div class="css-0">
              <label class="Labelname">เกณฑ์ระดับน้ำ</label>
              <div class="DivInput">
                <button
                  type="button"
                  class="ButtonClassThreshold"
                  @click="showThresholdModal"
                >
                  ตั้งค่าเกณฑ์ระดับน้ำ
                </button>
              </div>
            </div>
          </div>
          <!-- ThresholdFormModal Component -->

          <!-- Existing markup -->
          <ThresholdFormModal
            v-if="isThresholdModalVisible"
            :initialThresholds="thresholds"
            @save="SaveThresholds"
            @close="closeThresholdModal"
            @blur="updateData"
          />
        </div>
        <div class="Div-From-input"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TogglePopup from "../AdminPage/togglePopup.vue";
import ApiToggle from "../AdminPage/ApiPopup.vue";
import axios from "axios";
import Swal from "sweetalert2";
import ThresholdFormModal from "./ThresholdFormModal.vue"; // Import the new modal

export default {
  components: {
    TogglePopup,
    ApiToggle,
    ThresholdFormModal,
  },
  props: {
    existingData: {
      type: Object,
      default: () => ({
        stationName: "",
        hardwareID: "",
        waterline: "",
        sensorDistance: "",
      }),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    isEditMode: {
    type: Boolean,
    default: false,
  },
  },
  data() {
    return {
      stationName: this.existingData.stationName || "",
      active: !!this.existingData.hardwareID,
      waterLevel: this.existingData.waterLevel || 0,
      sensorDistance: this.existingData.sensorDistance || "",
      waterline: this.existingData.waterline || "",
      referenceArea: this.existingData.referenceArea || "",
      thresholds: this.existingData.thresholds || [],
      showApiPopup: false,
      isHardwareLinked: !!this.existingData.hardwareID,
      isThresholdModalVisible: false,
      hardwareID: this.existingData.hardwareID || "",
      // Data property to control the visibility of the modal
    };
  },
  watch: {
    existingData: {
      handler(newData) {
        console.log("Watcher - New existing data:", newData);
        this.stationName = newData.stationName;
        this.hardwareID = newData.hardwareID;
        this.software = newData.software;
        this.active = newData.active;
        this.waterLevel = newData.waterLevel;
        this.referenceArea = newData.referenceArea;
        this.thresholds = newData.thresholds;
        this.sensorData = newData;
        this.sensorDistance = newData.sensorDistance;
        this.waterline = newData.waterline;
      },
      deep: true,
    },
  },
  mounted() {
    // Assuming you have a route parameter named `stationId`
    this.stationId = this.$route.params.stationId;
  },
  methods: {
    toggleHardwareLink() {
      if (this.isHardwareLinked) {
        this.unlinkHardware();
      } else {
        this.linkHardware();
      }
    },
    linkHardware() {
      if (!this.hardwareID) {
        Swal.fire({
          icon: "error",
          title: "อุ๊ปส์...",
          text: "กรุณากรอกคีย์ฮาร์ดแวร์เพื่อเชื่อมต่อ!",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#25adfc",
        });
        return;
      }
      this.isHardwareLinked = true;
      this.active = true;
      this.connectHardware(this.hardwareID);
      this.updateData();
    },

    connectHardware(hardwareID) {
      console.log(
        `Attempting to link hardware with ID: ${hardwareID} to station with ID: ${this.stationId}`
      );
      Swal.fire({
        title: "กำลังเชื่อมกับเซนเซอร์...",
        html: "โปรดรอสักครู่...",
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: () => !Swal.isLoading(),
        showConfirmButton: false,
      });
      axios
        .post("http://localhost:3001/api/hardware/link-and-fetch", {
          hardwareID: hardwareID,
          stationId: this.stationId,
        })
        .then((response) => {
          // Stop the loading SweetAlert and show a success message
          Swal.fire({
            icon: "success",
            title: "เชื่อมต่อสำเร็จ!",
            text: "เซนเซอร์ได้ถูกเชื่อมต่อเรียบร้อยแล้ว",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#25adfc",
          });
          console.log(
            "Hardware linked successfully, server response:",
            response.data
          );
          this.isHardwareLinked = true;
        })
        .catch((error) => {
          console.error("API Error Response:", error.response);
          // Now display the message from the backend if it's available
          const errorMessage =
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "An unknown error occurred.";
          // If there is an error, stop the loading SweetAlert and show an error message
          Swal.fire({
            icon: "error",
            title: "ล้มเหลวในการเชื่อมโยงเซ็นเซอร์",
            text: errorMessage,
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#25adfc",
          });
          console.error("Failed to link hardware:", error);
          this.isHardwareLinked = false; // Reset the state if linking fails
        });
    },
    unlinkHardware() {
      if (!this.hardwareID) {
    Swal.fire({
      icon: "error",
      title: "Hardware ID Required",
      text: "กรุณากรอก Hardware ID เพื่อยกเลิกการเชื่อมต่อ",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#25adfc",
    });
    return;  // ถ้าค่า hardwareID ยังไม่ได้ถูกกำหนด ให้ return ออกก่อน
  }
  console.log("Unlinking Hardware ID: ", this.hardwareID);
  Swal.fire({
    title: "Unlinking from sensor...",
    html: "Please wait a moment...",
    timerProgressBar: true,
    willOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: () => !Swal.isLoading(),
    showConfirmButton: false,
  });
  axios.post("http://localhost:3001/api/hardware/unlink", {
    hardwareId: this.hardwareID,
  })
  .then((response) => {
    Swal.fire({
      icon: "success",
      title: "Unlinked Successfully!",
      text: "The sensor has been successfully unlinked.",
      confirmButtonText: "OK",
      confirmButtonColor: "#25adfc",
    });
    console.log("Hardware unlinked successfully, server response:", response.data);
    this.isHardwareLinked = false;
    this.active = false;
    this.hardwareID = '';
    this.updateData();
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Failed to Unlink Sensor",
      text: error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "There was a problem unlinking the sensor.",
      confirmButtonText: "OK",
      confirmButtonColor: "#25adfc",
    });
    console.error("Failed to unlink hardware:", error);
  });
},

    updateData() {
      console.log("Updating data with hardwareID:", this.hardwareID);
      this.$emit("update-profile", {
        ...this.existingData,
        stationName: this.stationName,
        hardwareID: this.hardwareID,
        software: this.software,
        active: this.active,
        waterLevel: this.waterLevel,
        referenceArea: this.referenceArea,
        thresholds: this.thresholds,
        sensorDistance: this.sensorDistance,
        waterline: this.waterline,
      });
    },
    showThresholdModal() {
      this.isThresholdModalVisible = true; // Trigger to show modal
    },

    removeThreshold(index) {
      this.thresholds.splice(index, 1);
    },
    SaveThresholds(thresholds) {
      // Store thresholds in StationProfile's data
      this.thresholds = thresholds;
      this.updateData();
      this.closeThresholdModal();
    },
    closeThresholdModal() {
      this.isThresholdModalVisible = false; // Method to close the modal
    },
    handleContinue() {
      // Set showApiPopup to true to show the ApiToggle component
      this.showApiPopup = true;
      this.$refs.togglePopup.close();
    },
  },
};
</script>

<style scoped>
.DivStationProfileAll {
  box-sizing: border-box;
  flex-direction: row;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%; /* Center the form in the page */
}

@media screen and (min-width: 62em) {
  .DivStationProfile {
    border-radius: 0.75em;
    padding: 32px;
  }
}

.DivStationProfile {
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

@media screen and (min-width: 62em) {
  .H2-Profile {
    margin-top: 0px;
    text-align: left;
  }
}
.H2-Profile {
  font-size: 1.875rem;
  line-height: 1;
  font-weight: 700;
  font-family: "Prompt", sans-serif;
  margin-bottom: 16px;
  margin-top: 8px;
  text-align: left;
}
.Div-From-input {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.Div-From-input-Station {
  margin-bottom: 32px;
}

.Labelname {
  font-family: "Prompt", sans-serif;
  text-align: left;
  margin: 0px;
  font-weight: 700;
  font-size: 1rem;
}
.DivInput {
  display: flex;
  position: relative;
  justify-content: flex-start;
}
.Inputclass {
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

/* Changes the bottom border color on input focus */
.Inputclass:focus {
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
.TextP {
  font-family: "Prompt", sans-serif;
  margin: 4px 0px;
  font-weight: 400;
  font-size: 0.75rem;
  color: rgb(132, 142, 154);
}

.Div-From-input-blog-all {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 32px;
}

.Div-From-input-blog {
  -webkit-box-flex: 1;
  flex-grow: 1;
  text-align: left;
}
.ButtonClassThreshold:hover {
  background-color: #0f9cb7;
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
.ButtonClassThreshold {
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

.linked-style:hover {
  background-color: #ff4949;
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.linked-style {
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
  background-color: #ff4949;
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: "Prompt", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: add shadow for depth */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Optional: add text shadow for better contrast */
}
.unlinked-style:hover {
  background-color: #0f9cb7;
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.unlinked-style {
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
.error-message {
  color: red;
}

.remove-button {
  margin-right: 10px;
  background: none;
  border: none;
  color: #ff4136;
  font-weight: bold;
  cursor: pointer;
}

.Div-riverprofile-blog {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 8px;
}

.Div-riverprofile-waterline {
  min-width: 100px;
  margin-right: 32px;
}

.Div-riverprofile-Distancesensor {
  min-width: 100px;
}

.Label-Text-name {
  font-family: "Prompt", sans-serif;
  margin: 0px;
  font-weight: 700;
  font-size: 1rem;
}

.Div-input-info-blog {
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
.Div-riverprofile-Distancesensor {
  min-width: 100px;
}
</style>
