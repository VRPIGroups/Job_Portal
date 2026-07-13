// backend/src/config/mailConfig.js
const nodemailer = require('nodemailer');

const mailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const getTransporter = () => {
  if (mailConfig.host && mailConfig.auth.user && mailConfig.auth.pass) {
    return nodemailer.createTransport(mailConfig);
  }
  return null;
};

module.exports = {
  mailConfig,
  getTransporter,
};
