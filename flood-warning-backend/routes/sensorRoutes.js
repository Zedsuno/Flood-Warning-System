// Handles sensor routes and integrates with the sensor controller.
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/sensors/:hardwareID',sensorController.getSensorReadingsByHardwareId) 


module.exports = router;