// backend/src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');
const emailService = require('../services/emailService');

// Helper to sign JWTs
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' }
  );
};

exports.register = async (req, res, next) => {
  let transaction;
  try {
    const { first_name, last_name, email, phone, password, confirm_password, role, company_id, position } = req.body;

    if (!first_name || !last_name || !email || !password || !confirm_password) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    // Password requirements: Min 8 chars, uppercase, lowercase, number, special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      });
    }

    // Check email availability
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const targetRole = role === 'recruiter' ? 'recruiter' : 'candidate';

    // If recruiter role, validate company exists
    if (targetRole === 'recruiter') {
      if (!company_id) {
        return res.status(400).json({ success: false, message: 'Recruiters must select an associated company.' });
      }
      const company = await db('companies').where({ id: company_id }).first();
      if (!company) {
        return res.status(400).json({ success: false, message: 'Selected company does not exist.' });
      }
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create transaction to ensure atomicity
    transaction = await db.transaction();

    // 1. Insert User
    const [newUser] = await transaction('users').insert({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
      role: targetRole,
      is_verified: false // Email starts unverified
    }).returning(['id', 'first_name', 'last_name', 'email', 'phone', 'role', 'created_at']);

    // 2. If recruiter, insert recruiter profile mapping
    if (targetRole === 'recruiter') {
      await transaction('recruiters').insert({
        user_id: newUser.id,
        company_id,
        position: position || 'Recruiter'
      });
    }

    // 3. Generate verification token (expires in 24 hours)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 3600000); // 24 hours

    await transaction('email_verifications').insert({
      user_id: newUser.id,
      token: verificationToken,
      expires_at: expiresAt
    });

    await transaction.commit();

    // 4. Dispatch Email Verification Link
    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;
    await emailService.sendEmail({
      to: email,
      templateName: 'email_verification',
      templateData: {
        name: `${first_name} ${last_name}`,
        link: verificationLink
      }
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully! A verification link has been sent to your email address.'
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  let transaction;
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ success: false, message: 'Verification token is required.' });
    }

    // Find token record and check expiry
    const record = await db('email_verifications')
      .where({ token })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!record) {
      return res.status(400).json({
        success: false,
        message: 'Verification link is invalid or has expired. Please sign up again or request a new link.'
      });
    }

    transaction = await db.transaction();

    // Mark user as verified
    await transaction('users')
      .where({ id: record.user_id })
      .update({ is_verified: true, updated_at: new Date() });

    // Clean up verification tokens
    await transaction('email_verifications').where({ user_id: record.user_id }).del();

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: 'Email Verified Successfully'
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`[AUTH] Login attempt for email: "${email}"`);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await db('users').where({ email }).first();
    if (!user) {
      console.log(`[AUTH] User not found for email: "${email}"`);
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      console.log(`[AUTH] Password mismatch for email: "${email}"`);
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Check blocked status
    if (user.is_blocked) {
      return res.status(403).json({ success: false, message: 'Your account has been suspended by an administrator.' });
    }

    // Enforce email verification check
    if (!user.is_verified) {
      return res.status(403).json({
        success: false,
        message: 'Your email address is not verified. Please check your inbox for the verification link.'
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in database for auditing
    await db('refresh_tokens').insert({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 3600000) // 7 days
    });

    // Strip password
    delete user.password;

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      user,
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      // Clean up from refresh tokens database
      await db('refresh_tokens').where({ token: refreshToken }).del();
    }
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const user = await db('users').where({ email }).first();
    if (!user) {
      // Mock success for security reasons
      return res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset link has been dispatched.'
      });
    }

    // Generate password reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    // Clean up old resets for this user and insert new
    await db('password_resets').where({ user_id: user.id }).del();
    await db('password_resets').insert({
      user_id: user.id,
      token: resetToken,
      expires_at: expiresAt
    });

    // Dispatch Email
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await emailService.sendEmail({
      to: email,
      templateName: 'password_reset',
      templateData: {
        name: `${user.first_name} ${user.last_name}`,
        link: resetLink
      }
    });

    res.status(200).json({
      success: true,
      message: 'If the email exists, a password reset link has been dispatched.',
      token: resetToken // Exposing reset token for testing ease
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  let transaction;
  try {
    const { token, password, confirm_password } = req.body;

    if (!token || !password || !confirm_password) {
      return res.status(400).json({ success: false, message: 'All inputs are required.' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    // Password requirements validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long, and contain at least one uppercase, lowercase, number, and special character.'
      });
    }

    // Verify token exists and is active
    const record = await db('password_resets')
      .where({ token })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!record) {
      return res.status(400).json({ success: false, message: 'Password reset link is invalid or has expired.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    transaction = await db.transaction();

    // Update password
    await transaction('users')
      .where({ id: record.user_id })
      .update({ password: hashedPassword, updated_at: new Date() });

    // Clean up reset token record
    await transaction('password_resets').where({ user_id: record.user_id }).del();

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: 'Your password has been successfully reset. You may now log in.'
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required.' });
    }

    // Check if refresh token is blacklisted or deleted from database
    const dbToken = await db('refresh_tokens')
      .where({ token: refreshToken })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!dbToken) {
      return res.status(403).json({ success: false, message: 'Refresh token is invalid or expired. Please log in again.' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired refresh token.' });
      }

      try {
        const user = await db('users').where({ id: decoded.id }).first();
        if (!user || user.is_blocked) {
          return res.status(404).json({ success: false, message: 'Associated account not found or blocked.' });
        }

        const newAccessToken = generateAccessToken(user);
        
        res.status(200).json({
          success: true,
          accessToken: newAccessToken
        });
      } catch (dbErr) {
        next(dbErr);
      }
    });
  } catch (error) {
    next(error);
  }
};
