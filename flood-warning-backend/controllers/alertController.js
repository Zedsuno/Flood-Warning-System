// controllers/alertController.js (Example)
// Handles CRUD operations for alerts and sends LINE notifications.
const { sendAlert } = require('../services/alertService');
const { sendLineNotification } = require('../services/lineNotifyService');  // Import LINE notification service
const Alert = require('../models/Alert'); // Your Mongoose model

async function createAlert(req, res) {
  try {
    const { stationId, waterLevelPercentage, thresholdBreached, alertType, recipient } = req.body;
    
        // Check if the alert already exists to avoid duplication
        const existingAlert = await Alert.findOne({
          stationId,
          waterLevelPercentage,
          thresholdBreached
        });
    
        if (existingAlert) {
          console.log('Alert already exists, skipping creation.');
          return res.status(200).json(existingAlert); // Don't create a duplicate alert
        }


    // Create the alert
    const newAlert = new Alert({
      stationId,
      waterLevelPercentage,
      thresholdBreached,
      alertType,
      recipient,
      timestamp: new Date(),
    });

    await newAlert.save();
    console.log('Alert saved to database:', newAlert);


    // Send the alert to all connected clients
    sendAlert(newAlert);

     // Construct the LINE notification message
     const lineMessage = `🚨 แจ้งเตือน: สถานี ${stationId} ได้เปลี่ยนสถานะ.\n` +
     `เกณฑ์ที่ฝ่าฝืน: ${thresholdBreached}\n` +
     `ระดับน้ำ: ${waterLevelPercentage}%`;

// Send the LINE notification
try {
await sendLineNotification(lineMessage);
console.log('LINE notification sent successfully');
} catch (error) {
console.error('Failed to send LINE notification:', error);
}


    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: 'Error creating alert', error });
  }
}

module.exports = {
  createAlert
};
