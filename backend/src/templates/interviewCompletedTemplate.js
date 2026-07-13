// backend/src/templates/interviewCompletedTemplate.js

module.exports = (data) => {
  const { 
    candidateName, 
    jobTitle, 
    companyName, 
    interviewRound 
  } = data;

  return {
    subject: `Interview Completed - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Interview Completed - ${companyName}</title>
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
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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
          .success-box {
            background-color: #f0fff4;
            border: 1px solid #c6f6d5;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            font-size: 15px;
            color: #2f855a;
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
            <h1>Interview Session Completed</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Thank you for attending the interview session. Our team is currently compiling feedback from the session.</p>
            
            <div class="success-box">
              <strong>Session Completed:</strong><br>
              Round: ${interviewRound}<br>
              Position: ${jobTitle}<br>
              Company: ${companyName}
            </div>
            
            <p>We will review your performance ratings and strengths/weaknesses and post updates on the Job Portal soon. You can log in at any time to monitor your application timeline and review remarks.</p>
            
            <div class="signature">
              <p>Regards,<br>
              <strong>${companyName} HR Team</strong></p>
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
