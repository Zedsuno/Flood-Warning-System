const mongoose = require('mongoose');
const Hardware = require('./models/Hardware');

const hardwareData = [
  { equipment_id: '2cf7f1c0601000aa', name: 'Waterlevel Sensor', apiKey: 'api-key-123', sensorType: 'Water Level' },
  { equipment_id: 'some-other-id', name: 'Temperature Sensor', apiKey: 'api-key-456', sensorType: 'Temperature' }
  // Add more hardware objects as needed
];

mongoose.connect('mongodb://localhost:27017/Flood_Warning')
  .then(() => {
    console.log('Connected to MongoDB');
    return Hardware.deleteMany({}); // Clear existing hardware documents
  })
  .then(() => Hardware.insertMany(hardwareData))
  .then(() => console.log('Hardware seeded successfully'))
  .catch(err => console.error('Failed to seed hardware:', err))
  .finally(() => mongoose.disconnect());