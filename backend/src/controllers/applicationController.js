// backend/src/controllers/applicationController.js
const db = require('../config/db');
const path = require('path');
const emailService = require('../services/emailService');
const atsService = require('../services/atsService');

const normalizeSkillName = (name) => {
  return name ? name.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
};

const checkSkillsMatch = (requiredSkills, candidateSkillsString) => {
  if (!requiredSkills || requiredSkills.length === 0) {
    return false;
  }
  const candidateSkills = (candidateSkillsString || '')
    .split(',')
    .map(s => normalizeSkillName(s))
    .filter(Boolean);
  
  const matchedCount = requiredSkills.filter(reqSkill => {
    const normReq = normalizeSkillName(reqSkill);
    return candidateSkills.includes(normReq);
  }).length;
  
  return (matchedCount / requiredSkills.length) >= 0.6;
};

exports.createApplication = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      job_id,
      full_name,
      email,
      phone,
      highest_qualification,
      school_university,
      passing_year,
      current_company,
      current_salary,
      expected_salary,
      experience,
      skills,
      cover_letter
    } = req.body;

    if (!job_id) {
      return res.status(400).json({ success: false, message: 'Job ID is required.' });
    }

    // Verify Job exists and is active
    const job = await db('jobs').where({ id: job_id }).first();
    if (!job) {
      return res.status(404).json({ success: false, message: 'The job posting does not exist.' });
    }
    if (job.status !== 'active') {
      return res.status(400).json({ success: false, message: 'This job posting has been closed or deactivated.' });
    }

    // Fetch company associated with the job
    const company = await db('companies').where({ id: job.company_id }).first();

    // Check if candidate already applied to this job
    const existingApp = await db('applications').where({ user_id: userId, job_id }).first();
    if (existingApp) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job.' });
    }

    // Check if resume PDF was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume PDF upload is required.' });
    }

    const resumeFilename = req.file.filename;

    // Build complete serialized cover letter text containing professional info
    const structuredCoverLetter = `
--- PERSONAL DETAILS ---
Full Name: ${full_name || 'N/A'}
Contact Email: ${email || 'N/A'}
Phone Number: ${phone || 'N/A'}

--- EDUCATION DETAILS ---
Highest Qualification: ${highest_qualification || 'N/A'}
School / University: ${school_university || 'N/A'}
Passing Year: ${passing_year || 'N/A'}

--- PROFESSIONAL DATA ---
Current Company: ${current_company || 'N/A'}
Current Salary: ${current_salary || 'N/A'}
Expected Salary: ${expected_salary || 'N/A'}
Years of Experience: ${experience || 'N/A'}
Skills List: ${skills || 'N/A'}

--- CANDIDATE COVER LETTER ---
${cover_letter || 'No cover letter provided.'}
`.trim();

    // If user provided a phone number, update their profile
    if (phone) {
      await db('users').where({ id: userId }).update({ phone });
    }

    // Fetch job required skills
    const jobSkills = await db('job_skills')
      .join('skills', 'job_skills.skill_id', '=', 'skills.id')
      .where('job_skills.job_id', job_id)
      .select('skills.name');
    
    const requiredSkills = jobSkills.map(s => s.name.toLowerCase().trim());
    
    // Parse candidate skills
    const candidateSkillsList = (skills || '')
      .split(',')
      .map(s => s.toLowerCase().trim())
      .filter(Boolean);

    const initialStatus = 'Applied';

    const [application] = await db('applications').insert({
      user_id: userId,
      job_id,
      resume: resumeFilename,
      skills: skills || null,
      cover_letter: structuredCoverLetter,
      status: initialStatus,
      assigned_recruiter_id: job.assigned_recruiter_id || null
    }).returning('*');

    // Insert status history
    await db('application_status_history').insert({
      application_id: application.id,
      status: initialStatus,
      changed_by_user_id: null,
      remarks: 'Application submitted successfully.'
    });

    // Send receipt email immediately
    await emailService.sendEmail({
      to: email || req.user.email,
      templateName: 'application_submitted',
      templateData: {
        applicationId: application.id,
        candidateName: full_name || `${req.user.first_name} ${req.user.last_name}`,
        jobTitle: job.title,
        companyName: company?.name || 'the company'
      }
    });

    // Run AI ATS screening pipeline synchronously to compute scores & screen status
    try {
      await atsService.runAtsPipeline(application.id);
    } catch (atsErr) {
      console.error('[ATS WORKFLOW ERROR] Automated screening failed:', atsErr.message);
    }

    // Retrieve final updated application record
    const finalApp = await db('applications').where({ id: application.id }).first();

    res.status(201).json({
      success: true,
      message: '🎉 Application Submitted Successfully',
      data: {
        application_id: finalApp.id,
        applied_job: job.title,
        submission_date: finalApp.created_at,
        status: finalApp.status
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplications = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { status, search } = req.query;

    const query = db('applications')
      .join('users', 'applications.user_id', '=', 'users.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .leftJoin('job_skills', 'jobs.id', 'job_skills.job_id')
      .leftJoin('skills', 'job_skills.skill_id', 'skills.id')
      .leftJoin('application_scores', 'applications.id', 'application_scores.application_id')
      .leftJoin('users as recruiter_user', 'applications.assigned_recruiter_id', '=', 'recruiter_user.id')
      .select(
        'applications.*',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.phone',
        'jobs.title as job_title',
        'jobs.location as job_location',
        'jobs.job_type as job_type',
        'companies.name as company_name',
        'companies.logo as company_logo',
        'application_scores.match_score',
        'application_scores.ats_recommendation',
        'recruiter_user.first_name as recruiter_first_name',
        'recruiter_user.last_name as recruiter_last_name',
        db.raw("COALESCE(json_agg(skills.name) FILTER (WHERE skills.id IS NOT NULL), '[]') as job_skills")
      )
      .groupBy('applications.id', 'users.id', 'jobs.id', 'companies.id', 'application_scores.id', 'application_scores.match_score', 'application_scores.ats_recommendation', 'recruiter_user.id', 'recruiter_user.first_name', 'recruiter_user.last_name');

    // Candidates see only their own applications
    if (role === 'candidate') {
      query.where('applications.user_id', userId);
    }

    // Recruiters see all applications for their company's jobs
    if (role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: userId }).first();
      if (recruiter) {
        query.where('jobs.company_id', recruiter.company_id);
      } else {
        query.whereNull('applications.id');
      }
    }

    // Apply filters
    if (status && status !== 'all') {
      query.where('applications.status', status);
    }

    if (search) {
      const searchPattern = `%${search}%`;
      query.andWhere(function() {
        this.where('jobs.title', 'ILIKE', searchPattern)
          .orWhere('companies.name', 'ILIKE', searchPattern)
          .orWhere('users.first_name', 'ILIKE', searchPattern)
          .orWhere('users.last_name', 'ILIKE', searchPattern)
          .orWhere('users.email', 'ILIKE', searchPattern);
      });
    }

    query.orderBy('applications.created_at', 'desc');

    const list = await query;

    // Calculate match status dynamically
    const dataWithMatch = list.map(app => {
      const jobSkillsList = app.job_skills || [];
      const hasReq = jobSkillsList.length > 0 && checkSkillsMatch(jobSkillsList, app.skills);
      
      return {
        ...app,
        has_required_skills: hasReq
      };
    });

    res.status(200).json({
      success: true,
      data: dataWithMatch
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    const application = await db('applications')
      .join('users', 'applications.user_id', '=', 'users.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .leftJoin('job_skills', 'jobs.id', 'job_skills.job_id')
      .leftJoin('skills', 'job_skills.skill_id', 'skills.id')
      .leftJoin('users as recruiter_user', 'applications.assigned_recruiter_id', '=', 'recruiter_user.id')
      .select(
        'applications.*',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.phone',
        'users.profile_image as user_profile_image',
        'jobs.title as job_title',
        'jobs.location as job_location',
        'jobs.job_type as job_type',
        'jobs.salary_min',
        'jobs.salary_max',
        'jobs.company_id as company_id',
        'companies.name as company_name',
        'companies.logo as company_logo',
        'recruiter_user.first_name as recruiter_first_name',
        'recruiter_user.last_name as recruiter_last_name',
        db.raw("COALESCE(json_agg(skills.name) FILTER (WHERE skills.id IS NOT NULL), '[]') as job_skills")
      )
      .where('applications.id', id)
      .groupBy('applications.id', 'users.id', 'jobs.id', 'companies.id', 'recruiter_user.id', 'recruiter_user.first_name', 'recruiter_user.last_name')
      .first();

    if (!application) {
      return res.status(404).json({ success: false, message: 'Job application not found.' });
    }

    // Candidate can view only their own application details
    if (role === 'candidate' && application.user_id !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
    }

    // Recruiter can view only applications belonging to their company
    if (role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: userId }).first();
      if (!recruiter || recruiter.company_id !== application.company_id) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access denied.' });
      }
    }

    // Calculate match status dynamically
    const jobSkillsList = application.job_skills || [];
    const hasReq = jobSkillsList.length > 0 && checkSkillsMatch(jobSkillsList, application.skills);

    application.has_required_skills = hasReq;

    // Fetch timeline (application status history)
    const timeline = await db('application_status_history')
      .leftJoin('users', 'application_status_history.changed_by_user_id', '=', 'users.id')
      .select(
        'application_status_history.*',
        'users.first_name as changed_by_first',
        'users.last_name as changed_by_last'
      )
      .where('application_status_history.application_id', id)
      .orderBy('application_status_history.created_at', 'asc');

    // Fetch interviews list and their feedback
    const interviews = await db('interviews')
      .where('application_id', id)
      .orderBy('created_at', 'desc');

    for (const intr of interviews) {
      intr.feedback = await db('interview_feedback')
        .where('interview_id', intr.id)
        .orderBy('created_at', 'desc');
    }

    // Fetch candidate notes (only visible to recruiter and admin)
    let notes = [];
    if (role === 'recruiter' || role === 'admin') {
      notes = await db('candidate_notes')
        .join('users', 'candidate_notes.recruiter_user_id', '=', 'users.id')
        .select(
          'candidate_notes.*',
          'users.first_name as recruiter_first',
          'users.last_name as recruiter_last'
        )
        .where('candidate_notes.application_id', id)
        .orderBy('candidate_notes.created_at', 'desc');
    }

    // Fetch parsed resume details (legacy fallback check)
    const resumeData = await db('resume_analysis')
      .where({ application_id: id })
      .first() || await db('resume_data').where({ application_id: id }).first();

    // Fetch AI Match Score details
    const scoreData = await db('application_scores')
      .where({ application_id: id })
      .first();

    // Fetch email logs (candidate sees their logs, recruiter sees all logs for the application)
    const emailsQuery = db('email_logs')
      .where('application_id', id)
      .orderBy('created_at', 'desc');
    
    if (role === 'candidate') {
      emailsQuery.andWhere('to_email', application.email);
    }
    const emails = await emailsQuery;

    const rounds = await db('interview_rounds')
      .where({ application_id: id })
      .orderBy('round_number', 'asc');

    // Attach details
    application.timeline = timeline;
    application.interviews = interviews;
    application.notes = notes;
    application.resume_data = resumeData;
    application.score_data = scoreData;
    application.emails = emails;
    application.rounds = rounds;

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      status, 
      remarks,
      interviewDate, 
      interviewTime, 
      interviewMode, 
      meetingLink, 
      venue, 
      interviewerName, 
      interviewerEmail, 
      instructions 
    } = req.body;

    const validStatuses = [
      'Applied', 
      'Resume Screening',
      'Under Review', 
      'Shortlisted', 
      'Interview Scheduled', 
      'Interview Completed', 
      'Technical Round',
      'Technical Round Result',
      'Managerial Round',
      'Managerial Round Result',
      'HR Round',
      'HR Round Result',
      'Final Round',
      'Final Round Result',
      'Selected', 
      'Rejected', 
      'Offer Sent', 
      'Offer Letter Sent', 
      'Offer Accepted',
      'Hired'
    ];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const application = await db('applications').where({ id }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Helper check
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

    // Progression checks
    if (status === 'Managerial Round') {
      const clearedTech = await hasPassedRound(id, 'Technical Round');
      if (!clearedTech) {
        return res.status(400).json({ success: false, message: 'Progression Blocked: Candidate cannot move to Managerial Round without passing the Technical Round.' });
      }
    }

    if (status === 'HR Round') {
      const clearedManagerial = await hasPassedRound(id, 'Managerial Round');
      if (!clearedManagerial) {
        return res.status(400).json({ success: false, message: 'Progression Blocked: Candidate cannot move to HR Round without passing the Managerial Round.' });
      }
    }

    if (status === 'Selected') {
      const clearedHR = await hasPassedRound(id, 'HR Round');
      if (!clearedHR) {
        return res.status(400).json({ success: false, message: 'Progression Blocked: Candidate cannot be marked as Selected without passing the HR Round.' });
      }
    }

    if (req.user.role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: req.user.id }).first();
      const job = await db('jobs').where({ id: application.job_id }).first();
      if (!recruiter || !job || recruiter.company_id !== job.company_id) {
        return res.status(403).json({ success: false, message: 'Forbidden. You do not have permission to update candidate status for another company.' });
      }
    }

    const statusChanged = application.status !== status;

    // Prepare fields to update
    const updateData = { 
      status, 
      updated_at: new Date() 
    };

    const interviewRoundsList = ['Interview Scheduled', 'Technical Round', 'Managerial Round', 'HR Round', 'Final Round'];
    if (interviewRoundsList.includes(status)) {
      updateData.interview_date = interviewDate || null;
      updateData.interview_time = interviewTime || null;
      updateData.interview_mode = interviewMode || null;
      updateData.meeting_link = meetingLink || null;
      updateData.venue = venue || null;
      updateData.interviewer_name = interviewerName || null;
      updateData.interviewer_email = interviewerEmail || null;
      updateData.instructions = instructions || null;
    }

    const [updatedApp] = await db('applications')
      .where({ id })
      .update(updateData)
      .returning('*');

    // Sync with interviews table if status is one of the interview rounds
    if (interviewRoundsList.includes(status)) {
      const activeRoundName = status === 'Interview Scheduled' ? 'Technical Round' : status;
      const existingInterview = await db('interviews')
        .where({ application_id: id, interview_round: activeRoundName })
        .andWhere(function() {
          this.where('status', 'Scheduled').orWhere('status', 'Rescheduled');
        })
        .first();

      let roundRecord = await db('interview_rounds')
        .where({ application_id: id, round_name: activeRoundName })
        .first();

      if (!roundRecord) {
        const existingRoundsCount = await db('interview_rounds').where({ application_id: id }).count('id as count').first();
        const roundNum = parseInt(existingRoundsCount.count || 0) + 1;
        [roundRecord] = await db('interview_rounds').insert({
          application_id: id,
          round_name: activeRoundName,
          round_number: roundNum,
          status: 'Scheduled'
        }).returning('*');
      }

      let interviewerDetailId = null;
      if (interviewerEmail) {
        let interviewer = await db('interviewer_details').where({ email: interviewerEmail }).first();
        if (!interviewer) {
          const [newInterviewer] = await db('interviewer_details').insert({
            name: interviewerName,
            email: interviewerEmail,
            designation: req.body.interviewerDesignation || null,
            department: req.body.department || null
          }).returning('*');
          interviewerDetailId = newInterviewer.id;
        } else {
          interviewerDetailId = interviewer.id;
        }
      }

      if (existingInterview) {
        await db('interviews').where({ id: existingInterview.id }).update({
          interview_date: interviewDate || existingInterview.interview_date,
          interview_time: interviewTime || existingInterview.interview_time,
          interview_type: interviewMode || existingInterview.interview_type,
          meeting_link: interviewMode === 'Online' ? (meetingLink || existingInterview.meeting_link) : null,
          venue: interviewMode === 'Offline' ? (venue || existingInterview.venue) : null,
          interviewer_name: interviewerName || existingInterview.interviewer_name,
          interviewer_email: interviewerEmail !== undefined ? interviewerEmail : existingInterview.interviewer_email,
          interviewer_detail_id: interviewerDetailId || existingInterview.interviewer_detail_id,
          additional_instructions: instructions !== undefined ? instructions : existingInterview.additional_instructions,
          updated_at: new Date()
        });
      } else {
        const existingRoundsCount = await db('interview_rounds').where({ application_id: id }).count('id as count').first();
        const roundNum = parseInt(existingRoundsCount.count || 0) + 1;
        await db('interviews').insert({
          application_id: id,
          interview_round_id: roundRecord.id,
          interviewer_detail_id: interviewerDetailId,
          interview_date: interviewDate || 'TBD',
          interview_time: interviewTime || 'TBD',
          interview_type: interviewMode || 'Online',
          meeting_link: interviewMode === 'Online' ? meetingLink : null,
          venue: interviewMode === 'Offline' ? venue : null,
          interviewer_name: interviewerName || 'Hiring Committee',
          interviewer_email: interviewerEmail || null,
          interview_round: activeRoundName,
          additional_instructions: instructions || null,
          status: 'Scheduled',
          round_number: roundNum,
          interviewer_designation: req.body.interviewerDesignation || null,
          department: req.body.department || null
        });
      }
    }

    // Fetch job details for notifications
    const job = await db('jobs').where({ id: application.job_id }).first();

    // Create database notification for user
    await db('notifications').insert({
      user_id: application.user_id,
      title: 'Application Status Updated',
      message: `Your job application for "${job?.title || 'Job'}" has been updated to "${status}".`,
      type: 'application_status',
      is_read: false
    });

    if (statusChanged) {
      console.log(`[STATUS CHANGE] Application ${id} status changing from ${application.status} to ${status}. Logging and triggering email.`);
      
      // Log to application_status_history
      await db('application_status_history').insert({
        application_id: id,
        status,
        changed_by_user_id: req.user.id,
        remarks: remarks || `Status transitioned to ${status}.`
      });

      // Automatically send status email
      await emailService.sendApplicationStatusEmail(id, status);
    } else {
      console.log(`[STATUS UNCHANGED] Status remains "${status}" for application ${id}. Skipping email dispatch to prevent duplicate sending.`);
      if (remarks) {
        // Just log a remark event if status didn't change but recruiter left notes
        await db('application_status_history').insert({
          application_id: id,
          status,
          changed_by_user_id: req.user.id,
          remarks: remarks
        });
      }
    }

    // Get the final refreshed application to return
    const finalApp = await db('applications').where({ id }).first();

    res.status(200).json({
      success: true,
      message: statusChanged 
        ? `Application status modified to '${status}' successfully.` 
        : `Application details updated successfully.`,
      data: finalApp
    });
  } catch (error) {
    next(error);
  }
};

// Assign recruiter to application
exports.assignRecruiter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recruiter_id } = req.body; // user_id of the recruiter
    
    const application = await db('applications').where({ id }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    if (recruiter_id) {
      const recruiterUser = await db('users').where({ id: recruiter_id, role: 'recruiter' }).first();
      if (!recruiterUser) {
        return res.status(400).json({ success: false, message: 'Invalid recruiter user ID.' });
      }
    }

    await db('applications').where({ id }).update({
      assigned_recruiter_id: recruiter_id || null,
      updated_at: new Date()
    });

    res.status(200).json({
      success: true,
      message: recruiter_id ? 'Recruiter assigned to candidate successfully.' : 'Recruiter unassigned successfully.'
    });
  } catch (error) {
    next(error);
  }
};
