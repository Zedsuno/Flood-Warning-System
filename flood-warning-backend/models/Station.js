const mongoose = require('mongoose');

const SensorReadingSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  value: Number, // The actual reading from the sensor
  // Add additional fields for other sensor data if needed
}, { _id: false });

const HardwareSchema = new mongoose.Schema({
  name: String, // Name or description of the hardware
  apiKey: String, // Unique API key for the sensor
  sensorType: String, // Type of the sensor, e.g., "Water Level Sensor"
  readings: [SensorReadingSchema], // Array to store multiple readings over time
}, { _id: false });

const StationSchema = new mongoose.Schema({
  stationId: String,
  hardware: [HardwareSchema], // Now an array to support multiple hardware devices
  software: String,
  location: {
    address: String,
    river: String,
    state: String,
    postalCode: String,
    latitude: Number,
    longitude: Number,
    elevation: Number,
    precision: String,
  },
  active: Boolean, // Whether the station is active or not
  waterLevel: Number, // Current water level
  referenceArea: String, // The area that the station is monitoring
  waterLevelThreshold: Number, // The threshold of water level for alerts
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  apiKey: String, // Unique API key for the station
});

module.exports = mongoose.model('Station', StationSchema);