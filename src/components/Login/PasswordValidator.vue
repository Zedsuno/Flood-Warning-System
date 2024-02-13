<template>
  <div v-show="isVisible" class="password-requirements-popover" ref="popover" @click="keepPopover">
    <div class="popover-content">
      <div class="popover-body">
        <p>รหัสผ่านของคุณต้องมี:</p>
        <ul>
          <li v-for="(requirement, index) in requirements" :key="index" :class="{ 'valid': requirement.isValid }">
            <svg viewBox="0 0 24 24" class="icon" :class="{ 'icon-valid': requirement.isValid }">
              <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
            </svg>
            {{ requirement.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordRequirements",
  props: {
    password: String,
  },
  data() {
    return {
      isVisible: false,
      requirements: [
        { text: "อย่างน้อย 8 ตัวอักษร", isValid: false },
        { text: "อย่างน้อยหนึ่งตัวอักษรพิมพ์เล็ก", isValid: false },
        { text: "อย่างน้อยหนึ่งตัวอักษรพิมพ์ใหญ่", isValid: false },
        { text: "อย่างน้อยหนึ่งตัวอักษรพิเศษ", isValid: false },
      ],
    };
  },
  watch: {
    password(newValue) {
      this.isVisible = !!newValue;
      this.requirements[0].isValid = newValue.length >= 8;
      this.requirements[1].isValid = /[a-z]/.test(newValue);
      this.requirements[2].isValid = /[A-Z]/.test(newValue);
      this.requirements[3].isValid = /[\W]/.test(newValue);
    },
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    keepPopover() {
      this.isVisible = false; // Now clicking on the popover will hide it
    },
    handleOutsideClick(event) {
      if (this.isVisible && !this.$refs.popover.contains(event.target) && event.target.type !== 'password') {
      this.isVisible = false;
    }
    },
  },
};
</script>

<style scoped>
.password-requirements-popover .popover-content {
  position: absolute;
  background: white;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  transform: scale(1) translateZ(0px);
  transition: opacity 0.2s, transform 0.2s;
  z-index: 1;
}

.popover-body p {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.icon {
  margin-right: 8px;
  width: 24px;
  height: 24px;
}

.icon-valid {
  color: green;
}

.valid .icon {
  color: green;
}

.valid {
  color: green;
}
</style>
