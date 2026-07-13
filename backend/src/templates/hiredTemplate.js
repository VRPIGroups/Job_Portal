// backend/src/templates/hiredTemplate.js

module.exports = (data) => {
  const { candidateName, jobTitle, companyName } = data;
  return {
    subject: `Official Job Offer: You are Hired at ${companyName}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Congratulations! You Are Hired</title>
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
          .hired-card {
            background-color: #ebf8ff;
            border-left: 4px solid #3182ce;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
          }
          .hired-card h3 {
            margin: 0 0 5px 0;
            color: #2b6cb0;
            font-size: 18px;
          }
          .hired-card p {
            margin: 0;
            font-weight: 600;
            color: #2d3748;
          }
          .welcome-message {
            font-size: 18px;
            font-weight: 700;
            color: #2b6cb0;
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
            <h1>Official Job Offer</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Congratulations! We are absolutely thrilled to inform you that you have been hired for the following role:</p>
            
            <div class="hired-card">
              <h3>${jobTitle}</h3>
              <p>at ${companyName}</p>
            </div>
            
            <p>Our hiring team was incredibly impressed by your interviews, technical skills, and experience. We are confident that you will make a remarkable impact and be a fantastic addition to the team.</p>
            
            <p>A representative from our Human Resources department will get in touch with you shortly with the onboarding details and formal employment agreement.</p>
            
            <p class="welcome-message">Welcome aboard! We are excited to build the future together.</p>
            
            <div class="signature">
              <p>Warm regards,</p>
              <p><strong>The Hiring Committee</strong><br>${companyName}</p>
            </div>
          </div>
          <div class="email-footer">
            <p>You received this email because you applied for a position at ${companyName}. If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};
