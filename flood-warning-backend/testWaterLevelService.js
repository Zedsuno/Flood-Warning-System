const mongoose = require('mongoose');
const { updateStationData } = require('./services/waterLevelService');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/Flood_Warning';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    
    // Replace with a valid station ID from your database
    const stationId = '66474837bf2da44149e57d3a';

    updateStationData(stationId)
      .then(station => {
        console.log('Updated station:', station);
        mongoose.disconnect();
      })
      .catch(error => {
        console.error('Error updating station data:', error);
        mongoose.disconnect();
      });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });
