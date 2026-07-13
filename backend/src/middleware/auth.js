// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required. Please log in.' });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (err) {
      const isExpired = err.name === 'TokenExpiredError';
      return res.status(403).json({
        success: false,
        message: isExpired ? 'Access token has expired.' : 'Invalid access token.',
        code: isExpired ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID'
      });
    }

    try {
      const user = await db('users').where({ id: decoded.id }).first();
      if (!user) {
        return res.status(401).json({ success: false, message: 'Your session is invalid or user no longer exists. Please log in again.' });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      next();
    } catch (dbErr) {
      next(dbErr);
    }
  });
};

const optionalAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (err) {
      return next(); // Proceed as guest if token is invalid or expired
    }

    try {
      const user = await db('users').where({ id: decoded.id }).first();
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role
        };
      }
      next();
    } catch (dbErr) {
      next();
    }
  });
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Authenticated session required.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Access forbidden: ${roles.join(' or ')} permissions required.` });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  optionalAuthenticateToken,
  requireAdmin: requireRole(['admin']),
  requireCandidate: requireRole(['candidate']),
  requireRecruiter: requireRole(['recruiter']),
  requireAdminOrRecruiter: requireRole(['admin', 'recruiter']),
  requireAny: requireRole(['candidate', 'admin']),
};
