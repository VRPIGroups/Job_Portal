// backend/src/controllers/noteController.js
const db = require('../config/db');

// Verify that the logged in recruiter has access to this application
const verifyRecruiterAccess = async (recruiterUserId, applicationId) => {
  const application = await db('applications')
    .join('jobs', 'applications.job_id', '=', 'jobs.id')
    .select('jobs.company_id')
    .where('applications.id', applicationId)
    .first();
  
  if (!application) return false;

  const recruiter = await db('recruiters').where({ user_id: recruiterUserId }).first();
  if (!recruiter || recruiter.company_id !== application.company_id) {
    return false;
  }
  return true;
};

// Add a recruiter note
exports.addNote = async (req, res, next) => {
  try {
    const { id: applicationId } = req.params;
    const { note_text } = req.body;
    const { id: userId, role } = req.user;

    if (!note_text || !note_text.trim()) {
      return res.status(400).json({ success: false, message: 'Note content is required.' });
    }

    // Check application existence
    const application = await db('applications').where({ id: applicationId }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Enforce recruiter access check
    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(userId, applicationId);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. You do not have access to this candidate.' });
      }
    }

    const [newNote] = await db('candidate_notes').insert({
      application_id: applicationId,
      recruiter_user_id: userId,
      note_text: note_text.trim()
    }).returning('*');

    res.status(201).json({
      success: true,
      message: 'Note added successfully.',
      data: newNote
    });
  } catch (error) {
    next(error);
  }
};

// Get recruiter notes
exports.getNotes = async (req, res, next) => {
  try {
    const { id: applicationId } = req.params;
    const { id: userId, role } = req.user;

    // Check application existence
    const application = await db('applications').where({ id: applicationId }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Enforce recruiter access check
    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(userId, applicationId);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. You do not have access to this candidate.' });
      }
    }

    const notes = await db('candidate_notes')
      .join('users', 'candidate_notes.recruiter_user_id', '=', 'users.id')
      .select(
        'candidate_notes.*',
        'users.first_name as recruiter_first_name',
        'users.last_name as recruiter_last_name'
      )
      .where('candidate_notes.application_id', applicationId)
      .orderBy('candidate_notes.created_at', 'desc');

    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    next(error);
  }
};
