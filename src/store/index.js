import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  modules: {
    stations: {
      namespaced: true,
      state() {
        return {
          currentStation: null,
          allStations: [], // This will store an array of all stations
        };
      },
      mutations: {
        SET_CURRENT_STATION(state, station) {
          state.currentStation = station;
        },
        RESET_CURRENT_STATION(state) {
          state.currentStation = null; // Resetting the state if there's an error fetching the station
        },
        SET_ALL_STATIONS(state, stations) {
          state.allStations = stations; // Mutation to update the list of all stations
        },
      },
      actions: {
        async fetchStation({ commit }, stationId) {
          try {
            const response = await axios.get(`http://localhost:3001/api/stations/${stationId}`);
            commit('SET_CURRENT_STATION', response.data);
          } catch (error) {
            console.error("Error fetching station:", error);
            commit('RESET_CURRENT_STATION'); // Reset to null if there's an error
          }
        },
        async fetchAllStations({ commit }) {
          try {
            const response = await axios.get(`http://localhost:3001/api/stations`);
            commit('SET_ALL_STATIONS', response.data);
          } catch (error) {
            console.error("Error fetching all stations:", error);
            // Handle error for fetching all stations if needed
          }
        },
      },
    },
  },
});

export default store;