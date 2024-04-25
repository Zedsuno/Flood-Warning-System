const Hardware = require('../models/Hardware');
const mongoose = require('mongoose');
const Station = require('../models/Station');
const axios = require('axios');
const SensorReading = require('../models/SensorReading');

exports.updateHardwareSettings = async (req, res) => {
  // Example implementation
  try {
      const hardware = await Hardware.findById(req.params.id);
      if (!hardware) {
          return res.status(404).send('Hardware not found');
      }
      // Assume some fields to update
      hardware.setting = req.body.setting;
      await hardware.save();
      res.status(200).json(hardware);
  } catch (error) {
      console.error('Failed to update hardware:', error);
      res.status(500).json({ message: 'Failed to update hardware', error });
  }
};
exports.linkHardwareToStationAndFetchData = async (req, res) => {
  const { hardwareID, stationId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(stationId)) {
    return res.status(400).json({ message: "Invalid station ID" });
  }

  try {
    const hardware = await Hardware.findOne({ equipment_id: hardwareID });
    if (!hardware) {
      return res.status(404).json({ message: "Hardware not found" });
    }

    // Check if the equipment_id entered by the user matches the hardwareID
    if (hardware.equipment_id !== hardwareID) {
      return res.status(400).json({ message: "Equipment ID does not match" });
    }

    const linkedStation = await Station.findOne({ hardware: hardware._id });
    if (linkedStation) {
      return res.status(400).json({ message: "Hardware already linked" });
    }

    const apiResponse = await axios.get('https://run.mocky.io/v3/ee7c7476-b7f2-4db6-a446-e31d265338a8');
    const sensorData = apiResponse.data.filter(item => item.equipment_id === hardwareID);
    
    if (!sensorData.length) {
      return res.status(404).json({ message: "No sensor data found for the given hardware ID" });
    }

    // Save the fetched sensor data to the database
    // Note: This assumes that you have a SensorReading model similar to Hardware and Station
  
    for (const data of sensorData) {
      const existingReading = await SensorReading.findOne({ sensorId: data.id });
      if (existingReading) {
        hardware.readings.push(existingReading._id);
      } else {
        const newReading = new SensorReading({
          waterLine: data.water_line,
          distanceSensor: data.distance_sensor,
          measurement: data.measurement,
          sensorId: data.id,
        });
        const savedReading = await newReading.save();
        hardware.readings.push(savedReading._id);
      }
    }
    await hardware.save();

    // Link the hardware to the station
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    
    station.hardware.push(hardware._id);
    await station.save();

    res.status(200).json({ message: "Hardware linked and data fetched successfully", station });
  } catch (error) {
    console.error('Error linking hardware to station or fetching data:', error);
    res.status(500).json({ message: 'Failed to link hardware to station or fetch data', error });
  }
};

  exports.unlinkHardwareFromStation = async (req, res) => {
    const { hardwareId } = req.body;
    const hardware = await Hardware.findById(hardwareId);
  
    if (!hardware || !hardware.station) {
      return res.status(404).json({ message: 'Hardware not found or not linked' });
    }
  
    const stationId = hardware.station;
    hardware.station = null;
    await hardware.save();
  
    const station = await Station.findById(stationId);
    station.hardware.pull(hardware._id);
    await station.save();
  
    res.status(200).json({ message: 'Hardware unlinked successfully', station, hardware });
  };