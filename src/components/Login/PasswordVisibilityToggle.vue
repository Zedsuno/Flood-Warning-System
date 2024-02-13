<template>
    <button
      type="button"
      class="toggle-password"
      @click="toggleShowPassword"
    >
      <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
    </button>
  </template>
  
  <script>
export default {
  name: "PasswordVisibilityToggle",
  props: {
    showPassword: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleShowPassword() {
      this.$emit('update:showPassword', !this.showPassword);
    },
  },
};
</script>
  
  <style scoped>
  .toggle-password {
    background: none;
    border: none;
    position: absolute;
    right: 0rem; /* Adjust as needed */
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 1rem;
    color: #7a7a7a; /* Adjust color as needed */
  }
   .toggle-password {
 
 color: black;
 padding: 1rem;
 border-radius: 100px;
 text-align: center;
 text-transform: uppercase;
 letter-spacing: 2px;
 transition: background 0.5s;
}
 
  /* You may want to include additional styles from your previous CSS if needed */
  </style>
  