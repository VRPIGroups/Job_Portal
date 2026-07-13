// backend/src/templates/selectedTemplate.js

module.exports = (data) => {
  const { candidateName, jobTitle, companyName } = data;
  return {
    subject: 'Congratulations! You Have Been Selected',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Congratulations! You Have Been Selected</title>
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
            background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
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
          .success-card {
            background-color: #f0fff4;
            border-left: 4px solid #38a169;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
          }
          .success-card h3 {
            margin: 0 0 5px 0;
            color: #2f855a;
            font-size: 18px;
          }
          .success-card p {
            margin: 0;
            font-weight: 600;
            color: #2d3748;
          }
          .welcome-message {
            font-size: 18px;
            font-weight: 700;
            color: #2f855a;
            margin-top: 25px;
            text-align: center;
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
            <h1>Offer Selection Update</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Congratulations!</p>
            <p>We are delighted to inform you that you have been selected for the following position:</p>
            
            <div class="success-card">
              <h3>${jobTitle}</h3>
              <p>at ${companyName}</p>
            </div>
            
            <p>Our HR team will contact you shortly regarding your offer letter, joining date, and onboarding process.</p>
            <p class="welcome-message">Welcome to our organization!</p>
            
            <div class="signature">
              <p>Best Regards,<br>
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
