// backend/src/templates/shortlistedTemplate.js

module.exports = (data) => {
  const { candidateName, jobTitle, companyName, interviewDate, interviewTime, meetingLink } = data;
  return {
    subject: 'Congratulations! You Have Been Shortlisted',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Congratulations! You Have Been Shortlisted</title>
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
            background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
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
          .highlight-card {
            background-color: #ebf8ff;
            border-left: 4px solid #3182ce;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
          }
          .highlight-card h3 {
            margin: 0 0 5px 0;
            color: #2b6cb0;
            font-size: 18px;
          }
          .highlight-card p {
            margin: 0 0 8px 0;
            font-weight: 600;
            color: #2d3748;
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
            <h1>Congratulations! You have been shortlisted</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Congratulations!</p>
            <p>Based on our ATS screening, your profile has been shortlisted for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
            
            <p>Your interview has been scheduled. Below are the details:</p>
            
            <div class="highlight-card">
              <h3>Interview Schedule</h3>
              <p><strong>Interview Date:</strong> ${interviewDate}</p>
              <p><strong>Interview Time:</strong> ${interviewTime}</p>
              <p><strong>Mode:</strong> Online</p>
              <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
            </div>
            
            <p>Please be available 15 minutes before the interview.</p>
            
            <div class="signature">
              <p>Best Regards,<br>
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
