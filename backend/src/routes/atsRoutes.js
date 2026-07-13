// backend/src/routes/atsRoutes.js
const express = require('express');
const router = express.Router();

// Controllers
const noteController = require('../controllers/noteController');
const interviewController = require('../controllers/interviewController');
const atsController = require('../controllers/atsController');
const db = require('../config/db');
const resumeParser = require('../services/resumeParser');
const path = require('path');

// Middlewares
const { authenticateToken, requireAdmin, requireAdminOrRecruiter } = require('../middleware/auth');

// 1. Recruiter Notes
router.post('/applications/:id/notes', authenticateToken, requireAdminOrRecruiter, noteController.addNote);
router.get('/applications/:id/notes', authenticateToken, requireAdminOrRecruiter, noteController.getNotes);

// 2. Interview Management
router.post('/applications/:id/interviews', authenticateToken, requireAdminOrRecruiter, interviewController.scheduleInterview);
router.get('/interviews/:id', authenticateToken, interviewController.getInterviewById);
router.put('/interviews/:id', authenticateToken, requireAdminOrRecruiter, interviewController.updateInterview);
router.post('/interviews/:id/cancel', authenticateToken, requireAdminOrRecruiter, interviewController.cancelInterview);
router.post('/interviews/:id/feedback', authenticateToken, requireAdminOrRecruiter, interviewController.addFeedback);
router.post('/interviews/:id/attendance', authenticateToken, interviewController.updateAttendance);
router.post('/interviews/:id/send-reminder', authenticateToken, requireAdminOrRecruiter, interviewController.sendManualReminder);
router.get('/applications/:id/interviews', authenticateToken, interviewController.getInterviewsForApplication);

// 3. Resume Parsing (Manual Trigger & GET)
router.post('/applications/:id/parse-resume', authenticateToken, requireAdminOrRecruiter, async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await db('applications')
      .join('users', 'applications.user_id', '=', 'users.id')
      .select('applications.*', 'users.first_name', 'users.last_name', 'users.email', 'users.phone')
      .where('applications.id', id)
      .first();

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const filePath = path.join(__dirname, '../../public/uploads/resumes', application.resume);
    const parsed = await resumeParser.parseResume(filePath, {
      full_name: `${application.first_name} ${application.last_name}`,
      email: application.email,
      phone: application.phone,
      skills: application.skills
    });

    // Check if record exists
    const existing = await db('resume_data').where({ application_id: id }).first();
    let result;
    if (existing) {
      [result] = await db('resume_data')
        .where({ application_id: id })
        .update({
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone,
          skills: parsed.skills,
          experience: parsed.experience,
          education: parsed.education,
          created_at: new Date()
        })
        .returning('*');
    } else {
      [result] = await db('resume_data')
        .insert({
          application_id: id,
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone,
          skills: parsed.skills,
          experience: parsed.experience,
          education: parsed.education
        })
        .returning('*');
    }

    res.status(200).json({
      success: true,
      message: 'Resume parsed and data synchronized successfully.',
      data: result
    });
  } catch (err) {
    next(err);
  }
});

router.get('/applications/:id/resume-data', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await db('resume_data').where({ application_id: id }).first();
    if (!data) {
      return res.status(404).json({ success: false, message: 'No parsed resume data found for this application.' });
    }
    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
});

// 4. Analytics & Reports
router.get('/reports/analytics', authenticateToken, requireAdminOrRecruiter, atsController.getAnalytics);
router.get('/reports/export/:type', authenticateToken, requireAdminOrRecruiter, atsController.exportReport);

// 5. Candidates & Recruiters List
router.get('/candidates', authenticateToken, requireAdminOrRecruiter, atsController.getCandidates);
router.get('/recruiters', authenticateToken, requireAdmin, atsController.getRecruiters);

// 6. Global Interviews (Calendar / Dashboard list)
router.get('/interviews', authenticateToken, requireAdminOrRecruiter, interviewController.getAllInterviews);

// 7. Email Logs & Retries
const emailLogController = require('../controllers/emailLogController');
router.get('/emails/logs', authenticateToken, requireAdmin, emailLogController.getEmailLogs);
router.post('/emails/retry/:id', authenticateToken, requireAdmin, emailLogController.retryEmail);
router.post('/emails/send-manual', authenticateToken, requireAdmin, emailLogController.sendManualEmail);

module.exports = router;
