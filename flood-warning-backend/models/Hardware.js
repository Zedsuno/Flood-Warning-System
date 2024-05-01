const mongoose = require('mongoose');
const SensorReading = require('./SensorReading');
const Station = require('./Station');

const HardwareSchema = new mongoose.Schema({
  HardwareID: String,
  equipment_id: { type: String, required: true,unique: true },
  Station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  name: String,
  apiKey: String,
  sensorType: String,
  readings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorReading' }],
}, { timestamps: true });

module.exports = mongoose.model('Hardware', HardwareSchema);