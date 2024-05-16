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
  sensorDistance: Number,
  waterline: Number, // The
  waterLevel: Number,
  bankLevel: Number,
  waterLevelPercentage : Number,
  // The depth
});



module.exports = mongoose.model('Station', StationSchema);