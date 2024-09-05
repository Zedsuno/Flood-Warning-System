// Defines the schema for hardware, including hardware ID, equipment ID, name, sensor type, and readings.
const mongoose = require('mongoose');
const SensorReading = require('./SensorReading');
const Station = require('./Station');

const HardwareSchema = new mongoose.Schema({
  HardwareID: String,
  equipment_id: { type: String, required: true,unique: true },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  name: String,
  sensorType: String,
  readings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorReading' }],
}, { timestamps: true });

module.exports = mongoose.model('Hardware', HardwareSchema);