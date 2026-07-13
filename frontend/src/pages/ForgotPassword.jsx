// frontend/src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mockTokenLink, setMockTokenLink] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.data.success) {
        setSubmitted(true);
        showToast('Password reset token dispatched successfully!', 'success');
        
        // Extract the mock token returned by our development controller
        if (res.data.token) {
          const testLink = `/reset-password?token=${res.data.token}`;
          setMockTokenLink(testLink);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error processing request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="forgot-password-page animate-fade">
      <div className="glass-card forgot-password-card reveal-on-scroll">
        {!submitted ? (
          <>
            <div className="card-header">
              <h1 className="card-title">Forgot Password</h1>
              <p className="card-subtitle">Enter your email and we'll send a password recovery token.</p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-form">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-icon-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="name@domain.com"
                    className="form-control input-with-icon"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full submit-btn" disabled={loading} style={{ width: '100%' }}>
                {loading ? (
                  <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                ) : (
                  <>
                    <span>Request Reset Token</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="success-state animate-fade">
            <CheckCircle2 size={48} className="success-icon animate-pulse" />
            <h2 className="success-title">Recovery Dispatched</h2>
            <p className="success-desc">
              If an account is associated with <strong>{email}</strong>, a password reset link has been created.
            </p>

            {mockTokenLink && (
              <div className="mock-developer-notice">
                <p className="mock-title">⚙️ Sandbox Developer Tool</p>
                <p className="mock-description">
                  Since we are running in development sandbox, you can complete the password reset flow directly by clicking the link below:
                </p>
                <Link to={mockTokenLink} className="mock-btn-link">
                  Complete Password Reset ↗
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="card-footer">
          <Link to="/login" className="back-to-login">
            <ArrowLeft size={16} />
            <span>Back to Log In</span>
          </Link>
        </div>
      </div>

      <style>{`
        .forgot-password-page {
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 50%, var(--bg-tertiary) 0%, var(--bg-primary) 80%);
        }

        .forgot-password-card {
          width: 100%;
          max-width: 460px;
          padding: 40px;
          background-color: var(--bg-secondary);
        }

        .forgot-password-card:hover {
          transform: none;
          box-shadow: var(--shadow-xl);
        }

        .card-header {
          margin-bottom: 28px;
        }

        .card-title {
          font-size: 26px;
          font-weight: 800;
        }

        .card-subtitle {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-top: 8px;
          line-height: 1.5;
        }

        .forgot-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-icon-wrapper {
          position: relative;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
          pointer-events: none;
        }

        .input-with-icon {
          padding-left: 44px;
        }

        .submit-btn {
          height: 48px;
          font-size: 15px;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px 0;
        }

        .success-icon {
          color: var(--success);
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .success-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .mock-developer-notice {
          margin-top: 24px;
          padding: 16px;
          background-color: var(--bg-tertiary);
          border: 1px dashed var(--primary);
          border-radius: var(--radius-sm);
          text-align: left;
        }

        .mock-title {
          font-weight: 700;
          font-size: 13px;
          color: var(--primary);
          margin-bottom: 6px;
        }

        .mock-description {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .mock-btn-link {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          background-color: var(--primary);
          padding: 6px 14px;
          border-radius: var(--radius-xs);
          transition: background-color var(--transition-fast);
        }

        .mock-btn-link:hover {
          background-color: var(--primary-hover);
        }

        .card-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: center;
        }

        .back-to-login {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          transition: color var(--transition-fast);
        }

        .back-to-login:hover {
          color: var(--primary);
        }
      `}</style>
    </main>
  );
};

export default ForgotPassword;
