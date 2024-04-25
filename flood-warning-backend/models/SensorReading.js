const mongoose = require('mongoose');

const SensorReadingSchema = new mongoose.Schema({
  waterLine: Number,
  distanceSensor: Number,
  measurement: Number,
  sensorId: String
}, { timestamps: true });


module.exports = mongoose.model('SensorReading', SensorReadingSchema);