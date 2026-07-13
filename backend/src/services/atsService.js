// backend/src/services/atsService.js
const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const emailService = require('./emailService');

// Load configurable screening rules
const RULES_PATH = path.join(__dirname, '../config/screeningRules.json');
let screeningRules = {
  minScore: 80,
  minExperienceYears: 2,
  rejectScore: 50,
  shortlistStatus: "Shortlisted",
  rejectStatus: "Rejected",
  fallbackStatus: "Under Review"
};

try {
  if (fs.existsSync(RULES_PATH)) {
    screeningRules = JSON.parse(fs.readFileSync(RULES_PATH, 'utf8'));
  }
} catch (err) {
  console.error('[ATS SERVICE ERROR] Failed to load screening rules:', err.message);
}

/**
 * Calculates a match score (0-100%) by comparing extracted resume details with job criteria.
 */
function calculateMatchScore(parsedResume, jobDetails, requiredSkillsList) {
  // 1. Skills Matching (Weight: 50%)
  let skillsScore = 50;
  const matched = [];
  const missing = [];

  const resumeSkills = (parsedResume.skills || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  if (requiredSkillsList && requiredSkillsList.length > 0) {
    requiredSkillsList.forEach(reqSkill => {
      const lowercaseReq = reqSkill.toLowerCase().trim();
      const isMatched = resumeSkills.some(candSkill => 
        candSkill === lowercaseReq || 
        candSkill.includes(lowercaseReq) || 
        lowercaseReq.includes(candSkill)
      );

      if (isMatched) {
        matched.push(reqSkill);
      } else {
        missing.push(reqSkill);
      }
    });

    skillsScore = requiredSkillsList.length > 0 
      ? Math.round((matched.length / requiredSkillsList.length) * 50) 
      : 50;
  }

  // 2. Experience Matching (Weight: 30%)
  let experienceScore = 15;
  const candidateYears = parsedResume.experience_years || 0;
  
  // Extract min required experience years from job experience string (e.g. "2-5 years" or "2 Years" or "Fresher")
  let jobMinYears = 0;
  if (jobDetails.experience) {
    const match = jobDetails.experience.match(/(\d+)/);
    if (match) {
      jobMinYears = parseInt(match[1], 10);
    }
  }

  if (jobMinYears === 0) {
    experienceScore = 30; // No minimum requirement
  } else {
    if (candidateYears >= jobMinYears) {
      experienceScore = 30;
    } else {
      experienceScore = Math.round((candidateYears / jobMinYears) * 30);
    }
  }

  // 3. Education Matching (Weight: 10%)
  let educationScore = 5;
  const candidateEdu = (parsedResume.education || '').toLowerCase();
  const eduKeywords = ['bachelor', 'b.tech', 'b.e.', 'b.s.', 'master', 'm.tech', 'm.s.', 'ph.d.', 'phd'];
  const hasEduKeyword = eduKeywords.some(keyword => candidateEdu.includes(keyword));
  if (hasEduKeyword) {
    educationScore = 10;
  }

  // 4. Keyword/General Text Matching overlap (Weight: 10%)
  let keywordScore = 10;

  const totalScore = Math.min(Math.max(skillsScore + experienceScore + educationScore + keywordScore, 0), 100);

  return {
    score: totalScore,
    matchedSkills: matched.join(', '),
    missingSkills: missing.join(', ')
  };
}

/**
 * Executes the core ATS resume analysis pipeline for a new application.
 */
exports.runAtsPipeline = async (applicationId) => {
  try {
    console.log(`[ATS PIPELINE] Initiating automated AI screening rules for Application ID ${applicationId}...`);

    // 1. Fetch application details
    const application = await db('applications')
      .join('users', 'applications.user_id', '=', 'users.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .leftJoin('companies', 'jobs.company_id', '=', 'companies.id')
      .select('applications.*', 'users.first_name', 'users.last_name', 'users.email', 'users.phone', 'jobs.title as job_title', 'jobs.experience as job_exp', 'companies.name as company_name')
      .where('applications.id', applicationId)
      .first();

    if (!application) {
      console.error(`[ATS PIPELINE ERROR] Application ID ${applicationId} not found.`);
      return;
    }

    // 2. Fetch required skills of the job
    const jobSkills = await db('job_skills')
      .join('skills', 'job_skills.skill_id', '=', 'skills.id')
      .where('job_skills.job_id', application.job_id)
      .select('skills.name');
    
    const requiredSkillsList = jobSkills.map(s => s.name);

    // 3. Retrieve or trigger resume parser
    const resumePath = path.join(__dirname, '../../public/uploads/resumes', application.resume);
    const fallbackData = {
      full_name: `${application.first_name} ${application.last_name}`,
      email: application.email,
      phone: application.phone,
      skills: application.skills,
      experience: application.job_exp
    };

    const parser = require('./resumeParser');
    const parsedResume = await parser.parseResume(resumePath, fallbackData);

    // 4. Calculate Match Score
    const evaluation = calculateMatchScore(parsedResume, { experience: application.job_exp }, requiredSkillsList);

    // 5. Store parsed data in resume_analysis & resume_skills
    const [resumeAnalysis] = await db('resume_analysis').insert({
      application_id: applicationId,
      full_name: parsedResume.full_name,
      email: parsedResume.email,
      phone: parsedResume.phone,
      experience: parsedResume.experience,
      education: parsedResume.education,
      certifications: parsedResume.certifications,
      projects: parsedResume.projects
    }).returning('*');

    // Store skills list
    if (parsedResume.skills) {
      const skillsArray = parsedResume.skills.split(',').map(s => s.trim()).filter(Boolean);
      for (const skillName of skillsArray) {
        await db('resume_skills').insert({
          application_id: applicationId,
          skill_name: skillName
        });
      }
    }

    // 6. Configurable Rule Matching & Recommendation
    let finalStatus = screeningRules.fallbackStatus; // Under Review
    let recommendation = 'Review';

    // Rule: IF Match Score >= minScore AND Experience >= minExperienceYears THEN Status = Shortlisted
    if (evaluation.score >= screeningRules.minScore && parsedResume.experience_years >= screeningRules.minExperienceYears) {
      finalStatus = screeningRules.shortlistStatus; // Shortlisted
      recommendation = 'Recommend';
    } else if (evaluation.score < screeningRules.rejectScore) {
      finalStatus = screeningRules.rejectStatus; // Rejected
      recommendation = 'Reject';
    }

    // Save Application Score
    await db('application_scores').insert({
      application_id: applicationId,
      match_score: evaluation.score,
      matched_skills: evaluation.matchedSkills,
      missing_skills: evaluation.missingSkills,
      ats_recommendation: recommendation
    });

    // Update Application main record status
    await db('applications').where({ id: applicationId }).update({
      status: finalStatus,
      updated_at: new Date()
    });

    // Write application status history
    await db('application_status_history').insert({
      application_id: applicationId,
      status: finalStatus,
      changed_by_user_id: null, // AI system automatic transition
      remarks: `Automated ATS rule evaluation: score of ${evaluation.score}% recommendation: ${recommendation}.`
    });

    // 7. Dispatch Email Notifications & Setup schedules
    console.log(`[ATS WORKFLOW] Screening decision: Status = "${finalStatus}" for application ID ${applicationId}. Dispatching email...`);

    // Fetch refreshed application details
    const candidateName = `${application.first_name} ${application.last_name}`;
    const jobTitle = application.job_title;
    const companyName = application.company_name;

    // A. Send confirmation that application was received immediately (we can reuse the existing receipt logic or combine)
    // Send status-specific emails
    if (finalStatus === 'Shortlisted') {
      // Automatically schedule interview 3 days from now at 11:00 AM
      const interviewDate = new Date();
      interviewDate.setDate(interviewDate.getDate() + 3);
      const formattedDate = interviewDate.toISOString().split('T')[0];
      const formattedTime = '11:00';
      const meetingLink = 'https://meet.google.com/abc-defg-hij';

      // Insert into interview_schedule
      await db('interview_schedule').insert({
        application_id: applicationId,
        interview_date: formattedDate,
        interview_time: formattedTime,
        interview_type: 'Online',
        meeting_link: meetingLink,
        interviewer_name: 'Technical Hiring Committee',
        interviewer_email: 'hiring@' + companyName.toLowerCase().replace(/\s+/g, '') + '.com',
        interview_round: 'Technical Interview Round 1',
        additional_instructions: 'Please be available 15 minutes before the interview and join with a working webcam.',
        status: 'Scheduled'
      });

      // Mirror insertion in interviews table for compatibility
      const [newInterview] = await db('interviews').insert({
        application_id: applicationId,
        interview_date: formattedDate,
        interview_time: formattedTime,
        interview_type: 'Online',
        meeting_link: meetingLink,
        interviewer_name: 'Technical Hiring Committee',
        interviewer_email: 'hiring@' + companyName.toLowerCase().replace(/\s+/g, '') + '.com',
        interview_round: 'Technical Interview Round 1',
        additional_instructions: 'Please be available 15 minutes before the interview and join with a working webcam.',
        status: 'Scheduled'
      }).returning('*');

      // Update application fields to match
      await db('applications').where({ id: applicationId }).update({
        interview_date: formattedDate,
        interview_time: formattedTime,
        interview_mode: 'Online',
        meeting_link: meetingLink,
        interviewer_name: 'Technical Hiring Committee',
        interviewer_email: 'hiring@' + companyName.toLowerCase().replace(/\s+/g, '') + '.com',
        instructions: 'Please be available 15 minutes before the interview and join with a working webcam.'
      });

      // Send Shortlisted Email
      await emailService.sendEmail({
        to: application.email,
        applicationId: applicationId,
        templateName: 'shortlisted',
        templateData: {
          candidateName,
          jobTitle,
          companyName,
          interviewDate: formattedDate,
          interviewTime: formattedTime,
          meetingLink
        }
      });

    } else if (finalStatus === 'Rejected') {
      // Send Rejected Email
      await emailService.sendEmail({
        to: application.email,
        applicationId: applicationId,
        templateName: 'rejected',
        templateData: {
          candidateName,
          jobTitle,
          companyName
        }
      });
    } else {
      // Under Review
      await emailService.sendEmail({
        to: application.email,
        applicationId: applicationId,
        templateName: 'under_review',
        templateData: {
          candidateName,
          jobTitle,
          companyName
        }
      });
    }

    console.log(`[ATS PIPELINE] Screening completed successfully for application ID ${applicationId}.`);
  } catch (error) {
    console.error('[ATS PIPELINE FAILURE] Error processing candidate resume rules:', error);
  }
};
