// backend/src/controllers/contactController.js
const db = require('../config/db');

// @desc    Submit a new contact/collaboration message
// @route   POST /api/contact
// @access  Public
exports.submitMessage = async (req, res, next) => {
  try {
    const { name, companyName, email, businessNumber, companyAddress, message } = req.body;

    if (!name || !companyName || !email || !businessNumber || !companyAddress || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, companyName, email, businessNumber, companyAddress, message) are required.'
      });
    }

    const [newMessage] = await db('contact_messages')
      .insert({
        name,
        company_name: companyName,
        email,
        business_number: businessNumber,
        company_address: companyAddress,
        message,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    res.status(201).json({
      success: true,
      message: 'Your collaboration request has been submitted successfully.',
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (with optional search)
// @route   GET /api/admin/messages
// @access  Private (Admin)
exports.getMessages = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = db('contact_messages').orderBy('created_at', 'desc');

    if (search) {
      const pattern = `%${search}%`;
      query.where(function() {
        this.where('name', 'ILIKE', pattern)
          .orWhere('company_name', 'ILIKE', pattern)
          .orWhere('email', 'ILIKE', pattern)
          .orWhere('message', 'ILIKE', pattern);
      });
    }

    const messages = await query;

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/admin/messages/:id
// @access  Private (Admin)
exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await db('contact_messages').where({ id }).first();
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    await db('contact_messages').where({ id }).del();

    res.status(200).json({
      success: true,
      message: 'Message has been deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
