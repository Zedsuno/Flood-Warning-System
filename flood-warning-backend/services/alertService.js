// Handles socket connections and sends alerts to connected clients.
// services/alertService.js

let io; // Socket.IO instance

// Initialize Socket.IO
function initializeSocket(server) {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

// Send alert to all connected clients
function sendAlert(alert) {
  if (io) {
    io.emit('newAlert', alert); // Sends the alert to all connected clients
    console.log(`Alert sent to all clients: ${alert}`);
  }
}

module.exports = {
  initializeSocket,
  sendAlert
};
