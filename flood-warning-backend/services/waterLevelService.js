const axios = require('axios');
const Station = require('../models/Station');

async function fetchSensorData(hardwareId) {
  console.log(`Fetching sensor data for hardware ID: ${hardwareId}`);
  const response = await axios.get(`http://localhost:3001/api/sensors/${hardwareId}`);
  console.log(`Sensor data fetched:`, response.data);
  return response.data;
}

function calculateWaterLevels(station, latestMeasurement) {
  const bankLevel = latestMeasurement - station.sensorDistance;
  const waterLevel = station.waterline - bankLevel;
  const waterLevelPercentage = (waterLevel / station.waterline) * 100;

  console.log(`Calculated bankLevel: ${bankLevel}, waterLevel: ${waterLevel}, waterLevelPercentage: ${waterLevelPercentage}`);
  return { bankLevel, waterLevel, waterLevelPercentage };
}

function applyThresholds(waterLevelPercentage, thresholds) {
  console.log(`Applying thresholds with water level percentage: ${waterLevelPercentage}`);

  // Use the provided thresholds (user-defined thresholds)
  console.log('Thresholds:', thresholds);

  // Sort thresholds by value in descending order
  thresholds.sort((a, b) => b.value - a.value);
  
  if (waterLevelPercentage < thresholds[thresholds.length - 1].value) {
    console.log(`Threshold match found: ${thresholds[thresholds.length - 1].name} for water level percentage: ${waterLevelPercentage}`);
    return thresholds[thresholds.length - 1].name;
  }

  for (let i = 0; i < thresholds.length; i++) {
    console.log(`Checking threshold: ${thresholds[i].name} with value: ${thresholds[i].value}`);
    if (waterLevelPercentage >= thresholds[i].value) {
      console.log(`Threshold match found: ${thresholds[i].name} for water level percentage: ${waterLevelPercentage}`);
      return thresholds[i].name;
    }
  }

  console.log(`No matching threshold found, defaulting to "ไม่พบค่า"`);
  return "ไม่พบค่า";
}

async function updateStationData(stationId) {
  try {
    console.log(`Updating station data for station ID: ${stationId}`);
    const station = await Station.findById(stationId);
    if (!station) {
      console.error(`Station not found for ID: ${stationId}`);
      throw new Error('Station not found');
    }

    console.log(`Station found: ${station.stationName}, Hardware: ${station.hardware}`);
    const sensorData = await fetchSensorData(station.hardware[0]);
    if (!sensorData || sensorData.length === 0) {
      console.error(`No sensor data found for hardware ID: ${station.hardware[0]}`);
      throw new Error('No sensor data found');
    }

    const latestMeasurement = sensorData[sensorData.length - 1].measurement;
    console.log(`Latest measurement: ${latestMeasurement}`);

    const { bankLevel, waterLevel, waterLevelPercentage } = calculateWaterLevels(station, latestMeasurement);
    console.log(`Bank Level: ${bankLevel}, Water Level: ${waterLevel}, Water Level Percentage: ${waterLevelPercentage}`);

    const status = applyThresholds(waterLevelPercentage, station.thresholds);
    console.log(`Final status determined: ${status}`);

    station.bankLevel = bankLevel;
    station.waterLevel = waterLevel;
    station.waterLevelPercentage = waterLevelPercentage;
    station.status = status;

    await station.save();
    console.log(`Updated station data for ID ${stationId}:`, {
      bankLevel,
      waterLevel,
      waterLevelPercentage,
      status
    });

    return station;
  } catch (error) {
    console.error(`Error updating station data for ID ${stationId}:`, error.message);
    throw error;
  }
}

module.exports = {
  updateStationData
};
