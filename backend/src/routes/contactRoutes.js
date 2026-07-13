// backend/src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Submit message (Public)
router.post('/', contactController.submitMessage);

module.exports = router;
