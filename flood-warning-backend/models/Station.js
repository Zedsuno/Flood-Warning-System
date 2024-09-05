// Defines the schema for stations, including station name, hardware, location, active status, thresholds, status, sensor distance, waterline, water level, bank level, water level percentage, last threshold breached, last alert sent, last sent status, and last water level percentage.
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
  active: { type: Boolean, default: false },
  thresholds: [ThresholdSchema],
  status: String,
  sensorDistance: Number,
  waterline: Number, // The
  waterLevel: Number,
  bankLevel: Number,
  waterLevelPercentage : Number,
  lastThresholdBreached: String,
  lastAlertSent: { type: Date, default: null },
  lastSentStatus: String,
  lastWaterLevelPercentage: { type: Number, default: null } 
  // The depth
});



module.exports = mongoose.model('Station', StationSchema);