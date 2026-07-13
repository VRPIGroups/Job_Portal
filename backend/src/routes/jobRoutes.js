// backend/src/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateToken, optionalAuthenticateToken, requireAdmin, requireAdminOrRecruiter } = require('../middleware/auth');

// Public endpoints
router.get('/', optionalAuthenticateToken, jobController.getJobs);
router.get('/skills', jobController.getAllSkills);
router.get('/:id', jobController.getJobById);

// Admin & Recruiter endpoints
router.post('/', authenticateToken, requireAdminOrRecruiter, jobController.createJob);
router.put('/:id', authenticateToken, requireAdminOrRecruiter, jobController.updateJob);
router.delete('/:id', authenticateToken, requireAdminOrRecruiter, jobController.deleteJob);
router.patch('/:id/assign-recruiter', authenticateToken, requireAdmin, jobController.assignRecruiter);

module.exports = router;
