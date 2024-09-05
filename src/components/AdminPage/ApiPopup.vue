<!-- ApiPopup.vue -->
<template>
  <div v-if="isPopupVisible" class="api-popup__overlay">
    <div class="setup-station-container">
      <h2>Setup Your Station</h2>
      <p>Enter your Davis API V2 Keys</p>
      <form @submit.prevent="submitKeys">
        <div class="input-group">
          <label for="publicKey">Public Key</label>
          <input v-model="publicKey" type="text" id="publicKey" required />
        </div>
        <div class="input-group">
          <label for="privateKey">Private Key</label>
          <input v-model="privateKey" type="password" id="privateKey" required />
        </div>
        <div class="actions">
          <button type="button" @click="cancel">Cancel</button>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div></div>
  </template>
  
  <script>
  import axios from 'axios'; // make sure to import axios
  
  export default {
    data() {
      return {
        publicKey: '',
        privateKey: '',
        isPopupVisible: true,
      };
    },
    methods: {
      submitKeys() {
        // Call the API to validate the keys
        axios.post('/api/setup-station', {
          publicKey: this.publicKey,
          privateKey: this.privateKey,
        })
        .then(response => {
          // Handle successful response
          console.log('Success:', response.data);
          // Do something on success, like redirecting the user or showing a success message
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error.response ? error.response.data : error.message);
          // Do something on error, like showing an error message to the user
        });
      },
      closePopup() {
      this.isPopupVisible = false;
    },
      cancel() {
        this.closePopup();
        // Handle the cancel action, perhaps reset the form or navigate away
        this.publicKey = '';
        this.privateKey = '';
      }
    }
  }
  </script>
  
  <style scoped>
  
  .setup-station-container {
    background-color: #fff;
    color: #333;
    padding: 40px;
    border-radius: 0.75em;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: auto;
    max-width: 500px;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    
  }

  .api-popup__overlay {
    position: fixed;
    inset: 0;
    z-index: 10000; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5); 
  }
  
  h2 {
    font-family: 'Prompt', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 16px;
  }
  
  p {
    font-family: 'Prompt', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    margin-bottom: 32px;
  }
  
  .input-group {
    margin-bottom: 16px;
  }
  
  label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 16px;
  }
  
  .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 24px;
  }
  
  button {
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
    padding: 0 1rem;
    margin-left: 8px;
  }
  
  button[type="submit"] {
    background-color: #11abcd;
    color: white;
    border: none;
  }
  
  button[type="button"] {
    background-color: transparent;
    color: #282B2E;
    border: 2px solid #282B2E;
  }
  </style>