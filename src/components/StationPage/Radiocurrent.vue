<template>
    <div class="css-1opzxad">
      <div class="css-d6poxd">
        <div role="radiogroup" class="css-piel9j">
          <button
            type="button"
            :aria-checked="selected === 'current'"
            role="radio"
            name="radio-5"
            tabindex="0"
            class="css-1suq8rq"
            @click="select('current')"
          >
            Current
          </button>
          <button
            type="button"
            :aria-checked="selected === 'nearby'"
            role="radio"
            name="radio-5"
            tabindex="-1"
            class="css-t53lcx"
            @click="select('nearby')"
          >
            Nearby
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RadioCurrent',
    data() {
      return {
        selected: 'current', // The currently selected radio button
      };
    },
    methods: {
      select(option) {
        this.selected = option;
        // Emit an event if you need to communicate to the parent component
        this.$emit('selection-changed', this.selected);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped CSS here based on the classes */
  .css-1opzxad {
  position: absolute;
  top: 10px;
  right: 10px;
}
.css-d6poxd {
  padding: 0px;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.8);
}

.css-piel9j {
  display: flex;
  padding: 3px;
  border-radius: 9999px;
}
.css-1suq8rq {
  border-radius: 9999px;
  font-weight: 700;
  display: inline-flex;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 1.5rem;
  min-width: 2.5rem;
  font-size: 0.625rem;
  padding-left: 12px;
  padding-right: 12px;
  background-color: rgb(255, 255, 255);
  border-color: rgb(40, 43, 46);
  border-style: solid;
  border-width: 2px;
  color: rgb(40, 43, 46);
  font-family: 'Prompt', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-right: 0px;
}

.css-t53lcx {
  border-radius: 9999px;
  font-weight: 700;
  display: inline-flex;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition: all 150ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 1.5rem;
  min-width: 2.5rem;
  font-size: 0.625rem;
  padding-left: 12px;
  padding-right: 12px;
  background-color: transparent;
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: 'Prompt', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
}
  </style>
  