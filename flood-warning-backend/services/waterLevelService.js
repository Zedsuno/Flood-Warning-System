// Handles water level calculations and updates station data.
const axios = require('axios');
const Alert = require('../models/Alert');
const Station = require('../models/Station');
const { sendLineNotification } = require('../services/lineNotifyService');
const Hardware = require('../models/Hardware');

//ปัญหา ที่ Fetch sensor data จากใน SensorReading โดยตรงเลย แล้วเอามาคำนวน
async function fetchSensorData(hardwareId) {
  console.log(`Fetching sensor data for hardware ID: ${hardwareId}`);
  const hardware = await Hardware.findById(hardwareId);
  if (!hardware) {
    throw new Error('Hardware not found');
  }
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

  // Filter out thresholds that are not specified
  const validThresholds = thresholds.filter(t => t.value !== undefined && t.value !== null);
  console.log('Valid Thresholds:', validThresholds);

  // Sort valid thresholds by value in descending order
  validThresholds.sort((a, b) => b.value - a.value);

  // Special case for values below the only specified threshold
  if (validThresholds.length === 1 && waterLevelPercentage <= validThresholds[0].value) {
    console.log(`Threshold match found: ${validThresholds[0].name} for water level percentage: ${waterLevelPercentage}`);
    return validThresholds[0].name;
  }

  // Check the sorted thresholds
  for (let i = 0; i < validThresholds.length; i++) {
    console.log(`Checking threshold: ${validThresholds[i].name} with value: ${validThresholds[i].value}`);
    if (waterLevelPercentage >= validThresholds[i].value) {
      console.log(`Threshold match found: ${validThresholds[i].name} for water level percentage: ${waterLevelPercentage}`);
      return validThresholds[i].name;
    }
  }

  console.log(`No matching threshold found, defaulting to "Below น้อยวิกฤต"`);
  return "น้อยวิกฤต";
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
    if (!station.hardware || station.hardware.length === 0) {
      console.error(`No hardware linked to station ID: ${stationId}`);
      throw new Error('No hardware linked to station');
    }

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

async function triggerAlert(stationId, waterLevelPercentage, thresholdBreached) {
  try {
    const station = await Station.findById(stationId);

    // Only trigger alert if the breached threshold or status has changed
    const previousStatus = station.lastSentStatus || 'N/A';  // Get the last sent status
    if (station.status === previousStatus && station.lastThresholdBreached === thresholdBreached) {
      console.log(`No change in status or threshold for station ${station.stationName}. No alert triggered.`);
      return;
    }

    // Check if 5 seconds have passed since the last alert
    const fiveSeconds = 5 * 1000;
    const now = new Date();

    if (station.lastAlertSent && (now - station.lastAlertSent) < fiveSeconds) {
      console.log(`Alert skipped for station ${station.stationName} due to timing limit.`);
      return; // Exit function if 5 seconds haven't passed
    }

    // Create and save the new alert
    const newAlert = new Alert({
      stationId: station._id,
      waterLevelPercentage: waterLevelPercentage,
      thresholdBreached: thresholdBreached,
      alertType: 'LINE',  // Changed to LINE for this use case
      recipient: 'User 1',  // Static for now
      timestamp: now  // Record the current time
    });

    await newAlert.save();
 
    
    // Update the last alert sent time, last threshold breached, and last sent status
    station.lastAlertSent = now;
    station.lastThresholdBreached = thresholdBreached;
    station.lastSentStatus = station.status; // Update the last sent status
    await station.save();

    console.log(`Alert saved to history for station ${station.stationName}: ${thresholdBreached} breached`);

    // **Send LINE Notification**
    const lineMessage = `🚨 แจ้งเตือน: สถานี ${station.stationName} ได้เปลี่ยนสถานะ.\n` +
      `สถานะก่อนหน้า: ${previousStatus}\n` +
      `สถานะใหม่: ${station.status}\n` +
      `ระดับน้ำ: ${waterLevelPercentage}%`;
    await sendLineNotification(lineMessage);

  } catch (error) {
    console.error('Failed to trigger alert:', error.message);
  }
}

module.exports = {
  updateStationData,
  triggerAlert
};
