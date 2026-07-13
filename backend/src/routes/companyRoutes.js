// backend/src/routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { authenticateToken, requireAdmin, requireAdminOrRecruiter } = require('../middleware/auth');
const { uploadLogo } = require('../middleware/upload');

// Public endpoints
router.get('/', companyController.getCompanies);

// Admin & Recruiter endpoints
router.get('/my-company', authenticateToken, companyController.getMyCompany);
router.post('/', authenticateToken, requireAdmin, uploadLogo, companyController.createCompany);
router.put('/:id', authenticateToken, requireAdminOrRecruiter, uploadLogo, companyController.updateCompany);
router.delete('/:id', authenticateToken, requireAdmin, companyController.deleteCompany);

module.exports = router;
