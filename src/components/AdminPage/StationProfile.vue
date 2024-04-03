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
                v-model="stationId"
                class="Inputclass"
                @blur="updateData"
              />
            </div>
          </div>
          <p class="TextP">
            ตัวระบุเฉพาะสำหรับสถานี
            สามารถประกอบด้วยตัวอักษรหรือตัวเลขเท่านั้นโดยไม่ต้องเว้นวรรค
          </p>
        </div>
        <div class="Div-From-input-blog-all">
          <div class="Div-From-input-blog">
            <div class="css-0">
              <label class="Labelname">ฮาร์ดแวร์</label>
              <div class="DivInput">
                <input
                  v-model="hardware"
                  class="Inputclass"
                  @blur="updateData"
                />
              </div>
            </div>
          </div>
          <button type="button" class="Botton-link-hardware" @click="openPopup">
            เชื่อมโยงเซนเซอร์
          </button>
          <TogglePopup ref="togglePopup" />
        </div>
        <div class="Div-From-input-Station">
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
        </div>
        <div class="Div-From-input-Station">
          <div class="Div-From-input-blog">
            <div class="css-0">
              <label class="Labelname">เกณฑ์ระดับน้ำ</label>
              <div class="DivInput">
                <input
                  v-model="waterLevelThreshold"
                  class="Inputclass"
                  @blur="updateData"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="Div-From-input"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TogglePopup from "../AdminPage/togglePopup.vue";

export default {
  components: {
    TogglePopup,
  },
  props: {
    existingData: {
      type: Object,
      default: () => ({
        stationId: '',
        hardware: '',
        software: '',
      }),
    },
  },
  data() {
    return {
      stationId: this.existingData.stationId,
      hardware: this.existingData.hardware,
      software: this.existingData.software,
      active: this.existingData.active || false,
      waterLevel: this.existingData.waterLevel || 0,
      referenceArea: this.existingData.referenceArea || '',
      waterLevelThreshold: this.existingData.waterLevelThreshold,
    };
  },
  watch: {
    existingData: {
      handler(newData) {
        this.stationId = newData.stationId;
        this.hardware = newData.hardware;
        this.software = newData.software;
        this.active = newData.active;
        this.waterLevel = newData.waterLevel;
        this.referenceArea = newData.referenceArea;
        this.waterLevelThreshold = newData.waterLevelThreshold;
      },
      deep: true,
    },
  },
  methods: {
    openPopup() {
      this.$refs.togglePopup.open();
    },
    updateData() {
      this.$emit('update-profile', {
        stationId: this.stationId,
        hardware: this.hardware,
        software: this.software,
        active: this.active,
        waterLevel: this.waterLevel,
        referenceArea: this.referenceArea,
        waterLevelThreshold: this.waterLevelThreshold,
      });
    },
  },
};
</script>

<style scoped>
.DivStationProfileAll {
  box-sizing: border-box;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%;
}

@media screen and (min-width: 62em) {
  .DivStationProfile {
    border-radius: 0.75em;
    padding: 32px;
  }
}

.DivStationProfile {
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 1px 4px 0px;
  margin-bottom: 16px;
  border-radius: 0.5rem;
  padding: 16px;
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
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: left;
  margin: 0px;
  font-weight: 700;
  font-size: 0.875rem;
}
.DivInput {
  display: flex;
  position: relative;
  justify-content: flex-start;
}
.Inputclass {
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

.TextP {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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

.Botton-link-hardware {
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
}

.Labelname {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  font-size: 0.875rem;
}

.DivInput {
  display: flex;
  position: relative;
}

.Inputclass {
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

.Div-From-input-Station {
  margin-bottom: 32px;
}

.Labelname {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0px;
  font-weight: 700;
  font-size: 0.875rem;
}

.DivInput {
  display: flex;
  position: relative;
}

.Inputclass {
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

.Div-From-input {
  display: flex;
  flex-direction: column;
}
</style>
