// Handles CRUD operations for hardware and links hardware to stations.
const Hardware = require('../models/Hardware');
const mongoose = require('mongoose');
const Station = require('../models/Station');
const axios = require('axios');
const SensorReading = require('../models/SensorReading');


exports.updateHardwareSettings = async (req, res) => {
  
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

  // Check if hardware exists first
  try {
    const hardware = await Hardware.findOne({ equipment_id: hardwareID });
    if (!hardware) {
      return res.status(404).json({ message: "หาฺฮาร์ดแวร์ไม่เจอ!" });
    }

    // Then check if station ID is valid
    if (!mongoose.Types.ObjectId.isValid(stationId)) {
      return res.status(400).json({ message: "Invalid station ID" });
    }

    // Ensure hardware is not already linked to any station
    const linkedStation = await Station.findOne({ hardware: hardware._id });
    if (linkedStation) {
      return res.status(400).json({ message: "Hardware already linked to a station" });
    }

    // Link the hardware to the station
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Fetch sensor data from external API only after hardware is linked
    const apiResponse = await axios.get('https://run.mocky.io/v3/a2146553-f114-4222-9ed6-3b73f5d13974');
    // Add this line to check the structure of apiResponse.data
console.log('API Response Data:', apiResponse.data);

if (!apiResponse || !apiResponse.data) {
  return res.status(500).json({ message: "การตอบสนองของ API ขาดฟิลด์ข้อมูล" });
}

// Check if apiResponse.data is an array
if (!Array.isArray(apiResponse.data)) {
  return res.status(500).json({ message: "รูปแบบข้อมูลที่ไม่คาดคิดจาก API" });
}


for (const data of apiResponse.data) {
  if (!data.equipment_id || typeof data.measurement !== 'number') {
    return res.status(400).json({
      message: "Invalid sensor data format: `equipment_id` และ `measurement` เป็นฟิลด์ที่จำเป็นและต้องถูกต้อง"
    });
  }
}

const sensorData = apiResponse.data.filter(item => item.equipment_id === hardwareID);

console.log('Filtered sensorData:', sensorData); // ตรวจสอบข้อมูลที่กรองได้

if (!sensorData.length) {
      return res.status(404).json({ message: "No sensor data found for the given hardware ID" });
    }

    
    // Save fetched sensor data to the database
    for (const data of sensorData) {
      const existingReading = await SensorReading.findOne({ equipment_id: data.equipment_id, measurement: data.measurement });
    
      // Only save if the reading doesn't already exist
      if (!existingReading) {
        const newReading = new SensorReading({
          measurement: data.measurement,
          equipment_id: data.equipment_id,
        });
    
        try {
          await newReading.save();  // ตรวจสอบจุดนี้
          hardware.readings.push(newReading._id);
        } catch (err) {
          console.error("Error saving SensorReading:", err);
          return res.status(500).json({ message: 'Error saving sensor data', error: err });
        }
      }
    }

    await hardware.save();
    
  // Establish the connection between hardware and station
  try {
    station.hardware.push(hardware._id);
    await station.save();
  } catch (err) {
    console.error("Error saving Station:", err);
    return res.status(500).json({ message: 'Error saving station data', error: err });
  }
  
  try {
    hardware.station = station._id;
    await hardware.save();
  } catch (err) {
    console.error("Error saving Hardware:", err);
    return res.status(500).json({ message: 'Error saving hardware data', error: err });
  }

    res.status(200).json({ message: "Hardware linked and data fetched successfully", station });
  } catch (error) {
    console.error('Error linking hardware to station or fetching data:', error);
    res.status(500).json({ message: 'Error linking hardware to station or fetching data', error });
  }
};

exports.unlinkHardwareFromStation = async (req, res) => {
  const { hardwareId } = req.body;
  if (!hardwareId) {
    return res.status(400).json({ message: 'Hardware ID is required.' });
  }

  // ตรวจสอบว่าค่า hardwareId มีรูปแบบที่ถูกต้องหรือไม่
  if (!mongoose.Types.ObjectId.isValid(hardwareId)) {
    return res.status(400).json({ message: 'Invalid Hardware ID format.' });
  }

  try {
    // แปลง hardwareId จาก string เป็น ObjectId
    const hardwareObjectId = new mongoose.Types.ObjectId(hardwareId);

    // ค้นหา station ที่เชื่อมต่อกับ hardware ID นี้
    const station = await Station.findOne({ hardware: hardwareObjectId });
    if (!station) {
      return res.status(404).json({ message: 'Hardware not found or not linked.' });
    }

    // ลบ hardware ID ออกจาก station และอัปเดต
    station.hardware = station.hardware.filter(id => !id.equals(hardwareObjectId));
    station.active = station.hardware.length > 0;  // กำหนดสถานีเป็น inactive ถ้าไม่มี hardware เชื่อมต่อ
    await station.save();

    return res.json({ success: true, message: 'Hardware unlinked successfully.' });
  } catch (error) {
    console.error("Error during hardware unlinking:", error);
    return res.status(500).json({ message: 'Failed to unlink hardware.' });
  }
};