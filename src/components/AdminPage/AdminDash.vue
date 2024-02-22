<template>
  <div class="Admin-Dash">
    <div class="AdminDiv">
      <div class="css-kow2w3"></div>
    </div>
    <div class="Section-Dash">
      <div class="Top-Admin-Dash">
        <div class="Station-Text-Top">
          <div class="Div-Text-Blog">
            <div class="css-0">
              <h1 class="Test-H1-Station">สถานี</h1>
            </div>
          </div>
        </div>
        <div class="Div-Text-Blog">
          <div class="Blog-Radio">
            <div role="radiogroup" class="Radio-Group">
              <button
                @click="setCurrentView('grid')"
                :aria-checked="currentView === 'grid'"
                type="button"
                role="radio"
                name="radio-86"
                tabindex="0"
                class="Grid_Radio"
              >
                กล่อง
              </button>
              <button
                @click="setCurrentView('tabular')"
                :aria-checked="currentView === 'tabular'"
                type="button"
                role="radio"
                name="radio-86"
                tabindex="-1"
                class="Tabular_Radio"
              >
                ตาราง
              </button>
            </div>
          </div>
        <router-link to="/Admin/AddStation" class="Botton_Ad_Station">
            <svg
                viewBox="0 0 24 24"
                focusable="false"
                role="presentation"
                class="SVG_Botton_Station"
            >
                <path
                    fill="currentColor"
                    d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
                ></path>
            </svg>
        </router-link>
        </div>
      </div>
      <div v-show="currentView === 'grid'" class="css-0">
        <div class="Div Space"></div>
        <div class="Section_Blog_Ad_All">
            <router-link to="/Admin/AddStation" class="Section_Blog_Ad_Link">
          <div class="Section_Blog_Ad" >
            <div class="Div_Ad_In_Blog">
              <div class="Div_Ad_Plus">
                <div class="Div_Space_Ad_Plus">
                  <div class="Div_Ad_In_Blog">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      role="presentation"
                      class="Plus_Botton"
                    >
                      <path
                        fill="currentColor"
                        d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="Test_AdStation">เพิ่มสถานี</p>
            </div>
          </div>
        </router-link>
        </div>
      </div>
      <div v-show="currentView === 'tabular'">
<Tebular/>
    </div>
    </div>
  </div>
</template>

<script>
import Tebular from '../AdminPage/Tebular.vue'
export default {
    
  name: "StationManagement",
  components: {
    Tebular
  },
  data() {
    return {
      currentView: 'grid', // default view
    };
  },
  methods: {
    setCurrentView(view) {
      this.currentView = view;
    },
  },
};
</script>

<style scoped>
.Admin-Dash {
  background-color: rgb(219, 226, 226);
  -webkit-box-flex: 1;
  flex-grow: 1;
  z-index: 1;
  min-height: 100vh;
}
.Section-Dash {
  padding: 32px;
}

.Top-Admin-Dash {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 32px;
}

.Station-Text-Top {
  margin-right: 8px;
}

.Div-Text-Blog {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}

.Test-H1-Station {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 700;
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.Div-Text-Blog {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}
.Blog-Radio {
  margin-right: 32px;
}
.Radio-Group {
  display: flex;
  background-color: rgb(23, 25, 28);
  padding: 2px;
  border-radius: 9999px;
}
.Grid_Radio {
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
  background-color: rgb(23, 25, 28);
  border-color: rgb(255, 255, 255);
  border-style: solid;
  border-width: 2px;
  color: rgb(255, 255, 255);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-right: 0px;
}
.Tabular_Radio {
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
  color: rgb(255, 255, 255);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  -webkit-box-flex: 1;
  flex-grow: 1;
}
.Botton_Ad_Station {
  border-radius: 9999px;
  font-weight: 700;
  width: 44px;
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
  height: 44px;
  min-width: 2.5rem;
  font-size: 0.875rem;
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgb(35, 187, 241);
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.SVG_Botton_Station {
  width: 18px;
  height: 18px;
  color: currentcolor;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  backface-visibility: hidden;
}

.Section_Blog_Ad_All {
  display: flex;
  flex-flow: wrap;
}

@media screen and (min-width: 30em) {
  .Section_Blog_Ad {
    width: 300px;
    min-height: 350px;
  }
}

.Section_Blog_Ad {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 1px 4px 0px;
  margin-bottom: 16px;
  border-radius: 0.5rem;
  padding: 16px;
  border-style: dashed;
  border-width: 3px;
  border-color: rgb(77, 84, 91);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.Section_Blog_Ad:hover {
  border-color: #11abcd; /* Changes the border color on hover */
}


.Div_Ad_In_Blog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.Div_Ad_Plus {
  text-align: center;
}
.Div_Space_Ad_Plus {
  width: 44px;
  height: 44px;
  border-color: rgb(113, 122, 132);
  border-width: 2px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 9999px;
  position: relative;
}
.Div_Ad_In_Blog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.Plus_Botton {
  width: 18px;
  height: 20px;
  color: rgb(113, 122, 132);
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  backface-visibility: hidden;
}
.Test_AdStation {
  font-family: Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 16px 0px 0px;
  font-weight: 700;
  font-size: 1rem;
  color: rgb(113, 122, 132);
}
</style>
