const db = require('../config/db');
const { validationResult } = require('express-validator');

// Save a job
exports.saveJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { job_id } = req.body;
    const userId = req.user.id;

    // Verify job exists
    const job = await db('jobs').where({ id: job_id }).first();
    if (!job) {
      return res.status(404).json({ success: false, message: 'Referenced job posting not found.' });
    }

    // Verify if already saved
    const existing = await db('saved_jobs')
      .where({ user_id: userId, job_id })
      .first();

    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already saved this job.' });
    }

    // Insert saved job
    const [savedJob] = await db('saved_jobs')
      .insert({ user_id: userId, job_id })
      .returning('*');

    res.status(201).json({
      success: true,
      message: 'Job saved successfully.',
      data: savedJob
    });
  } catch (error) {
    next(error);
  }
};

// Get all saved jobs for the logged-in user
exports.getSavedJobs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      page = 1,
      limit = 10,
      search,
      job_type,
      location,
      sort = 'latest'
    } = req.query;

    const parsedPage = Math.max(1, parseInt(page));
    const parsedLimit = Math.max(1, parseInt(limit));
    const offset = (parsedPage - 1) * parsedLimit;

    // Base query
    const query = db('saved_jobs')
      .join('jobs', 'saved_jobs.job_id', '=', 'jobs.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
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
        'companies.name as company_name',
        'companies.logo as company_logo',
        'saved_jobs.created_at as saved_at'
      )
      .where('saved_jobs.user_id', userId);

    // Count query
    const countQuery = db('saved_jobs')
      .join('jobs', 'saved_jobs.job_id', '=', 'jobs.id')
      .join('companies', 'jobs.company_id', '=', 'companies.id')
      .where('saved_jobs.user_id', userId)
      .countDistinct('saved_jobs.id as total');

    // Filters
    if (search) {
      const pattern = `%${search}%`;
      query.andWhere('jobs.title', 'ILIKE', pattern);
      countQuery.andWhere('jobs.title', 'ILIKE', pattern);
    }

    if (job_type) {
      const types = Array.isArray(job_type) ? job_type : job_type.split(',');
      query.whereIn('jobs.job_type', types);
      countQuery.whereIn('jobs.job_type', types);
    }

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

    // Sorting (newest saved first by default)
    if (sort === 'oldest') {
      query.orderBy('saved_jobs.created_at', 'asc');
    } else {
      query.orderBy('saved_jobs.created_at', 'desc');
    }

    // Pagination
    query.limit(parsedLimit).offset(offset);

    const [totalRes, savedJobsList] = await Promise.all([
      countQuery.first(),
      query
    ]);

    const totalItems = parseInt(totalRes?.total || 0);
    const totalPages = Math.ceil(totalItems / parsedLimit);

    res.status(200).json({
      success: true,
      data: savedJobsList,
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

// Remove a saved job
exports.unsaveJob = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const rowsDeleted = await db('saved_jobs')
      .where({ user_id: userId, job_id: parseInt(jobId) })
      .del();

    if (!rowsDeleted) {
      return res.status(404).json({ success: false, message: 'Saved job record not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Job removed from saved list successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// Check if a job is already saved
exports.checkSavedJob = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const record = await db('saved_jobs')
      .where({ user_id: userId, job_id: parseInt(jobId) })
      .first();

    res.status(200).json({
      success: true,
      saved: !!record
    });
  } catch (error) {
    next(error);
  }
};
