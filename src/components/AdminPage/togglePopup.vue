<template>
  <div class="toggle-popup__container" v-if="isVisible">
    <div class="toggle-popup__overlay" @click="close"></div>
    <div class="toggle-popup__content">
      <div class="toggle-popup__box">
        <h2 class="toggle-popup__title">เลือกผู้ผลิดเซนเซอร์</h2>
        <p class="toggle-popup__description">
          เพื่อเชื่อมโยงสถานีของคุณโดยอัตโนมัติและส่งข้อมูลไปที่
          ระบบเตือนภัยน้ำของเรา เลือกหนึ่งในผู้ผลิตที่รองรับด้านล่าง
          หากผู้ผลิตของคุณไม่อยู่ในรายการ ให้ปิดกล่องโต้ตอบนี้แล้วพิมพ์
          ในผู้ให้บริการฮาร์ดแวร์ของคุณ
        </p>
        <div class="toggle-popup__manufacturer-list">
          <div
            class="toggle-popup__manufacturer-item"
            @click="selectManufacturer('OMEGA')"
          >
            <p class="toggle-popup__manufacturer-name">OMEGA</p>
          </div>
          <!-- Add more manufacturers here -->
        </div>
        <div class="toggle-popup__buttons">
          <button class="toggle-popup__button--cancel" @click="close">
            Cancel
          </button>
          <button
            class="toggle-popup__button--continue"
            :disabled="!selectedManufacturer"
            @click="continueToApiSetup"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      selectedManufacturer: null,
    };
  },
  methods: {
    close() {
      this.isVisible = false;
    },
    open() {
      this.isVisible = true;
    },
    selectManufacturer(manufacturer) {
      this.selectedManufacturer = manufacturer;
      // Handle the selection
    },
    continueToApiSetup() {
      if (this.selectedManufacturer) {
        // Emit an event to the parent component to change the view
        this.$emit('continue');
      }
    },
  },
};
</script>

<style scoped>
.toggle-popup__container {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-popup__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.toggle-popup__content {
  z-index: 10;
}

.toggle-popup__box {
  background-color: #fff;
  color: #333;
  padding: 40px;
  border-radius: 0.75em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 500px;
}

.toggle-popup__title {
  font-family: 'Prompt', sans-serif;
  font-weight: 700;
  font-size: 2rem;
}

.toggle-popup__description {
  font-family: 'Prompt', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 32px;
}

.toggle-popup__manufacturer-list {
  margin-top: 16px;
}

.toggle-popup__manufacturer-item {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 0.25em;
  height: 100px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 8px;
  padding: 16px;
}

.toggle-popup__manufacturer-name {
  font-family: 'Prompt', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: #718096;
  text-align: center;
}

.toggle-popup__buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 40px;
}

.toggle-popup__button--cancel,
.toggle-popup__button--continue {
  border-radius: 9999px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
  user-select: none;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 2rem;
  min-width: 2.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0 1rem; /* Adjust padding to match DeletePopup.vue */
}

.toggle-popup__button--cancel {
  background-color: transparent;
  border: 2px solid #282b2e;
  color: #282b2e;
  margin-right: 8px; /* Space between buttons */
}

.toggle-popup__button--continue {
  background-color: #11abcd; /* Red background to match Delete button */
  color: white;
  border: none; /* No border for continue button */
}

.toggle-popup__button--continue:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
