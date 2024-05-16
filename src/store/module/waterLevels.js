import axios from "axios";

export default {
  getters: {
    getThresholds: (state) => state.statuses,
    getStationById: (state) => (id) => {
      return state.allStations.find(station => station._id === id);
    },
  },
  namespaced: true,
  state: {
    allStations: [],
    selectedStation: null,
    stations: [],
    statuses: [
      { name: "น้อยวิกฤต", color: "#ff0000", upperLimit: 5 },
      { name: "น้อย", color: "#ffa500", upperLimit: 20 },
      { name: "ปกติ", color: "#008000", upperLimit: 50 },
      { name: "มาก", color: "#0000ff", upperLimit: 60 },
      { name: "ล้นตลิ่ง", color: "#4B0082", upperLimit: Infinity }  // Correctly covers everything above 60%
    ],
  },
  mutations: {
    SET_WATER_LEVELS_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ALL_STATIONS(state, stations) {
      state.allStations = stations;
    },
    DESELECT_STATION(state) {
      state.selectedStation = null;
    },
    UPDATE_THRESHOLDS(state, thresholds) {
      state.statuses = thresholds.map(threshold => ({
        name: threshold.name,
        upperLimit: threshold.value,
        color: threshold.color
      }));
      console.log('Updated thresholds:', state.statuses);
    },
    UPDATE_STATION_DATA(state, station) {
      const index = state.allStations.findIndex(s => s._id === station._id);
      if (index !== -1) {
        state.allStations[index] = { ...state.allStations[index], ...station };
        console.log(`Updating existing station: ${station._id}`);
      } else {
        state.allStations.push(station);
        console.log(`Adding new station: ${station._id}`);
      }
    }
  },
  actions: {
    fetchWaterLevels({ commit }) {
      commit('SET_WATER_LEVELS_LOADING', true);
      axios.get('/api/water-levels')
        .then(response => {
          commit('UPDATE_WATER_LEVEL_DATA', response.data);
          commit('SET_WATER_LEVELS_LOADING', false);
        })
        .catch(error => {
          console.error('Failed to fetch water levels', error);
          commit('SET_WATER_LEVELS_LOADING', false);
        });
    },
    saveThresholds({ commit }, thresholds) {
      console.log('Received thresholds for saving:', thresholds);
      commit('UPDATE_THRESHOLDS', thresholds);
      // Optionally, save to backend here
    },
    async fetchAllStations({ commit, dispatch }) {
      try {
        const response = await axios.get("http://localhost:3001/api/stations");
        commit("SET_ALL_STATIONS", response.data);
        response.data.forEach(station => dispatch('fetchSensorData', station));
        console.log("Stations committed to Vuex:", response.data);
      } catch (error) {
        console.error("Error fetching all stations:", error);
      }
    },
    updateThresholds({ commit }, thresholds) {
      console.log('Dispatching updateThresholds with:', thresholds);
      commit('UPDATE_THRESHOLDS', thresholds);
    },
    fetchSensorData({ dispatch }, station) {
      axios.get(`http://localhost:3001/api/sensors/${station.hardware[0]}`)
        .then(response => {
          const readings = response.data;
          if (readings.length > 0) {
            const latestMeasurement = readings[readings.length - 1].measurement;
            if (typeof latestMeasurement !== 'number' || isNaN(latestMeasurement)) {
              console.error('Invalid latest measurement:', latestMeasurement);
              return;
            }
            dispatch('calculateWaterLevels', { station, latestMeasurement });
          }
        })
        .catch(error => {
          console.error(`Error fetching sensor data for station ${station._id}:`, error);
        });
    },
    calculateWaterLevels({ commit, dispatch }, { station, latestMeasurement }) {
      if (typeof station.sensorDistance !== 'number' || typeof station.waterline !== 'number') {
        console.error('Invalid station data for calculation:', station);
        return;
      }

      const bankLevel = latestMeasurement - station.sensorDistance;
      console.log(`Calculated bank level for station ${station._id}:`, bankLevel);

      const waterLevel = station.waterline - bankLevel;
      console.log(`Calculated water level for station ${station._id}:`, waterLevel);

      if (isNaN(waterLevel)) {
        console.error('Calculated water level is NaN:', { latestMeasurement, sensorDistance: station.sensorDistance, waterline: station.waterline });
        return;
      }

      const waterLevelPercentage = (waterLevel / station.waterline) * 100;
      console.log(`Calculated water level percentage for station ${station._id}: ${waterLevelPercentage}%`);

      const updatedStation = {
        ...station,
        bankLevel,
        waterLevel,
        waterLevelPercentage,
      };
      commit('UPDATE_STATION_DATA', updatedStation);
      dispatch('applyThresholds', updatedStation);
      dispatch('updateStationDataInDB', updatedStation);
    },
    updateStationDataInDB(_, station) {
      if (!station._id) {
        console.error('No _id found for station. Station data:', station);
        return;
      }

      console.log('Updating station in DB with ID:', station._id);

      axios.post('http://localhost:3001/api/stations/updateWaterLevel', {
        _id: station._id,
        waterLevel: station.waterLevel,
        bankLevel: station.bankLevel,
        waterLevelPercentage: station.waterLevelPercentage
      })
        .then(() => console.log(`Water level updated in DB for station: ${station._id}`))
        .catch(error => console.error(`Error updating water level in DB for station ${station._id}:`, error));
    },
    applyThresholds({ commit, state }, station) {
      const percentage = (station.waterLevel / station.waterline) * 100;
      let waterLevelPercentage = Math.round(percentage);
      console.log(`${percentage}%`);
      console.log(`waterLevelPercentage calculated for station ${station._id}: ${waterLevelPercentage}%`);
    
      // Ensure all upperLimit values are numeric
      const sortedThresholds = state.statuses.slice().map(t => ({
        ...t,
        upperLimit: Number(t.upperLimit)
      })).sort((a, b) => a.upperLimit - b.upperLimit);
    
      console.log("Sorted thresholds:", sortedThresholds.map(t => `${t.name}: up to ${t.upperLimit}`));
    
      // Log detailed comparison process
      sortedThresholds.forEach(threshold => {
        console.log(`Checking if ${waterLevelPercentage} <= ${threshold.upperLimit} for ${threshold.name}`);
        console.log(`Comparison result: ${waterLevelPercentage <= threshold.upperLimit}`);
      });
    
      // Find the appropriate threshold
      const threshold = sortedThresholds.find(thresh => waterLevelPercentage <= thresh.upperLimit);
    
      if (threshold) {
        station.status = threshold.name;
        station.color = threshold.color;
        console.log(`Applying found status to station: ${station._id}, Status: ${station.status}, Color: ${station.color}`);
      } else {
        station.status = "ไม่พบค่า";
        station.color = "#000000";
        console.log(`No matching threshold found for station: ${station._id}, Applying default status and color.`);
      }
      station.waterLevelPercentage = waterLevelPercentage;
      commit('UPDATE_STATION_DATA', station);
      console.log(`Station data updated in Vuex state for station: ${station._id}`);
    }
  }
};
