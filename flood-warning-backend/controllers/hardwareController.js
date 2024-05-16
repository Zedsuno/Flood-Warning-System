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

    const linkedStation = await Station.findOne({ hardware: hardware._id });
    if (linkedStation) {
      return res.status(400).json({ message: "Hardware already linked" });
    }

    // Fetch sensor data from an external API
    const apiResponse = await axios.get('https://run.mocky.io/v3/fac87583-0904-4b86-b3da-bd4c2af4bede');
    const sensorData = apiResponse.data.filter(item => item.equipment_id === hardwareID);
    if (!sensorData.length) {
      return res.status(404).json({ message: "No sensor data found for the given hardware ID" });
    }

    // Save sensor data to the database
    for (const data of sensorData) {
      const existingReading = await SensorReading.findOne({ sensorId: data.id });
      const readingId = existingReading ? existingReading._id : (await new SensorReading({
        measurement: data.measurement,
        sensorId: data.id
      }).save())._id;

      hardware.readings.push(readingId);
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
    res.status(500).json({ message: 'Error linking hardware to station or fetching data', error });
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