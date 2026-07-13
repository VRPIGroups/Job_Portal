import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const verificationTriggered = useRef(false);

  useEffect(() => {
    const performVerification = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid request. A verification token must be provided.');
        return;
      }

      if (verificationTriggered.current) return;
      verificationTriggered.current = true;

      try {
        const response = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
        if (response.data.success) {
          setStatus('success');
          setMessage('Email Verified Successfully');
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Verification failed.');
        }
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification link is invalid or has expired.');
      }
    };

    performVerification();
  }, [token]);

  return (
    <div className="verify-wrapper animate-fade">
      <div className="verify-card glass-card reveal-on-scroll">
        {status === 'verifying' && (
          <div className="status-container">
            <Loader2 size={64} className="spinner icon-primary" />
            <h2>Verifying Email Address</h2>
            <p>Please wait while we validate your credentials and activate your account...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="status-container">
            <CheckCircle size={64} className="icon-success scale-up" />
            <h2 className="text-success">{message}</h2>
            <p>🎉 Congratulations! Your account has been verified successfully. You can now log in and apply for your dream jobs.</p>
            <Link to="/login" className="btn btn-primary">
              Proceed to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="status-container">
            <AlertTriangle size={64} className="icon-error scale-up" />
            <h2 className="text-error">Verification Failed</h2>
            <p>{message}</p>
            <div className="action-buttons">
              <Link to="/login" className="btn btn-secondary">
                Back to Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register Again
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .verify-wrapper {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: var(--bg-primary);
        }

        .verify-card {
          max-width: 500px;
          width: 100%;
          padding: 40px;
          text-align: center;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
        }

        .status-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .status-container h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .status-container p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .icon-primary {
          color: var(--primary);
        }

        .icon-success {
          color: var(--success);
          filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.2));
        }

        .icon-error {
          color: var(--error);
          filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.2));
        }

        .text-success {
          color: var(--success) !important;
        }

        .text-error {
          color: var(--error) !important;
        }

        .spinner {
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .scale-up {
          animation: scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes scaleUp {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .btn {
          padding: 10px 24px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-primary {
          background-color: var(--primary);
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background-color: var(--border-color);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default VerifyEmail;
