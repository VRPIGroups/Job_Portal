/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Clear any existing entries in ATS tables to avoid duplicate keys during seed rerun
  await knex('email_logs').del();
  await knex('resume_data').del();
  await knex('candidate_notes').del();
  await knex('application_status_history').del();
  await knex('interview_feedback').del();
  await knex('interviews').del();

  // Find candidate users
  const candidates = await knex('users').where({ role: 'candidate' }).select('*');
  if (candidates.length === 0) return;

  // Find recruiter user
  const recruiterUser = await knex('users').where({ email: 'recruiter@jobportal.com' }).first();
  const recruiterRecord = recruiterUser 
    ? await knex('recruiters').where({ user_id: recruiterUser.id }).first()
    : null;
  
  if (!recruiterRecord) return;

  // Get jobs of the recruiter's company
  const companyJobs = await knex('jobs').where({ company_id: recruiterRecord.company_id }).select('*');
  if (companyJobs.length === 0) return;

  // Assign jobs to recruiter
  await knex('jobs').where({ company_id: recruiterRecord.company_id }).update({ assigned_recruiter_id: recruiterUser.id });

  // We will create job applications for candidates in these jobs
  const applicationsData = [];
  
  // 1. Amit Sharma applies for Job 0
  applicationsData.push({
    user_id: candidates[0].id,
    job_id: companyJobs[0].id,
    assigned_recruiter_id: recruiterUser.id,
    resume: 'resume_amit_sharma.pdf',
    skills: 'React.js, Node.js, Express.js, PostgreSQL, JavaScript',
    cover_letter: 'Hi, I am Amit. I have 3 years of experience as a Full Stack Developer.',
    status: 'Interview Scheduled',
    created_at: new Date(Date.now() - 10 * 24 * 3600 * 1000), // 10 days ago
    updated_at: new Date(Date.now() - 2 * 24 * 3600 * 1000)
  });

  // 2. Priya Patel applies for Job 0
  applicationsData.push({
    user_id: candidates[1].id,
    job_id: companyJobs[0].id,
    assigned_recruiter_id: recruiterUser.id,
    resume: 'resume_priya_patel.pdf',
    skills: 'React.js, CSS3, HTML5, UI/UX Design, Figma',
    cover_letter: 'Hi, I am Priya. I specialize in frontend user experiences.',
    status: 'Selected',
    created_at: new Date(Date.now() - 15 * 24 * 3600 * 1000), // 15 days ago
    updated_at: new Date(Date.now() - 1 * 24 * 3600 * 1000)
  });

  // 3. Rahul Verma applies for Job 0
  applicationsData.push({
    user_id: candidates[2].id,
    job_id: companyJobs[0].id,
    assigned_recruiter_id: recruiterUser.id,
    resume: 'resume_rahul_verma.pdf',
    skills: 'Java, Spring Boot, MySQL, REST API',
    cover_letter: 'Hi, I am Rahul. I do backend engineering.',
    status: 'Rejected',
    created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000), // 5 days ago
    updated_at: new Date(Date.now() - 4 * 24 * 3600 * 1000)
  });

  // 4. Anjali Nair applies for Job 1
  applicationsData.push({
    user_id: candidates[3].id,
    job_id: companyJobs[1 % companyJobs.length].id,
    assigned_recruiter_id: recruiterUser.id,
    resume: 'resume_anjali_nair.pdf',
    skills: 'Python, Django, AWS, PostgreSQL',
    cover_letter: 'Hi, I am Anjali. I am a backend and cloud enthusiast.',
    status: 'Hired',
    created_at: new Date(Date.now() - 20 * 24 * 3600 * 1000),
    updated_at: new Date(Date.now() - 12 * 24 * 3600 * 1000)
  });

  // 5. Vikram Singh applies for Job 1
  applicationsData.push({
    user_id: candidates[4].id,
    job_id: companyJobs[1 % companyJobs.length].id,
    assigned_recruiter_id: recruiterUser.id,
    resume: 'resume_vikram_singh.pdf',
    skills: 'Node.js, GraphQL, Redis, Docker',
    cover_letter: 'Hi, I am Vikram. I focus on backend performance and DevOps.',
    status: 'Under Review',
    created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000),
    updated_at: new Date(Date.now() - 3 * 24 * 3600 * 1000)
  });

  // Insert applications and get records
  const applications = await knex('applications').insert(applicationsData).returning('*');

  // Let's populate history, notes, resume data, interviews, and logs for each
  for (const app of applications) {
    const candidate = candidates.find(c => c.id === app.user_id);
    
    // Seed Resume Data (parsed resume details)
    await knex('resume_data').insert({
      application_id: app.id,
      name: `${candidate.first_name} ${candidate.last_name}`,
      email: candidate.email,
      phone: candidate.phone || '+919999988888',
      skills: app.skills,
      experience: `${candidate.id % 2 === 0 ? '4' : '2'} years working in technology`,
      education: 'Bachelor of Technology in Computer Science'
    });

    // Seed Status History
    if (app.status === 'Under Review') {
      await knex('application_status_history').insert([
        { application_id: app.id, status: 'Applied', changed_by_user_id: null, remarks: 'Applied through Job Portal', created_at: new Date(app.created_at) },
        { application_id: app.id, status: 'Under Review', changed_by_user_id: recruiterUser.id, remarks: 'Resume looks interesting, reviewing skills.', created_at: new Date(app.updated_at) }
      ]);
    } else if (app.status === 'Interview Scheduled') {
      const interviewDate = new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split('T')[0];
      await knex('application_status_history').insert([
        { application_id: app.id, status: 'Applied', changed_by_user_id: null, remarks: 'Applied through Job Portal', created_at: new Date(app.created_at) },
        { application_id: app.id, status: 'Under Review', changed_by_user_id: recruiterUser.id, remarks: 'Resume fits requirements.', created_at: new Date(app.created_at.getTime() + 24 * 3600 * 1000) },
        { application_id: app.id, status: 'Shortlisted', changed_by_user_id: recruiterUser.id, remarks: 'Skills match 80%. Shortlisted for round 1.', created_at: new Date(app.created_at.getTime() + 48 * 3600 * 1000) },
        { application_id: app.id, status: 'Interview Scheduled', changed_by_user_id: recruiterUser.id, remarks: `Scheduled technical interview round.`, created_at: new Date(app.updated_at) }
      ]);

      // Seed Interview
      const [interview] = await knex('interviews').insert({
        application_id: app.id,
        interview_date: interviewDate,
        interview_time: '14:30',
        interview_type: 'Online',
        meeting_link: 'https://meet.google.com/abc-defg-hij',
        venue: null,
        interviewer_name: 'Jane Doe',
        interviewer_email: recruiterUser.email,
        interview_round: 'Technical Round 1',
        additional_instructions: 'Please be prepared to write code in React and Node.js on a shared IDE.',
        status: 'Scheduled',
        created_at: new Date(app.updated_at),
        updated_at: new Date(app.updated_at)
      }).returning('*');

      // Email logs
      await knex('email_logs').insert([
        { application_id: app.id, to_email: candidate.email, subject: 'Job Application Received: Software Engineer', body: 'Mock Body', status: 'Sent', created_at: new Date(app.created_at) },
        { application_id: app.id, to_email: candidate.email, subject: 'Interview Invitation', body: 'Dear candidate, congratulations you have been scheduled...', status: 'Sent', created_at: new Date(app.updated_at) }
      ]);

      // Recruiter Private Note
      await knex('candidate_notes').insert({
        application_id: app.id,
        recruiter_user_id: recruiterUser.id,
        note_text: 'Good GitHub profile. Seems solid in JavaScript core principles.',
        created_at: new Date(app.created_at.getTime() + 36 * 3600 * 1000)
      });
      
    } else if (app.status === 'Selected') {
      await knex('application_status_history').insert([
        { application_id: app.id, status: 'Applied', changed_by_user_id: null, remarks: 'Applied through Job Portal', created_at: new Date(app.created_at) },
        { application_id: app.id, status: 'Under Review', changed_by_user_id: recruiterUser.id, remarks: 'Reviewing...', created_at: new Date(app.created_at.getTime() + 12 * 3600 * 1000) },
        { application_id: app.id, status: 'Shortlisted', changed_by_user_id: recruiterUser.id, remarks: 'Strong React developer.', created_at: new Date(app.created_at.getTime() + 24 * 3600 * 1000) },
        { application_id: app.id, status: 'Interview Scheduled', changed_by_user_id: recruiterUser.id, remarks: 'Scheduling Technical round.', created_at: new Date(app.created_at.getTime() + 48 * 3600 * 1000) },
        { application_id: app.id, status: 'Interview Completed', changed_by_user_id: recruiterUser.id, remarks: 'Completed Technical round. Excellent feedback.', created_at: new Date(app.created_at.getTime() + 72 * 3600 * 1000) },
        { application_id: app.id, status: 'Selected', changed_by_user_id: recruiterUser.id, remarks: 'Candidate selected. Generating offer letter.', created_at: new Date(app.updated_at) }
      ]);

      // Seed Completed Interview
      const [interview] = await knex('interviews').insert({
        application_id: app.id,
        interview_date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString().split('T')[0],
        interview_time: '11:00',
        interview_type: 'Online',
        meeting_link: 'https://meet.google.com/xyz-pdqr-wvt',
        venue: null,
        interviewer_name: 'Jane Doe',
        interviewer_email: recruiterUser.email,
        interview_round: 'Technical Round 1',
        additional_instructions: 'Bring your portfolio.',
        status: 'Completed',
        created_at: new Date(app.created_at.getTime() + 48 * 3600 * 1000),
        updated_at: new Date(app.created_at.getTime() + 72 * 3600 * 1000)
      }).returning('*');

      // Seed Feedback
      await knex('interview_feedback').insert({
        interview_id: interview.id,
        interviewer_name: 'Jane Doe',
        feedback_text: 'Excellent problem solving skills. Solved coding questions under 15 minutes. Very strong React core skills. Highly recommended.',
        rating: 5,
        created_at: new Date(app.created_at.getTime() + 72 * 3600 * 1000)
      });

      // Recruiter Private Note
      await knex('candidate_notes').insert([
        { application_id: app.id, recruiter_user_id: recruiterUser.id, note_text: 'Strong React skills. Recommended for Technical Round.', created_at: new Date(app.created_at.getTime() + 24 * 3600 * 1000) },
        { application_id: app.id, recruiter_user_id: recruiterUser.id, note_text: 'Done with Round 1, candidate showed great communication.', created_at: new Date(app.created_at.getTime() + 73 * 3600 * 1000) }
      ]);

      // Email logs
      await knex('email_logs').insert([
        { application_id: app.id, to_email: candidate.email, subject: 'Job Application Received: Software Engineer', body: 'Mock Body', status: 'Sent', created_at: new Date(app.created_at) },
        { application_id: app.id, to_email: candidate.email, subject: 'Interview Invitation', body: 'Dear candidate, congratulations...', status: 'Sent', created_at: new Date(app.created_at.getTime() + 48 * 3600 * 1000) },
        { application_id: app.id, to_email: candidate.email, subject: 'Job Selection Offer', body: 'Dear candidate, congratulations you have been selected for the role...', status: 'Sent', created_at: new Date(app.updated_at) }
      ]);

    } else if (app.status === 'Rejected') {
      await knex('application_status_history').insert([
        { application_id: app.id, status: 'Applied', changed_by_user_id: null, remarks: 'Applied through Job Portal', created_at: new Date(app.created_at) },
        { application_id: app.id, status: 'Under Review', changed_by_user_id: recruiterUser.id, remarks: 'Reviewing...', created_at: new Date(app.created_at.getTime() + 10 * 3600 * 1000) },
        { application_id: app.id, status: 'Rejected', changed_by_user_id: recruiterUser.id, remarks: 'Does not have Java/Spring Boot experience as required for this listing.', created_at: new Date(app.updated_at) }
      ]);

      // Recruiter Private Note
      await knex('candidate_notes').insert({
        application_id: app.id,
        recruiter_user_id: recruiterUser.id,
        note_text: 'Needs improvement in SQL and backend frameworks.',
        created_at: new Date(app.created_at.getTime() + 12 * 3600 * 1000)
      });

      // Email logs
      await knex('email_logs').insert([
        { application_id: app.id, to_email: candidate.email, subject: 'Job Application Received: Software Engineer', body: 'Mock Body', status: 'Sent', created_at: new Date(app.created_at) },
        { application_id: app.id, to_email: candidate.email, subject: 'Application Status Update', body: 'Thank you for your interest. Unfortunately, we will not be moving forward...', status: 'Sent', created_at: new Date(app.updated_at) }
      ]);

    } else if (app.status === 'Hired') {
      await knex('application_status_history').insert([
        { application_id: app.id, status: 'Applied', changed_by_user_id: null, remarks: 'Applied through Job Portal', created_at: new Date(app.created_at) },
        { application_id: app.id, status: 'Shortlisted', changed_by_user_id: recruiterUser.id, remarks: 'Resume fits requirements.', created_at: new Date(app.created_at.getTime() + 2 * 24 * 3600 * 1000) },
        { application_id: app.id, status: 'Interview Scheduled', changed_by_user_id: recruiterUser.id, remarks: 'Interview Scheduled.', created_at: new Date(app.created_at.getTime() + 3 * 24 * 3600 * 1000) },
        { application_id: app.id, status: 'Interview Completed', changed_by_user_id: recruiterUser.id, remarks: 'Interview Completed.', created_at: new Date(app.created_at.getTime() + 4 * 24 * 3600 * 1000) },
        { application_id: app.id, status: 'Selected', changed_by_user_id: recruiterUser.id, remarks: 'Selected for role.', created_at: new Date(app.created_at.getTime() + 5 * 24 * 3600 * 1000) },
        { application_id: app.id, status: 'Offer Sent', changed_by_user_id: recruiterUser.id, remarks: 'Offer letter dispatched.', created_at: new Date(app.created_at.getTime() + 6 * 24 * 3600 * 1000) },
        { application_id: app.id, status: 'Hired', changed_by_user_id: recruiterUser.id, remarks: 'Candidate accepted offer. Hired!', created_at: new Date(app.updated_at) }
      ]);
    }
  }

  console.log('✅ Mock ATS records seeded successfully.');
};
