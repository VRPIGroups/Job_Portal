// admin-panel/src/context/ToastContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'warning':
        return <AlertTriangle size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      case 'info':
      default:
        return <Info size={18} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.type} animate-slide-in`}>
            <div className="toast-icon-wrapper">{getIcon(toast.type)}</div>
            <div className="toast-content">{toast.message}</div>
            <button className="toast-close-btn" onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 9999;
          max-width: 360px;
          width: calc(100vw - 48px);
        }

        .toast-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-secondary);
          border-left: 4px solid var(--primary);
          box-shadow: var(--shadow-lg);
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition-normal);
        }

        .toast-success { border-left-color: var(--success); }
        .toast-error { border-left-color: var(--danger); }
        .toast-warning { border-left-color: var(--warning); }
        .toast-info { border-left-color: var(--primary); }

        .toast-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-success .toast-icon-wrapper { color: var(--success); }
        .toast-error .toast-icon-wrapper { color: var(--danger); }
        .toast-warning .toast-icon-wrapper { color: var(--warning); }
        .toast-info .toast-icon-wrapper { color: var(--primary); }

        .toast-content {
          flex-grow: 1;
          word-break: break-word;
        }

        .toast-close-btn {
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast);
          background: none;
          border: none;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
        }

        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slide-in {
          animation: toastSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
