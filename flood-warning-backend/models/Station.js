const mongoose = require('mongoose');
const Hardware = require('./Hardware');
// Define ThresholdSchema next
const ThresholdSchema = new mongoose.Schema({
  name: String,
  value: Number,
  color: String,
}, { _id: false });

// Now define StationSchema
const StationSchema = new mongoose.Schema({
  stationName: String,
  hardware: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hardware'
  }],  location: {
    address: String,
    river: String,
    state: String,
    postalCode: String,
    latitude: Number,
    longitude: Number,
  },
  active: Boolean,
  thresholds: [ThresholdSchema],
  status: String,
  apiKey: String,
  sensorDistance: Number,
  waterline: Number, // The
  WaterLevel: Number,
  // The depth
});

StationSchema.virtual('Water Level').get(function() {
  if (!this.hardware.length) return null; // No hardware linked
  const latestReading = this.hardware.map(h => h.readings[h.readings.length - 1]).reduce((a, b) => a.timestamp > b.timestamp ? a : b, {value: null});
  return latestReading.value !== null ? this.distanceSensor - latestReading.measurement : null;
});

StationSchema.virtual('WaterDepth').get(function() {
  // 'riverbedDistance' is the total depth from riverbed to water surface
  return this.waterline - this.WaterLevel;
});

StationSchema.methods.linkSensor = function(sensorId) {
  if (!this.hardware.includes(sensorId)) {
    this.hardware.push(sensorId);
    return this.save();
  }
};

module.exports = mongoose.model('Station', StationSchema);