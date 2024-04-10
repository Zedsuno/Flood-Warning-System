<template>
    <div class="delete-popup-overlay"  >
      <div class="delete-popup-background"></div>
      <div class="delete-popup-container">
        <div class="delete-popup-content">
          <div class="delete-popup-box">
            <div class="delete-popup-message">
              <p class="delete-popup-title">ลบสถานีนี้?</p>
              <p class="delete-popup-text">
                คุณแน่ใจหรือไม่ว่าต้องการลบสถานีนี้ทื้ง!
              </p>
              <div class="delete-popup-actions">
                <button type="button" class="delete-popup-cancel" @click="cancelDelete">ยกเลิก</button>
                <button type="button" class="delete-popup-confirm" @click="confirmDelete">ลบสถานี</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  methods: {
    confirmDelete() {
      this.$emit('confirmDelete');
    },
    cancelDelete() {
      this.$emit('cancelDelete');
    },
  },
}
</script>
  
<style scoped>
.delete-popup-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.delete-popup-background {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  inset: 0;
}

.delete-popup-container {
  position: relative;
  z-index: 1;
}

.delete-popup-content {
  width: 100%;
  max-width: 600px; /* Increased width */
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}



.delete-popup-title {
  font-size: 2rem; /* Increased font size */
  font-weight: 600;
  margin-bottom: 16px;
}

.delete-popup-text {
  font-size: 1.25rem; /* Increased font size */
  margin-bottom: 24px;
}

.delete-popup-actions {
  display: flex;
  justify-content: space-between;
}

.delete-popup-cancel,
.delete-popup-confirm {
  flex: 1;
  max-width: 130px; /* Ensuring buttons don't grow too large */
  border-radius: 8px;
  font-weight: 600;
  padding: 12px 24px; /* Increased padding */
  font-size: 1rem; /* Increased font size */
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-popup-cancel {
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
  margin-right: 16px;
}

.delete-popup-cancel:hover {
  background-color: #f2f2f2;
}

.delete-popup-confirm {
  background-color: #d9534f;
  color: #fff;
  border: none;
}

.delete-popup-confirm:hover {
  background-color: #c9302c;
}
</style>