// backend/src/templates/interviewReminderTemplate.js

module.exports = (data) => {
  const { candidateName, jobTitle, companyName, interviewDate, interviewTime, interviewMode, meetingDetails, interviewerName, instructions } = data;
  return {
    subject: `Reminder: Interview Invitation - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Interview Reminder - ${companyName}</title>
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
            background: linear-gradient(135deg, #dd6b20 0%, #9c4221 100%);
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
          .info-card {
            background-color: #fffaf0;
            border-left: 4px solid #dd6b20;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
          }
          .info-card h3 {
            margin: 0 0 10px 0;
            color: #9c4221;
            font-size: 18px;
          }
          .detail-row {
            margin-bottom: 8px;
            font-size: 15px;
          }
          .detail-label {
            font-weight: 750;
            color: #4a5568;
            display: inline-block;
            width: 140px;
          }
          .detail-val {
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
            <h1>Interview Reminder - 24 Hours Left</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>This is a reminder that you have an upcoming interview scheduled for the following position in 24 hours:</p>
            
            <div class="info-card">
              <h3>${jobTitle}</h3>
              
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-val">${interviewDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-val">${interviewTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Mode:</span>
                <span class="detail-val">${interviewMode}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Link / Venue:</span>
                <span class="detail-val">${meetingDetails}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Interviewer:</span>
                <span class="detail-val">${interviewerName}</span>
              </div>
            </div>
            
            ${instructions ? `<p><strong>Additional Instructions:</strong><br>${instructions}</p>` : ''}
            
            <p>Please make sure you are online/available at least 15 minutes before the scheduled time. Let us know immediately if you have any questions or conflicts.</p>
            
            <div class="signature">
              <p>Best Regards,<br>
              <strong>${companyName} Recruitment Team</strong></p>
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
