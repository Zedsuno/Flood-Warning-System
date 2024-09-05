// Defines routes for authentication.
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Login route
router.post('/login', authController.login);

// Registration route
router.post('/register', authController.register);

module.exports = router;
