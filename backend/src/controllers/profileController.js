// backend/src/controllers/profileController.js
const db = require('../config/db');
const fs = require('fs');
const path = require('path');
const { resumePath } = require('../middleware/upload');

exports.uploadResume = async (req, res, next) => {
  let transaction;
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a resume file (PDF, DOC, or DOCX).' });
    }

    // Check if user already has an uploaded resume
    const oldResume = await db('resumes').where({ user_id: userId }).first();

    transaction = await db.transaction();

    if (oldResume) {
      // Delete old file from storage
      const oldFilePath = path.join(resumePath, oldResume.filename);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      // Delete old database entry
      await transaction('resumes').where({ id: oldResume.id }).del();
    }

    // Insert new resume record
    const [newResume] = await transaction('resumes').insert({
      user_id: userId,
      filename: req.file.filename,
      filepath: req.file.path,
      size: req.file.size
    }).returning('*');

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully.',
      data: newResume
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.getResumeDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const resume = await db('resumes').where({ user_id: userId }).first();
    
    res.status(200).json({
      success: true,
      data: resume || null
    });
  } catch (error) {
    next(error);
  }
};

exports.downloadResume = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const resume = await db('resumes').where({ user_id: userId }).first();

    if (!resume) {
      return res.status(404).json({ success: false, message: 'No resume found on your profile.' });
    }

    const filePath = path.join(resumePath, resume.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Resume file could not be found on storage server.' });
    }

    res.download(filePath, resume.filename);
  } catch (error) {
    next(error);
  }
};

exports.deleteResume = async (req, res, next) => {
  let transaction;
  try {
    const userId = req.user.id;
    const resume = await db('resumes').where({ user_id: userId }).first();

    if (!resume) {
      return res.status(404).json({ success: false, message: 'No resume found to delete.' });
    }

    transaction = await db.transaction();

    // Delete file
    const filePath = path.join(resumePath, resume.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete db record
    await transaction('resumes').where({ id: resume.id }).del();

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully.'
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notifications = await db('notifications')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

exports.markNotificationAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const rowsUpdated = await db('notifications')
      .where({ id, user_id: userId })
      .update({ is_read: true });

    if (!rowsUpdated) {
      return res.status(404).json({ success: false, message: 'Notification not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read.'
    });
  } catch (error) {
    next(error);
  }
};
