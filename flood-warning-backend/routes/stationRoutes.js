// Handles station routes and integrates with the station controller.
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController.js');
const { sendLineNotification } = require('../services/lineNotifyService');

// Route to handle creating a new station
router.post('/stations', stationController.createStation);
router.get('/stations/:id', stationController.getStationById);
router.get('/stations', stationController.getAllStation);
router.put('/stations/:id', stationController.updateStation);
router.delete('/stations/:id', stationController.deleteStation);
router.post('/updateWaterLevel', stationController.updateWaterLevel);
router.post('/updateThresholds', stationController.updateThresholds);
router.get('/station-summary', stationController.getStationSummary);

// Temporary route to test LINE notifications
router.get('/test-line-notification', (req, res) => {
    console.log('Attempting to send notification...');
    
    sendLineNotification("Test notification from server!")
      .then(() => {
        console.log('Notification sent successfully');
        res.send('Notification sent!');
      })
      .catch(err => {
        console.error('Error sending notification:', err);
        res.status(500).send('Failed to send notification');
      });
  });

module.exports = router;
