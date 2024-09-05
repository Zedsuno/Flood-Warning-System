// Seed data for hardware
const mongoose = require('mongoose');
const Hardware = require('./models/Hardware');

const hardwareData = [
  { equipment_id: '2cf7f1c0601000aa', name: 'Waterlevel Sensor', apiKey: 'api-key-123', sensorType: 'Water Level',  },
  { equipment_id: '2cf7f1c0601000ab', name: 'Waterlevel Sensor', apiKey: 'api-key-456', sensorType: 'Water Level',  },
  { equipment_id: '2cf7f1c0601000ac', name: 'Waterlevel Sensor', apiKey: 'api-key-456', sensorType: 'Water Level',  },
  { equipment_id: '2cf7f1c0601000ad', name: 'Waterlevel Sensor', apiKey: 'api-key-456', sensorType: 'Water Level',  },
  { equipment_id: '2cf7f1c0601000af', name: 'Waterlevel Sensor', apiKey: 'api-key-456', sensorType: 'Water Level',  },
  { equipment_id: '2cf7f1c0601000ag', name: 'Waterlevel Sensor', apiKey: 'api-key-456', sensorType: 'Water Level',  },
];


async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Flood_Warning');
    console.log('Connected to MongoDB');
    await Hardware.deleteMany({});
    await Hardware.insertMany(hardwareData);
    console.log('Hardware seeded successfully');
  } catch (err) {
    console.error('Failed to seed hardware:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();