// backend/src/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authenticateToken, requireCandidate, requireAdmin, requireAdminOrRecruiter } = require('../middleware/auth');
const { uploadResume } = require('../middleware/upload');

// Candidate submitting a job application (resume required)
router.post('/', authenticateToken, requireCandidate, uploadResume, applicationController.createApplication);

// Retrieve applications (candidates get their own, admin gets all)
router.get('/', authenticateToken, applicationController.getApplications);
router.get('/:id', authenticateToken, applicationController.getApplicationById);

// Admin or Recruiter application state updates
router.patch('/:id/status', authenticateToken, requireAdminOrRecruiter, applicationController.updateApplicationStatus);
router.put('/:id/status', authenticateToken, requireAdminOrRecruiter, applicationController.updateApplicationStatus);
router.patch('/:id/assign-recruiter', authenticateToken, requireAdmin, applicationController.assignRecruiter);

module.exports = router;
