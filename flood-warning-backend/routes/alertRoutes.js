// routes/alertRoutes.js
// Defines routes for alert operations.
const express = require('express');
const Alert = require('../models/Alert');
const { createAlert } = require('../controllers/alertController');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const { page = 1, limit = 10, startDate, endDate, stationId, alertType } = req.query;
  
      // Build the query based on the filter parameters
      let query = {};
  
      if (startDate && endDate) {
        query.timestamp = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
      if (stationId && stationId !== 'all') {
        query.stationId = stationId;
      }
      if (alertType && alertType !== 'all') {
        query.alertType = alertType;
      }
  
      // Count total documents for pagination
      const totalItems = await Alert.countDocuments(query);
  
      // Fetch the paginated results
      const alerts = await Alert.find(query)
        .populate('stationId') // Ensure stationName is included
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const totalPages = Math.ceil(totalItems / limit);
  
      res.status(200).json({
        alerts,
        totalPages,
        currentPage: Number(page),
        totalItems
      });
    } catch (error) {
      console.error('Error fetching paginated alerts:', error.message);
      res.status(500).json({ error: 'Failed to fetch alerts' });
    }
  });
  
  router.post('/create', createAlert);

module.exports = router;
