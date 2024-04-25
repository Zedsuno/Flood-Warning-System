<template>
  <div class="threshold-modal">
    <div class="modal-content">
      <h3>ตั้งค่าเกณฑ์ระดับน้ำ</h3>
      <form @submit.prevent="saveThresholds" >
        <div
          v-for="(threshold, index) in thresholds"
          :key="index"
          class="form-group"
        >
          <span class="remove-icon" @click="removeThreshold(index)"
            >&#10005;</span
          >
          <!-- Changed button to span for X -->
          <div class="threshold-details">
            <input
              type="text"
              placeholder="ชื่อเกณฑ์"
              v-model="threshold.name"
            />
            <input
              type="number"
              placeholder="Value (cm)"
              v-model.number="threshold.value"
            />
            <input type="color" v-model="threshold.color" class="color-input" />
            <!-- Added class for styling -->
          </div>
        </div>
        <button type="button" @click="addThreshold" class="add-button">
          เพิ่มการตั้งค่าเกณฑ์
        </button>
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
  props: {
    initialThresholds: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      thresholds: this.initialThresholds.length
        ? [...this.initialThresholds]
        : [
            {
              name: "Low",
              value: 0,
              color: "#00FF00",
            },
          ],
    };
  },
  watch: {
    initialThresholds(newVal) {
      this.thresholds = [...newVal];
    }
  },
  methods: {
    addThreshold() {
      this.thresholds.push({
        name: "",
        value: 0,
        color: "#0000FF",
      });
    },
    removeThreshold(index) {
      this.thresholds.splice(index, 1);
    },
    async saveThresholds() {
    // Emit the thresholds to the parent instead of making an API call
    this.$emit('save', this.thresholds);
     // Close the modal after saving
  },
  },
};
</script>

<style scoped>
.threshold-modal {
  /* Same styles as toggle-popup__container */
}

.modal-content {
  background-color: #fff;
  color: #333;
  padding: 40px;
  border-radius: 0.75em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 600px; /* Ensure the modal doesn't exceed the max width */
  margin: auto; /* Center the modal in the available space */
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
  cursor: pointer;
  color: #ff4136; /* Red color for deletion */
  font-size: 1.5rem; /* Adjust the size of the X */
  margin-right: 0.5rem; /* Space between the X and the input */
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
  border: 1px solid #ddd; /* Border for the color input */
  height: 30px; /* Height for the color input */
  width: 3px; /* Width for the color input */
  padding: 0;
  cursor: pointer; /* Hand cursor on hover */
  margin-left: 0px; /* Spacing to the left of the color picker */
  display: inline-block; /* Align with other input fields */
  vertical-align: middle; /* Center with respect to the adjacent text input */
  flex-grow: 2;
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
