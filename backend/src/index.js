// backend/src/index.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const app = require('./app');
const db = require('./config/db');
const emailService = require('./services/emailService');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Programmatically run migrations on startup
db.migrate.latest()
  .then(async () => {
    console.log('✨ [DATABASE] Migrations executed successfully.');

    // Self-healing database correction: align missing assigned_recruiter_ids to their job's recruiter
    try {
      const nullApps = await db('applications').whereNull('assigned_recruiter_id');
      if (nullApps.length > 0) {
        console.log(`🧹 [DATABASE CLEANUP] Found ${nullApps.length} applications with missing recruiter ID. Aligning to jobs...`);
        for (const appRow of nullApps) {
          const job = await db('jobs').where({ id: appRow.job_id }).first();
          if (job && job.assigned_recruiter_id) {
            await db('applications')
              .where({ id: appRow.id })
              .update({ assigned_recruiter_id: job.assigned_recruiter_id });
          }
        }
        console.log(`🧹 [DATABASE CLEANUP] Alignment complete.`);
      }
    } catch (cleanupErr) {
      console.error('❌ [DATABASE CLEANUP ERROR] Self-healing alignment failed:', cleanupErr.message);
    }

    // Self-healing database correction: sync missing interviews records from applications table
    try {
      const scheduledApps = await db('applications')
        .whereNotNull('interview_date')
        .whereNotNull('interview_time');

      for (const appRow of scheduledApps) {
        const existingInterview = await db('interviews').where({ application_id: appRow.id }).first();
        if (!existingInterview) {
          console.log(`🧹 [DATABASE CLEANUP] Found application ${appRow.id} with interview schedule (${appRow.interview_date} ${appRow.interview_time}) but no interview record. Creating one...`);
          
          let interviewStatus = 'Scheduled';
          if (['Interview Completed', 'Selected', 'Offer Letter Sent', 'Hired'].includes(appRow.status)) {
            interviewStatus = 'Completed';
          } else if (appRow.status === 'Rejected') {
            interviewStatus = 'Cancelled';
          }

          await db('interviews').insert({
            application_id: appRow.id,
            interview_date: appRow.interview_date,
            interview_time: appRow.interview_time,
            interview_type: appRow.interview_mode || 'Online',
            meeting_link: appRow.meeting_link || null,
            venue: appRow.venue || null,
            interviewer_name: appRow.interviewer_name || 'Hiring Committee',
            interviewer_email: appRow.interviewer_email || null,
            interview_round: 'Technical Round',
            additional_instructions: appRow.instructions || null,
            status: interviewStatus
          });
        }
      }
      console.log('🧹 [DATABASE CLEANUP] Interview records alignment check complete.');
    } catch (syncErr) {
      console.error('❌ [DATABASE CLEANUP ERROR] Self-healing interview sync failed:', syncErr.message);
    }

    // Delete account aliasis820@gamil.com from DB
    try {
      const targetUser = await db('users').where({ email: 'aliasis820@gamil.com' }).first();
      if (targetUser) {
        console.log(`🧹 [DATABASE CLEANUP] Deleting user aliasis820@gamil.com (ID: ${targetUser.id}) and all dependencies...`);
        
        const userApps = await db('applications').where({ user_id: targetUser.id }).select('id');
        const appIds = userApps.map(a => a.id);
        
        if (appIds.length > 0) {
          const appInterviews = await db('interviews').whereIn('application_id', appIds).select('id');
          const interviewIds = appInterviews.map(i => i.id);
          
          if (interviewIds.length > 0) {
            await db('interview_feedback').whereIn('interview_id', interviewIds).del();
            await db('interviews').whereIn('id', interviewIds).del();
          }
          await db('application_status_history').whereIn('application_id', appIds).del();
          await db('candidate_notes').whereIn('application_id', appIds).del();
          await db('resume_data').whereIn('application_id', appIds).del();
          await db('application_scores').whereIn('application_id', appIds).del();
          await db('applications').whereIn('id', appIds).del();
        }
        
        await db('email_verifications').where({ user_id: targetUser.id }).del();
        await db('password_resets').where({ user_id: targetUser.id }).del();
        await db('refresh_tokens').where({ user_id: targetUser.id }).del();
        await db('notifications').where({ user_id: targetUser.id }).del();
        await db('saved_jobs').where({ user_id: targetUser.id }).del();
        await db('recruiters').where({ user_id: targetUser.id }).del();
        await db('resumes').where({ user_id: targetUser.id }).del();
        await db('users').where({ id: targetUser.id }).del();
        
        console.log(`🧹 [DATABASE CLEANUP] User aliasis820@gamil.com deleted successfully.`);
      }
    } catch (delErr) {
      console.error('❌ [DATABASE CLEANUP ERROR] Deleting user aliasis820@gamil.com failed:', delErr.message);
    }

    const server = app.listen(PORT, () => {
      console.log(`============================================`);
      console.log(`🚀 JOB PORTAL PLATFORM SERVER LAUNCHED`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`⚙️  Environment: ${NODE_ENV}`);
      console.log(`============================================`);

      // Start periodic 24h interview reminder scanning
      // Run once immediately on launch, then repeat every minute
      emailService.sendUpcomingInterviewReminders();
      setInterval(() => {
        console.log('⏰ [SCHEDULER] Scanning for upcoming interviews (24h reminder)...');
        emailService.sendUpcomingInterviewReminders();
      }, 60000);
    });

    // Graceful shutdowns
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received. Shutting down server gracefully...');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    console.error('❌ [DATABASE ERROR] Startup migrations failed:', err);
    process.exit(1);
  });



