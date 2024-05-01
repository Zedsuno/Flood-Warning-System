const express = require('express');
const router = express.Router();
const SensorReading = require('../models/SensorReading');

router.get('/sensors/:hardwareId', async (req, res) => {
    try {
      const hardwareId = req.params.hardwareId;
      const readings = await SensorReading.find({ sensorId: hardwareId });
  
      if (readings.length === 0) {
        return res.status(404).json({ message: "No readings found for this hardware ID." });
      }
      res.json(readings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sensor readings", error: error.message });
    }
  });

module.exports = router;