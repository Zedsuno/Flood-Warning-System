<template>
  <div class="threshold-modal">
    <div class="modal-content">
      <h3>ตั้งค่าเกณฑ์ระดับน้ำ</h3>
      <form @submit.prevent="saveThreshold">
        <div class="form-group" v-for="(threshold, index) in thresholds" :key="index">
          <div class="threshold-details">
            <input
              type="text"
              :placeholder="threshold.name"
              v-model="threshold.name"
              readonly
              
            />
            <input
              type="number"
              placeholder="Value (%)"
              v-model.number="threshold.value"
              @blur="updateData"
            />
            <input type="color" v-model="threshold.color" class="color-input" readonly />
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="save-button">
            บันทึกการตั้งค่าเกณฑ์
          </button>
          <button type="button" @click="$emit('close')" class="cancel-button">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thresholds: [
        { name: "น้อยวิกฤต", value: "", color: "#A52A2A" }, 
        { name: "น้อย", value: "", color: "#FFFF00" }, 
        { name: "ปกติ", value: "", color: "#008000" }, 
        { name: "มาก", value: "", color: "#800080" }, 
        { name: "ล้นตลิ่ง", value: "", color: "#FF0000" } 
      ]
    };
  },
  methods: {
    async saveThreshold() {
      this.$emit('save', this.thresholds);
    },
  },
};
</script>

<style scoped>
.threshold-modal {
  display: flex; /* Enables flexbox */
  align-items: center; /* Vertical alignment */
  justify-content: center; /* Horizontal alignment */
  position: fixed; /* Fixed position */
  top: 0; /* Top edge */
  left: 0; /* Left edge */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 9999; /* High z-index to ensure it's on top */
}

.modal-content {
  background-color: #fff;
  color: #333;
  padding: 40px;
  border-radius: 0.75em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 600px; /* Ensure the modal doesn't exceed the max width */
  z-index: 1001; /* Ensures modal content is above the overlay */
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.remove-button {
  background: transparent;
  border: none;
  color: #ff4136; /* Red color for deletion */
  cursor: pointer;
  font-size: 1.5rem; /* Adjust the size of the X */
  line-height: 1;
  padding: 0;
  margin-right: 10px; /* Space between the X and the input */
  /* Additional styles to align the button to the left of the threshold */
}
.remove-icon {
  display: inline-block;
  width: 24px; /* Fixed width for consistency */
  height: 24px; /* Fixed height for consistency */
  line-height: 24px; /* Center the icon vertically */
  text-align: center; /* Center the icon horizontally */
  background-color: #ff4136; /* Red background for attention */
  color: white; /* White text for contrast */
  border-radius: 50%; /* Circular button */
  cursor: pointer;
  margin-right: 15px; /* Spacing to the next element */
}


.label-color {
  display: block;
  margin-bottom: 5px;
}

.threshold-details {
  flex-grow: 1;
  
  display: flex;
  align-items: center;
  gap: 10px; /* Spacing between inputs */
}

input, button {
  transition: all 0.3s ease; /* Smooth transition for all interactable elements */
}

button:hover {
  transform: scale(1.05); /* Slightly enlarge buttons on hover */
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2); /* Subtle shadow for depth */
}



.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}
input[type="number"],
input[type="text"]:focus {
  border-bottom: 2px solid #11abcd; /* Change #00f to the color you want */
}
input[type="number"],
input[type="text"],input[type="color"] {
  flex-grow: 1; /* Allow the input to grow but not as much as before */
  flex-shrink: 1; /* Allow the input to shrink if necessary */
  flex-basis: 30%; /* Starting width before growing or shrinking */
  max-width: 150px; /* Maximum width can be a fixed value */
  margin-right: 10px; /* Ensure there is space between the inputs */
   
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
.color-input {
  border: 2px solid #ddd; /* Solid border for better visibility */
  width: 50px; /* Wider than default for easier interaction */
  height: 30px; /* Taller input for better accessibility */
  cursor: pointer;
  border-radius: 5px; /* Rounded corners for modern look */
  margin-left: 10px; /* Ensure spacing from previous input */
}

.add-button,
.save-button,
.cancel-button {
  border-radius: 20px; /* Rounded corners */
  padding: 0.5rem 1rem; /* Padding around the text */
  border: none; /* No border */
  font-weight: bold; /* Bold font */
  margin-top: 1rem; /* Space from the previous element */
  cursor: pointer; /* Cursor for button */
}

.cancel-button {
  /* Styles for the cancel button */
  background-color: #ff4136; /* Red color for cancel action */
  color: white;
}

.add-button {
  background-color: #2ecc40; /* Green background for the add button */
  color: white;
}

.save-button {
  background-color: #2ecc40; /* Blue background for the save button */
  color: white;
}
</style>
