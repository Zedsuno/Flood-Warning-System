const Station = require('../models/Station');
const mongoose = require('mongoose');
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

  
