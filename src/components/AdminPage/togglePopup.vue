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
          <div class="toggle-popup__manufacturer-item" @click="selectManufacturer('Davis Instruments')">
            <p class="toggle-popup__manufacturer-name">Davis Instruments</p>
          </div>
          <!-- Add more manufacturers here -->
        </div>
        <div class="toggle-popup__buttons">
          <button class="toggle-popup__button--cancel" @click="close">Cancel</button>
          <button class="toggle-popup__button--continue" :disabled="!selectedManufacturer">Continue</button>
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
    }
  }
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
  background: rgba(0, 0, 0, 0.85);
}

.toggle-popup__content {
  z-index: 10;
}

.toggle-popup__box {
  background-color: #fff;
  color: #333;
  padding: 32px;
  border-radius: 0.75em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 500px;
}

.toggle-popup__title {
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
}

.toggle-popup__description {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
}

.toggle-popup__manufacturer-list {
  margin-top: 16px;
}

.toggle-popup__manufacturer-item {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 0.25em;
  height: 80px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 8px;
}

.toggle-popup__manufacturer-name {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #718096;
  text-align: center;
}

.toggle-popup__buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 32px;
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
  font-size: 0.75rem;
  padding: 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-right: 8px;
}

.toggle-popup__button--cancel {
  background-color: transparent;
  border: 2px solid #282B2E;
  color: #282B2E;
}

.toggle-popup__button--continue {
  background-color: #EDEDF7;
  color: #282B2E;
}

.toggle-popup__button--continue:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
