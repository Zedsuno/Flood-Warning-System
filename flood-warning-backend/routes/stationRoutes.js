const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController.js');

// Route to handle creating a new station
router.post('/stations', stationController.createStation);
router.get('/stations/:id', stationController.getStationById);
router.get('/stations', stationController.getAllStation);
router.put('/stations/:id', stationController.updateStation);
router.delete('/stations/:id', stationController.deleteStation);


module.exports = router;