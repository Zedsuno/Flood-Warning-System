
import axios from 'axios';

export async function fetchAllStations() {
  try {
    const response = await axios.get('http://localhost:3001/api/stations');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stations', error);
    throw error;
  }
}

export async function fetchSensorData(hardwareId) {
  try {
    const response = await axios.get(`http://localhost:3001/api/sensors/${hardwareId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sensor data', error);
    throw error;
  }
}

export async function updateStationData(stationId) {
  try {
    const response = await axios.post('http://localhost:3001/api/updateWaterLevel', { _id: stationId });
    return response.data;
  } catch (error) {
    console.error('Failed to update station data', error);
    throw error;
  }
}