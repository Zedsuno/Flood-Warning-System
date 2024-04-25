const express = require('express');
const router = express.Router();
const hardwareController = require('../controllers/hardwareController');

// Route to update hardware settings
router.put('/update/:id', hardwareController.updateHardwareSettings);
router.post('/hardware/link-and-fetch', hardwareController.linkHardwareToStationAndFetchData);
router.post('/hardware/unlink', hardwareController.unlinkHardwareFromStation);

module.exports = router;