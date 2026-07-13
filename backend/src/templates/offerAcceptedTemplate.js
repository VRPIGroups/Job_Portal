// backend/src/templates/offerAcceptedTemplate.js

module.exports = (data) => {
  const { candidateName, jobTitle, companyName } = data;
  return {
    subject: `Offer Accepted: Welcome to ${companyName}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Offer Accepted: Welcome Aboard</title>
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
          .accepted-card {
            background-color: #f0fff4;
            border-left: 4px solid #48bb78;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
          }
          .accepted-card h3 {
            margin: 0 0 5px 0;
            color: #2f855a;
            font-size: 18px;
          }
          .accepted-card p {
            margin: 0;
            font-weight: 600;
            color: #2d3748;
          }
          .next-steps-message {
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
            <h1>Offer Accepted!</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>We are delighted to confirm that you have accepted our offer of employment for the following role:</p>
            
            <div class="accepted-card">
              <h3>${jobTitle}</h3>
              <p>at ${companyName}</p>
            </div>
            
            <p>We are absolutely thrilled to welcome you to the family! The team is excited about your start, and we are working hard behind the scenes to prepare everything for a smooth and comprehensive onboarding experience.</p>
            
            <p>Our Human Resources team will reach out shortly with onboarding materials, first-day logistics, and documentation instructions.</p>
            
            <p class="next-steps-message">Welcome aboard! We are excited to build great things together.</p>
            
            <div class="signature">
              <p>Warm regards,</p>
              <p><strong>The Talent Acquisition Team</strong><br>${companyName}</p>
            </div>
          </div>
          <div class="email-footer">
            <p>You received this email because you confirmed your acceptance of the offer at ${companyName}. If you have any questions, please reach out to your HR contact.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};
