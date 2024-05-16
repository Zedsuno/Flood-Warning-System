require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');
const hardwareRoutes = require('./routes/hardwareRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

// Use CORS with the specified options
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Use authRoutes with a prefix of '/api'
app.use('/api', authRoutes);
app.use('/api', stationRoutes);
app.use('/api', hardwareRoutes);
app.use('/api', sensorRoutes);
app.use('/api/stations', stationRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
