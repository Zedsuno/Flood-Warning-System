//Retrieves sensor data and links it with stations.
const SensorReading = require('../models/SensorReading'); // assuming you have a Mongoose model for Sensor Readings
const Hardware = require('../models/Hardware');

// Get sensor readings by hardware ID
exports.getSensorReadingsByHardwareId = async (req, res) => {
  try {
      const hardwareID = req.params.hardwareID; // Get the hardware ID from request parameters
      console.log("Requesting hardwareID:", hardwareID); // Debugging line

      // Find hardware by its ObjectId
      const hardware = await Hardware.findOne({ _id: hardwareID });
      if (!hardware) {
          return res.status(404).json({ message: 'หาฮาร์ดแวร์ไม่เจอ' }); // Hardware not found
      }

      // Fetch sensor readings associated with the hardware
      const readings = await SensorReading.find({ equipment_id: hardware.equipment_id }); // Corrected field name

      console.log("Found sensor readings:", readings); // Debugging line to check what readings are found

      // If no readings are found
      if (!readings || readings.length === 0) {
          return res.status(404).json({ message: 'No readings found for this hardware ID' });
      }

      // Return the readings in the response
      res.json(readings);
  } catch (error) {
      console.error("Failed to fetch sensor readings:", error); // Log the error
      res.status(500).json({ message: 'Error fetching sensor readings', error: error.message });
  }
};