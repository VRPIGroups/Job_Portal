// backend/src/utils/sendEmail.js
const { getTransporter } = require('../config/mailConfig');

/**
 * Dispatch Email to a target address
 * @param {object} options - Mail options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email body (HTML format)
 * @param {array} [options.attachments] - Optional list of file attachments
 * @returns {Promise<boolean>} Resolves to true if sent, false otherwise
 */
const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const transporter = getTransporter();
    const fromAddress = process.env.SMTP_FROM || 'no-reply@jobportal.com';

    if (transporter) {
      const mailOptions = {
        from: fromAddress,
        to,
        subject,
        html,
        attachments
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SUCCESS] Email dispatched to ${to} (MessageID: ${info.messageId})`);
      return true;
    } else {
      // Development Fallback: output cleanly in terminal logs
      console.log(`\n=============================================================`);
      console.log(`✉️  [SIMULATED EMAIL DISPATCH]`);
      console.log(`From: ${fromAddress}`);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${html.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n').trim()}`);
      if (attachments.length > 0) {
        console.log(`Attachments: ${attachments.map(a => a.filename).join(', ')}`);
      }
      console.log(`=============================================================\n`);
      return true;
    }
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to dispatch email:', error.message);
    return false;
  }
};

module.exports = sendEmail;
