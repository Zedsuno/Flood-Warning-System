const mongoose = require('mongoose');

const HardwareSchema = new mongoose.Schema({
  name: String,
  apiKey: String,
  sensorType: String,
  readings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorReading' }],
});

module.exports = mongoose.model('Hardware', HardwareSchema);