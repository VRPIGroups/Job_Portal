// backend/src/templates/offerLetterSentTemplate.js

module.exports = (data) => {
  const { candidateName, jobTitle, companyName } = data;
  return {
    subject: `Job Offer Letter - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Job Offer - ${companyName}</title>
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
            background: linear-gradient(135deg, #319795 0%, #234e52 100%);
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
            background-color: #e6fffa;
            border-left: 4px solid #319795;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
          }
          .info-card h3 {
            margin: 0 0 5px 0;
            color: #234e52;
            font-size: 18px;
          }
          .info-card p {
            margin: 0;
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
            <h1>Job Offer Dispatched</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Congratulations! We are thrilled to formally extend a job offer to join our team. We were highly impressed with your interview performance and technical skills.</p>
            
            <div class="info-card">
              <h3>${jobTitle}</h3>
              <p>at ${companyName}</p>
            </div>
            
            <p>We have dispatched your official Offer Letter detailing your compensation, benefits, and start details. Please check your candidate portal to view, sign, and accept the offer letter.</p>
            <p>We are very excited about the prospect of having you join our team and make a great impact!</p>
            
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
