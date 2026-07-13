// backend/src/services/emailService.js
const db = require('../config/db');
const sendEmail = require('../utils/sendEmail');

// Import templates
const shortlistedTemplate = require('../templates/shortlistedTemplate');
const interviewTemplate = require('../templates/interviewTemplate');
const selectedTemplate = require('../templates/selectedTemplate');
const rejectedTemplate = require('../templates/rejectedTemplate');
const underReviewTemplate = require('../templates/underReviewTemplate');
const offerLetterSentTemplate = require('../templates/offerLetterSentTemplate');
const interviewReminderTemplate = require('../templates/interviewReminderTemplate');
const applicationSubmittedTemplate = require('../templates/applicationSubmittedTemplate');
const interviewRescheduledTemplate = require('../templates/interviewRescheduledTemplate');
const interviewCancelledTemplate = require('../templates/interviewCancelledTemplate');
const interviewCompletedTemplate = require('../templates/interviewCompletedTemplate');
const hiredTemplate = require('../templates/hiredTemplate');
const interviewResultTemplate = require('../templates/interviewResultTemplate');
const offerAcceptedTemplate = require('../templates/offerAcceptedTemplate');

// Simple template compiler (replaces {{key}} with value)
const compileTemplate = (html, data) => {
  let result = html;
  if (!data) return result;

  // Normalize data keys to match database templates
  const normalizedData = {
    ...data,
    name: data.name || data.candidateName || data.candidate_name || '',
    job_title: data.job_title || data.jobTitle || '',
    company_name: data.company_name || data.companyName || ''
  };

  for (const key in normalizedData) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    const val = normalizedData[key] !== undefined ? normalizedData[key] : '';
    result = result.replace(regex, val);
  }
  return result;
};

/**
 * Dispatch Email using DB template and log to email_logs table
 */
exports.sendEmail = async ({ to, templateName, templateData, attachments = [] }) => {
  try {
    const template = await db('email_templates').where({ name: templateName }).first();
    let subject, htmlBody;
    let applicationId = templateData.applicationId || templateData.application_id || null;

    if (!template) {
      console.warn(`[EMAIL WARNING] Template "${templateName}" not found. Compiling fallback/code template.`);
      if (templateName === 'application_submitted') {
        const t = applicationSubmittedTemplate({
          candidateName: templateData.candidateName || templateData.name,
          jobTitle: templateData.jobTitle || templateData.job_title,
          companyName: templateData.companyName || templateData.company_name
        });
        subject = t.subject;
        htmlBody = t.html;
      } else if (templateName === 'shortlisted') {
        const t = shortlistedTemplate({
          candidateName: templateData.candidateName,
          jobTitle: templateData.jobTitle,
          companyName: templateData.companyName,
          interviewDate: templateData.interviewDate,
          interviewTime: templateData.interviewTime,
          meetingLink: templateData.meetingLink
        });
        subject = t.subject;
        htmlBody = t.html;
      } else if (templateName === 'under_review') {
        const t = underReviewTemplate({
          candidateName: templateData.candidateName,
          jobTitle: templateData.jobTitle,
          companyName: templateData.companyName
        });
        subject = t.subject;
        htmlBody = t.html;
      } else if (templateName === 'rejected') {
        const t = rejectedTemplate({
          candidateName: templateData.candidateName,
          jobTitle: templateData.jobTitle,
          companyName: templateData.companyName
        });
        subject = t.subject;
        htmlBody = t.html;
      } else {
        console.warn(`No DB template for "${templateName}", sending raw details.`);
        subject = `Alert: ${templateName}`;
        htmlBody = `<pre>${JSON.stringify(templateData, null, 2)}</pre>`;
      }
    } else {
      subject = compileTemplate(template.subject, templateData);
      htmlBody = compileTemplate(template.body, templateData);
    }

    const success = await sendEmail({ to, subject, html: htmlBody, attachments });

    // Write log to database
    try {
      await db('email_logs').insert({
        application_id: applicationId,
        to_email: to,
        subject,
        body: htmlBody,
        status: success ? 'Sent' : 'Failed'
      });
    } catch (logErr) {
      console.error('[EMAIL LOG ERROR] Failed to write log to database:', logErr.message);
    }

    return success;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed compile/dispatch for template:', error.message);
    return false;
  }
};

/**
 * Dispatch automated status email for an application
 * @param {number|string} applicationId - Target application ID
 * @param {string} status - Candidate application status
 * @returns {Promise<boolean>}
 */
exports.sendApplicationStatusEmail = async (applicationId, status) => {
  try {
    // 1. Fetch complete application, candidate, job & company details
    const application = await db('applications')
      .join('users', 'applications.user_id', '=', 'users.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .leftJoin('companies', 'jobs.company_id', '=', 'companies.id')
      .select(
        'applications.*',
        'users.first_name',
        'users.last_name',
        'users.email',
        'jobs.title as job_title',
        'companies.name as company_name'
      )
      .where('applications.id', applicationId)
      .first();

    if (!application) {
      console.error(`[EMAIL ERROR] Application with ID ${applicationId} not found.`);
      return false;
    }

    const candidateName = `${application.first_name} ${application.last_name}`.trim();
    const to = application.email;

    let templateFn = null;
    let templateData = {
      candidateName,
      jobTitle: application.job_title,
      companyName: application.company_name
    };

    switch (status) {
      case 'Applied':
        templateFn = applicationSubmittedTemplate;
        break;
      case 'Under Review':
        templateFn = underReviewTemplate;
        break;
      case 'Shortlisted':
        templateFn = shortlistedTemplate;
        break;
      case 'Interview Scheduled':
      case 'Technical Round':
      case 'Managerial Round':
      case 'HR Round':
      case 'Final Round':
        templateFn = interviewTemplate;
        const activeIntr = await db('interviews')
          .where({ application_id: applicationId })
          .orderBy('created_at', 'desc')
          .first();

        templateData = {
          ...templateData,
          interviewDate: activeIntr?.interview_date || application.interview_date || 'TBD',
          interviewTime: activeIntr?.interview_time || application.interview_time || 'TBD',
          interviewMode: activeIntr?.interview_type || application.interview_mode || 'TBD',
          meetingDetails: (activeIntr?.interview_type || application.interview_mode) === 'Online'
            ? (activeIntr?.meeting_link || application.meeting_link || 'Link not provided')
            : (activeIntr?.venue || application.venue || 'Venue not provided'),
          interviewerName: activeIntr?.interviewer_name || application.interviewer_name || '',
          instructions: activeIntr?.additional_instructions || application.instructions || ''
        };
        break;
      case 'Interview Rescheduled':
        templateFn = interviewRescheduledTemplate;
        const reschedIntr = await db('interviews')
          .where({ application_id: applicationId })
          .orderBy('created_at', 'desc')
          .first();

        templateData = {
          ...templateData,
          interviewDate: reschedIntr?.interview_date || application.interview_date || 'TBD',
          interviewTime: reschedIntr?.interview_time || application.interview_time || 'TBD',
          interviewMode: reschedIntr?.interview_type || application.interview_mode || 'TBD',
          meetingDetails: (reschedIntr?.interview_type || application.interview_mode) === 'Online'
            ? (reschedIntr?.meeting_link || application.meeting_link || 'Link not provided')
            : (reschedIntr?.venue || application.venue || 'Venue not provided'),
          interviewerName: reschedIntr?.interviewer_name || application.interviewer_name || '',
          instructions: reschedIntr?.additional_instructions || application.instructions || ''
        };
        break;
      case 'Interview Cancelled':
        templateFn = interviewCancelledTemplate;
        const cancelledIntr = await db('interviews').where({ application_id: applicationId }).orderBy('created_at', 'desc').first();
        templateData = {
          ...templateData,
          interviewRound: cancelledIntr?.interview_round || 'General Round'
        };
        break;
      case 'Interview Completed':
        templateFn = interviewCompletedTemplate;
        const completedIntr = await db('interviews').where({ application_id: applicationId }).orderBy('created_at', 'desc').first();
        templateData = {
          ...templateData,
          interviewRound: completedIntr?.interview_round || 'General Round'
        };
        break;
      case 'Technical Round Result':
      case 'Managerial Round Result':
      case 'HR Round Result':
      case 'Final Round Result':
        templateFn = interviewResultTemplate;
        const lastCompletedIntr = await db('interviews')
          .where({ application_id: applicationId })
          .andWhere(function() {
            this.where('status', 'Passed').orWhere('status', 'Failed').orWhere('status', 'Completed');
          })
          .orderBy('updated_at', 'desc')
          .first();

        let ratingData = {};
        if (lastCompletedIntr) {
          const feedback = await db('interview_feedback')
            .where({ interview_id: lastCompletedIntr.id })
            .orderBy('created_at', 'desc')
            .first();

          ratingData = {
            interviewRound: lastCompletedIntr.interview_round,
            result: lastCompletedIntr.status === 'Passed' ? 'Passed' : 'Failed',
            technicalRating: feedback?.technical_rating || 0,
            communicationRating: feedback?.communication_rating || 0,
            problemSolvingRating: feedback?.problem_solving_rating || 0,
            leadershipRating: feedback?.leadership_rating || 0,
            teamworkRating: feedback?.teamwork_rating || 0,
            overallRating: feedback?.rating || 0,
            strengths: feedback?.strengths || '',
            weaknesses: feedback?.weaknesses || '',
            remarks: feedback?.feedback_text || ''
          };
        }

        templateData = {
          ...templateData,
          ...ratingData
        };
        break;
      case 'Selected':
        templateFn = selectedTemplate;
        break;
      case 'Rejected':
        templateFn = rejectedTemplate;
        break;
      case 'Offer Sent':
      case 'Offer Letter Sent':
        templateFn = offerLetterSentTemplate;
        break;
      case 'Offer Accepted':
        templateFn = offerAcceptedTemplate;
        break;
      case 'Hired':
        templateFn = hiredTemplate;
        break;
      default:
        console.log(`[EMAIL INFO] No email configured for status: ${status}`);
        return true;
    }

    if (!templateFn) {
      return false;
    }

    // 2. Generate subject and HTML body
    const { subject, html } = templateFn(templateData);

    // 3. Dispatch Email
    const success = await sendEmail({ to, subject, html });

    // 4. Log status in PostgreSQL Applications table
    await db('applications')
      .where({ id: applicationId })
      .update({
        email_sent: success,
        email_sent_at: success ? new Date() : null
      });

    // 5. Write log to email_logs
    try {
      await db('email_logs').insert({
        application_id: applicationId,
        to_email: to,
        subject,
        body: html,
        status: success ? 'Sent' : 'Failed'
      });
    } catch (logErr) {
      console.error('[EMAIL LOG ERROR] Failed to write log to database:', logErr.message);
    }

    console.log(`[EMAIL LOG] Application status email logged: status=${status} sent=${success}`);
    return success;
  } catch (error) {
    console.error(`[EMAIL ERROR] Failed status update notification process:`, error.message);
    return false;
  }
};

/**
 * Scan all scheduled interviews happening in the next 24 hours,
 * and send reminder emails if not already sent.
 */
exports.sendUpcomingInterviewReminders = async () => {
  try {
    const now = new Date();
    const targetTimeStart = new Date(now.getTime() + 23 * 3600 * 1000); // 23 hours from now
    const targetTimeEnd = new Date(now.getTime() + 25 * 3600 * 1000);   // 25 hours from now

    // Get all scheduled interviews
    const upcomingInterviews = await db('interviews')
      .join('applications', 'interviews.application_id', '=', 'applications.id')
      .join('users', 'applications.user_id', '=', 'users.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .select(
        'interviews.*',
        'applications.id as app_id',
        'users.first_name',
        'users.last_name',
        'users.email as candidate_email',
        'jobs.title as job_title',
        'companies.name as company_name'
      )
      .where('interviews.status', 'Scheduled');

    for (const interview of upcomingInterviews) {
      // Parse interview date/time
      const [year, month, day] = interview.interview_date.split('-');
      const [hour, minute] = interview.interview_time.split(':');
      const interviewDateTime = new Date(year, month - 1, day, hour, minute);

      // Check if within 23-25 hour window
      if (interviewDateTime >= targetTimeStart && interviewDateTime <= targetTimeEnd) {
        // Check if reminder was already logged (check email_logs for this application with reminder subject)
        const existingReminder = await db('email_logs')
          .where({
            application_id: interview.application_id,
            subject: `Reminder: Interview Invitation - ${interview.company_name}`
          })
          .first();

        if (!existingReminder) {
          console.log(`[REMINDER SYSTEM] Sending 24h reminder for interview ${interview.id} to ${interview.candidate_email}`);
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
            instructions: interview.additional_instructions
          };

          const { subject, html } = interviewReminderTemplate(templateData);
          const success = await sendEmail({ to: interview.candidate_email, subject, html });

          // Log in email_logs
          await db('email_logs').insert({
            application_id: interview.application_id,
            to_email: interview.candidate_email,
            subject,
            body: html,
            status: success ? 'Sent' : 'Failed'
          });
        }
      }
    }
  } catch (err) {
    console.error('[REMINDER SYSTEM ERROR] Failed to check upcoming interview reminders:', err.message);
  }
};


