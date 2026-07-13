// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');

// Rate limit authentications
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email', authController.verifyEmail);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
