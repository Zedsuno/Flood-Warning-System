//Manages CRUD operations for stations, connects hardware to stations, handles water level updates, and sends alerts.
const Station = require('../models/Station');
const mongoose = require('mongoose');
const { updateStationData, triggerAlert } = require('../services/waterLevelService');
const { sendLineNotification } = require('../services/lineNotifyService'); 
const Alert = require('../models/Alert'); // Import the Alert model to save the log

 // Ensure this points to your Station model file

// Controller method to create a new station
exports.createStation = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const newStation = new Station(req.body);
    await newStation.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllStation = async (req, res) => {
  try{
        const stations = await Station.find({});
        res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stations", error: error });
    }
  }


  exports.getStationById = async (req, res) => {
    try {
      const stationId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(stationId)) {
        return res.status(400).json({ message: "Invalid station ID format" });
      }
      const station = await Station.findById(stationId)
        .populate('hardware') // Assuming 'hardware' is the name of the field in Station schema
        .exec(); // Execute the query to get the data
  
      if (!station) {
        return res.status(404).json({ message: "Station not found" });
      }
      res.status(200).json(station);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching station by ID", error: error.toString() });
    }
  };
  
  exports.updateStation = async (req, res) => {
    console.log(req.body);
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not available' });
    }
  
    const stationId = req.params.id;
  
    // Validate the station ID
    if (!mongoose.Types.ObjectId.isValid(stationId)) {
      return res.status(400).json({ message: "Invalid station ID format" });
    }
  
    try {
      const updatedStation = await Station.findByIdAndUpdate(stationId, req.body, { new: true, runValidators: true });
      
      if (!updatedStation) {
        return res.status(404).json({ message: "Station not found" });
      }
  
      res.status(200).json(updatedStation);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error updating station", error: error.toString() });
    }
  };

  exports.deleteStation = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const stationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(stationId)) {
      return res.status(400).json({ message: "Invalid station ID format" });
    }

    try {
      const deletedStation = await Station.findByIdAndDelete(stationId);

      if (!deletedStation) {
        return res.status(404).json({ message: "Station not found" });
      }

      res.status(200).json({ message: "Station successfully deleted", deletedStation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting station", error: error.toString() });
    }
  };

  exports.updateThresholds = async (req, res) => {
    const { _id, thresholds } = req.body;
  
    if (!_id) {
      return res.status(400).json({ error: 'Station ID is required' });
    }
  
    try {
      const updatedStation = await Station.findByIdAndUpdate(
        _id,
        { thresholds: thresholds },
        { new: true, runValidators: true }
      );
      if (!updatedStation) {
        return res.status(404).json({ error: 'Station not found' });
      }
      res.status(200).json(updatedStation);
    } catch (error) {
      console.error('Error updating thresholds:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.updateWaterLevel = async (req, res) => {
    const { _id } = req.body;
  
    console.log('Received request to update water level for station ID:', _id);
  
    if (!_id) {
      console.error('Station ID is required');
      return res.status(400).json({ error: 'Station ID is required' });
    }
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      console.error('Invalid Station ID format');
      return res.status(400).json({ error: 'Invalid Station ID format' });
    }
  
    try {
      const updatedStation = await updateStationData(_id);


       // Log the station data to check for missing fields
    console.log("Station Data:", {
      stationName: updatedStation.stationName,
      waterLevelPercentage: updatedStation.waterLevelPercentage,
      status: updatedStation.status,
      previousStatus: updatedStation.previousStatus

    });

    
       // Ensure the updatedStation data is available
    if (!updatedStation || !updatedStation.stationName || !updatedStation.waterLevelPercentage || !updatedStation.status) {
      console.error('Error: Incomplete station data for LINE notification.');
      return res.status(500).json({ error: 'Incomplete station data' });
    }

   // Trigger the alert only if the threshold has changed
   await triggerAlert(updatedStation._id, updatedStation.waterLevelPercentage, updatedStation.status);


      res.json(updatedStation);
    } catch (error) {
      console.error('Error updating station data:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };

 // Function for FloatingBadge
  exports.getStationSummary = async (req, res) => {
    try {
      const stations = await Station.find();
  
      const summary = {
        totalStations: stations.length,
        "น้อยวิกฤต": 0,
        "น้อย": 0,
        "ปกติ": 0,
        "มาก": 0,
        "ล้นตลิ่ง": 0
      };
  
      stations.forEach(station => {
        if (station.status && summary[station.status] !== undefined) {
          summary[station.status]++;
        } else {
          console.warn(`Unknown status found in station ${station.stationName}:`, station.status);
        }
      });
  
      res.json(summary);
    } catch (error) {
      console.error('Error fetching station summary:', error);
      res.status(500).send('Error fetching station summary');
    }
  };