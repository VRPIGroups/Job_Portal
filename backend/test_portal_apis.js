// C:\Users\Abrar Ali\.gemini\antigravity-ide\brain\41a7781c-b5b3-468b-8779-1fa716007bc4\scratch\test_portal_apis.js
const axios = require('axios');
const db = require('c:/Users/Abrar Ali/OneDrive/Desktop/Job_Portal/backend/src/config/db');

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('=== STARTING INTEGRATION API TESTING ===\n');

  let testApplicationId = null;
  let testJobId = null;

  try {
    // Setup: Ensure at least one application exists for TechSynergy (Recruiter's Company)
    console.log('Setup: Preparing test application record for TechSynergy recruiter...');
    const candidate = await db('users').where({ email: 'amit.sharma@gmail.com' }).first();
    const company = await db('companies').where({ name: 'TechSynergy' }).first();
    
    if (!candidate || !company) {
      console.error('✘ Setup error: Candidate or Company not found in database.');
      process.exit(1);
    }

    // Find a job for TechSynergy
    let job = await db('jobs').where({ company_id: company.id }).first();
    if (!job) {
      // Create a temporary job
      const [newJob] = await db('jobs').insert({
        company_id: company.id,
        title: 'TechSynergy Test Job',
        description: 'Test Job description',
        salary_min: 500000,
        salary_max: 800000,
        job_type: 'Full Time',
        location: 'Bangalore, Karnataka',
        experience: '1-3 years',
        status: 'active'
      }).returning('*');
      job = newJob;
      testJobId = newJob.id;
    }

    // Check if application already exists
    let app = await db('applications').where({ user_id: candidate.id, job_id: job.id }).first();
    if (!app) {
      const [newApp] = await db('applications').insert({
        user_id: candidate.id,
        job_id: job.id,
        resume: 'candidate_amit_resume.pdf',
        skills: 'React.js, Node.js, Express.js',
        cover_letter: 'Test cover letter text details.',
        status: 'Applied'
      }).returning('*');
      app = newApp;
      testApplicationId = newApp.id;
      console.log(`✔ Created test application with ID ${testApplicationId} for TechSynergy.`);
    } else {
      console.log(`✔ Found existing application with ID ${app.id}.`);
    }

    // Test 1: Candidate Login
    console.log('\nTest 1: Logging in as Candidate (amit.sharma@gmail.com)...');
    let candidateToken;
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'amit.sharma@gmail.com',
      password: 'Password123'
    });
    
    if (loginRes.data.success) {
      candidateToken = loginRes.data.accessToken;
      console.log('✔ Candidate logged in successfully.');
    }

    // Test 2: Fetch Candidate Applications
    console.log('\nTest 2: Fetching Candidate Applications...');
    const appRes = await axios.get(`${BASE_URL}/applications`, {
      headers: { Authorization: `Bearer ${candidateToken}` }
    });

    if (appRes.data.success) {
      const list = appRes.data.data;
      console.log(`✔ Candidate fetched applications successfully. Found: ${list.length} records.`);
      // Check that all returned applications belong to the candidate
      const otherUserApps = list.filter(app => app.email !== 'amit.sharma@gmail.com');
      if (otherUserApps.length === 0) {
        console.log('✔ Verified: Candidate only sees their own applications.');
      } else {
        console.error('✘ Security Leak: Candidate saw other users applications!');
        process.exit(1);
      }
    }

    // Test 3: Recruiter Login
    console.log('\nTest 3: Logging in as Recruiter (recruiter@jobportal.com)...');
    let recruiterToken;
    const recLoginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'recruiter@jobportal.com',
      password: 'Password123'
    });

    if (recLoginRes.data.success) {
      recruiterToken = recLoginRes.data.accessToken;
      console.log('✔ Recruiter logged in successfully.');
    }

    // Test 4: Fetch Recruiter applications pipeline
    console.log('\nTest 4: Fetching Recruiter Applications Pipeline...');
    const recAppRes = await axios.get(`${BASE_URL}/applications`, {
      headers: { Authorization: `Bearer ${recruiterToken}` }
    });

    if (recAppRes.data.success) {
      const list = recAppRes.data.data;
      console.log(`✔ Recruiter fetched applications successfully. Found: ${list.length} pipeline records.`);
      if (list.length > 0) {
        // Verify they all belong to the recruiter's company (TechSynergy)
        const wrongCompanyApps = list.filter(app => app.company_name !== 'TechSynergy');
        if (wrongCompanyApps.length === 0) {
          console.log('✔ Verified: Recruiter only sees applications for TechSynergy.');
        } else {
          console.error('✘ Security Leak: Recruiter saw applications for other companies!');
          process.exit(1);
        }
      } else {
        console.error('✘ Recruiter applications pipeline is empty, expected test applications.');
        process.exit(1);
      }
    }

    // Test 5: Recruiter Post Job
    console.log('\nTest 5: Recruiter posting a new Job Opportunity...');
    const skillsRes = await axios.get(`${BASE_URL}/jobs/skills`);
    const availableSkillIds = skillsRes.data.success 
      ? skillsRes.data.data.slice(0, 3).map(s => s.id)
      : [];
    console.log(`Using real skill IDs: ${availableSkillIds.join(', ')}`);

    let createdJobId;
    const jobRes = await axios.post(`${BASE_URL}/jobs`, {
      title: 'Senior AI Engineer (Programmatic Test)',
      description: 'We are seeking an expert AI specialist to lead model development.',
      company_id: 999, // Intentional mismatch to verify overwrite logic
      salary_min: 1400000,
      salary_max: 2000000,
      job_type: 'Remote',
      location: 'Remote',
      experience: '5-8 years',
      skills: availableSkillIds,
      status: 'active'
    }, {
      headers: { Authorization: `Bearer ${recruiterToken}` }
    });

    if (jobRes.data.success) {
      const jobData = jobRes.data.data;
      createdJobId = jobData.id;
      console.log(`✔ Job opportunity created successfully with ID: ${createdJobId}`);
      if (jobData.company_name === 'TechSynergy') {
        console.log('✔ Verified: Recruiter job company was correctly forced/mapped to TechSynergy.');
      } else {
        console.error('✘ Mismatch error: Recruiter job mapped to incorrect company:', jobData.company_name);
        process.exit(1);
      }
    }

    // Test 6: Recruiter Update Application Status
    const targetAppId = testApplicationId || app.id;
    console.log(`\nTest 6: Recruiter updating Application ID ${targetAppId} status to "Shortlisted"...`);
    const statusRes = await axios.patch(`${BASE_URL}/applications/${targetAppId}/status`, {
      status: 'Shortlisted'
    }, {
      headers: { Authorization: `Bearer ${recruiterToken}` }
    });

    if (statusRes.data.success) {
      console.log('✔ Application status updated successfully.');
    }

    // Test 7: Recruiter Clean Up (Delete created job)
    if (createdJobId) {
      console.log(`\nTest 7: Cleaning up by deleting job ID ${createdJobId}...`);
      const deleteRes = await axios.delete(`${BASE_URL}/jobs/${createdJobId}`, {
        headers: { Authorization: `Bearer ${recruiterToken}` }
      });

      if (deleteRes.data.success) {
        console.log('✔ Programmatic job deleted successfully.');
      }
    }

    // Cleanup Setup
    console.log('\nCleanup: Removing test records from database...');
    if (testApplicationId) {
      await db('applications').where({ id: testApplicationId }).del();
      console.log('✔ Removed test application.');
    }
    if (testJobId) {
      await db('job_skills').where({ job_id: testJobId }).del();
      await db('jobs').where({ id: testJobId }).del();
      console.log('✔ Removed test job.');
    }

    console.log('\n=============================================');
    console.log('🎉 ALL PORTAL INTEGRATION TESTS PASSED!');
    console.log('=============================================');
    
    // Close DB connection pool
    await db.destroy();
    process.exit(0);

  } catch (err) {
    console.error('✘ Test run encountered error:', err.response?.data || err.message);
    
    // Attempt cleanup before exit
    try {
      if (testApplicationId) await db('applications').where({ id: testApplicationId }).del();
      if (testJobId) {
        await db('job_skills').where({ job_id: testJobId }).del();
        await db('jobs').where({ id: testJobId }).del();
      }
    } catch (_) {}
    
    await db.destroy();
    process.exit(1);
  }
}

runTests();
