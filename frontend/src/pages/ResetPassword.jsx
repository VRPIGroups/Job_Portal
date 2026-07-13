// frontend/src/pages/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const t = searchParams.get('token');
    if (t) {
      setToken(t);
    } else {
      showToast('No validation token supplied. Request a new password link.', 'error');
    }
  }, [searchParams, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirm_password } = formData;

    if (!token) {
      showToast('Missing token. Please request a new password recovery link.', 'error');
      return;
    }

    if (!password || !confirm_password) {
      showToast('Please complete all form fields.', 'warning');
      return;
    }

    if (password !== confirm_password) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/reset-password', {
        token,
        password,
        confirm_password
      });

      if (res.data.success) {
        setSuccess(true);
        showToast(res.data.message || 'Password reset successfully!', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Token is invalid or has expired.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reset-password-page animate-fade">
      <div className="glass-card reset-password-card reveal-on-scroll">
        {!success ? (
          <>
            <div className="card-header">
              <h1 className="card-title">Reset Password</h1>
              <p className="card-subtitle">Establish your new account password below.</p>
            </div>

            <form onSubmit={handleSubmit} className="reset-form">
              <div className="form-group">
                <label className="form-label" htmlFor="password">New Password</label>
                <div className="input-icon-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="form-control input-with-icon"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm_password">Confirm New Password</label>
                <div className="input-icon-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="••••••••"
                    className="form-control input-with-icon"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full submit-btn" disabled={loading || !token} style={{ width: '100%' }}>
                {loading ? (
                  <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                ) : (
                  <>
                    <span>Confirm Reset</span>
                    <KeyRound size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="success-state animate-fade">
            <CheckCircle2 size={48} className="success-icon" />
            <h2 className="success-title">Password Reset</h2>
            <p className="success-desc">
              Your password has been changed successfully. You will be automatically redirected to the Login page in a few seconds...
            </p>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: '24px', width: '100%' }}>
              Log In Now
            </Link>
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
        .reset-password-page {
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 50%, var(--bg-tertiary) 0%, var(--bg-primary) 80%);
        }

        .reset-password-card {
          width: 100%;
          max-width: 460px;
          padding: 40px;
          background-color: var(--bg-secondary);
        }

        .reset-password-card:hover {
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

        .reset-form {
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

export default ResetPassword;
