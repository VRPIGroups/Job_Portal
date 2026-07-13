// admin-panel/src/components/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth, api } from '../context/AdminAuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Briefcase, Building, Users, FileText, LogOut, Sun, Moon, Shield, Search, HelpCircle, Bell, User, Mail, Menu, X, Layers, Award, MapPin, Settings } from 'lucide-react';

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        // fail silently
      }
    };
    if (admin) {
      fetchStats();
    }
  }, [admin]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="admin-layout-wrapper animate-fade">
      
      {/* MOBILE BACKDROP OVERLAY */}
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* 1. PERSISTENT/MOBILE SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-text-group">
            <img src="/vrpi_logo.png" alt="VRPI Logo" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
            <span className="logo-title-text">VRPI Tech Solutions</span>
            <span className="logo-tag-admin">ADMIN</span>
          </div>
          <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-links">
          <div className="sidebar-section-header">Overview</div>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <div className="sidebar-section-header">Management</div>
          <NavLink
            to="/jobs"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Briefcase size={18} />
            <span>Jobs</span>
            <span className="sidebar-link-badge">
              {stats?.activeJobs !== undefined ? stats.activeJobs : 24}
            </span>
          </NavLink>

          <NavLink
            to="/applications"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <FileText size={18} />
            <span>Applications</span>
            <span className="sidebar-link-badge">
              {stats?.totalApplications !== undefined ? stats.totalApplications : 7}
            </span>
          </NavLink>

          <NavLink
            to="/ats"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Layers size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 800 }}>ATS Console</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Users size={18} />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/companies"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Building size={18} />
            <span>Companies</span>
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Mail size={18} />
            <span>Messages</span>
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Layers size={18} />
            <span>Categories</span>
          </NavLink>

          <NavLink
            to="/skills"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Award size={18} />
            <span>Skills</span>
          </NavLink>

          <NavLink
            to="/locations"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <MapPin size={18} />
            <span>Locations</span>
          </NavLink>

          <NavLink
            to="/templates"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Mail size={18} style={{ opacity: 0.8 }} />
            <span>Email Templates</span>
          </NavLink>

          <div className="sidebar-section-header">System</div>
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            onClick={handleNavLinkClick}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-link w-full logout-btn-hover" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', marginBottom: '8px' }}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>

          <div className="sidebar-profile-card">
            <div className="sidebar-profile-avatar">
              {admin?.first_name ? admin.first_name[0].toUpperCase() : 'S'}
              {admin?.last_name ? admin.last_name[0].toUpperCase() : 'A'}
            </div>
            <div className="sidebar-profile-info">
              <div className="sidebar-profile-name">
                {admin?.first_name || 'System'} {admin?.last_name || 'Administrator'}
              </div>
              <div className="sidebar-profile-role">
                {admin?.role || 'admin'}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="admin-workspace">
        
        {/* TOPBAR HEADER */}
        <header className="admin-topbar">
          <div className="topbar-left-section">
            <button className="mobile-menu-toggle-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            <div className="topbar-welcome-info">
              <span className="topbar-admin-badge">
                <Shield size={14} />
                <span>Admin Console</span>
              </span>
            </div>
          </div>

          {/* CENTERED SEARCH BAR MOCK */}
          <div className="topbar-search-bar">
            <Search size={15} className="topbar-search-icon" />
            <input type="text" placeholder="Search for something" className="topbar-search-input" />
          </div>

          <div className="topbar-actions">
            {/* Theme switcher */}
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Help & notifications in orange */}
            <button className="topbar-icon-btn" aria-label="Help">
              <HelpCircle size={18} />
            </button>
            <button className="topbar-icon-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="notification-dot"></span>
            </button>

            {/* Profile widget */}
            <div className="admin-profile-widget">
              <div className="admin-avatar-initials">
                <User size={16} />
              </div>
              <div className="admin-details-texts">
                <div className="admin-widget-name">{admin?.first_name || 'System'} {admin?.last_name || 'Admin'}</div>
                <div className="admin-widget-email">{admin?.email}</div>
              </div>
            </div>
          </div>
        </header>


        {/* VIEWPORT AREA */}
        <main className="admin-main-viewport">
          <Outlet />
        </main>
      </div>

      <style>{`
        .topbar-admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: var(--primary-glow);
          border: 1px solid var(--primary);
          color: var(--primary);
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background-color: #ffffff;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          height: 48px;
        }

        .logo-title-text {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0px;
          white-space: nowrap;
        }

        .logo-tag-admin {
          border: 1.5px solid #ff5100;
          color: #ff5100;
          background-color: transparent;
          font-size: 9px;
          font-weight: 800;
          padding: 1px 5px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sidebar-section-header {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.55);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          padding: 14px 16px 6px 16px;
          margin-top: 10px;
        }

        .sidebar-section-header:first-of-type {
          margin-top: 0;
        }

        .sidebar-link-badge {
          margin-left: auto;
          font-size: 10px;
          font-weight: 800;
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 2px 7px;
          border-radius: var(--radius-full);
          min-width: 24px;
          text-align: center;
        }

        .sidebar-link-active .sidebar-link-badge {
          background-color: var(--primary);
          color: #ffffff;
        }

        .sidebar-profile-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          margin-top: 12px;
        }

        .sidebar-profile-avatar {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background-color: #ffffff;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 12px;
        }

        .sidebar-profile-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .sidebar-profile-name {
          font-weight: 700;
          font-size: 12px;
          color: #ffffff;
          line-height: 1.3;
        }

        .sidebar-profile-role {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
        }

        .topbar-icon-btn {
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 6px;
          height: 6px;
          background-color: var(--primary);
          border-radius: 50%;
          border: 1px solid var(--bg-secondary);
        }

        /* Topbar Centered Search Input */
        .topbar-search-bar {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 280px;
        }

        .topbar-search-icon {
          position: absolute;
          left: 16px;
          color: var(--primary);
        }

        .topbar-search-input {
          width: 100%;
          height: 38px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding-left: 42px;
          padding-right: 16px;
          color: var(--text-primary);
          font-size: 13px;
          box-shadow: 0 4px 10px rgba(255, 81, 0, 0.03);
          transition: all var(--transition-fast);
        }

        .topbar-search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow), var(--shadow-glow);
        }

        .topbar-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .topbar-icon-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .admin-profile-widget {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 20px;
          border-left: 1px solid #e2e8f0;
          margin-left: 4px;
        }

        .admin-avatar-initials {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          border: 1.5px solid var(--primary);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .admin-details-texts {
          text-align: left;
          line-height: 1.3;
        }

        .admin-widget-name {
          font-weight: 700;
          font-size: 13.5px;
          color: var(--text-primary);
        }

        .admin-widget-email {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .logout-btn-hover:hover {
          color: #ffffff !important;
          background-color: rgba(255, 255, 255, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
