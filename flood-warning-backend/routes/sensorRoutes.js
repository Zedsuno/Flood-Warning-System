const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/sensors/:hardware',sensorController.getSensorReadingsByHardwareId) 


module.exports = router;