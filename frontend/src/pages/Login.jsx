// frontend/src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect away
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://accounts.google.com/signin';
  };

  const handleLinkedInLogin = () => {
    window.location.href = 'https://www.linkedin.com/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      showToast('Please fill in all inputs.', 'warning');
      return;
    }

    if (!agreeTerms) {
      showToast('You must agree to the Terms and Conditions according to the company norms.', 'warning');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from);
    }
  };

  return (
    <main className="login-page animate-fade">
      {/* Outer card with sunset background */}
      <div className="login-landscape-card">
        {/* Left Toggle Panel */}
        <div className="login-left-panel">
          <div className="left-panel-content">
            <h2 className="left-title">Are you new user to <br />VRPI Solutions?</h2>
            <Link to="/register" className="left-toggle-btn">
              Sign-Up
            </Link>
          </div>
        </div>

        {/* Right Glass Form Panel */}
        <div className="login-right-panel">
          <div className="login-glass-card">
            <form onSubmit={handleSubmit} className="auth-form-theme">
              
              {/* Email Address Input */}
              <div className="auth-input-wrapper">
                <div className="auth-input-bar" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="abc@gmail.com"
                  className="auth-input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="auth-input-wrapper">
                <div className="auth-input-bar" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="************"
                  className="auth-input-field"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="auth-options-row">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password ?
                </Link>
              </div>

              {/* Terms Checkbox */}
              <label className="checkbox-container terms-checkbox">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span className="checkbox-text">
                  I, agree to all the <span className="bold-white-text">Terms and Conditions</span> according to the company norms
                </span>
              </label>

              {/* Submit Button */}
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px', borderColor: '#ffffff', borderTopColor: 'transparent' }} />
                ) : (
                  'Sign-in'
                )}
              </button>

              {/* Social Login Buttons */}
              <div className="social-buttons-row">
                <button type="button" className="social-login-btn google" onClick={handleGoogleLogin}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.86-4.53-5.84-4.53z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <span>Login via Google</span>
                </button>
                <button type="button" className="social-login-btn linkedin" onClick={handleLinkedInLogin}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="social-icon">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0077B5"/>
                  </svg>
                  <span>Login via LinkedIn</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          padding: 40px 20px;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .login-landscape-card {
          display: flex;
          width: 100%;
          max-width: 1040px;
          min-height: 620px;
          background: url('/sunset_lake.png') no-repeat center center / cover;
          border-radius: 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          position: relative;
        }

        /* Add a very subtle overlay on the card background to ensure text contrast */
        .login-landscape-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.05);
          pointer-events: none;
          z-index: 1;
        }

        .login-left-panel {
          position: relative;
          z-index: 2;
          width: 38%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .left-panel-content {
          text-align: center;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .left-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.35;
          margin-bottom: 30px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .left-toggle-btn {
          display: inline-block;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 400;
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.18);
          border: 1px solid #ffffff;
          border-radius: 16px;
          padding: 12px 45px;
          transition: all 0.3s ease;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .left-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          border-color: #ffffff;
          transform: scale(1.03);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .login-right-panel {
          position: relative;
          z-index: 2;
          width: 62%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 60px;
        }

        .login-glass-card {
          width: 100%;
          max-width: 460px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px) saturate(110%);
          -webkit-backdrop-filter: blur(12px) saturate(110%);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
          padding: 40px;
        }

        .auth-form-theme {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Custom inputs styling */
        .auth-input-wrapper {
          display: flex;
          align-items: stretch;
          background-color: #ffffff;
          border-radius: 14px;
          height: 56px;
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .auth-input-bar {
          width: 14px;
          background-color: #ff5100;
          flex-shrink: 0;
        }

        .auth-input-field {
          font-family: 'Georgia', 'Times New Roman', serif;
          border: none;
          outline: none;
          background: transparent;
          padding: 0 16px 0 20px;
          flex-grow: 1;
          font-size: 18px;
          font-weight: 500;
          color: #333333;
          height: 100%;
        }

        .auth-input-field::placeholder {
          color: #888888;
          font-weight: 400;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .password-toggle-btn {
          border: none;
          background: transparent;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff5100;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .password-toggle-btn:hover {
          color: #cc4100;
        }

        /* Options Row (Remember me + Forgot password) */
        .auth-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-container input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #ff5100;
        }

        .checkbox-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13.5px;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          line-height: 1.4;
        }

        .bold-white-text {
          font-weight: 700;
          color: #ffffff;
        }

        .forgot-password-link {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13.5px;
          color: #ff5100;
          font-weight: 500;
          transition: color 0.2s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .forgot-password-link:hover {
          color: #ff854d;
          text-decoration: underline;
        }

        .terms-checkbox {
          margin-bottom: 24px;
        }

        /* Solid Orange Submit Button */
        .auth-submit-btn {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 500;
          color: #ffffff;
          background-color: #ff5100;
          border: none;
          border-radius: 16px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px rgba(255, 81, 0, 0.35);
          margin-bottom: 24px;
        }

        .auth-submit-btn:hover {
          background-color: #e04800;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255, 81, 0, 0.45);
        }

        .auth-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Social buttons */
        .social-buttons-row {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .social-login-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 52px;
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid #ff5100;
          border-radius: 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 15px;
          font-weight: 500;
          color: #ff5100;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .social-login-btn:hover {
          background-color: rgba(255, 81, 0, 0.15);
          border-color: #ff854d;
          color: #ff5100;
          transform: translateY(-1px);
        }

        .social-icon {
          flex-shrink: 0;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
        }

        /* Responsive designs */
        @media (max-width: 992px) {
          .login-landscape-card {
            flex-direction: column;
            min-height: auto;
            border-radius: 30px;
          }

          .login-left-panel {
            width: 100%;
            padding: 40px 20px 20px 20px;
          }

          .left-title {
            margin-bottom: 16px;
            font-size: 22px;
          }

          .left-toggle-btn {
            font-size: 18px;
            padding: 8px 30px;
            border-radius: 12px;
          }

          .login-right-panel {
            width: 100%;
            padding: 20px 24px 40px 24px;
          }

          .login-glass-card {
            max-width: 100%;
            padding: 24px;
            border-radius: 24px;
          }

          .auth-input-wrapper {
            height: 50px;
            margin-bottom: 18px;
          }

          .auth-input-field {
            font-size: 16px;
          }

          .auth-submit-btn {
            height: 50px;
            font-size: 18px;
            border-radius: 12px;
          }

          .social-login-btn {
            height: 48px;
            font-size: 13.5px;
            border-radius: 12px;
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .login-landscape-card {
            border-radius: 20px;
          }
          .login-left-panel {
            padding: 30px 15px 15px 15px;
          }
          .login-right-panel {
            padding: 15px 15px 30px 15px;
          }
          .social-buttons-row {
            flex-direction: column;
            gap: 12px;
          }
          .social-login-btn {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default Login;

