// frontend/src/pages/Success.jsx
import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Briefcase, Building, ArrowRight } from 'lucide-react';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract application info from router state
  const { applicationId, appliedJob, companyName, submissionDate } = location.state || {};

  // If page loaded directly without state, redirect to home
  useEffect(() => {
    if (!applicationId) {
      navigate('/');
    }
  }, [applicationId, navigate]);

  if (!applicationId) return null;

  return (
    <main className="success-page animate-fade">
      <div className="glass-card success-card reveal-on-scroll">
        
        {/* CELEBRATION ICON */}
        <div className="celebration-wrapper">
          <div className="icon-pulse-glow" />
          <CheckCircle size={64} className="success-check-icon animate-bounce" />
        </div>

        <h1 className="success-heading">🎉 Application Submitted Successfully</h1>
        <p className="success-subheading">
          Congratulations! Your application has been logged and forwarded directly to the hiring manager.
        </p>

        {/* METADATA RECEIPTS CARD */}
        <div className="receipt-box">
          <h3 className="receipt-title">Application Receipt</h3>
          
          <div className="receipt-rows">
            <div className="receipt-row">
              <div className="receipt-label">
                <Briefcase size={14} />
                <span>Applied Job</span>
              </div>
              <div className="receipt-value">{appliedJob}</div>
            </div>

            <div className="receipt-row">
              <div className="receipt-label">
                <Building size={14} />
                <span>Company</span>
              </div>
              <div className="receipt-value">{companyName}</div>
            </div>

            <div className="receipt-row">
              <div className="receipt-label">
                <Calendar size={14} />
                <span>Submission Date</span>
              </div>
              <div className="receipt-value">
                {new Date(submissionDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div className="receipt-row receipt-id-row">
              <div className="receipt-label">
                <span>Application ID</span>
              </div>
              <div className="receipt-value receipt-id-highlight"># {applicationId}</div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="success-cta-actions">
          <Link to="/dashboard" className="btn btn-primary cta-btn">
            <span>View Applied Jobs</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/" className="btn btn-secondary cta-btn">
            Back To Home
          </Link>
        </div>

      </div>

      <style>{`
        .success-page {
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 50%, var(--bg-tertiary) 0%, var(--bg-primary) 80%);
        }

        .success-card {
          width: 100%;
          max-width: 580px;
          padding: 48px;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .success-card:hover {
          transform: none;
          box-shadow: var(--shadow-xl);
        }

        .celebration-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          margin-bottom: 28px;
        }

        .icon-pulse-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--success-glow);
          border-radius: 50%;
          animation: pulseGlow 2s infinite ease-in-out;
        }

        .success-check-icon {
          color: var(--success);
          position: relative;
          z-index: 10;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .success-heading {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .success-subheading {
          font-size: 15px;
          color: var(--text-secondary);
          margin-top: 12px;
          line-height: 1.6;
          max-width: 440px;
        }

        /* Receipt Box styling */
        .receipt-box {
          width: 100%;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          margin: 36px 0;
          text-align: left;
        }

        .receipt-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px dashed var(--border-color);
        }

        .receipt-rows {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }

        .receipt-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-tertiary);
        }

        .receipt-label svg {
          color: var(--text-tertiary);
        }

        .receipt-value {
          font-weight: 600;
          color: var(--text-primary);
          text-align: right;
          word-break: break-all;
          max-width: 60%;
        }

        .receipt-id-row {
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        .receipt-id-highlight {
          color: var(--primary);
          font-family: var(--font-display);
          font-weight: 700;
        }

        /* CTA buttons */
        .success-cta-actions {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .cta-btn {
          flex: 1;
          height: 48px;
        }

        @media (max-width: 576px) {
          .success-card {
            padding: 32px 20px;
          }
          
          .success-heading {
            font-size: 22px;
          }
          
          .success-cta-actions {
            flex-direction: column;
            gap: 12px;
          }
          
          .cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default Success;
