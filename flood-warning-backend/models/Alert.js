// Defines the schema for alerts, including station ID, water level, threshold, type, recipient, and timestamp.
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  waterLevelPercentage: {
    type: Number,
    required: true,
  },
  thresholdBreached: {
    type: String,
    required: true,
  },
  alertType: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  lineMessage: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Alert', AlertSchema);
