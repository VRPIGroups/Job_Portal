// backend/src/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');
const { uploadResume } = require('../middleware/upload');

// All profile endpoints require a valid JWT token
router.use(authenticateToken);

// Resume Management
router.post('/resume', uploadResume, profileController.uploadResume);
router.get('/resume', profileController.getResumeDetails);
router.get('/resume/download', profileController.downloadResume);
router.delete('/resume', profileController.deleteResume);

// Notifications Management
router.get('/notifications', profileController.getNotifications);
router.patch('/notifications/:id/read', profileController.markNotificationAsRead);

module.exports = router;
