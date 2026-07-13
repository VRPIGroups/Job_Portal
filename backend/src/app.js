// backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const savedJobRoutes = require('./routes/savedJobRoutes');
const profileRoutes = require('./routes/profileRoutes');
const atsRoutes = require('./routes/atsRoutes');

const app = express();

// Secure headers
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows loading images/files statically from react frontend
  contentSecurityPolicy: false // Allows iframe previews of PDFs from frontend origin
}));

// CORS setup
app.use(cors({
  origin: '*', // Allows access from candidate and admin portals
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global Request Limits
app.use('/api/', generalLimiter);

// Input JSON & Form Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file hosting for uploaded resumes and logos
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Job Portal Platform API.'
  });
});

// Router mounting
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/saved-jobs', savedJobRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', atsRoutes);
app.use('/api/ats', atsRoutes);



// Fallback 404 for unknown endpoints
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/uploads/')) {
    return res.status(404).json({ success: false, message: 'Static file not found.' });
  }
  const err = new Error(`Cannot find ${req.originalUrl} on this server.`);
  err.statusCode = 404;
  next(err);
});

// Standard Error Interceptor
app.use(errorHandler);

module.exports = app;
