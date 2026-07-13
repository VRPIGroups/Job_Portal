// backend/src/templates/interviewTemplate.js

module.exports = (data) => {
  const { 
    candidateName, 
    jobTitle, 
    companyName, 
    interviewDate, 
    interviewTime, 
    interviewMode, 
    meetingDetails, 
    interviewerName,
    instructions 
  } = data;

  const modeLabel = interviewMode === 'Online' ? 'Online Video Meeting' : 'In-Person / Offline';
  const meetingOrVenueTitle = interviewMode === 'Online' ? 'Meeting Link' : 'Interview Venue';
  const detailsHtml = interviewMode === 'Online' 
    ? `<a href="${meetingDetails}" style="color: #3182ce; font-weight: 600; text-decoration: underline;">Join Interview Room</a>` 
    : `<span>${meetingDetails}</span>`;

  return {
    subject: `Interview Scheduled - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Interview Scheduled - ${companyName}</title>
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
            background: linear-gradient(135deg, #dd6b20 0%, #c05621 100%);
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
          .interview-details-box {
            background-color: #fffaf0;
            border: 1px solid #feebc8;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
          }
          .interview-details-box h3 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #c05621;
            font-size: 18px;
            border-bottom: 1px solid #fbd38d;
            padding-bottom: 8px;
          }
          .detail-row {
            display: flex;
            margin-bottom: 12px;
            font-size: 15px;
          }
          .detail-label {
            width: 150px;
            font-weight: 700;
            color: #4a5568;
            flex-shrink: 0;
          }
          .detail-value {
            color: #2d3748;
          }
          .instructions-box {
            background-color: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 15px;
            font-size: 14px;
            margin-top: 20px;
          }
          .instructions-box h4 {
            margin: 0 0 8px 0;
            color: #4a5568;
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
            <h1>Interview Scheduled</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Congratulations!</p>
            <p>Your interview has been scheduled. Please find the session details below:</p>
            
            <div class="interview-details-box">
              <h3>Session Outline</h3>
              
              <div class="detail-row">
                <div class="detail-label">Position:</div>
                <div class="detail-value"><strong>${jobTitle}</strong></div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Company:</div>
                <div class="detail-value">${companyName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Interview Date:</div>
                <div class="detail-value">${interviewDate}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Interview Time:</div>
                <div class="detail-value">${interviewTime}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Interview Mode:</div>
                <div class="detail-value">${modeLabel}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">${meetingOrVenueTitle}:</div>
                <div class="detail-value">${detailsHtml}</div>
              </div>
              ${interviewerName ? `
              <div class="detail-row">
                <div class="detail-label">Interviewer:</div>
                <div class="detail-value">${interviewerName}</div>
              </div>
              ` : ''}
            </div>
            
            ${instructions ? `
            <div class="instructions-box">
              <h4>Additional Instructions:</h4>
              <p style="margin: 0; white-space: pre-line;">${instructions}</p>
            </div>
            ` : ''}
            
            <p style="margin-top: 25px;">Please attend the interview on time. We wish you success!</p>
            
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
