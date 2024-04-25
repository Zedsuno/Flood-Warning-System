<template>
  <div class="Admin-Dash">
    <Notification v-if="notification.show" :message="notification.message" :type="notification.type" />
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
          <AddStationDash
            v-for="station in allStations"
            :key="station._id"
            :stationId="station._id"
            @stationSaved="handleStationSaved"
          />
          <router-link to="/Admin/AddStation" class="Section_Blog_Ad_Link">
            <div class="Section_Blog_Ad">
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
        <TebularNew :allStations="allStations" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onUnmounted } from 'vue';
import TebularNew from "../AdminPage/TebularNew.vue";
import AddStationDash from "../AdminPage/AddStationDash";
import axios from "axios";
import { EventBus } from "../../event-bus.js";
import Notification from '../NotiEventBus.vue';



export default {
  name: "StationManagement",
  components: {
    TebularNew,
    AddStationDash,
    Notification,
  },
  setup() {
    const notification = reactive({
      message: '',
      type: '',
      show: false,
    });

    const showNotification = (data) => {
      notification.message = data.message;
      notification.type = data.type;
      notification.show = true;

      setTimeout(() => notification.show = false, 3000);
    };

    onMounted(() => EventBus.on('notify', showNotification));
    onUnmounted(() => EventBus.off('notify', showNotification));

    return {
      notification,
    };
  },
  data() {
    return {
      currentView: "grid",
      currentStationId: null,
      allStations: [],
      loading: false,
      error: null,
    };
  },
  async mounted() {
    await this.fetchAllStations();
  },
  methods: {
    setCurrentView(view) {
      this.currentView = view;
    },
    handleStationSaved(newStation) {
      // Push the new station to the allStations array
      this.allStations.push(newStation);
      // Or if you prefer to refetch the entire list (which will include the new station):
      this.fetchAllStations();
    },
    async fetchAllStations() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3001/api/stations");
        this.allStations = response.data;
        if (this.allStations.length > 0 && !this.currentStationId) {
          this.currentStationId = this.allStations[0]._id; // Set to the first station by default
        }
        this.loading = false;
      } catch (error) {
        console.error("Error fetching all stations:", error);
        this.error = error;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.Admin-Dash {
  background-color: var(--color-background);
  -webkit-box-flex: 1;
  flex-grow: 1;
  z-index: 1;
  min-height: 100vh;
  font-family: 'Prompt', sans-serif;
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
  margin-bottom: 2rem;
}

.Div-Text-Blog, .Station-Text-Top {
  display: flex;
  align-items: center;
}

.Test-H1-Station {
  color: #344767; /* Same color as headers in LoginPage.vue */
  font-size: 2rem; /* Same font size as LoginPage.vue header */
  font-weight: 600; /* Same font weight as LoginPage.vue header */
}

.Div-Text-Blog {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
}
.Blog-Radio {
  margin-right: 32px; /* Align right margin with InfoSection.vue if necessary */
}

.Radio-Group {
  display: flex;
  background-color: #ffffff; /* Light background for light mode */
  padding: 2px;
  border-radius: 1rem; /* Consistent border-radius */
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); /* Softer shadow for light mode */
}

/* Consistent button styles */
.Grid_Radio,
.Tabular_Radio {
  border-radius: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  user-select: none;
  position: relative;
  vertical-align: middle;
  line-height: normal;
  outline: none;
  height: 2rem;
  min-width: 2.5rem;
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #f8f9fa; /* Slightly off-white background */
  border: 1px solid #dcdcdc; /* Lighter border color */
  color: #212529; /* Darker text color for contrast */
  font-family: 'Prompt', sans-serif;
  text-transform: uppercase;
  letter-spacing: normal;
  cursor: pointer;
}


/* Active button styles - Match the styles from InfoSection.vue */
.Grid_Radio[aria-checked="true"],
.Tabular_Radio[aria-checked="true"] {
  background-image: linear-gradient(to right, #11abcd, #25adfc); /* Gradient background like InfoSection.vue button */
  color: #ffffff; /* White text for active state */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); /* Shadow for a 'lifted' effect */
}

/* Hover effect to match InfoSection.vue button */
.Grid_Radio:hover,
.Tabular_Radio:hover {
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08); /* Increase box shadow on hover */
}

/* Active state to match InfoSection.vue button */
.Grid_Radio:active,
.Tabular_Radio:active {
  transform: translateY(0); /* Button returns to original state on click */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); /* Shadow returns to normal on click */
}

.Botton_Ad_Station:hover{
  background-color: #0f9cb7;
  transform: translateY(-2px); /* Slightly raise the button on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
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
  background-image: linear-gradient(to right, #11abcd, #25adfc); 
  border: 2px solid transparent;
  color: rgb(250, 251, 253);
  font-family: 'Prompt', sans-serif;
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
  align-items: stretch;
  gap: 1rem; /* Consistent gap */
}

@media screen and (min-width: 30em) {
  .Section_Blog_Ad {
    width: 300px;
    min-height: 450px;
    
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
  transition: border-color 0.3s;
  
}
.Section_Blog_Ad:hover {
  border-color: #11abcd; /* Changes the border color on hover */
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
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
  font-family: 'Prompt', sans-serif;
  margin: 16px 0px 0px;
  font-weight: 700;
  font-size: 1rem;
  color: rgb(113, 122, 132);
}
</style>
