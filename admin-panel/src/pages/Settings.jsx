import React, { useState } from 'react';
import { Save, Globe, Bell, Shield, Database, FileText, Send, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { showToast } = useToast();
  const { isDark, toggleTheme } = useTheme();

  // General Settings States
  const [platformName, setPlatformName] = useState('VRPI Tech Solutions');
  const [adminEmail, setAdminEmail] = useState('admin@vrpisolutions.com');
  const [supportEmail, setSupportEmail] = useState('support@vrpisolutions.com');
  const [timezone, setTimezone] = useState('UTC');

  // Email Notifications States
  const [notifNewJob, setNotifNewJob] = useState(true);
  const [notifNewApp, setNotifNewApp] = useState(true);
  const [notifNewUser, setNotifNewUser] = useState(false);
  const [notifNewCompany, setNotifNewCompany] = useState(true);
  const [notifDailySummary, setNotifDailySummary] = useState(true);

  // Security States
  const [security2FA, setSecurity2FA] = useState(true);
  const [securityTimeout, setSecurityTimeout] = useState(true);
  const [securityIPAllowlist, setSecurityIPAllowlist] = useState(false);

  const handleSave = () => {
    showToast('Platform preferences successfully updated.', 'success');
  };

  const handleClearCache = () => {
    showToast('Platform cache successfully cleared.', 'success');
  };

  const handleSendTestEmail = () => {
    showToast('Test email notification dispatched.', 'success');
  };

  const handleExportData = () => {
    showToast('Enterprise data export started. You will receive an email shortly.', 'success');
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Header Panel */}
      <div className="management-header" style={{ marginBottom: '24px' }}>
        <div className="header-info">
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Settings</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Configure platform-wide preferences and admin settings.
          </p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'linear-gradient(135deg, #ff5100 0%, #e04700 100%)', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(255, 81, 0, 0.2)' 
            }}
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* 1. General Settings Card */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <Globe size={18} />
          </div>
          <h3>General Settings</h3>
        </div>
        <div className="settings-form-grid">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'none' }}>Platform Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={platformName} 
              onChange={(e) => setPlatformName(e.target.value)} 
              style={{ height: '42px', fontSize: '14px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'none' }}>Admin Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={adminEmail} 
              onChange={(e) => setAdminEmail(e.target.value)} 
              style={{ height: '42px', fontSize: '14px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'none' }}>Support Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={supportEmail} 
              onChange={(e) => setSupportEmail(e.target.value)} 
              style={{ height: '42px', fontSize: '14px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'none' }}>Timezone</label>
            <select 
              className="filter-select" 
              value={timezone} 
              onChange={(e) => setTimezone(e.target.value)}
              style={{ width: '100%', height: '42px', backgroundColor: '#ffffff', fontSize: '14px', fontWeight: 500 }}
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="IST">IST</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Appearance Card */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon-wrapper" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <Globe size={18} />
          </div>
          <h3>Appearance</h3>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">Dark Mode</span>
            <span className="settings-row-desc">Switch between light and dark interface theme.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={isDark} onChange={toggleTheme} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* 3. Email Notifications Card */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon-wrapper" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <Bell size={18} />
          </div>
          <h3>Email Notifications</h3>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">New Job Posted</span>
            <span className="settings-row-desc">Receive email when a new job is posted by an employer.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifNewJob} onChange={(e) => setNotifNewJob(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">New Application</span>
            <span className="settings-row-desc">Get notified when a candidate applies for a job.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifNewApp} onChange={(e) => setNotifNewApp(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">New User Registered</span>
            <span className="settings-row-desc">Alert when a new user registers on the platform.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifNewUser} onChange={(e) => setNotifNewUser(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">New Company Signed Up</span>
            <span className="settings-row-desc">Notify when a new employer company registers.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifNewCompany} onChange={(e) => setNotifNewCompany(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">Daily Summary Report</span>
            <span className="settings-row-desc">Receive a daily digest of platform activity.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifDailySummary} onChange={(e) => setNotifDailySummary(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* 4. Security Card */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon-wrapper" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <Shield size={18} />
          </div>
          <h3>Security</h3>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">Two-Factor Authentication</span>
            <span className="settings-row-desc">Require 2FA for all admin logins.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={security2FA} onChange={(e) => setSecurity2FA(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">Session Timeout</span>
            <span className="settings-row-desc">Auto-logout after 30 minutes of inactivity.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={securityTimeout} onChange={(e) => setSecurityTimeout(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-title">IP Allowlist</span>
            <span className="settings-row-desc">Restrict access to specific IP addresses.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={securityIPAllowlist} onChange={(e) => setSecurityIPAllowlist(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* 5. Data Management Card */}
      <div className="settings-card">
        <div className="settings-card-header">
          <div className="settings-icon-wrapper" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
            <Database size={18} />
          </div>
          <h3>Data Management</h3>
        </div>
        <div className="data-actions-container">
          <button 
            className="btn btn-secondary" 
            onClick={handleExportData}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 600 }}
          >
            <FileText size={15} />
            <span>Export All Data (CSV)</span>
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleSendTestEmail}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: 600 }}
          >
            <Send size={15} />
            <span>Send Test Email</span>
          </button>
          <button 
            className="btn" 
            onClick={handleClearCache}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '10px 18px', 
              fontSize: '13px', 
              fontWeight: 600, 
              color: '#ef4444', 
              backgroundColor: '#fee2e2', 
              border: '1px solid #fecaca',
              borderRadius: '8px'
            }}
          >
            <Trash2 size={15} />
            <span>Clear Cache</span>
          </button>
        </div>
        <div className="data-desc">
          Data exports include all jobs, users, applications, and companies. Processing may take up to 5 minutes.
        </div>
      </div>

      <style>{`
        .settings-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          margin-bottom: 24px;
        }

        .settings-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .settings-card-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .settings-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .settings-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 24px;
        }

        .settings-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
        }

        .settings-row:last-child {
          border-bottom: none;
        }

        .settings-row-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .settings-row-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .settings-row-desc {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: .3s;
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: #ff5100;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }

        .data-actions-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 24px 24px 12px 24px;
        }

        .data-desc {
          font-size: 12px;
          color: var(--text-secondary);
          padding: 0 24px 24px 24px;
        }
      `}</style>
    </div>
  );
};

export default Settings;
