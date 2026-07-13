// backend/src/controllers/jobController.js
const db = require('../config/db');

exports.getJobs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      job_type,
      salary_min,
      salary_max,
      location,
      experience,
      skills,
      company_id,
      sort,
      status // admin can specify status, candidate always sees 'active'
    } = req.query;

    const parsedPage = Math.max(1, parseInt(page));
    const parsedLimit = Math.max(1, parseInt(limit));
    const offset = (parsedPage - 1) * parsedLimit;

    // Set up core query builder
    const query = db('jobs')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .leftJoin('job_skills', 'jobs.id', 'job_skills.job_id')
      .leftJoin('skills', 'job_skills.skill_id', 'skills.id')
      .select(
        'jobs.id',
        'jobs.company_id',
        'jobs.title',
        'jobs.description',
        'jobs.salary_min',
        'jobs.salary_max',
        'jobs.job_type',
        'jobs.location',
        'jobs.experience',
        'jobs.status',
        'jobs.created_at',
        'companies.name as company_name',
        'companies.logo as company_logo',
        'companies.website as company_website',
        db.raw("COALESCE(json_agg(json_build_object('id', skills.id, 'name', skills.name)) FILTER (WHERE skills.id IS NOT NULL), '[]') as skills")
      )
      .groupBy('jobs.id', 'companies.id');

    // Setup a count query builder for total matching records
    const countQuery = db('jobs')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .leftJoin('job_skills', 'jobs.id', 'job_skills.job_id')
      .leftJoin('skills', 'job_skills.skill_id', 'skills.id')
      .countDistinct('jobs.id as total');

    // Apply Filter logic
    // 1. Status Filter (Candidates only see active, admins can see all)
    const activeStatus = status || 'active';
    if (activeStatus !== 'all') {
      query.where('jobs.status', activeStatus);
      countQuery.where('jobs.status', activeStatus);
    }

    // 2. Search (Matches title or description or company name)
    if (search) {
      const searchPattern = `%${search}%`;
      query.andWhere(function() {
        this.where('jobs.title', 'ILIKE', searchPattern)
          .orWhere('jobs.description', 'ILIKE', searchPattern)
          .orWhere('companies.name', 'ILIKE', searchPattern);
      });
      countQuery.andWhere(function() {
        this.where('jobs.title', 'ILIKE', searchPattern)
          .orWhere('jobs.description', 'ILIKE', searchPattern)
          .orWhere('companies.name', 'ILIKE', searchPattern);
      });
    }

    // 3. Job Type Filter (e.g. Remote, Full Time, etc.)
    if (job_type) {
      const types = Array.isArray(job_type) ? job_type : job_type.split(',');
      query.whereIn('jobs.job_type', types);
      countQuery.whereIn('jobs.job_type', types);
    }

    // 4. Salary Filters
    if (salary_min) {
      query.where('jobs.salary_max', '>=', parseInt(salary_min));
      countQuery.where('jobs.salary_max', '>=', parseInt(salary_min));
    }
    if (salary_max) {
      query.where('jobs.salary_min', '<=', parseInt(salary_max));
      countQuery.where('jobs.salary_min', '<=', parseInt(salary_max));
    }

    // 5. Location Filter
    if (location) {
      const locs = Array.isArray(location) ? location : location.split(',');
      query.andWhere(function() {
        locs.forEach((loc, idx) => {
          if (idx === 0) {
            this.where('jobs.location', 'ILIKE', `%${loc}%`);
          } else {
            this.orWhere('jobs.location', 'ILIKE', `%${loc}%`);
          }
        });
      });
      countQuery.andWhere(function() {
        locs.forEach((loc, idx) => {
          if (idx === 0) {
            this.where('jobs.location', 'ILIKE', `%${loc}%`);
          } else {
            this.orWhere('jobs.location', 'ILIKE', `%${loc}%`);
          }
        });
      });
    }

    // 6. Experience Filter
    if (experience) {
      const exps = Array.isArray(experience) ? experience : experience.split(',');
      const dbValues = [];
      exps.forEach(exp => {
        const norm = exp.trim().toLowerCase();
        if (norm === '0-2 years') {
          dbValues.push('fresher', '1+', '2+', '0-1 years', '1-3 years', '0-2 years');
        } else if (norm === '3-5 years') {
          dbValues.push('3+', '3-5 years');
        } else if (norm === '5-8 years') {
          dbValues.push('5-8 years');
        } else if (norm === '8+ years') {
          dbValues.push('8+ years');
        } else {
          dbValues.push(norm);
        }
      });
      query.whereIn(db.raw('LOWER(jobs.experience)'), dbValues);
      countQuery.whereIn(db.raw('LOWER(jobs.experience)'), dbValues);
    }

    // 7. Company Filter
    if (company_id) {
      query.where('jobs.company_id', parseInt(company_id));
      countQuery.where('jobs.company_id', parseInt(company_id));
    }

    // 7b. Recruiter Role Filter (limit access to company's jobs)
    if (req.user && req.user.role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: req.user.id }).first();
      if (recruiter) {
        query.where('jobs.company_id', recruiter.company_id);
        countQuery.where('jobs.company_id', recruiter.company_id);
      } else {
        query.whereNull('jobs.id');
        countQuery.whereNull('jobs.id');
      }
    }

    // 8. Skills Filter
    if (skills) {
      const skillIds = Array.isArray(skills) ? skills.map(Number) : skills.split(',').map(Number);
      query.whereExists(function() {
        this.select('*')
          .from('job_skills')
          .whereRaw('job_skills.job_id = jobs.id')
          .whereIn('job_skills.skill_id', skillIds);
      });
      countQuery.whereExists(function() {
        this.select('*')
          .from('job_skills')
          .whereRaw('job_skills.job_id = jobs.id')
          .whereIn('job_skills.skill_id', skillIds);
      });
    }

    // Apply Sorting logic
    if (sort) {
      switch (sort) {
        case 'oldest':
          query.orderBy('jobs.created_at', 'asc');
          break;
        case 'salary_desc':
          query.orderBy('jobs.salary_max', 'desc').orderBy('jobs.created_at', 'desc');
          break;
        case 'salary_asc':
          query.orderBy('jobs.salary_min', 'asc').orderBy('jobs.created_at', 'desc');
          break;
        case 'latest':
        default:
          query.orderBy('jobs.created_at', 'desc');
          break;
      }
    } else {
      query.orderBy('jobs.created_at', 'desc');
    }

    // Paginate results
    query.limit(parsedLimit).offset(offset);

    // Run both queries parallelly
    const [totalRes, jobsList] = await Promise.all([countQuery.first(), query]);
    const totalItems = parseInt(totalRes?.total || 0);
    const totalPages = Math.ceil(totalItems / parsedLimit);

    res.status(200).json({
      success: true,
      data: jobsList,
      pagination: {
        total: totalItems,
        page: parsedPage,
        limit: parsedLimit,
        totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await db('jobs')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .leftJoin('job_skills', 'jobs.id', 'job_skills.job_id')
      .leftJoin('skills', 'job_skills.skill_id', 'skills.id')
      .select(
        'jobs.*',
        'companies.name as company_name',
        'companies.logo as company_logo',
        'companies.website as company_website',
        'companies.description as company_description',
        db.raw("COALESCE(json_agg(json_build_object('id', skills.id, 'name', skills.name)) FILTER (WHERE skills.id IS NOT NULL), '[]') as skills")
      )
      .where('jobs.id', id)
      .groupBy('jobs.id', 'companies.id')
      .first();

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const { title, description, company_id, salary_min, salary_max, job_type, location, experience, skills, status = 'active' } = req.body;

    let targetCompanyId = company_id;
    if (req.user.role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: req.user.id }).first();
      if (!recruiter) {
        return res.status(403).json({ success: false, message: 'Your user profile does not have an associated company. Contact support.' });
      }
      targetCompanyId = recruiter.company_id;
    }

    if (!title || !description || !targetCompanyId || !salary_min || !salary_max || !job_type || !location || !experience) {
      return res.status(400).json({ success: false, message: 'All standard job fields must be completed.' });
    }

    // Verify company exists
    const company = await db('companies').where({ id: targetCompanyId }).first();
    if (!company) {
      return res.status(404).json({ success: false, message: 'Referenced company not found.' });
    }

    // Insert job inside a SQL transaction
    const newJob = await db.transaction(async (trx) => {
      const [insertedJob] = await trx('jobs').insert({
        title,
        description,
        company_id: targetCompanyId,
        salary_min: parseInt(salary_min),
        salary_max: parseInt(salary_max),
        job_type,
        location,
        experience,
        status
      }).returning('*');

      // Associate skills
      if (skills && skills.length > 0) {
        // skills should be an array of skill IDs
        const skillAssociations = skills.map(skillId => ({
          job_id: insertedJob.id,
          skill_id: parseInt(skillId)
        }));
        await trx('job_skills').insert(skillAssociations);
      }

      return insertedJob;
    });

    // Fetch the fully populated job
    const populatedJob = await db('jobs')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .leftJoin('job_skills', 'jobs.id', 'job_skills.job_id')
      .leftJoin('skills', 'job_skills.skill_id', 'skills.id')
      .select(
        'jobs.*',
        'companies.name as company_name',
        'companies.logo as company_logo',
        db.raw("COALESCE(json_agg(json_build_object('id', skills.id, 'name', skills.name)) FILTER (WHERE skills.id IS NOT NULL), '[]') as skills")
      )
      .where('jobs.id', newJob.id)
      .groupBy('jobs.id', 'companies.id')
      .first();

    res.status(201).json({
      success: true,
      message: 'Job posting created successfully.',
      data: populatedJob
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, company_id, salary_min, salary_max, job_type, location, experience, skills, status } = req.body;

    const job = await db('jobs').where({ id }).first();
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    if (req.user.role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: req.user.id }).first();
      if (!recruiter || job.company_id !== recruiter.company_id) {
        return res.status(403).json({ success: false, message: 'Forbidden. You do not have permission to modify job postings for another company.' });
      }
    }

    await db.transaction(async (trx) => {
      // Update Core Fields
      await trx('jobs')
        .where({ id })
        .update({
          title: title || job.title,
          description: description || job.description,
          company_id: company_id ? parseInt(company_id) : job.company_id,
          salary_min: salary_min !== undefined ? parseInt(salary_min) : job.salary_min,
          salary_max: salary_max !== undefined ? parseInt(salary_max) : job.salary_max,
          job_type: job_type || job.job_type,
          location: location || job.location,
          experience: experience || job.experience,
          status: status || job.status,
          updated_at: new Date()
        });

      // Update skills if supplied
      if (skills !== undefined) {
        // Delete old associations
        await trx('job_skills').where({ job_id: id }).del();
        
        // Write new ones
        if (skills.length > 0) {
          const skillAssociations = skills.map(skillId => ({
            job_id: id,
            skill_id: parseInt(skillId)
          }));
          await trx('job_skills').insert(skillAssociations);
        }
      }
    });

    const updatedJob = await db('jobs')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .leftJoin('job_skills', 'jobs.id', 'job_skills.job_id')
      .leftJoin('skills', 'job_skills.skill_id', 'skills.id')
      .select(
        'jobs.*',
        'companies.name as company_name',
        'companies.logo as company_logo',
        db.raw("COALESCE(json_agg(json_build_object('id', skills.id, 'name', skills.name)) FILTER (WHERE skills.id IS NOT NULL), '[]') as skills")
      )
      .where('jobs.id', id)
      .groupBy('jobs.id', 'companies.id')
      .first();

    res.status(200).json({
      success: true,
      message: 'Job posting updated successfully.',
      data: updatedJob
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await db('jobs').where({ id }).first();
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    if (req.user.role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: req.user.id }).first();
      if (!recruiter || job.company_id !== recruiter.company_id) {
        return res.status(403).json({ success: false, message: 'Forbidden. You do not have permission to delete job postings for another company.' });
      }
    }

    const rowsDeleted = await db('jobs').where({ id }).del();
    if (!rowsDeleted) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Job posting deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// Fetch skills list helper
exports.getAllSkills = async (req, res, next) => {
  try {
    const skills = await db('skills').orderBy('name', 'asc');
    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

// Assign recruiter to job
exports.assignRecruiter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recruiter_id } = req.body; // user_id of the recruiter

    const job = await db('jobs').where({ id }).first();
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    if (recruiter_id) {
      const recruiterUser = await db('users').where({ id: recruiter_id, role: 'recruiter' }).first();
      if (!recruiterUser) {
        return res.status(400).json({ success: false, message: 'Invalid recruiter user ID.' });
      }
    }

    await db('jobs').where({ id }).update({
      assigned_recruiter_id: recruiter_id || null,
      updated_at: new Date()
    });

    res.status(200).json({
      success: true,
      message: recruiter_id ? 'Recruiter assigned to job successfully.' : 'Recruiter unassigned successfully.'
    });
  } catch (error) {
    next(error);
  }
};
