// frontend/src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, User, Briefcase, Mail, MessageCircle, Twitter, Youtube, Facebook, Linkedin, Instagram } from 'lucide-react';

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Resolve user avatar logo
  const getAvatarUrl = () => {
    if (user && user.profile_image) {
      return `http://localhost:5000/uploads/images/${user.profile_image}`;
    }
    return `https://ui-avatars.com/api/?name=${user?.first_name || 'U'}+${user?.last_name || 'P'}&background=ff5100&color=fff&bold=true`;
  };

  return (
    <header className="site-header">
      {/* 1. TOP BAR: "Join Us Via" and Social Icons */}
      <div className="header-top-bar">
        <div className="header-social-container">
          <span className="join-us-text">Join Us Via</span>
          <div className="social-links-row">
            <a href="https://wa.me" target="_blank" rel="noreferrer" className="top-social-icon whatsapp">
              <MessageCircle size={14} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="top-social-icon twitter">
              <Twitter size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="top-social-icon youtube">
              <Youtube size={14} />
            </a>
            <a href="mailto:info@vrpisolutions.com" className="top-social-icon mail">
              <Mail size={14} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="top-social-icon facebook">
              <Facebook size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="top-social-icon linkedin">
              <Linkedin size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="top-social-icon instagram">
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER: Logo and Angled Black Navigation Ribbon */}
      <div className="header-container">
        {/* Left Side: Brand Logo */}
        <div className="logo-wrapper">
          <Link to="/" className="site-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/vrpi_logo.png" alt="VRPI Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
          </Link>
        </div>

        {/* Right Side: Angled Black Nav Ribbon for Desktop */}
        <div className="nav-wrapper-slanted">
          <nav className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
              Home
            </Link>
            <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'nav-link-active' : ''}`}>
              Find Jobs
            </Link>
            {isAuthenticated && (
              <Link 
                to={user?.role === 'recruiter' ? '/recruiter-dashboard' : '/dashboard'} 
                className={`nav-link ${isActive(user?.role === 'recruiter' ? '/recruiter-dashboard' : '/dashboard') ? 'nav-link-active' : ''}`}
              >
                My Dashboard
              </Link>
            )}
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}>
              Contact Us
            </Link>
            {user?.role === 'admin' && (
              <a href="http://localhost:3001" className="nav-link nav-link-admin" target="_blank" rel="noreferrer">
                Admin Panel ↗
              </a>
            )}
          </nav>

          {/* Action Controls */}
          <div className="header-actions">
            {/* Theme Toggler */}
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Seeker Auth Actions */}
            <div className="auth-actions-desktop">
              {isAuthenticated ? (
                <div className="user-profile-menu">
                  <Link to={user?.role === 'recruiter' ? '/recruiter-dashboard' : '/dashboard'} className="avatar-wrapper" title="Go to Dashboard">
                    <img src={getAvatarUrl()} alt="User Avatar" className="user-avatar" />
                    <span className="user-welcome-name">Hi, {user.first_name}</span>
                  </Link>
                  <button onClick={handleLogout} className="btn-logout-icon" title="Log Out">
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <div className="guest-links">
                  <Link to="/login" className="btn-login-link">
                    Log In
                  </Link>
                  <Link to="/register" className="btn btn-primary nav-signup-btn">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Toggle Button (Visible only on Mobile) */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade">
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-header">
              <Link to="/" className="site-logo" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/vrpi_logo.png" alt="VRPI Logo" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
              </Link>
              <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <nav className="mobile-drawer-links">
              <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'mobile-nav-active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <Briefcase size={18} /> Home
              </Link>
              <Link to="/jobs" className={`mobile-nav-link ${isActive('/jobs') ? 'mobile-nav-active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <Briefcase size={18} /> Find Jobs
              </Link>
              {isAuthenticated && (
                <Link 
                  to={user?.role === 'recruiter' ? '/recruiter-dashboard' : '/dashboard'} 
                  className={`mobile-nav-link ${isActive(user?.role === 'recruiter' ? '/recruiter-dashboard' : '/dashboard') ? 'mobile-nav-active' : ''}`} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={18} /> My Dashboard
                </Link>
              )}
              <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'mobile-nav-active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <Mail size={18} /> Contact Us
              </Link>
              {user?.role === 'admin' && (
                <a href="http://localhost:3001" className="mobile-nav-link mobile-nav-link-admin" target="_blank" rel="noreferrer">
                  <LayoutDashboard size={18} /> Admin Dashboard ↗
                </a>
              )}
            </nav>

            <div className="mobile-drawer-footer">
              {isAuthenticated ? (
                <div className="mobile-auth-profile">
                  <div className="mobile-user-details">
                    <img src={getAvatarUrl()} alt="User Avatar" className="user-avatar" />
                    <div>
                      <div className="mobile-username">{user.first_name} {user.last_name}</div>
                      <div className="mobile-useremail">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="btn btn-secondary w-full" style={{ width: '100%' }}>
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-guest">
                  <Link to="/login" className="btn btn-secondary" style={{ width: '100%', marginBottom: '10px' }} onClick={() => setMobileMenuOpen(false)}>
                    <User size={16} /> Log In
                  </Link>
                  <Link to="/register" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: var(--bg-secondary);
          border-bottom: 2px solid #eaeaea;
          transition: background-color var(--transition-normal);
        }

        /* 1. Header Top Bar (Social Row) */
        .header-top-bar {
          background-color: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 40px;
        }

        .header-social-container {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .join-us-text {
          font-size: 11px;
          font-weight: 800;
          color: #000000;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.5px;
        }

        .social-links-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .top-social-icon {
          color: #ff5100;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .top-social-icon:hover {
          color: #cc4100;
          transform: scale(1.15);
        }

        /* 2. Main Header Container */
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          padding: 0;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }

        /* VR PI Logo Design to match Screenshot exactly */
        .logo-wrapper {
          padding-left: 40px;
          display: flex;
          align-items: center;
        }

        .vr-pi-logo-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }

        .logo-main-row {
          display: flex;
          align-items: center;
        }

        .logo-vr {
          font-size: 38px;
          font-weight: 900;
          color: #c10037; /* Crimson Magenta matching screenshot */
          font-family: 'Outfit', sans-serif;
          letter-spacing: -2px;
        }

        .logo-pi-badge {
          background-color: #ff5100; /* Vibrant Orange background */
          color: #ffffff;
          padding: 3px 10px;
          margin-left: 6px;
          border-radius: 6px;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .logo-p-white {
          color: #ffffff;
        }

        .logo-i-dot {
          font-size: 14px;
          color: #ff5100; /* Orange inside circle */
          background-color: #ffffff; /* White circle background */
          border-radius: 50%;
          width: 13px;
          height: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 2px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .logo-sub-companies {
          font-size: 9px;
          font-weight: 800;
          color: #c10037; /* Crimson Magenta matching screenshot */
          text-transform: uppercase;
          margin-top: 4px;
          letter-spacing: 0.5px;
          font-family: 'Inter', sans-serif;
        }

        /* Slanted Black Banner Box on Desktop */
        .nav-wrapper-slanted {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background-color: #000000;
          height: 100%;
          padding: 0 40px 0 80px;
          clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);
          margin-left: 20px;
          flex-grow: 1;
          gap: 40px;
        }

        .desktop-nav {
          display: flex;
          gap: 8px;
          height: 100%;
          align-items: center;
        }

        .nav-link {
          font-weight: 700;
          color: #ffffff;
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 24px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          text-transform: capitalize;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: #ff5100;
        }

        .nav-link-active {
          color: #ffffff;
          font-weight: 800;
        }

        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 24px;
          right: 24px;
          height: 4px;
          background-color: #ff5100; /* Solid Orange bottom indicator */
        }

        .nav-link-admin {
          color: #ff854d;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .theme-toggle-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: #ffffff;
          border: 1px solid #333333;
          background-color: #111111;
          transition: all var(--transition-normal);
        }

        .theme-toggle-btn:hover {
          color: #ff5100;
          border-color: #ff5100;
          background-color: #222222;
        }

        .auth-actions-desktop {
          display: flex;
          align-items: center;
        }

        .guest-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-login-link {
          font-weight: 600;
          color: #ffffff;
          padding: 8px 12px;
          font-size: 14px;
          transition: color var(--transition-fast);
        }

        .btn-login-link:hover {
          color: #ff5100;
        }

        .nav-signup-btn {
          background-color: #ff5100;
          color: #ffffff;
          border: none;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 4px;
          font-size: 13px;
          transition: background-color var(--transition-fast);
        }

        .nav-signup-btn:hover {
          background-color: #cc4100;
        }

        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ff5100;
          padding: 1px;
        }

        .user-welcome-name {
          font-weight: 600;
          font-size: 13px;
          color: #ffffff;
        }

        .user-welcome-name:hover {
          color: #ff5100;
        }

        .btn-logout-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: #aaaaaa;
          background-color: #111111;
          border: 1px solid #333333;
          transition: all var(--transition-normal);
        }

        .btn-logout-icon:hover {
          color: #ff5100;
          border-color: #ff5100;
          background-color: #222222;
        }

        .mobile-menu-toggle {
          display: none;
          color: var(--text-primary);
          margin-right: 20px;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Mobile Drawer Styling */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 10000;
        }

        .mobile-drawer-content {
          position: absolute;
          top: 0;
          right: 0;
          width: 290px;
          height: 100%;
          background-color: #ffffff;
          color: #000000;
          box-shadow: var(--shadow-xl);
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .mobile-drawer-close {
          color: #000000;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex-grow: 1;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display);
          font-weight: 700;
          color: #333333;
          font-size: 16px;
          padding: 8px 0;
        }

        .mobile-nav-active {
          color: #ff5100;
        }

        .mobile-nav-link-admin {
          color: #e04800;
        }

        .mobile-drawer-footer {
          margin-top: auto;
          border-top: 1px solid #eeeeee;
          padding-top: 24px;
        }

        .mobile-auth-profile {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-user-details {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .mobile-username {
          font-weight: 700;
          font-size: 15px;
          color: #000000;
        }

        .mobile-useremail {
          font-size: 12px;
          color: #666666;
        }

        .mobile-auth-guest {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        @media (max-width: 992px) {
          .nav-wrapper-slanted, .header-top-bar {
            display: none;
          }
          
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .logo-wrapper {
            padding-left: 20px;
          }
          .header-container {
            height: 70px;
          }
        }
      `}</style>
    </header>
  );
};

export default Navigation;
