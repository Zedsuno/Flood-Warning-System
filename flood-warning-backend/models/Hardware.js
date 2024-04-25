const mongoose = require('mongoose');
const SensorReading = require('./SensorReading');


const HardwareSchema = new mongoose.Schema({
  equipment_id: { type: String, unique: true },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },  // Link to only one Station
  name: String,
  apiKey: String,
  sensorType: String,
  readings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorReading' }],
}, { timestamps: true });

module.exports = mongoose.model('Hardware', HardwareSchema);