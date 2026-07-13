// backend/src/controllers/atsController.js
const db = require('../config/db');

// Helper to filter query by recruiter company
const applyCompanyFilter = async (query, user) => {
  if (user.role === 'recruiter') {
    const recruiter = await db('recruiters').where({ user_id: user.id }).first();
    if (recruiter) {
      query.andWhere('jobs.company_id', recruiter.company_id);
    } else {
      query.andWhereRaw('1=0'); // Force empty if no recruiter record
    }
  }
};

// 1. Get ATS Dashboard Analytics
exports.getAnalytics = async (req, res, next) => {
  try {
    const { user } = req;

    // A. Funnel Metrics Counts
    const funnelQuery = db('applications')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .select('applications.status')
      .count('applications.id as count')
      .groupBy('applications.status');
    
    await applyCompanyFilter(funnelQuery, user);
    const funnelResult = await funnelQuery;

    // Structure metrics
    const funnelMap = {};
    let total = 0;
    funnelResult.forEach(item => {
      funnelMap[item.status] = parseInt(item.count, 10);
      total += parseInt(item.count, 10);
    });

    // Compute Average Resume Match Score
    const scoreAvgQuery = db('application_scores')
      .join('applications', 'application_scores.application_id', '=', 'applications.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .avg('application_scores.match_score as avg_score')
      .first();
    
    await applyCompanyFilter(scoreAvgQuery, user);
    const scoreAvgResult = await scoreAvgQuery;
    const averageResumeScore = scoreAvgResult && scoreAvgResult.avg_score 
      ? Math.round(parseFloat(scoreAvgResult.avg_score)) 
      : 0;

    const metrics = {
      totalApplications: total,
      newApplications: funnelMap['Applied'] || 0,
      underReview: funnelMap['Under Review'] || 0,
      shortlisted: funnelMap['Shortlisted'] || 0,
      interviewsScheduled: funnelMap['Interview Scheduled'] || 0,
      interviewCompleted: funnelMap['Interview Completed'] || 0,
      selected: funnelMap['Selected'] || 0,
      rejected: funnelMap['Rejected'] || 0,
      offerSent: funnelMap['Offer Sent'] || funnelMap['Offer Letter Sent'] || 0,
      hired: funnelMap['Hired'] || 0,
      averageResumeScore
    };

    // B. Monthly Applications (Last 6 Months)
    const monthlyQuery = db('applications')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .select(db.raw("to_char(applications.created_at, 'YYYY-MM') as month_key"))
      .select(db.raw("to_char(applications.created_at, 'Mon YYYY') as month_name"))
      .count('applications.id as count')
      .groupByRaw("to_char(applications.created_at, 'YYYY-MM'), to_char(applications.created_at, 'Mon YYYY')")
      .orderBy('month_key', 'asc')
      .limit(6);
    
    await applyCompanyFilter(monthlyQuery, user);
    const monthlyResult = await monthlyQuery;

    const monthlyApplications = monthlyResult.map(item => ({
      month: item.month_name,
      applications: parseInt(item.count, 10)
    }));

    // C. Job-wise Applications Breakdown
    const jobWiseQuery = db('applications')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .select('jobs.title')
      .count('applications.id as count')
      .groupBy('jobs.id', 'jobs.title')
      .orderBy('count', 'desc')
      .limit(5);

    await applyCompanyFilter(jobWiseQuery, user);
    const jobWiseResult = await jobWiseQuery;

    const jobWiseApplications = jobWiseResult.map(item => ({
      title: item.title,
      applications: parseInt(item.count, 10)
    }));

    // D. Recruiter Performance (Status changes handled by user)
    // We count notes added, status history changes, or interviews scheduled by recruiter
    const recruiterQuery = db('application_status_history')
      .join('users', 'application_status_history.changed_by_user_id', '=', 'users.id')
      .join('applications', 'application_status_history.application_id', '=', 'applications.id')
      .join('jobs', 'applications.job_id', '=', 'jobs.id')
      .select(db.raw("CONCAT(users.first_name, ' ', users.last_name) as name"))
      .countDistinct('application_status_history.application_id as candidates_processed')
      .groupBy('users.id', 'users.first_name', 'users.last_name')
      .orderBy('candidates_processed', 'desc');

    await applyCompanyFilter(recruiterQuery, user);
    const recruiterResult = await recruiterQuery;

    const recruiterPerformance = recruiterResult.map(item => ({
      name: item.name,
      processed: parseInt(item.candidates_processed, 10)
    }));

    // Fallback if empty recruiter data to avoid empty charts
    if (recruiterPerformance.length === 0) {
      recruiterPerformance.push({ name: 'Default Recruiter', processed: metrics.totalApplications - metrics.newApplications });
    }

    res.status(200).json({
      success: true,
      data: {
        metrics,
        monthlyApplications,
        jobWiseApplications,
        recruiterPerformance,
        funnel: [
          { stage: 'Applied', count: metrics.newApplications },
          { stage: 'Under Review', count: metrics.underReview },
          { stage: 'Shortlisted', count: metrics.shortlisted },
          { stage: 'Interviewing', count: metrics.interviewsScheduled + metrics.interviewCompleted },
          { stage: 'Selected', count: metrics.selected },
          { stage: 'Offer Sent', count: metrics.offerSent },
          { stage: 'Hired', count: metrics.hired }
        ]
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. Export ATS Reports (CSV Format)
exports.exportReport = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { user } = req;

    let csvContent = '';
    let filename = `ats_report_${type}_${Date.now()}.csv`;

    if (type === 'hiring') {
      const query = db('applications')
        .join('users', 'applications.user_id', '=', 'users.id')
        .join('jobs', 'applications.job_id', '=', 'jobs.id')
        .join('companies', 'jobs.company_id', '=', 'companies.id')
        .select(
          'applications.id',
          'users.first_name',
          'users.last_name',
          'users.email',
          'jobs.title as job_title',
          'companies.name as company_name',
          'applications.status',
          'applications.created_at'
        )
        .orderBy('applications.created_at', 'desc');

      await applyCompanyFilter(query, user);
      const rows = await query;

      csvContent = 'Application ID,Candidate Name,Email,Job Title,Company,Status,Applied Date\n';
      rows.forEach(r => {
        const name = `"${r.first_name} ${r.last_name}"`;
        const job = `"${r.job_title}"`;
        const company = `"${r.company_name}"`;
        const date = new Date(r.created_at).toLocaleDateString();
        csvContent += `${r.id},${name},${r.email},${job},${company},${r.status},${date}\n`;
      });

    } else if (type === 'recruiter-performance') {
      const query = db('recruiters')
        .join('users', 'recruiters.user_id', '=', 'users.id')
        .join('companies', 'recruiters.company_id', '=', 'companies.id')
        .select(
          'users.first_name',
          'users.last_name',
          'users.email',
          'recruiters.position',
          'companies.name as company_name'
        );

      if (user.role === 'recruiter') {
        const recruiter = await db('recruiters').where({ user_id: user.id }).first();
        if (recruiter) {
          query.where('recruiters.company_id', recruiter.company_id);
        }
      }
      const recruiters = await query;

      csvContent = 'Recruiter Name,Email,Position,Company,Jobs Posted,Applications Managed\n';
      for (const rec of recruiters) {
        const jobsCount = await db('jobs').where({ company_id: user.role === 'recruiter' ? (await db('recruiters').where({ user_id: user.id }).first()).company_id : 1 }).count('id as count').first();
        const appsCount = await db('applications')
          .join('jobs', 'applications.job_id', '=', 'jobs.id')
          .where('jobs.company_id', user.role === 'recruiter' ? (await db('recruiters').where({ user_id: user.id }).first()).company_id : 1)
          .count('applications.id as count')
          .first();

        const name = `"${rec.first_name} ${rec.last_name}"`;
        const position = `"${rec.position || 'N/A'}"`;
        csvContent += `${name},${rec.email},${position},"${rec.company_name}",${jobsCount.count},${appsCount.count}\n`;
      }

    } else if (type === 'monthly-hiring') {
      const query = db('applications')
        .join('jobs', 'applications.job_id', '=', 'jobs.id')
        .select(db.raw("to_char(applications.created_at, 'Mon YYYY') as month_name"))
        .select(db.raw("to_char(applications.created_at, 'YYYY-MM') as month_key"))
        .count('applications.id as total_apps')
        .select(db.raw("count(CASE WHEN applications.status = 'Hired' THEN 1 END) as hires"))
        .groupByRaw("to_char(applications.created_at, 'Mon YYYY'), to_char(applications.created_at, 'YYYY-MM')")
        .orderBy('month_key', 'desc');

      await applyCompanyFilter(query, user);
      const rows = await query;

      csvContent = 'Month,Total Applications,Hired Count\n';
      rows.forEach(r => {
        csvContent += `${r.month_name},${r.total_apps},${r.hires}\n`;
      });

    } else if (type === 'job-wise') {
      const query = db('jobs')
        .join('companies', 'jobs.company_id', '=', 'companies.id')
        .leftJoin('job_categories', 'jobs.category_id', '=', 'job_categories.id')
        .select(
          'jobs.id',
          'jobs.title',
          'job_categories.name as category_name',
          'companies.name as company_name',
          'jobs.status'
        );

      if (user.role === 'recruiter') {
        const recruiter = await db('recruiters').where({ user_id: user.id }).first();
        if (recruiter) {
          query.where('jobs.company_id', recruiter.company_id);
        }
      }
      const jobs = await query;

      csvContent = 'Job Title,Category,Company,Status,Total Applications\n';
      for (const job of jobs) {
        const countRes = await db('applications').where({ job_id: job.id }).count('id as count').first();
        csvContent += `"${job.title}","${job.category_name || 'N/A'}","${job.company_name}",${job.status},${countRes.count}\n`;
      }

    } else if (type === 'company-wise') {
      const companies = await db('companies').select('*');

      csvContent = 'Company Name,Website,Industry,Total Jobs Posted,Total Applications\n';
      for (const comp of companies) {
        const jobsCount = await db('jobs').where({ company_id: comp.id }).count('id as count').first();
        const appsCount = await db('applications')
          .join('jobs', 'applications.job_id', '=', 'jobs.id')
          .where('jobs.company_id', comp.id)
          .count('applications.id as count')
          .first();

        csvContent += `"${comp.name}","${comp.website || 'N/A'}","${comp.industry || 'N/A'}",${jobsCount.count},${appsCount.count}\n`;
      }
    } else {
      return res.status(400).json({ success: false, message: 'Invalid report type.' });
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

// Get all unique candidates
exports.getCandidates = async (req, res, next) => {
  try {
    const { search } = req.query;
    
    const query = db('users')
      .leftJoin('applications', 'users.id', '=', 'applications.user_id')
      .select(
        'users.id',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.phone',
        'users.created_at',
        db.raw('count(applications.id) as applications_count')
      )
      .where('users.role', 'candidate')
      .groupBy('users.id')
      .orderBy('users.created_at', 'desc');

    if (search) {
      const pattern = `%${search}%`;
      query.andWhere(function() {
        this.where('users.first_name', 'ILIKE', pattern)
          .orWhere('users.last_name', 'ILIKE', pattern)
          .orWhere('users.email', 'ILIKE', pattern)
          .orWhere('users.phone', 'ILIKE', pattern);
      });
    }

    const candidates = await query;
    
    const candidatesWithResumes = [];
    for (const cand of candidates) {
      const resumeFile = await db('resumes').where({ user_id: cand.id }).orderBy('created_at', 'desc').first();
      const apps = await db('applications')
        .join('jobs', 'applications.job_id', '=', 'jobs.id')
        .join('companies', 'jobs.company_id', '=', 'companies.id')
        .select('applications.id', 'applications.status', 'jobs.title as job_title', 'companies.name as company_name', 'applications.created_at')
        .where('applications.user_id', cand.id);

      candidatesWithResumes.push({
        ...cand,
        resume_file: resumeFile ? resumeFile.filename : null,
        applications: apps
      });
    }

    res.status(200).json({
      success: true,
      data: candidatesWithResumes
    });
  } catch (error) {
    next(error);
  }
};

// Get all recruiters (with user & company details)
exports.getRecruiters = async (req, res, next) => {
  try {
    const recruiters = await db('recruiters')
      .join('users', 'recruiters.user_id', '=', 'users.id')
      .join('companies', 'recruiters.company_id', '=', 'companies.id')
      .select(
        'recruiters.id as recruiter_id',
        'users.id as id',
        'users.first_name',
        'users.last_name',
        'users.email',
        'recruiters.position',
        'companies.name as company_name',
        'companies.id as company_id'
      )
      .orderBy('users.first_name', 'asc');

    res.status(200).json({
      success: true,
      data: recruiters
    });
  } catch (error) {
    next(error);
  }
};
