const SensorReading = require('../models/SensorReading'); // assuming you have a Mongoose model for Sensor Readings

// Get sensor readings by hardware ID
exports.getSensorReadingsByHardwareId = async (req, res) => {
    try {
        const hardwareID = req.params.hardwareID;
        const readings = await SensorReading.find({ hardwareId: hardwareID });
        if (!readings) {
            return res.status(404).json({ message: 'No readings found for this hardware ID' });
        }
        res.json(readings);
    } catch (error) {
        console.error("Failed to fetch sensor readings:", error);
        res.status(500).json({ message: 'Error fetching sensor readings', error: error.message });
    }
};