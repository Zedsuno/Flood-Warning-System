import { createStore } from 'vuex';
import axios from 'axios';
import waterLevels from './module/waterLevels';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: {
    stations: {
      namespaced: true,
      state() {
        return {
          isLinking: false,
          currentStation: null,
          allStations: [], // This will store an array of all stations
          selectedStation: null, 
          error: null,
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
          console.log("Setting all stations", stations);
          state.allStations = stations;
        },
        START_LINKING(state) {
          state.isLinking = true;
        },
        FINISH_LINKING(state) {
          state.isLinking = false;
        },
        RESET_LINKING(state) {
          state.isLinking = false;
        },
        SELECT_STATION(state, stationId) {
          state.selectedStation = state.allStations.find(s => s._id === stationId);
        },
        DESELECT_STATION(state) {  // Add this to manage deselecting the station
          state.selectedStation = null;
        },
        SET_ERROR(state, error) {  // Mutation to set error
          state.error = error;
        },
        CLEAR_ERROR(state) {  // Clear any error state
          state.error = null;
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
    waterLevels
  },
  plugins: [
    createPersistedState({
      paths: [
        'stations.allStations',
        'stations.selectedStation',  // Ensuring all stations are persisted
        'waterLevels.statuses' // Add other paths as necessary
      ]
    })
  ]
});
export default store;