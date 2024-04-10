<template>
    <div class="save-popup-overlay">
      <div class="save-popup-background" ></div>
      <div class="save-popup-container">
        <div class="save-popup-content">
          <div class="save-popup-box">
            <h2 class="save-popup-title">บันทึกสถานี?</h2>
            <p class="save-popup-text">
              กรุณายืนยันว่าคุณต้องการบันทึกข้อมูลสำหรับสถานีนี้
            </p>
            <div class="save-popup-actions">
              <button type="button" class="save-popup-cancel" @click="cancelSave">ยกเลิก</button>
              <button type="button" class="save-popup-confirm" @click="confirmSave">บันทึกสถานี</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      confirmSave() {
        this.$emit('confirmSave');
      },
      cancelSave() {
        this.$emit('cancelSave');
      },
    },
  };
  </script>
  
  <style scoped>
  .save-popup-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    z-index: 10000;
  }
  
  .save-popup-background {
    position: absolute;
    background: rgba(0, 0, 0, 0.75);
    inset: 0;
  }
  
  .save-popup-container {
    position: relative;
    z-index: 10;
  }
  
  .save-popup-content {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 32px;
    background: #fff;
    border-radius: 0.75em;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  .save-popup-title {
    font-weight: 700;
    font-size: 1.75rem;
    margin-bottom: 20px;
  }
  
  .save-popup-text {
    font-weight: 400;
    font-size: 1rem;
    margin-bottom: 32px;
  }
  
  .save-popup-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  
  .save-popup-cancel,
  .save-popup-confirm {
    flex: 1;
    max-width: 160px;
    border-radius: 0.5em;
    font-weight: 700;
    padding: 16px;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .save-popup-cancel {
    background-color: transparent;
    color: #333;
    border: 2px solid #333;
  }
  
  .save-popup-cancel:hover {
    background-color: #f8f8f8;
  }
  
  .save-popup-confirm {
    background-color: #11abcd;
    color: white;
    border: none;
  }
  
  .save-popup-confirm:hover {
    background-color: #0099cc;
  }
  </style>