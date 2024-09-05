require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');
const hardwareRoutes = require('./routes/hardwareRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const alertRoutes = require('./routes/alertRoutes');
const http = require('http'); // Required for Socket.IO
const socketIo = require('socket.io'); // Import socket.io
const { initializeSocket } = require('./services/alertService'); // Import service

const app = express();
const server = http.createServer(app); // Create server for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8080', // The URL of your frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Initialize Socket.IO
initializeSocket(io);

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:8080', // The URL of your frontend
  optionsSuccessStatus: 200
};

// Use CORS with the specified options
app.use(cors(corsOptions));

// ต้องลบออก
console.log("LINE Notify Token:", process.env.LINE_NOTIFY_TOKEN);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());


// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});



// Use authRoutes with a prefix of '/api'
app.use('/api', authRoutes);
app.use('/api', stationRoutes);
app.use('/api', hardwareRoutes);
app.use('/api', sensorRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/stations', stationRoutes);

app.use((req, res, next) => {
  console.error(`404 Error - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: '404 - Not Found' });
});
// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
