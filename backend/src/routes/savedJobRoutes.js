const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const savedJobController = require('../controllers/savedJobController');
const { authenticateToken, requireCandidate } = require('../middleware/auth');

// POST /api/saved-jobs
router.post(
  '/',
  authenticateToken,
  requireCandidate,
  [
    body('job_id')
      .notEmpty().withMessage('job_id is required.')
      .isInt({ min: 1 }).withMessage('job_id must be a valid positive integer.')
  ],
  savedJobController.saveJob
);

// GET /api/saved-jobs
router.get(
  '/',
  authenticateToken,
  requireCandidate,
  savedJobController.getSavedJobs
);

// DELETE /api/saved-jobs/:jobId
router.delete(
  '/:jobId',
  authenticateToken,
  requireCandidate,
  savedJobController.unsaveJob
);

// GET /api/saved-jobs/check/:jobId
router.get(
  '/check/:jobId',
  authenticateToken,
  requireCandidate,
  savedJobController.checkSavedJob
);

module.exports = router;
