// backend/src/controllers/adminController.js
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      usersCount,
      companiesCount,
      jobsCount,
      applicationsCount,
      activeJobsCount,
      closedJobsCount,
      messagesCount,
      savedJobsCount,
      mostSavedJobs,
      mostSavedCompanies
    ] = await Promise.all([
      db('users').count('id as count').first(),
      db('companies').count('id as count').first(),
      db('jobs').count('id as count').first(),
      db('applications').count('id as count').first(),
      db('jobs').where({ status: 'active' }).count('id as count').first(),
      db('jobs').where({ status: 'inactive' }).count('id as count').first(),
      db('contact_messages').count('id as count').first(),
      db('saved_jobs').count('id as count').first(),
      db('saved_jobs')
        .join('jobs', 'saved_jobs.job_id', '=', 'jobs.id')
        .select('jobs.title', db.raw('count(saved_jobs.id) as save_count'))
        .groupBy('jobs.id', 'jobs.title')
        .orderBy('save_count', 'desc')
        .limit(5),
      db('saved_jobs')
        .join('jobs', 'saved_jobs.job_id', '=', 'jobs.id')
        .join('companies', 'jobs.company_id', '=', 'companies.id')
        .select('companies.name', db.raw('count(saved_jobs.id) as save_count'))
        .groupBy('companies.id', 'companies.name')
        .orderBy('save_count', 'desc')
        .limit(5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers: parseInt(usersCount?.count || 0),
        totalCompanies: parseInt(companiesCount?.count || 0),
        totalJobs: parseInt(jobsCount?.count || 0),
        totalApplications: parseInt(applicationsCount?.count || 0),
        activeJobs: parseInt(activeJobsCount?.count || 0),
        closedJobs: parseInt(closedJobsCount?.count || 0),
        totalMessages: parseInt(messagesCount?.count || 0),
        totalSavedJobs: parseInt(savedJobsCount?.count || 0),
        mostSavedJobs: mostSavedJobs.map(item => ({
          title: item.title,
          count: parseInt(item.save_count)
        })),
        mostSavedCompanies: mostSavedCompanies.map(item => ({
          name: item.name,
          count: parseInt(item.save_count)
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { search, role } = req.query;
    const query = db('users').select('id', 'first_name', 'last_name', 'email', 'phone', 'role', 'profile_image', 'is_blocked', 'is_verified', 'created_at').orderBy('created_at', 'desc');

    if (role && role !== 'all') {
      query.where({ role });
    }

    if (search) {
      const pattern = `%${search}%`;
      query.andWhere(function() {
        this.where('first_name', 'ILIKE', pattern)
          .orWhere('last_name', 'ILIKE', pattern)
          .orWhere('email', 'ILIKE', pattern)
          .orWhere('phone', 'ILIKE', pattern);
      });
    }

    const users = await query;
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

exports.toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db('users').where({ id }).first();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ success: false, message: 'Administrator accounts cannot be blocked.' });
    }

    const newBlockedState = !user.is_blocked;

    const [updatedUser] = await db('users')
      .where({ id })
      .update({ is_blocked: newBlockedState, updated_at: new Date() })
      .returning(['id', 'first_name', 'last_name', 'email', 'is_blocked']);

    res.status(200).json({
      success: true,
      message: `User account has been ${newBlockedState ? 'blocked' : 'activated'} successfully.`,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

// Candidate profile edit endpoint
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name, phone } = req.body;

    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    let profile_image = user.profile_image;

    if (req.file) {
      // Delete old profile image if exists
      if (user.profile_image) {
        const oldImagePath = path.join(__dirname, '../../public/uploads/images', user.profile_image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      profile_image = req.file.filename;
    }

    const [updatedUser] = await db('users')
      .where({ id: userId })
      .update({
        first_name: first_name || user.first_name,
        last_name: last_name || user.last_name,
        phone: phone || user.phone,
        profile_image,
        updated_at: new Date()
      })
      .returning(['id', 'first_name', 'last_name', 'email', 'phone', 'role', 'profile_image', 'created_at']);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

// --- Job Categories CRUD ---
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await db('job_categories').select('*').orderBy('name', 'asc');
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const existing = await db('job_categories').where({ name }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'A category with this name already exists.' });
    }

    const [category] = await db('job_categories')
      .insert({ name, description })
      .returning('*');

    res.status(201).json({ success: true, message: 'Category created successfully.', data: category });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const existing = await db('job_categories').where({ name }).andWhereNot({ id }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'Another category with this name already exists.' });
    }

    const [category] = await db('job_categories')
      .where({ id })
      .update({ name, description })
      .returning('*');

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    res.status(200).json({ success: true, message: 'Category updated successfully.', data: category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await db('job_categories').where({ id }).del();
    if (!rowsDeleted) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// --- Skills CRUD ---
exports.getSkills = async (req, res, next) => {
  try {
    const skills = await db('skills').select('*').orderBy('name', 'asc');
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Skill name is required.' });
    }

    const existing = await db('skills').where({ name }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'Skill already exists.' });
    }

    const [skill] = await db('skills').insert({ name }).returning('*');
    res.status(201).json({ success: true, message: 'Skill created successfully.', data: skill });
  } catch (error) {
    next(error);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Skill name is required.' });
    }

    const existing = await db('skills').where({ name }).andWhereNot({ id }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'Another skill with this name already exists.' });
    }

    const [skill] = await db('skills').where({ id }).update({ name }).returning('*');
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found.' });
    }

    res.status(200).json({ success: true, message: 'Skill updated successfully.', data: skill });
  } catch (error) {
    next(error);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await db('skills').where({ id }).del();
    if (!rowsDeleted) {
      return res.status(404).json({ success: false, message: 'Skill not found.' });
    }
    res.status(200).json({ success: true, message: 'Skill deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// --- Locations CRUD ---
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await db('locations').select('*').orderBy('state', 'asc').orderBy('city', 'asc');
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    next(error);
  }
};

exports.createLocation = async (req, res, next) => {
  try {
    const { state, city } = req.body;
    if (!state || !city) {
      return res.status(400).json({ success: false, message: 'State and City are required.' });
    }

    const existing = await db('locations').where({ state, city }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'This location combination already exists.' });
    }

    const [location] = await db('locations').insert({ state, city }).returning('*');
    res.status(201).json({ success: true, message: 'Location created successfully.', data: location });
  } catch (error) {
    next(error);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { state, city } = req.body;

    if (!state || !city) {
      return res.status(400).json({ success: false, message: 'State and City are required.' });
    }

    const existing = await db('locations').where({ state, city }).andWhereNot({ id }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'This location combination already exists.' });
    }

    const [location] = await db('locations').where({ id }).update({ state, city }).returning('*');
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found.' });
    }

    res.status(200).json({ success: true, message: 'Location updated successfully.', data: location });
  } catch (error) {
    next(error);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await db('locations').where({ id }).del();
    if (!rowsDeleted) {
      return res.status(404).json({ success: false, message: 'Location not found.' });
    }
    res.status(200).json({ success: true, message: 'Location deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// --- Email Templates CRUD ---
exports.getTemplates = async (req, res, next) => {
  try {
    const templates = await db('email_templates').select('*').orderBy('name', 'asc');
    res.status(200).json({ success: true, data: templates });
  } catch (error) {
    next(error);
  }
};

exports.updateTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, body } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ success: false, message: 'Subject and Body are required.' });
    }

    const [template] = await db('email_templates')
      .where({ id })
      .update({ subject, body })
      .returning('*');

    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found.' });
    }

    res.status(200).json({ success: true, message: 'Template updated successfully.', data: template });
  } catch (error) {
    next(error);
  }
};
