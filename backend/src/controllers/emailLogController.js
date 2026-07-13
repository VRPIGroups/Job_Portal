// backend/src/controllers/emailLogController.js
const db = require('../config/db');
const sendEmail = require('../utils/sendEmail');

exports.getEmailLogs = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const parsedPage = Math.max(1, parseInt(page));
    const parsedLimit = Math.max(1, parseInt(limit));
    const offset = (parsedPage - 1) * parsedLimit;

    const query = db('email_logs')
      .select('*')
      .orderBy('created_at', 'desc');

    const countQuery = db('email_logs').count('id as total');

    if (status && status !== 'all') {
      query.where({ status });
      countQuery.where({ status });
    }

    if (search) {
      const pattern = `%${search}%`;
      query.andWhere(function() {
        this.where('to_email', 'ILIKE', pattern)
          .orWhere('subject', 'ILIKE', pattern);
      });
      countQuery.andWhere(function() {
        this.where('to_email', 'ILIKE', pattern)
          .orWhere('subject', 'ILIKE', pattern);
      });
    }

    query.limit(parsedLimit).offset(offset);

    const [totalRes, logs] = await Promise.all([
      countQuery.first(),
      query
    ]);

    const totalItems = parseInt(totalRes?.total || 0);

    res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        total: totalItems,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(totalItems / parsedLimit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.retryEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const log = await db('email_logs').where({ id }).first();
    
    if (!log) {
      return res.status(404).json({ success: false, message: 'Email log not found.' });
    }

    const success = await sendEmail({
      to: log.to_email,
      subject: log.subject,
      html: log.body
    });

    // Update status
    await db('email_logs').where({ id }).update({
      status: success ? 'Sent' : 'Failed',
      created_at: new Date()
    });

    if (success) {
      res.status(200).json({ success: true, message: 'Email retried and sent successfully.' });
    } else {
      res.status(500).json({ success: false, message: 'Retry attempt failed. Email server issue.' });
    }
  } catch (error) {
    next(error);
  }
};

exports.sendManualEmail = async (req, res, next) => {
  try {
    const { to_email, subject, body, application_id } = req.body;
    
    if (!to_email || !subject || !body) {
      return res.status(400).json({ success: false, message: 'Recipient, subject, and body content are required.' });
    }

    const success = await sendEmail({
      to: to_email,
      subject: subject,
      html: body
    });

    // Log the manual email
    await db('email_logs').insert({
      application_id: application_id || null,
      to_email,
      subject,
      body,
      status: success ? 'Sent' : 'Failed'
    });

    if (success) {
      res.status(200).json({ success: true, message: 'Manual email sent and logged successfully.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send manual email. Please check server SMTP configurations.' });
    }
  } catch (error) {
    next(error);
  }
};
