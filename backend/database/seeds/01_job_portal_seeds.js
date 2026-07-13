const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 1. Deletes ALL existing entries in proper dependency order
  await knex('saved_jobs').del();
  await knex('refresh_tokens').del();
  await knex('password_resets').del();
  await knex('email_verifications').del();
  await knex('notifications').del();
  await knex('resumes').del();
  await knex('recruiters').del();
  await knex('job_skills').del();
  await knex('skills').del();
  await knex('applications').del();
  await knex('jobs').del();
  await knex('companies').del();
  await knex('users').del();
  await knex('roles').del();
  await knex('job_categories').del();
  await knex('locations').del();
  await knex('email_templates').del();

  // 2. Seed Roles
  const [roleAdmin, roleRecruiter, roleCandidate] = await knex('roles').insert([
    { name: 'admin', description: 'System Administrator with full access' },
    { name: 'recruiter', description: 'Company Recruiter managing listings and applications' },
    { name: 'candidate', description: 'Job seeker candidate profile' }
  ]).returning('*');

  // 3. Seed Job Categories
  const categories = await knex('job_categories').insert([
    { name: 'Software Engineering', description: 'Coding, backend, frontend, systems development, DevOps' },
    { name: 'Finance & Accounts', description: 'Corporate banking, taxation, investment, bookkeeping' },
    { name: 'Healthcare & Biotech', description: 'Medical research, clinical engineering, healthcare operations' },
    { name: 'Design & Creative', description: 'UI/UX interface design, graphic art, brand assets creation' },
    { name: 'Marketing & Sales', description: 'Growth channels, search optimization, customer outreach' },
    { name: 'Human Resources', description: 'Talent acquisitions, payroll, employee engagement' }
  ]).returning('*');

  // 4. Seed Locations
  const dbLocations = await knex('locations').insert([
    { state: 'Karnataka', city: 'Bangalore' },
    { state: 'Maharashtra', city: 'Mumbai' },
    { state: 'Delhi NCR', city: 'Delhi' },
    { state: 'Maharashtra', city: 'Pune' },
    { state: 'Tamil Nadu', city: 'Chennai' },
    { state: 'Telangana', city: 'Hyderabad' },
    { state: 'Remote', city: 'Remote' }
  ]).returning('*');

  // 5. Seed Email Templates
  await knex('email_templates').insert([
    {
      name: 'email_verification',
      subject: 'Verify Your Email Address - JobPortal',
      body: '<p>Welcome {{name}}!</p><p>Please click the link below to verify your email address and activate your account:</p><p><a href="{{link}}" target="_blank">Verify Account Address</a></p><p>This link is valid for 24 hours.</p>'
    },
    {
      name: 'password_reset',
      subject: 'Reset Your Password - JobPortal',
      body: '<p>Hi {{name}},</p><p>You requested a password reset. Click the link below to select a new password:</p><p><a href="{{link}}" target="_blank">Reset Password Link</a></p><p>If you did not request this, you can safely ignore this email.</p>'
    },
    {
      name: 'application_submitted',
      subject: 'Job Application Received: {{job_title}}',
      body: '<p>Hello {{name}},</p><p>Your application for <strong>{{job_title}}</strong> at <strong>{{company_name}}</strong> has been submitted successfully.</p><p>The HR team will review your application details shortly. You can track your application status in the Candidate Dashboard.</p>'
    },
    {
      name: 'candidate_alert_hr',
      subject: 'New Job Application: {{candidate_name}} - {{job_title}}',
      body: '<p>Hello HR,</p><p>A candidate has applied for your open listing <strong>{{job_title}}</strong>.</p><p><strong>Candidate Details:</strong></p><ul><li>Name: {{candidate_name}}</li><li>Email: {{candidate_email}}</li><li>Phone: {{candidate_phone}}</li><li>Experience: {{experience}}</li></ul><p>Please check the admin dashboard to review their attached resume and cover letter.</p>'
    }
  ]);

  // 6. Seed Users
  const adminPasswordHash = bcrypt.hashSync('AdminPassword123', 10);
  const candidatePasswordHash = bcrypt.hashSync('Password123', 10);

  const [adminUser] = await knex('users').insert([
    {
      first_name: 'System',
      last_name: 'Administrator',
      email: 'admin@jobportal.com',
      phone: '+919999999999',
      password: adminPasswordHash,
      role: 'admin',
      profile_image: null,
      is_verified: true
    }
  ]).returning('*');

  const candidateUsers = await knex('users').insert([
    {
      first_name: 'Amit',
      last_name: 'Sharma',
      email: 'amit.sharma@gmail.com',
      phone: '+919876543210',
      password: candidatePasswordHash,
      role: 'candidate',
      profile_image: null,
      is_verified: true
    },
    {
      first_name: 'Priya',
      last_name: 'Patel',
      email: 'priya.patel@yahoo.com',
      phone: '+919812345678',
      password: candidatePasswordHash,
      role: 'candidate',
      profile_image: null,
      is_verified: true
    },
    {
      first_name: 'Rahul',
      last_name: 'Verma',
      email: 'rahul.verma@outlook.com',
      phone: '+919823456789',
      password: candidatePasswordHash,
      role: 'candidate',
      profile_image: null,
      is_verified: true
    },
    {
      first_name: 'Anjali',
      last_name: 'Nair',
      email: 'anjali.nair@gmail.com',
      phone: '+919834567890',
      password: candidatePasswordHash,
      role: 'candidate',
      profile_image: null,
      is_verified: true
    },
    {
      first_name: 'Vikram',
      last_name: 'Singh',
      email: 'vikram.singh@gmail.com',
      phone: '+919845678901',
      password: candidatePasswordHash,
      role: 'candidate',
      profile_image: null,
      is_verified: true
    }
  ]).returning('*');

  // Seed a Recruiter User
  const [recruiterUser] = await knex('users').insert([
    {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'recruiter@jobportal.com',
      phone: '+919888888888',
      password: candidatePasswordHash,
      role: 'recruiter',
      profile_image: null,
      is_verified: true
    }
  ]).returning('*');

  // 7. Seed Companies (20 companies)
  const rawCompanyData = [
    { name: 'TechSynergy', logo: 'company_techsynergy.png', website: 'https://techsynergy.io', description: 'Next-generation AI and software consulting services.' },
    { name: 'CloudNexus', logo: 'company_cloudnexus.png', website: 'https://cloudnexus.net', description: 'Enterprise cloud infrastructure and DevOps pipelines.' },
    { name: 'FinFlow Technologies', logo: 'company_finflow.png', website: 'https://finflow.com', description: 'Modern financial engineering and payment gateways.' },
    { name: 'HealthPulse', logo: 'company_healthpulse.png', website: 'https://healthpulse.org', description: 'Biotech engineering and electronic medical record suites.' },
    { name: 'EduSphere', logo: 'company_edusphere.png', website: 'https://edusphere.edu', description: 'Interactive learning systems and university admin tools.' },
    { name: 'Apex Cybersecurity', logo: 'company_apexcyber.png', website: 'https://apexsec.com', description: 'Network protection, firewalls, and penetration audits.' },
    { name: 'Zeta Mobile', logo: 'company_zetamobile.png', website: 'https://zetamobile.co', description: 'Elegant consumer and enterprise iOS & Android utilities.' },
    { name: 'HyperDrive Logistics', logo: 'company_hyperdrive.png', website: 'https://hyperlogistics.com', description: 'AI-driven supply chain routing and dispatch optimization.' },
    { name: 'Omni Retail', logo: 'company_omniretail.png', website: 'https://omniretail.in', description: 'B2B ecommerce aggregators and storefront builders.' },
    { name: 'GreenEnergy Labs', logo: 'company_greenenergy.png', website: 'https://greenenergy.org', description: 'Grid analytics, battery management, and carbon accounting.' },
    { name: 'PixelPerfect Studio', logo: 'company_pixelperfect.png', website: 'https://pixelperfect.design', description: 'Immersive UI/UX consulting and game assets design.' },
    { name: 'QuantumForge', logo: 'company_quantumforge.png', website: 'https://quantumforge.tech', description: 'Experimental quantum computing and cryptography services.' },
    { name: 'DataVista Analytics', logo: 'company_datavista.png', website: 'https://datavista.com', description: 'Visual intelligence dashboards and real-time streaming tools.' },
    { name: 'NeoRobotics', logo: 'company_neorobotics.png', website: 'https://neorobotics.co', description: 'Warehouse automation systems and edge control software.' },
    { name: 'InnoMedia Labs', logo: 'company_innomedia.png', website: 'https://innomedia.net', description: 'High-speed content delivery and adaptive video players.' },
    { name: 'AeroSpace Next', logo: 'company_aerospace.png', website: 'https://aerospacenext.com', description: 'Avionics software and satellite telemetry analysis.' },
    { name: 'BlockShield', logo: 'company_blockshield.png', website: 'https://blockshield.io', description: 'Smart contract audits and decentralised identities.' },
    { name: 'CoreSaaS Group', logo: 'company_coresaas.png', website: 'https://coresaas.com', description: 'Workflow optimization tools and team communication platforms.' },
    { name: 'AlphaMarketing', logo: 'company_alphamarketing.png', website: 'https://alphamkt.com', description: 'Ad-tech engines and customer attribution frameworks.' },
    { name: 'Optima HR', logo: 'company_optimahr.png', website: 'https://optimahr.com', description: 'Automated screening platforms and employee payroll hubs.' }
  ];

  const companyData = rawCompanyData.map(c => ({
    ...c,
    email: `hr@${c.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    phone: '+919876543210',
    industry: 'Technology & Consulting Services',
    address: 'Indiranagar, Bangalore, Karnataka',
    banner: 'default_company_banner.png'
  }));

  const companies = await knex('companies').insert(companyData).returning('*');

  // Map Recruiter user to TechSynergy company
  await knex('recruiters').insert({
    user_id: recruiterUser.id,
    company_id: companies[0].id, // TechSynergy
    position: 'Lead Technical Recruiter'
  });

  // 8. Seed Skills (30 skills)
  const skillNames = [
    'React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'JavaScript',
    'TypeScript', 'Python', 'Django', 'AWS', 'Docker',
    'Kubernetes', 'DevOps', 'HTML5', 'CSS3', 'Next.js',
    'React Native', 'MongoDB', 'Redis', 'GraphQL', 'REST API',
    'Go', 'Java', 'Spring Boot', 'PHP', 'Laravel',
    'Vue.js', 'Cybersecurity', 'UI/UX Design', 'Figma', 'CI/CD'
  ];

  const skillInserts = skillNames.map(name => ({ name }));
  const skills = await knex('skills').insert(skillInserts).returning('*');

  // 9. Seed Jobs (100 jobs)
  const jobTitles = [
    'Software Engineer', 'Senior Frontend Developer', 'Backend Developer',
    'Full Stack Engineer', 'DevOps Engineer', 'Database Administrator',
    'Mobile App Developer', 'React Developer', 'Node.js Specialist',
    'QA Automation Engineer', 'Cloud Architect', 'Cybersecurity Analyst',
    'UI/UX Designer', 'Data Scientist', 'Technical Lead'
  ];

  const jobsToInsert = [];

  for (let i = 1; i <= 100; i++) {
    const company = companies[i % companies.length];
    const title = `${jobTitles[i % jobTitles.length]} ${i % 3 === 0 ? '(Senior)' : ''}`.trim();

    // Select category based on title keywords
    let jobCategory = categories[0]; // Software engineering default
    if (title.includes('UI/UX Designer') || title.includes('Frontend')) {
      jobCategory = categories[3]; // Design
    } else if (title.includes('Lead') || title.includes('QA') || title.includes('Analyst')) {
      jobCategory = i % 2 === 0 ? categories[0] : categories[4]; // Software / Marketing
    }

    // Select job type
    const jobTypes = ['Full Time', 'Part Time', 'Internship', 'Contract', 'Remote'];
    const jobType = jobTypes[i % jobTypes.length];

    // Select location reference
    let locationObj = dbLocations[i % dbLocations.length];
    if (jobType === 'Remote') {
      locationObj = dbLocations.find(l => l.city === 'Remote') || locationObj;
    } else if (locationObj.city === 'Remote') {
      const nonRemoteLocations = dbLocations.filter(l => l.city !== 'Remote');
      locationObj = nonRemoteLocations[i % nonRemoteLocations.length];
    }
    const locationString = `${locationObj.city}, ${locationObj.state}`;

    const expBands = ['0-2 Years', '3-5 Years', '5-8 Years', '8+ Years'];
    const exp = expBands[i % expBands.length];

    let salaryMin, salaryMax;
    const salaryTier = i % 4;
    if (salaryTier === 0) {
      salaryMin = 15000;
      salaryMax = 25000;
    } else if (salaryTier === 1) {
      salaryMin = 30000;
      salaryMax = 45000;
    } else if (salaryTier === 2) {
      salaryMin = 50000;
      salaryMax = 75000;
    } else {
      salaryMin = 85000;
      salaryMax = 120000;
    }

    const status = i <= 90 ? 'active' : 'inactive';

    jobsToInsert.push({
      company_id: company.id,
      title,
      description: `We are seeking a talented ${title} to join the technical operations team at ${company.name}. You will design, build, and deploy modules, write clean structured components, and collaborate across departments. Our main operational focus: ${company.description}\n\nQualifications:\n- Strong capability\n- Clear communicative delivery\n- Fast deployment familiarity\n\nBenefits:\n- Health cover\n- Flexible timings\n- Competitive bonus packages`,
      salary_min: salaryMin,
      salary_max: salaryMax,
      job_type: jobType,
      location: locationString,
      experience: exp,
      status,
      category_id: jobCategory.id,
      location_id: locationObj.id,
      created_at: new Date(Date.now() - (i * 2 * 3600000))
    });
  }

  const seededJobs = await knex('jobs').insert(jobsToInsert).returning('*');

  // 10. Seed Job Skills (2 to 5 skills per job)
  const jobSkillsInserts = [];
  seededJobs.forEach(job => {
    const numSkills = 2 + (job.id % 4);
    const usedSkillIds = new Set();
    while (usedSkillIds.size < numSkills) {
      const idx = (job.id + usedSkillIds.size * 7) % skills.length;
      usedSkillIds.add(skills[idx].id);
    }
    usedSkillIds.forEach(skillId => {
      jobSkillsInserts.push({
        job_id: job.id,
        skill_id: skillId
      });
    });
  });

  await knex('job_skills').insert(jobSkillsInserts);

  // 11. Seed Applications
  const appStatuses = [
    'Pending',
    'Reviewing',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  const appInserts = [];
  let appCounter = 0;

  for (let candidateIdx = 0; candidateIdx < candidateUsers.length; candidateIdx++) {
    const candidate = candidateUsers[candidateIdx];
    for (let k = 0; k < 3; k++) {
      const jobIdx = (candidateIdx * 4 + k * 12) % seededJobs.length;
      const job = seededJobs[jobIdx];
      if (job.status !== 'active') continue;

      const status = appStatuses[appCounter % appStatuses.length];
      appCounter++;

      const requiredSkillIds = jobSkillsInserts
        .filter(js => js.job_id === job.id)
        .map(js => js.skill_id);

      const requiredSkillNames = skills
        .filter(s => requiredSkillIds.includes(s.id))
        .map(s => s.name);

      let candidateSkills = '';
      if (['Shortlisted', 'Interview', 'Selected'].includes(status)) {
        candidateSkills = requiredSkillNames.join(', ');
      } else {
        if (requiredSkillNames.length > 0) {
          candidateSkills = requiredSkillNames.slice(1).join(', ');
        } else {
          candidateSkills = 'React.js, Node.js';
        }
      }

      const structuredCoverLetter = `
Dear Hiring Team,

I am excited to apply for the ${job.title} vacancy. With my core skills: ${candidateSkills}, I believe I can be a valuable addition.

Thank you,
${candidate.first_name} ${candidate.last_name}
`.trim();

      appInserts.push({
        user_id: candidate.id,
        job_id: job.id,
        resume: `candidate_${candidate.first_name.toLowerCase()}_resume.pdf`,
        skills: candidateSkills,
        cover_letter: structuredCoverLetter,
        status,
        created_at: new Date(Date.now() - (k * 24 * 3600000))
      });
    }
  }

  await knex('applications').insert(appInserts);

  // 12. Seed Saved Jobs
  const candidates = await knex('users').where({ role: 'candidate' }).select('id');
  const activeJobs = await knex('jobs').where({ status: 'active' }).select('id').limit(15);

  if (candidates.length > 0 && activeJobs.length > 0) {
    const savedJobsData = [];
    candidates.forEach((candidate, idx) => {
      const job1 = activeJobs[(idx * 2) % activeJobs.length];
      const job2 = activeJobs[(idx * 2 + 1) % activeJobs.length];

      savedJobsData.push({
        user_id: candidate.id,
        job_id: job1.id,
        created_at: new Date(Date.now() - (idx * 24 * 3600000))
      });
      savedJobsData.push({
        user_id: candidate.id,
        job_id: job2.id,
        created_at: new Date(Date.now() - (idx * 24 * 3600000 + 12 * 3600000))
      });
    });

    await knex('saved_jobs').insert(savedJobsData);
  }
};
