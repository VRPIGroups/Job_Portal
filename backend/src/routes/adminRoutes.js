// backend/src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { uploadProfileImage } = require('../middleware/upload');

// Public route helper (Categories & Locations are accessible by users as well for dropdown lists)
// But we mount them under /api/admin/ public GET if needed, or define admin CRUD as gated
router.get('/public/categories', adminController.getCategories);
router.get('/public/locations', adminController.getLocations);

// Admin Analytics Stats
router.get('/stats', authenticateToken, requireAdmin, adminController.getDashboardStats);

// Admin User Directory Auditing
router.get('/users', authenticateToken, requireAdmin, adminController.getUsers);
router.patch('/users/:id/status', authenticateToken, requireAdmin, adminController.toggleUserStatus);

// Admin Contact Messages
const contactController = require('../controllers/contactController');
router.get('/messages', authenticateToken, requireAdmin, contactController.getMessages);
router.delete('/messages/:id', authenticateToken, requireAdmin, contactController.deleteMessage);

// Categories Admin CRUD
router.get('/categories', authenticateToken, requireAdmin, adminController.getCategories);
router.post('/categories', authenticateToken, requireAdmin, adminController.createCategory);
router.put('/categories/:id', authenticateToken, requireAdmin, adminController.updateCategory);
router.delete('/categories/:id', authenticateToken, requireAdmin, adminController.deleteCategory);

// Skills Admin CRUD
router.get('/skills', authenticateToken, requireAdmin, adminController.getSkills);
router.post('/skills', authenticateToken, requireAdmin, adminController.createSkill);
router.put('/skills/:id', authenticateToken, requireAdmin, adminController.updateSkill);
router.delete('/skills/:id', authenticateToken, requireAdmin, adminController.deleteSkill);

// Locations Admin CRUD
router.get('/locations', authenticateToken, requireAdmin, adminController.getLocations);
router.post('/locations', authenticateToken, requireAdmin, adminController.createLocation);
router.put('/locations/:id', authenticateToken, requireAdmin, adminController.updateLocation);
router.delete('/locations/:id', authenticateToken, requireAdmin, adminController.deleteLocation);

// Email Templates Admin CRUD
router.get('/templates', authenticateToken, requireAdmin, adminController.getTemplates);
router.put('/templates/:id', authenticateToken, requireAdmin, adminController.updateTemplate);

// Authenticated Candidate Profile Update (upload profile logo if provided)
router.put('/profile', authenticateToken, uploadProfileImage, adminController.updateProfile);

module.exports = router;
