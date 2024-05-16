const mongoose = require('mongoose');

const SensorReadingSchema = new mongoose.Schema({
  measurement: Number,
  sensorId: String,
}, { timestamps: true });


module.exports = mongoose.model('SensorReading', SensorReadingSchema);