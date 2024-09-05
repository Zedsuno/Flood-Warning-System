// Defines the schema for sensor readings, including measurement, sensor ID, and timestamp.
const mongoose = require('mongoose');

const SensorReadingSchema = new mongoose.Schema({
  measurement: { type: Number, required: true }, // The actual sensor reading value
  equipment_id: { type: String, required: true }, // Ensures consistency with Hardware model
  hardwareId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hardware',  }, // Reference to associated hardware
  timestamp: { type: Date, default: Date.now }, // When the reading was taken
}, { timestamps: true });

module.exports = mongoose.model('SensorReading', SensorReadingSchema);