const mongoose = require('mongoose');
// Define ThresholdSchema next
const ThresholdSchema = new mongoose.Schema({
  name: String,
  value: Number,
  color: String,
}, { _id: false });

// Now define StationSchema
const StationSchema = new mongoose.Schema({
  stationId: String,
  hardware: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hardware' }],
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
  active: Boolean,
  thresholds: [ThresholdSchema],
  status: String,
  apiKey: String,
  sensorDistance: Number, // The fixed distance from the sensor to a reference point
  riverbedDistance: Number, // The distance from the reference point to the riverbed
});

StationSchema.virtual('waterSurfaceToSensor').get(function() {
  // Assuming 'sensorDistance' is the height of the sensor from the riverbed
  // and the latest sensor value is the distance to the water surface
  const latestReading = this.hardware.map(h => h.readings[h.readings.length - 1]).reduce((a, b) => a.timestamp > b.timestamp ? a : b, {value: 0});
  return this.sensorDistance - latestReading.value;
});

StationSchema.virtual('totalWaterDepth').get(function() {
  // 'riverbedDistance' is the total depth from riverbed to water surface
  return this.riverbedDistance - this.waterSurfaceToSensor;
});

module.exports = mongoose.model('Station', StationSchema);