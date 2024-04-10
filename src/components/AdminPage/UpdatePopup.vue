<template>
    <div class="update-popup-overlay">
      <div class="update-popup-background"></div>
      <div class="update-popup-container">
        <div class="update-popup-content">
          <div class="update-popup-box">
            <h2 class="update-popup-title">อัปเดตสถานี?</h2>
            <p class="update-popup-text">
              กรุณายืนยันว่าคุณต้องการอัปเดตข้อมูลสำหรับสถานีนี้
            </p>
            <div class="update-popup-actions">
              <button type="button" class="update-popup-cancel" @click="cancelUpdate">ยกเลิก</button>
              <button type="button" class="update-popup-confirm" @click="confirmUpdate">อัปเดตสถานี</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      confirmUpdate() {
        this.$emit('confirmUpdate');
      },
      cancelUpdate() {
        this.$emit('cancelUpdate');
      },
    },
  };
  </script>
  
  <style scoped>
.update-popup-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 10000;
}

.update-popup-background {
  position: absolute;
  background: rgba(0, 0, 0, 0.5); /* Darker overlay for better contrast */
  inset: 0;
}

.update-popup-container {
  position: relative;
  z-index: 10;
}

.update-popup-content {
  width: 100%;
  max-width: 500px; /* Adjusted width for better fit */
  margin: 0 auto;
  padding: 32px; /* Increased padding for more space */
  background: #fff;
  border-radius: 0.75em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Darker shadow for depth */
}

.update-popup-title {
  font-weight: 700;
  font-size: 1.75rem; /* Larger font size for the title */
  margin-bottom: 20px; /* Increased space below title */
}

.update-popup-text {
  font-weight: 400;
  font-size: 1rem; /* Adjusted font size for readability */
  margin-bottom: 32px; /* Increased space below text */
}

.update-popup-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px; /* Gap between buttons */
}

.update-popup-cancel,
.update-popup-confirm {
  flex: 1;
  max-width: 160px; /* Ensuring buttons are not too wide */
  border-radius: 0.5em; /* Rounded corners for buttons */
  font-weight: 700;
  padding: 16px; /* Increased padding for larger buttons */
  font-size: 0.875rem; /* Adjusted font size */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-popup-cancel {
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
}

.update-popup-cancel:hover {
  background-color: #f8f8f8; /* Slightly darker on hover */
}

.update-popup-confirm {
  background-color: #11abcd; /* Custom button color */
  color: white;
  border: none;
}

.update-popup-confirm:hover {
  background-color: darken(#11abcd, 10%); /* Darker shade on hover, adjust if needed */
}
</style>