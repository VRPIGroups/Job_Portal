// admin-panel/src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Shield, Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, loading } = useAdminAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard console
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result && result.success) {
      navigate('/');
    }
  };

  return (
    <div className="split-login-container animate-fade">
      
      {/* LEFT SPLIT PANEL: ISOMETRIC WELCOME GRAPHICS */}
      <div className="login-left-panel">
        <div className="left-panel-content">
          <h1>Welcome Back!</h1>
          <p>Verify your administrator credentials to securely log in to the enterprise dashboard management console.</p>
          <div className="illustration-wrapper-box">
            <img 
              src="/admin_login_illustration.png" 
              alt="Security Console Isometric Illustration" 
              className="isometric-security-img"
            />
          </div>
        </div>
        <div className="left-panel-circle-accent" />
      </div>

      {/* RIGHT SPLIT PANEL: CREDENTIALS PORTAL */}
      <div className="login-right-panel">
        <div className="right-panel-content">
          
          {/* Logo Heading */}
          <div className="brand-logo-section">
            <div className="logo-brand-flex">
              <span className="logo-icon-shield">🛡️</span>
              <span className="brand-bold-text">VRPI Solutions</span>
              <span className="logo-tag-badge">Console</span>
            </div>
            <span className="group-subtext">Enterprise Recruitment System</span>
          </div>

          <h2 className="admin-login-title">Admin Login</h2>
          <p className="admin-login-subtitle">Hello Admin, Sign-in to your Account and start managing</p>

          <form onSubmit={handleSubmit} className="admin-split-form">
            
            {/* Username/Email */}
            <div className="split-form-group">
              <label className="split-form-label" htmlFor="email">Email / Username</label>
              <div className="split-input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="admin@jobportal.com"
                  className="split-form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password */}
            <div className="split-form-group">
              <label className="split-form-label" htmlFor="password">Password</label>
              <div className="split-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className="split-form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="split-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="forgot-password-row">
                <button type="button" className="forgot-password-btn-link" onClick={() => alert('Please contact the database master administrator to manually override system credentials.')}>
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-split-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" style={{ borderTopColor: '#ffffff' }}></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Footer Contact */}
          <div className="split-login-footer">
            <span>Any trouble while logging please contact </span>
            <a href="mailto:support@vrpisolutions.com" className="footer-email-link">support@vrpisolutions.com</a>
          </div>

        </div>
      </div>

      <style>{`
        .split-login-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background-color: #ffffff;
          overflow: hidden;
        }

        /* Left Panel Styles */
        .login-left-panel {
          width: 42%;
          background-color: #ff5100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          position: relative;
          color: #ffffff;
          overflow: hidden;
          box-shadow: 6px 0 30px rgba(0,0,0,0.06);
        }

        .left-panel-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 440px;
        }

        .left-panel-content h1 {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 12px;
          font-family: var(--font-display);
        }

        .left-panel-content p {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 32px;
        }

        .illustration-wrapper-box {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .isometric-security-img {
          width: 100%;
          max-width: 320px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.12));
          animation: smoothFloat 5s ease-in-out infinite;
        }

        @keyframes smoothFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .left-panel-circle-accent {
          position: absolute;
          bottom: -10%;
          left: -10%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.03);
          z-index: 1;
        }

        /* Right Panel Styles */
        .login-right-panel {
          width: 58%;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }

        .right-panel-content {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        /* Brand section */
        .brand-logo-section {
          margin-bottom: 40px;
        }

        .logo-brand-flex {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon-shield {
          font-size: 28px;
        }

        .brand-bold-text {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: #ff5100;
        }

        .logo-tag-badge {
          background-color: rgba(255, 81, 0, 0.1);
          border: 1px solid #ff5100;
          color: #ff5100;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          text-transform: uppercase;
        }

        .group-subtext {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
          display: block;
        }

        /* Headings */
        .admin-login-title {
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .admin-login-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 32px;
          font-weight: 500;
        }

        /* Forms inputs */
        .admin-split-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .split-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .split-form-label {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
        }

        .split-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .split-form-control {
          width: 100%;
          height: 48px;
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #1e293b;
          border-radius: var(--radius-sm);
          padding: 0 16px;
          font-size: 15px;
          transition: all var(--transition-fast);
        }

        .split-form-control:focus {
          border-color: #ff5100;
          box-shadow: 0 0 0 3px rgba(255, 81, 0, 0.15);
        }

        .split-password-toggle {
          position: absolute;
          right: 16px;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .split-password-toggle:hover {
          color: #ff5100;
        }

        .forgot-password-row {
          text-align: right;
          margin-top: 6px;
        }

        .forgot-password-btn-link {
          font-size: 13px;
          font-weight: 700;
          color: #ff5100;
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }

        .forgot-password-btn-link:hover {
          text-decoration: underline;
        }

        /* Submit Button */
        .btn-split-primary {
          width: 100%;
          height: 48px;
          background-color: #ff5100;
          color: #ffffff;
          border-radius: var(--radius-sm);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all var(--transition-normal);
          margin-top: 10px;
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.2);
        }

        .btn-split-primary:hover {
          background-color: #e04700;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255, 81, 0, 0.35);
        }

        /* Footer */
        .split-login-footer {
          margin-top: 36px;
          text-align: center;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .footer-email-link {
          color: #ff5100;
          font-weight: 700;
          transition: opacity var(--transition-fast);
        }

        .footer-email-link:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .login-left-panel {
            display: none;
          }
          
          .login-right-panel {
            width: 100%;
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
