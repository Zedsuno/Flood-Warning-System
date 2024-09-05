// Handles LINE notification sending.
const axios = require('axios');
require('dotenv').config(); // Load environment variables from the .env file
const querystring = require('querystring');

async function sendLineNotification(message) {
  try {
    if (!message || !message.trim()) {
        console.error('Failed to send LINE notification: Message is empty');
        return;
      }

      const body = querystring.stringify({ message }); // URL-encode the message

    const response = await axios.post(
      'https://notify-api.line.me/api/notify',
      body,
     
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization': `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
        },
      }
    );
    console.log('Notification sent:', response.data);
  } catch (error) {
    console.error('Failed to send LINE notification:', error.response ? error.response.data : error.message);
  }
}

module.exports = { sendLineNotification };
