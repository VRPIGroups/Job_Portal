// backend/src/controllers/companyController.js
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getCompanies = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = db('companies').orderBy('name', 'asc');

    if (search) {
      query.where('name', 'ILIKE', `%${search}%`)
           .orWhere('description', 'ILIKE', `%${search}%`);
    }

    const companies = await query;
    res.status(200).json({
      success: true,
      data: companies
    });
  } catch (error) {
    next(error);
  }
};

exports.createCompany = async (req, res, next) => {
  try {
    const { name, website, description } = req.body;
    let logo = null;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Company name is required.' });
    }

    // Check duplicate company name
    const existing = await db('companies').where({ name }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'A company with this name is already registered.' });
    }

    // Retrieve uploaded logo filename from multer
    if (req.file) {
      logo = req.file.filename;
    }

    const [newCompany] = await db('companies').insert({
      name,
      website,
      description,
      logo
    }).returning('*');

    res.status(201).json({
      success: true,
      message: 'Company profile created successfully.',
      data: newCompany
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, website, description, email, phone, industry, address, banner } = req.body;
    
    const company = await db('companies').where({ id }).first();
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found.' });
    }

    if (req.user.role === 'recruiter') {
      const recruiter = await db('recruiters').where({ user_id: req.user.id }).first();
      if (!recruiter || parseInt(id) !== recruiter.company_id) {
        return res.status(403).json({ success: false, message: 'Forbidden. You do not have permission to update another company\'s profile.' });
      }
    }

    let logo = company.logo;

    if (req.file) {
      // Delete old logo file if exists
      if (company.logo) {
        const oldLogoPath = path.join(__dirname, '../../public/uploads/images', company.logo);
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }
      logo = req.file.filename;
    }

    const [updatedCompany] = await db('companies')
      .where({ id })
      .update({
        name: name || company.name,
        website: website || company.website,
        description: description || company.description,
        email: email !== undefined ? email : company.email,
        phone: phone !== undefined ? phone : company.phone,
        industry: industry !== undefined ? industry : company.industry,
        address: address !== undefined ? address : company.address,
        banner: banner !== undefined ? banner : company.banner,
        logo,
        updated_at: new Date()
      })
      .returning('*');

    res.status(200).json({
      success: true,
      message: 'Company profile updated successfully.',
      data: updatedCompany
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await db('companies').where({ id }).first();
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found.' });
    }

    // Delete logo image from disk
    if (company.logo) {
      const logoPath = path.join(__dirname, '../../public/uploads/images', company.logo);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    await db('companies').where({ id }).del();

    res.status(200).json({
      success: true,
      message: 'Company and all its associated jobs deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyCompany = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const recruiter = await db('recruiters').where({ user_id: userId }).first();
    if (!recruiter) {
      return res.status(404).json({ success: false, message: 'Recruiter profile not found.' });
    }
    const company = await db('companies').where({ id: recruiter.company_id }).first();
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found.' });
    }
    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    next(error);
  }
};

