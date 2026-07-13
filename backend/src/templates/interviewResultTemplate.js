// backend/src/templates/interviewResultTemplate.js

module.exports = (data) => {
  const {
    candidateName,
    jobTitle,
    companyName,
    interviewRound,
    result, // 'Passed' or 'Failed'
    technicalRating,
    communicationRating,
    problemSolvingRating,
    leadershipRating,
    teamworkRating,
    overallRating,
    strengths,
    weaknesses,
    remarks
  } = data;

  const isPassed = result === 'Passed';
  const themeColor = isPassed ? '#38a169' : '#e53e3e';
  const bannerGradient = isPassed 
    ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' 
    : 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)';

  return {
    subject: `${interviewRound} Result - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${interviewRound} Result - ${companyName}</title>
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
            background: ${bannerGradient};
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
          .result-banner {
            background-color: ${isPassed ? '#f0fff4' : '#fff5f5'};
            border: 1px solid ${isPassed ? '#c6f6d5' : '#fed7d7'};
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            font-size: 16px;
            color: ${isPassed ? '#22543d' : '#742a2a'};
            text-align: center;
          }
          .result-status {
            font-size: 22px;
            font-weight: 800;
            display: block;
            margin-bottom: 5px;
            text-transform: uppercase;
          }
          .ratings-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
          }
          .ratings-box h3 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #4a5568;
            font-size: 16px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
          }
          .rating-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .rating-label {
            font-weight: 600;
            color: #4a5568;
          }
          .rating-stars {
            color: #ecc94b;
            font-weight: 700;
          }
          .feedback-details {
            font-size: 14px;
            margin-top: 20px;
          }
          .feedback-section {
            margin-bottom: 15px;
          }
          .feedback-title {
            font-weight: 700;
            color: #4a5568;
            margin-bottom: 5px;
          }
          .feedback-content {
            background-color: #f7fafc;
            border-left: 3px solid #cbd5e0;
            padding: 10px 15px;
            font-style: italic;
            border-radius: 0 4px 4px 0;
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
            <h1>Interview Round Completed</h1>
          </div>
          <div class="email-body">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>Thank you for participating in the <strong>${interviewRound}</strong> for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
            
            <div class="result-banner">
              <span class="result-status" style="color: ${themeColor};">${interviewRound}: ${result}</span>
              ${isPassed 
                ? 'Congratulations! You have cleared this round and will be considered for the next stage in our hiring workflow.' 
                : 'Thank you for your time. Unfortunately, we will not be moving forward with your application for this round.'}
            </div>

            <div class="ratings-box">
              <h3>Evaluation Performance Breakdown</h3>
              <div class="rating-row">
                <span class="rating-label">Technical Knowledge:</span>
                <span class="rating-stars">${'★'.repeat(technicalRating || 0)}${'☆'.repeat(5 - (technicalRating || 0))} (${technicalRating || 0}/5)</span>
              </div>
              <div class="rating-row">
                <span class="rating-label">Communication Skills:</span>
                <span class="rating-stars">${'★'.repeat(communicationRating || 0)}${'☆'.repeat(5 - (communicationRating || 0))} (${communicationRating || 0}/5)</span>
              </div>
              <div class="rating-row">
                <span class="rating-label">Problem Solving:</span>
                <span class="rating-stars">${'★'.repeat(problemSolvingRating || 0)}${'☆'.repeat(5 - (problemSolvingRating || 0))} (${problemSolvingRating || 0}/5)</span>
              </div>
              <div class="rating-row">
                <span class="rating-label">Leadership Ability:</span>
                <span class="rating-stars">${'★'.repeat(leadershipRating || 0)}${'☆'.repeat(5 - (leadershipRating || 0))} (${leadershipRating || 0}/5)</span>
              </div>
              <div class="rating-row">
                <span class="rating-label">Teamwork & Collaboration:</span>
                <span class="rating-stars">${'★'.repeat(teamworkRating || 0)}${'☆'.repeat(5 - (teamworkRating || 0))} (${teamworkRating || 0}/5)</span>
              </div>
              <div style="border-top: 1px solid #e2e8f0; margin-top: 12px; padding-top: 12px;" class="rating-row">
                <span class="rating-label" style="color: #2d3748; font-size: 15px;">Overall Assessment Score:</span>
                <span class="rating-stars" style="font-size: 15px;">${'★'.repeat(overallRating || 0)}${'☆'.repeat(5 - (overallRating || 0))} (${overallRating || 0}/5)</span>
              </div>
            </div>

            <div class="feedback-details">
              ${strengths ? `
                <div class="feedback-section">
                  <div class="feedback-title">Key Strengths Demonstrated:</div>
                  <div style="color: #4a5568;">${strengths}</div>
                </div>
              ` : ''}
              
              ${weaknesses ? `
                <div class="feedback-section">
                  <div class="feedback-title">Areas of Improvement:</div>
                  <div style="color: #4a5568;">${weaknesses}</div>
                </div>
              ` : ''}

              ${remarks ? `
                <div class="feedback-section">
                  <div class="feedback-title">Evaluator Assessment Remarks:</div>
                  <div class="feedback-content">"${remarks}"</div>
                </div>
              ` : ''}
            </div>
            
            <p style="margin-top: 25px;">You can view the full details of your application journey on your Candidate Dashboard at any time.</p>
            
            <div class="signature">
              <p>Regards,<br>
              <strong>${companyName} HR Team</strong></p>
            </div>
          </div>
          <div class="email-footer">
            <p>This is an automated message from the ${companyName} Talent Acquisition Portal. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};
