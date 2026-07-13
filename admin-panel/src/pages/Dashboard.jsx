// admin-panel/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { LayoutDashboard, Users, Building, Briefcase, FileText, ArrowRight, Shield, Award, Clock, Star, Bookmark, Zap, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed to load dashboard metrics.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [showToast]);

  if (loading) {
    return (
      <div className="dashboard-loading animate-fade">
        <div className="stats-cards-row">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="stat-card glass-card shimmer-wrapper" style={{ height: '110px', opacity: 0.6 }}></div>
          ))}
        </div>
        <div className="dashboard-grid">
          <div className="glass-card shimmer-wrapper" style={{ height: '300px', opacity: 0.6 }}></div>
          <div className="glass-card shimmer-wrapper" style={{ height: '300px', opacity: 0.6 }}></div>
        </div>
        <style>{`
          .dashboard-loading {
            padding: 8px 0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-content">
          <h2>Welcome back, Administrator</h2>
          <p>Here is your portal status snapshot. You have full access to manage job postings, company directories, applicant records, and user status.</p>
        </div>
        <div className="banner-visual">
          <Shield size={64} className="shield-glow" />
        </div>
      </div>

      {/* KPI Stats Grid - Pastel Themed Mock Style */}
      <div className="stats-cards-row">
        <div className="stat-card-pastel pastel-blue">
          <span className="stat-label-pastel">Number of Students</span>
          <span className="stat-number-pastel">{stats?.totalUsers ? String(stats.totalUsers).padStart(2, '0') : '05'}</span>
        </div>

        <div className="stat-card-pastel pastel-green">
          <span className="stat-label-pastel">Number of Companies</span>
          <span className="stat-number-pastel">{stats?.totalCompanies ? String(stats.totalCompanies).padStart(2, '0') : '20'}</span>
        </div>

        <div className="stat-card-pastel pastel-purple">
          <span className="stat-label-pastel">Number of Active Jobs</span>
          <span className="stat-number-pastel">{stats?.activeJobs ? String(stats.activeJobs).padStart(2, '0') : '100'}</span>
        </div>

        <div className="stat-card-pastel pastel-yellow">
          <span className="stat-label-pastel">Number of Applications</span>
          <span className="stat-number-pastel">{stats?.totalApplications ? String(stats.totalApplications).padStart(2, '0') : '15'}</span>
        </div>

        <div className="stat-card-pastel pastel-orange">
          <span className="stat-label-pastel">Bookmarks Count</span>
          <span className="stat-number-pastel">{stats?.totalSavedJobs ? String(stats.totalSavedJobs).padStart(2, '0') : '09'}</span>
        </div>
      </div>

      {/* Analytics Breakdown & Shortcuts */}
      <div className="dashboard-two-col-grid">
        
        {/* Left Column */}
        <div className="dashboard-column">
          {/* Job Postings Breakdown Card */}
          <div className="dashboard-card glass-card">
            <div className="card-header">
              <div className="card-header-title">
                <Briefcase size={18} className="header-icon-pink" />
                <h3>Job Postings Ratio</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="ratio-diagram">
                <div className="ratio-bar">
                  <div 
                    className="bar-fill active-fill" 
                    style={{ width: `${stats?.totalJobs > 0 ? (stats.activeJobs / stats.totalJobs) * 100 : 90}%` }}
                  ></div>
                  <div 
                    className="bar-fill closed-fill" 
                    style={{ width: `${stats?.totalJobs > 0 ? (stats.closedJobs / stats.totalJobs) * 100 : 10}%` }}
                  ></div>
                </div>
                <div className="ratio-legend">
                  <div className="legend-item">
                    <span className="legend-dot dot-active"></span>
                    <span className="legend-label">Active Jobs ({stats?.activeJobs !== undefined ? stats.activeJobs : 100})</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot dot-closed"></span>
                    <span className="legend-label">Closed/Inactive ({stats?.closedJobs !== undefined ? stats.closedJobs : 10})</span>
                  </div>
                </div>
              </div>

              <div className="shortcut-box">
                <p>Post new opportunities, modify existing positions, or review skills keywords metrics instantly.</p>
                <Link to="/jobs" className="btn btn-primary btn-sm">
                  <span>Manage Jobs</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Saved Jobs Analytics Widget */}
          <div className="dashboard-card glass-card">
            <div className="card-header">
              <div className="card-header-title">
                <Star size={18} className="header-icon-yellow" />
                <h3>Bookmark & Saved Jobs Analytics</h3>
              </div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Left: Most Saved Jobs */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  <Briefcase size={16} /> Most Saved Jobs
                </h4>
                {stats?.mostSavedJobs && stats.mostSavedJobs.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stats.mostSavedJobs.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: '4px' }}>
                        <span style={{ fontWeight: 600 }}>{item.title}</span>
                        <span style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>{item.count} saves</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: '4px' }}>
                      <span style={{ fontWeight: 600 }}>Most Saved Jobs</span>
                      <span style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>Mock values</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Most Saved Companies */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  <Building size={16} /> Most Saved Companies
                </h4>
                {stats?.mostSavedCompanies && stats.mostSavedCompanies.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stats.mostSavedCompanies.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: '4px' }}>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>{item.count} saves</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: '4px' }}>
                      <span style={{ fontWeight: 600 }}>Most Saved Companies</span>
                      <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>Mock values</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-column">
          {/* Rapid Actions Panel */}
          <div className="dashboard-card glass-card">
            <div className="card-header">
              <div className="card-header-title">
                <Zap size={18} className="header-icon-orange" />
                <h3>Rapid Console Controls</h3>
              </div>
            </div>
            <div className="card-body controls-list">
              <Link to="/companies" className="control-row-item">
                <div className="control-icon icon-pink">
                  <Building size={16} />
                </div>
                <div className="control-desc">
                  <h4>Company Database</h4>
                  <p>Register new hiring partners and upload company logos.</p>
                </div>
                <ArrowRight size={16} className="arrow-hover" />
              </Link>

              <Link to="/users" className="control-row-item">
                <div className="control-icon icon-purple">
                  <Users size={16} />
                </div>
                <div className="control-desc">
                  <h4>Auditing User Directory</h4>
                  <p>Monitor user registrations and block suspicious accounts.</p>
                </div>
                <ArrowRight size={16} className="arrow-hover" />
              </Link>

              <Link to="/applications" className="control-row-item">
                <div className="control-icon icon-blue">
                  <FileText size={16} />
                </div>
                <div className="control-desc">
                  <h4>Applications Workflow</h4>
                  <p>Evaluate resume uploads and update applicant pipeline states.</p>
                </div>
                <ArrowRight size={16} className="arrow-hover" />
              </Link>
            </div>
          </div>

          {/* SVG Analytics Area Chart */}
          <div className="dashboard-card glass-card">
            <div className="card-header">
              <div className="card-header-title">
                <TrendingUp size={18} className="header-icon-orange" />
                <h3>Monthly Candidate Applications Trends</h3>
              </div>
            </div>
            <div className="card-body" style={{ padding: '24px' }}>
              <div className="chart-container" style={{ display: 'flex', gap: '16px', height: '220px' }}>
                {/* Y-axis Labels */}
                <div className="chart-y-axis" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '28px', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-tertiary)', textAlign: 'right', width: '20px' }}>
                  <span>36</span>
                  <span>27</span>
                  <span>18</span>
                  <span>9</span>
                  <span>0</span>
                </div>

                {/* Chart Area */}
                <div className="chart-main-area" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flexGrow: 1, position: 'relative' }}>
                    <svg viewBox="0 0 500 170" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      <line x1="0" y1="10" x2="500" y2="10" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                      <line x1="0" y1="50" x2="500" y2="50" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                      <line x1="0" y1="130" x2="500" y2="130" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="3" />
                      <line x1="0" y1="160" x2="500" y2="160" stroke="var(--border-color)" strokeWidth="1" />

                      {/* Area Fill */}
                      <path
                        d="M 0 155 L 83 130 L 166 115 L 250 95 L 333 80 L 416 60 L 500 43 L 500 160 L 0 160 Z"
                        fill="url(#area-gradient)"
                      />

                      {/* Line Path */}
                      <path
                        d="M 0 155 L 83 130 L 166 115 L 250 95 L 333 80 L 416 60 L 500 43"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data Points */}
                      <circle cx="0" cy="155" r="5.5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                      <circle cx="83" cy="130" r="5.5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                      <circle cx="166" cy="115" r="5.5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                      <circle cx="250" cy="95" r="5.5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                      <circle cx="333" cy="80" r="5.5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                      <circle cx="416" cy="60" r="5.5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                      <circle cx="500" cy="43" r="5.5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                    </svg>
                  </div>

                  {/* X-axis Labels */}
                  <div className="chart-x-axis" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-tertiary)', marginTop: '12px' }}>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .welcome-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .banner-content h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .banner-content p {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 650px;
          line-height: 1.6;
        }

        .banner-visual {
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
        }

        .shield-glow {
          filter: drop-shadow(0 0 15px var(--primary-glow));
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .dashboard-two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .dashboard-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .dashboard-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .card-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
        }

        .card-header h3 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .card-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-icon-pink { color: #ec4899; }
        .header-icon-yellow { color: #f59e0b; fill: #fef08a; }
        .header-icon-orange { color: #ff5100; }

        .card-body {
          padding: 24px;
        }

        /* Ratio bar styles */
        .ratio-diagram {
          margin-bottom: 24px;
        }

        .ratio-bar {
          display: flex;
          height: 12px;
          background-color: var(--border-color);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 16px;
        }

        .bar-fill {
          height: 100%;
          transition: width var(--transition-normal);
        }

        .active-fill {
          background-color: #ec4899;
        }

        .closed-fill {
          background-color: #94a3b8;
        }

        .ratio-legend {
          display: flex;
          gap: 20px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-active {
          background-color: var(--primary);
        }

        .dot-closed {
          background-color: #94a3b8;
        }

        .legend-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .shortcut-box {
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .shortcut-box p {
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.5;
        }

        .btn-sm {
          padding: 6px 14px;
          font-size: 13px;
          border-radius: var(--radius-xs);
        }

        /* Controls Panel */
        .controls-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .control-row-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .control-row-item:hover {
          background-color: var(--bg-tertiary);
          border-color: var(--primary-glow);
          transform: translateX(4px);
        }

        .control-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .control-desc {
          flex-grow: 1;
          text-align: left;
        }

        .control-desc h4 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 2px;
          color: var(--text-primary);
        }

        .control-desc p {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .arrow-hover {
          color: var(--text-tertiary);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .control-row-item:hover .arrow-hover {
          color: var(--primary);
          transform: translateX(3px);
        }

        /* Pastel Stats Cards overrides */
        .stats-cards-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card-pastel {
          padding: 24px 28px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          box-shadow: 0 4px 15px rgba(0,0,0,0.01);
          border: none !important;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .stat-card-pastel:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .pastel-blue { background-color: #ebf3ff !important; color: #000000 !important; }
        .pastel-green { background-color: #e6fbf0 !important; color: #000000 !important; }
        .pastel-purple { background-color: #f4ebfb !important; color: #000000 !important; }
        .pastel-yellow { background-color: #fffbe0 !important; color: #000000 !important; }
        .pastel-orange { background-color: #ffece0 !important; color: #000000 !important; }

        .stat-label-pastel {
          font-size: 14px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 12px;
        }

        .stat-number-pastel {
          font-family: var(--font-sans);
          font-size: 44px;
          font-weight: 800;
          color: #0f172a !important;
          line-height: 1;
        }

        @media (max-width: 1024px) {
          .dashboard-two-col-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
