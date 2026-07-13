// backend/src/controllers/interviewController.js
const db = require('../config/db');
const emailService = require('../services/emailService');

const verifyRecruiterAccess = async (recruiterUserId, applicationId) => {
  const application = await db('applications')
    .join('jobs', 'applications.job_id', '=', 'jobs.id')
    .select('jobs.company_id')
    .where('applications.id', applicationId)
    .first();
  
  if (!application) return false;

  const recruiter = await db('recruiters').where({ user_id: recruiterUserId }).first();
  if (!recruiter) return false;

  return recruiter.company_id === application.company_id;
};

// 1. Schedule Interview
exports.scheduleInterview = async (req, res, next) => {
  try {
    const { id: applicationId } = req.params;
    const {
      interview_date,
      interview_time,
      interview_type,
      meeting_link,
      venue,
      interviewer_name,
      interviewer_email,
      interview_round,
      additional_instructions,
      duration,
      timezone,
      interviewer_designation,
      department,
      round_number
    } = req.body;
    const { id: recruiterUserId, role } = req.user;

    // Validate
    if (!interview_date || !interview_time || !interview_type || !interviewer_name || !interview_round) {
      return res.status(400).json({ success: false, message: 'Date, time, mode, interviewer name, and round are required.' });
    }

    const application = await db('applications').where({ id: applicationId }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Access check
    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(recruiterUserId, applicationId);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. You do not have access to schedule interviews for this candidate.' });
      }
    }

    // Helper checks for interview progression rules
    const hasPassedRound = async (appId, roundName) => {
      const round = await db('interview_rounds')
        .where({ application_id: appId, round_name: roundName })
        .orderBy('created_at', 'desc')
        .first();
      if (round && round.status === 'Passed') return true;
      const interview = await db('interviews')
        .where({ application_id: appId, interview_round: roundName, status: 'Passed' })
        .first();
      return !!interview;
    };

    if (interview_round === 'Managerial Round') {
      const clearedTech = await hasPassedRound(applicationId, 'Technical Round');
      if (!clearedTech) {
        return res.status(400).json({ success: false, message: 'Progression Blocked: Candidate must pass Technical Round before scheduling Managerial Round.' });
      }
    } else if (interview_round === 'HR Round') {
      const clearedManagerial = await hasPassedRound(applicationId, 'Managerial Round');
      if (!clearedManagerial) {
        return res.status(400).json({ success: false, message: 'Progression Blocked: Candidate must pass Managerial Round before scheduling HR Round.' });
      }
    } else if (interview_round === 'Final Round') {
      const clearedHR = await hasPassedRound(applicationId, 'HR Round');
      if (!clearedHR) {
        return res.status(400).json({ success: false, message: 'Progression Blocked: Candidate must pass HR Round before scheduling Final Round.' });
      }
    }

    // Compute round number
    let roundNum = round_number;
    if (!roundNum) {
      const existingRoundsCount = await db('interview_rounds').where({ application_id: applicationId }).count('id as count').first();
      roundNum = parseInt(existingRoundsCount.count || 0) + 1;
    }

    // Manage interviewer details
    let interviewerDetailId = null;
    if (interviewer_email) {
      let interviewer = await db('interviewer_details').where({ email: interviewer_email }).first();
      if (!interviewer) {
        const [newInterviewer] = await db('interviewer_details').insert({
          name: interviewer_name,
          email: interviewer_email,
          designation: interviewer_designation || null,
          department: department || null
        }).returning('*');
        interviewerDetailId = newInterviewer.id;
      } else {
        await db('interviewer_details').where({ id: interviewer.id }).update({
          name: interviewer_name,
          designation: interviewer_designation || interviewer.designation,
          department: department || interviewer.department,
          updated_at: new Date()
        });
        interviewerDetailId = interviewer.id;
      }
    }

    // Create/retrieve interview round record
    let roundRecord = await db('interview_rounds')
      .where({ application_id: applicationId, round_name: interview_round })
      .first();

    if (!roundRecord) {
      [roundRecord] = await db('interview_rounds').insert({
        application_id: applicationId,
        round_name: interview_round,
        round_number: roundNum,
        status: 'Scheduled'
      }).returning('*');
    } else {
      await db('interview_rounds').where({ id: roundRecord.id }).update({
        status: 'Scheduled',
        round_number: roundNum,
        updated_at: new Date()
      });
    }

    // Insert interview record
    const [interview] = await db('interviews').insert({
      application_id: applicationId,
      interview_round_id: roundRecord.id,
      interviewer_detail_id: interviewerDetailId,
      interview_date,
      interview_time,
      interview_type,
      meeting_link: interview_type === 'Online' ? meeting_link : null,
      venue: interview_type === 'Offline' ? venue : null,
      interviewer_name,
      interviewer_email,
      interview_round,
      additional_instructions,
      status: 'Scheduled',
      duration: duration || '60 minutes',
      timezone: timezone || 'IST (UTC+5:30)',
      attendance_status: 'Pending',
      round_number: roundNum,
      interviewer_designation: interviewer_designation || null,
      department: department || null
    }).returning('*');

    // Update application details and status
    await db('applications').where({ id: applicationId }).update({
      status: interview_round,
      interview_date,
      interview_time,
      interview_mode: interview_type,
      meeting_link: interview_type === 'Online' ? meeting_link : null,
      venue: interview_type === 'Offline' ? venue : null,
      interviewer_name,
      interviewer_email,
      instructions: additional_instructions,
      updated_at: new Date()
    });

    // Insert to status history
    await db('application_status_history').insert({
      application_id: applicationId,
      status: interview_round,
      changed_by_user_id: recruiterUserId,
      remarks: `Scheduled ${interview_round} (Round ${roundNum}) on ${interview_date} at ${interview_time}.`
    });

    // Log to interview_history
    await db('interview_history').insert({
      interview_id: interview.id,
      interview_round_id: roundRecord.id,
      status: 'Scheduled',
      changed_by_user_id: recruiterUserId,
      remarks: `Scheduled ${interview_round} (Round ${roundNum}) with ${interviewer_name}.`
    });

    // Insert database notification for candidate
    const job = await db('jobs').where({ id: application.job_id }).first();
    await db('notifications').insert({
      user_id: application.user_id,
      title: `${interview_round} Scheduled`,
      message: `An interview has been scheduled for your application to "${job.title}". Round: ${interview_round}.`,
      type: 'interview',
      is_read: false
    });

    // Send email invitation
    await emailService.sendApplicationStatusEmail(applicationId, interview_round);

    res.status(201).json({
      success: true,
      message: 'Interview scheduled and invitation email dispatched.',
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

// 2. Update Interview
exports.updateInterview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      interview_date,
      interview_time,
      interview_type,
      meeting_link,
      venue,
      interviewer_name,
      interviewer_email,
      interview_round,
      additional_instructions,
      status,
      duration,
      timezone,
      round_number,
      interviewer_designation,
      department
    } = req.body;
    const { id: recruiterUserId, role } = req.user;

    const interview = await db('interviews').where({ id }).first();
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview record not found.' });
    }

    // Access check
    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(recruiterUserId, interview.application_id);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
    }

    // Update record
    const [updatedInterview] = await db('interviews').where({ id }).update({
      interview_date: interview_date || interview.interview_date,
      interview_time: interview_time || interview.interview_time,
      interview_type: interview_type || interview.interview_type,
      meeting_link: interview_type === 'Online' ? meeting_link : (interview_type === 'Offline' ? null : interview.meeting_link),
      venue: interview_type === 'Offline' ? venue : (interview_type === 'Online' ? null : interview.venue),
      interviewer_name: interviewer_name || interview.interviewer_name,
      interviewer_email: interviewer_email !== undefined ? interviewer_email : interview.interviewer_email,
      interview_round: interview_round || interview.interview_round,
      additional_instructions: additional_instructions !== undefined ? additional_instructions : interview.additional_instructions,
      status: status || interview.status,
      duration: duration || interview.duration,
      timezone: timezone || interview.timezone,
      round_number: round_number || interview.round_number,
      interviewer_designation: interviewer_designation !== undefined ? interviewer_designation : interview.interviewer_designation,
      department: department !== undefined ? department : interview.department,
      updated_at: new Date()
    }).returning('*');

    // Sync back to rounds table
    if (updatedInterview.interview_round_id) {
      await db('interview_rounds').where({ id: updatedInterview.interview_round_id }).update({
        round_name: updatedInterview.interview_round,
        round_number: updatedInterview.round_number || 1,
        status: updatedInterview.status === 'Scheduled' ? (status === 'Rescheduled' ? 'Rescheduled' : 'Scheduled') : updatedInterview.status,
        updated_at: new Date()
      });
    }

    // Log to interview_history
    await db('interview_history').insert({
      interview_id: id,
      interview_round_id: updatedInterview.interview_round_id,
      status: updatedInterview.status,
      changed_by_user_id: recruiterUserId,
      remarks: `Updated/Rescheduled interview round ${updatedInterview.interview_round}.`
    });

    // Sync back to application main row if status is scheduled
    if (updatedInterview.status === 'Scheduled') {
      await db('applications').where({ id: interview.application_id }).update({
        interview_date: updatedInterview.interview_date,
        interview_time: updatedInterview.interview_time,
        interview_mode: updatedInterview.interview_type,
        meeting_link: updatedInterview.meeting_link,
        venue: updatedInterview.venue,
        interviewer_name: updatedInterview.interviewer_name,
        interviewer_email: updatedInterview.interviewer_email,
        instructions: updatedInterview.additional_instructions,
        updated_at: new Date()
      });

      // Send update email notification
      await emailService.sendApplicationStatusEmail(interview.application_id, 'Interview Rescheduled');
    }

    res.status(200).json({
      success: true,
      message: 'Interview details updated successfully.',
      data: updatedInterview
    });
  } catch (error) {
    next(error);
  }
};

// 3. Cancel Interview
exports.cancelInterview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: recruiterUserId, role } = req.user;

    const interview = await db('interviews').where({ id }).first();
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview record not found.' });
    }

    // Access check
    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(recruiterUserId, interview.application_id);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
    }

    // Cancel interview
    const [cancelledInterview] = await db('interviews').where({ id }).update({
      status: 'Cancelled',
      updated_at: new Date()
    }).returning('*');

    // Sync back to rounds table
    if (interview.interview_round_id) {
      await db('interview_rounds').where({ id: interview.interview_round_id }).update({
        status: 'Cancelled',
        updated_at: new Date()
      });
    }

    // Log to interview_history
    await db('interview_history').insert({
      interview_id: id,
      interview_round_id: interview.interview_round_id,
      status: 'Cancelled',
      changed_by_user_id: recruiterUserId,
      remarks: `Cancelled interview round ${interview.interview_round}.`
    });

    // Update application state
    await db('applications').where({ id: interview.application_id }).update({
      status: 'Under Review',
      updated_at: new Date()
    });

    // Insert history
    await db('application_status_history').insert({
      application_id: interview.application_id,
      status: 'Under Review',
      changed_by_user_id: recruiterUserId,
      remarks: `Interview "${interview.interview_round}" cancelled.`
    });

    // Notify candidate
    const application = await db('applications').where({ id: interview.application_id }).first();
    const job = await db('jobs').where({ id: application.job_id }).first();
    const company = await db('companies').where({ id: job.company_id }).first();

    await db('notifications').insert({
      user_id: application.user_id,
      title: 'Interview Cancelled',
      message: `Your interview for "${job.title}" at ${company.name} has been cancelled. Your application is under review.`,
      type: 'interview',
      is_read: false
    });

    // Send cancellation email
    await emailService.sendEmail({
      to: (await db('users').where({ id: application.user_id }).first()).email,
      templateName: 'interview_cancelled',
      templateData: {
        name: (await db('users').where({ id: application.user_id }).first()).first_name,
        job_title: job.title,
        company_name: company.name,
        interview_round: interview.interview_round,
        applicationId: interview.application_id
      }
    });

    res.status(200).json({
      success: true,
      message: 'Interview cancelled successfully.',
      data: cancelledInterview
    });
  } catch (error) {
    next(error);
  }
};

// 4. Add/Submit Interview Feedback
exports.addFeedback = async (req, res, next) => {
  try {
    const { id: interviewId } = req.params;
    const { 
      interviewer_name, 
      feedback_text, 
      rating, 
      technical_rating,
      communication_rating,
      problem_solving_rating,
      leadership_rating,
      teamwork_rating,
      strengths,
      weaknesses,
      recruiter_remarks,
      recommendation
    } = req.body;
    const { id: recruiterUserId, role } = req.user;

    if (!interviewer_name || !feedback_text || !recommendation) {
      return res.status(400).json({ success: false, message: 'Interviewer name, feedback content, and recommendation are required.' });
    }

    const interview = await db('interviews').where({ id: interviewId }).first();
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found.' });
    }

    // Access check
    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(recruiterUserId, interview.application_id);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
    }

    // Save feedback
    const [feedback] = await db('interview_feedback').insert({
      interview_id: interviewId,
      interview_round_id: interview.interview_round_id || null,
      interviewer_name: interviewer_name.trim(),
      feedback_text: feedback_text.trim(),
      rating: rating ? parseInt(rating) : null,
      technical_rating: technical_rating ? parseInt(technical_rating) : null,
      communication_rating: communication_rating ? parseInt(communication_rating) : null,
      problem_solving_rating: problem_solving_rating ? parseInt(problem_solving_rating) : null,
      leadership_rating: leadership_rating ? parseInt(leadership_rating) : null,
      teamwork_rating: teamwork_rating ? parseInt(teamwork_rating) : null,
      strengths: strengths ? strengths.trim() : null,
      weaknesses: weaknesses ? weaknesses.trim() : null,
      recruiter_remarks: recruiter_remarks ? recruiter_remarks.trim() : feedback_text.trim(),
      recommendation: recommendation
    }).returning('*');

    // Determine target candidate status based on recommendation
    let finalInterviewStatus = 'Completed';
    let finalRoundStatus = 'Completed';
    let appResultStatus = `${interview.interview_round} Result`; // e.g. 'Technical Round Result'

    if (['Pass', 'Recommend', 'Strongly Recommend'].includes(recommendation)) {
      finalInterviewStatus = 'Passed';
      finalRoundStatus = 'Passed';
      
      // Auto move candidate to Selected if they pass HR Round
      if (interview.interview_round === 'HR Round') {
        appResultStatus = 'Selected';
      }
    } else if (['Fail', 'Reject'].includes(recommendation)) {
      finalInterviewStatus = 'Failed';
      finalRoundStatus = 'Failed';
    } else if (recommendation === 'Hold') {
      finalInterviewStatus = 'Completed';
      finalRoundStatus = 'Hold';
    }

    // Update interview status
    await db('interviews').where({ id: interviewId }).update({ 
      status: finalInterviewStatus, 
      updated_at: new Date() 
    });

    // Update round status
    if (interview.interview_round_id) {
      await db('interview_rounds').where({ id: interview.interview_round_id }).update({
        status: finalRoundStatus,
        updated_at: new Date()
      });
    }

    // Update application status
    await db('applications').where({ id: interview.application_id }).update({
      status: appResultStatus,
      updated_at: new Date()
    });

    // Record interview history
    await db('interview_history').insert({
      interview_id: interviewId,
      interview_round_id: interview.interview_round_id || null,
      status: finalInterviewStatus,
      changed_by_user_id: recruiterUserId,
      remarks: `Submitted feedback. Outcome: ${finalRoundStatus}. Recommendation: ${recommendation}.`
    });

    // Record application status history
    await db('application_status_history').insert({
      application_id: interview.application_id,
      status: appResultStatus,
      changed_by_user_id: recruiterUserId,
      remarks: `Feedback submitted for ${interview.interview_round}. Rating: ${rating || 'N/A'}/5. Outcome: ${finalRoundStatus}.`
    });

    // Automatically send email notifying candidate of the round outcome
    await emailService.sendApplicationStatusEmail(interview.application_id, appResultStatus);

    res.status(201).json({
      success: true,
      message: `Feedback submitted. Candidate transitioned to "${appResultStatus}".`,
      data: feedback
    });
  } catch (error) {
    next(error);
  }
};

// 5. Get Interview History for Application
exports.getInterviewsForApplication = async (req, res, next) => {
  try {
    const { id: applicationId } = req.params;
    const { id: userId, role } = req.user;

    const application = await db('applications').where({ id: applicationId }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Seeker can only see their own interview list
    if (role === 'candidate' && application.user_id !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
    }

    // Recruiter can only see interviews for their company's jobs
    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(userId, applicationId);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
    }

    const interviews = await db('interviews')
      .where({ application_id: applicationId })
      .orderBy('created_at', 'desc');

    // Join feedback for each interview
    const interviewsWithFeedback = [];
    for (const intr of interviews) {
      const feedbacks = await db('interview_feedback')
        .where({ interview_id: intr.id })
        .orderBy('created_at', 'desc');
      interviewsWithFeedback.push({
        ...intr,
        feedback: feedbacks
      });
    }

    res.status(200).json({
      success: true,
      data: interviewsWithFeedback
    });
  } catch (error) {
    next(error);
  }
};

// Get all interviews across applications (Calendar / Listing)
exports.getAllInterviews = async (req, res, next) => {
  try {
    const { user } = req;
    const query = db('interviews')
      .join('applications', 'interviews.application_id', '=', 'applications.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .join('users', 'applications.user_id', '=', 'users.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .select(
        'interviews.*',
        'applications.id as application_id',
        'users.first_name',
        'users.last_name',
        'users.email as candidate_email',
        'jobs.title as job_title',
        'companies.name as company_name'
      );

    if (user.role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: user.id }).first();
      if (recruiter) {
        query.where('jobs.company_id', recruiter.company_id);
      } else {
        query.whereNull('interviews.id');
      }
    }

    const interviews = await query.orderBy('interviews.interview_date', 'asc').orderBy('interviews.interview_time', 'asc');
    
    res.status(200).json({
      success: true,
      data: interviews
    });
  } catch (error) {
    next(error);
  }
};

// 7. Get Interview Details by ID
exports.getInterviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    const interview = await db('interviews')
      .join('applications', 'interviews.application_id', '=', 'applications.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .join('users as candidate', 'applications.user_id', '=', 'candidate.id')
      .leftJoin('users as recruiter_user', 'applications.assigned_recruiter_id', '=', 'recruiter_user.id')
      .select(
        'interviews.*',
        'applications.id as application_id',
        'applications.user_id as candidate_user_id',
        'applications.assigned_recruiter_id',
        'applications.status as application_status',
        'applications.skills as candidate_skills',
        'applications.cover_letter as candidate_cover_letter',
        'applications.resume as candidate_resume_file',
        'candidate.first_name as candidate_first_name',
        'candidate.last_name as candidate_last_name',
        'candidate.email as candidate_email',
        'candidate.phone as candidate_phone',
        'jobs.title as job_title',
        'jobs.company_id',
        'jobs.experience as job_experience',
        'jobs.job_type as job_type',
        'jobs.location as job_location',
        'companies.name as company_name',
        'companies.logo as company_logo',
        'companies.website as company_website',
        'recruiter_user.first_name as recruiter_first_name',
        'recruiter_user.last_name as recruiter_last_name',
        'recruiter_user.email as recruiter_email',
        'recruiter_user.phone as recruiter_phone'
      )
      .where('interviews.id', id)
      .first();

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    // Access Gates
    if (role === 'candidate' && interview.candidate_user_id !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden. You do not have access to view this interview.' });
    }

    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(userId, interview.application_id);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. You are not assigned to evaluate this candidate.' });
      }
    }

    const feedbacks = await db('interview_feedback')
      .where('interview_id', id)
      .orderBy('created_at', 'desc');

    let notes = [];
    if (role === 'recruiter' || role === 'admin') {
      notes = await db('candidate_notes')
        .join('users', 'candidate_notes.recruiter_user_id', '=', 'users.id')
        .select('candidate_notes.*', 'users.first_name as recruiter_first', 'users.last_name as recruiter_last')
        .where('candidate_notes.application_id', interview.application_id)
        .orderBy('candidate_notes.created_at', 'desc');
    }

    const timeline = await db('application_status_history')
      .leftJoin('users', 'application_status_history.changed_by_user_id', '=', 'users.id')
      .select('application_status_history.*', 'users.first_name as changed_by_first', 'users.last_name as changed_by_last')
      .where('application_status_history.application_id', interview.application_id)
      .orderBy('application_status_history.created_at', 'asc');

    const scoreData = await db('application_scores')
      .where('application_id', interview.application_id)
      .first();

    const resumeData = await db('resume_data')
      .where('application_id', interview.application_id)
      .first();

    const rounds = await db('interview_rounds')
      .where({ application_id: interview.application_id })
      .orderBy('round_number', 'asc');

    res.status(200).json({
      success: true,
      data: {
        interview,
        feedbacks,
        notes,
        timeline,
        scoreData,
        resumeData,
        rounds
      }
    });
  } catch (error) {
    next(error);
  }
};

// 8. Update Attendance Status
exports.updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { attendance_status } = req.body;
    const { id: userId, role } = req.user;

    if (!attendance_status) {
      return res.status(400).json({ success: false, message: 'Attendance status is required.' });
    }

    const interview = await db('interviews').where({ id }).first();
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found.' });
    }

    const application = await db('applications').where({ id: interview.application_id }).first();

    if (role === 'candidate') {
      if (application.user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
      if (!['Confirmed', 'Reschedule Requested'].includes(attendance_status)) {
        return res.status(400).json({ success: false, message: 'Candidates can only confirm attendance or request reschedule.' });
      }
    } else if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(userId, interview.application_id);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
    }

    await db('interviews').where({ id }).update({
      attendance_status,
      updated_at: new Date()
    });

    await db('application_status_history').insert({
      application_id: interview.application_id,
      status: application.status,
      changed_by_user_id: userId,
      remarks: `Attendance updated to: "${attendance_status}" for interview round "${interview.interview_round}".`
    });

    res.status(200).json({
      success: true,
      message: `Attendance updated to ${attendance_status} successfully.`
    });
  } catch (error) {
    next(error);
  }
};

// 9. Send Manual Reminder Email
exports.sendManualReminder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: recruiterUserId, role } = req.user;

    const interview = await db('interviews')
      .join('applications', 'interviews.application_id', '=', 'applications.id')
      .join('users', 'applications.user_id', '=', 'users.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .select(
        'interviews.*',
        'users.first_name',
        'users.last_name',
        'users.email as candidate_email',
        'jobs.title as job_title',
        'companies.name as company_name'
      )
      .where('interviews.id', id)
      .first();

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    if (role === 'recruiter') {
      const hasAccess = await verifyRecruiterAccess(recruiterUserId, interview.application_id);
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
    }

    const candidateName = `${interview.first_name} ${interview.last_name}`;
    const templateData = {
      candidateName,
      jobTitle: interview.job_title,
      companyName: interview.company_name,
      interviewDate: interview.interview_date,
      interviewTime: interview.interview_time,
      interviewMode: interview.interview_type,
      meetingDetails: interview.interview_type === 'Online'
        ? (interview.meeting_link || 'Link not provided')
        : (interview.venue || 'Venue not provided'),
      interviewerName: interview.interviewer_name,
      instructions: interview.additional_instructions,
      applicationId: interview.application_id
    };

    const success = await emailService.sendEmail({
      to: interview.candidate_email,
      templateName: 'interview_reminder',
      templateData
    });

    res.status(200).json({
      success: true,
      message: success ? 'Manual reminder email sent successfully.' : 'Failed to deliver reminder email.'
    });
  } catch (error) {
    next(error);
  }
};
