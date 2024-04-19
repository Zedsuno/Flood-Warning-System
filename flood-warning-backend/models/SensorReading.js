const mongoose = require('mongoose');

const SensorReadingSchema = new mongoose.Schema({
  timestamp: Date,
  value: Number, // The distance from the sensor to the water surface
});

module.exports = mongoose.model('SensorReading', SensorReadingSchema);