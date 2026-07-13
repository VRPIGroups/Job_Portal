// backend/src/templates/underReviewTemplate.js

module.exports = (data) => {
  const { candidateName, jobTitle, companyName } = data;
  return {
    subject: `Application Under Review - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Application Under Review</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f7fafc;
            color: #2d3748;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
            padding: 30px;
            text-align: center;
            color: #ffffff;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .email-body {
            padding: 40px 30px;
            line-height: 1.6;
          }
          .email-body p {
            margin-bottom: 20px;
            font-size: 16px;
          }
          .email-footer {
            background-color: #f7fafc;
            padding: 20px 30px;
            border-top: 1px solid #e2e8f0;
            font-size: 14px;
            color: #718096;
            text-align: left;
          }
          .signature {
            margin-top: 30px;
            border-top: 1px solid #edf2f7;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Application Under Review</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Your application for the <strong>${jobTitle}</strong> position has been received successfully.</p>
            <p>Your resume is currently under review by our recruitment team.</p>
            <p>We will update you soon.</p>
            
            <div class="signature">
              <p>Regards,<br>
              <strong>Recruitment Team</strong></p>
            </div>
          </div>
          <div class="email-footer">
            <p>This is an automated message from ${companyName} Job Portal. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};
