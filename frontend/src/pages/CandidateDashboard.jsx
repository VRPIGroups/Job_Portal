// frontend/src/pages/CandidateDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useJobs } from '../context/JobsContext';
import { DashboardTableSkeleton } from '../components/Skeletons';
import { User, Phone, Mail, Upload, FileText, Download, Briefcase, ChevronRight, Star, Settings, Bell, Clock, Calendar, ExternalLink, CalendarCheck } from 'lucide-react';

const CandidateDashboard = () => {
  const { user, updateProfileState } = useAuth();
  const { showToast } = useToast();
  const { fetchSavedJobIds } = useJobs();

  // Tabs state: 'profile' | 'applications' | 'saved_jobs' | 'notifications'
  const [activeTab, setActiveTab] = useState('applications');

  // Applications States
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ATS Expand Tracker States
  const [expandedAppId, setExpandedAppId] = useState(null);
  const [appDetails, setAppDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Profile Edit States
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  // Resume Document States
  const [resume, setResume] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [resumeUploading, setResumeUploading] = useState(false);

  // Notifications States
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  // Saved Jobs States
  const [savedJobs, setSavedJobs] = useState([]);
  const [savedJobsLoading, setSavedJobsLoading] = useState(false);
  const [savedSearch, setSavedSearch] = useState('');
  const [savedJobType, setSavedJobType] = useState('');
  const [savedLocation, setSavedLocation] = useState('');
  const [savedSort, setSavedSort] = useState('latest');
  const [savedPagination, setSavedPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1
  });

  // Prefill details from user auth context
  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Load candidate's applications list
  const loadApplications = async () => {
    try {
      const res = await api.get('/applications');
      if (res.data.success) {
        setApplications(res.data.data);
      }
    } catch (err) {
      showToast('Error loading application records.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleAppDetails = async (appId) => {
    if (expandedAppId === appId) {
      setExpandedAppId(null);
      return;
    }

    if (appDetails[appId]) {
      setExpandedAppId(appId);
      return;
    }

    setDetailsLoading(true);
    try {
      const res = await api.get(`/applications/${appId}`);
      if (res.data.success) {
        setAppDetails(prev => ({
          ...prev,
          [appId]: res.data.data
        }));
        setExpandedAppId(appId);
      }
    } catch (err) {
      showToast('Error loading tracking details.', 'error');
    } finally {
      setDetailsLoading(false);
    }
  };

  // Fetch Resume Details
  const fetchResume = async () => {
    try {
      const res = await api.get('/profile/resume');
      if (res.data.success) {
        setResume(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load profile resume:', err);
    } finally {
      setResumeLoading(false);
    }
  };

  // Fetch Notifications
  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const res = await api.get('/profile/notifications');
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load notifications history.', 'error');
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
    fetchResume();
    fetchNotifications();
  }, []);

  // Fetch notifications whenever switching tab
  useEffect(() => {
    if (activeTab === 'notifications') {
      fetchNotifications();
    }
  }, [activeTab]);

  // Load Saved Jobs
  const loadSavedJobs = async (pageNo = 1) => {
    setSavedJobsLoading(true);
    try {
      const params = {
        page: pageNo,
        limit: savedPagination.limit,
        sort: savedSort
      };
      if (savedSearch) params.search = savedSearch;
      if (savedJobType) params.job_type = savedJobType;
      if (savedLocation) params.location = savedLocation;

      const res = await api.get('/saved-jobs', { params });
      if (res.data.success) {
        setSavedJobs(res.data.data);
        setSavedPagination({
          total: res.data.pagination.total,
          page: res.data.pagination.page,
          limit: res.data.pagination.limit,
          totalPages: res.data.pagination.totalPages
        });
      }
    } catch (err) {
      showToast('Error loading saved jobs.', 'error');
    } finally {
      setSavedJobsLoading(false);
    }
  };

  // Sync saved jobs data whenever active tab or filters change
  useEffect(() => {
    if (activeTab === 'saved_jobs') {
      loadSavedJobs(1);
    }
  }, [activeTab, savedSearch, savedJobType, savedLocation, savedSort]);

  const handleSavedPageChange = (pageNo) => {
    if (pageNo < 1 || pageNo > savedPagination.totalPages) return;
    loadSavedJobs(pageNo);
  };

  const handleRemoveSaved = async (jobId) => {
    try {
      const res = await api.delete(`/saved-jobs/${jobId}`);
      if (res.data.success) {
        showToast('Job removed from saved list.', 'success');
        setSavedJobs(prev => prev.filter(item => item.id !== jobId));
        setSavedPagination(prev => {
          const newTotal = Math.max(0, prev.total - 1);
          return {
            ...prev,
            total: newTotal,
            totalPages: Math.ceil(newTotal / prev.limit)
          };
        });
        fetchSavedJobIds();
      }
    } catch (err) {
      showToast('Failed to remove saved job.', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      const res = await api.put('/admin/profile', {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone
      });

      if (res.data.success) {
        updateProfileState(res.data.user);
        showToast('Profile details updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error saving profile.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const allowed = ['jpg', 'jpeg', 'png', 'webp'];
    if (!allowed.includes(ext)) {
      showToast('Invalid format. Avatar must be a JPG, PNG, or WEBP image.', 'error');
      return;
    }

    if (file.size > 2097152) {
      showToast('File size is too large. Max limit is 2MB.', 'error');
      return;
    }

    setAvatarLoading(true);
    const data = new FormData();
    data.append('profile_image', file);

    try {
      const res = await api.put('/admin/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        updateProfileState(res.data.user);
        showToast('Profile photo updated successfully!', 'success');
      }
    } catch (err) {
      showToast('Error uploading avatar.', 'error');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const allowed = ['pdf', 'doc', 'docx'];
    if (!allowed.includes(ext)) {
      showToast('Invalid format. Resume must be a PDF, DOC, or DOCX document.', 'error');
      return;
    }

    if (file.size > 5242880) { // 5MB limit
      showToast('File size too large. Max limit is 5MB.', 'error');
      return;
    }

    setResumeUploading(true);
    const data = new FormData();
    data.append('resume', file);

    try {
      const res = await api.post('/profile/resume', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setResume(res.data.data);
        showToast('Resume uploaded and saved to profile successfully!', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to upload resume document.', 'error');
    } finally {
      setResumeUploading(false);
    }
  };

  const handleResumeDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile resume?')) return;
    try {
      const res = await api.delete('/profile/resume');
      if (res.data.success) {
        setResume(null);
        showToast('Resume deleted successfully from profile.', 'success');
      }
    } catch (err) {
      showToast('Failed to delete resume.', 'error');
    }
  };

  const handleMarkNotificationRead = async (notificationId) => {
    try {
      const res = await api.patch(`/profile/notifications/${notificationId}/read`);
      if (res.data.success) {
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
        );
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const getAvatarUrl = () => {
    if (user && user.profile_image) {
      return `http://localhost:5000/uploads/images/${user.profile_image}`;
    }
    return `https://ui-avatars.com/api/?name=${user?.first_name || 'U'}+${user?.last_name || 'P'}&background=3b82f6&color=fff&size=150&bold=true`;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Applied': return 'status-applied';
      case 'Under Review': return 'status-review';
      case 'Shortlisted': return 'status-shortlisted';
      case 'Interview Scheduled': return 'status-interview';
      case 'Selected': return 'status-selected';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const formatSalary = (min, max) => {
    const format = (num) => new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(num);
    return `₹${format(min)} - ₹${format(max)}`;
  };

  const unreadNotifications = notifications.filter(n => !n.is_read).length;

  return (
    <main className="dashboard-page animate-fade">
      <div className="container dashboard-container">
        
        {/* DASHBOARD HEADER */}
        <section className="dashboard-intro-card glass-card reveal-on-scroll">
          <div className="avatar-uploader-section">
            <img src={getAvatarUrl()} alt="User Avatar" className="dashboard-large-avatar" />
            <input
              type="file"
              id="avatar"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="avatar" className="avatar-upload-btn-label">
              {avatarLoading ? <span className="spinner" style={{ width: '12px', height: '12px', borderWidth: '2px' }} /> : <Upload size={12} />}
              <span>Change Photo</span>
            </label>
          </div>
          
          <div className="dashboard-intro-titles">
            <span className="user-dashboard-role">Job Seeker Account</span>
            <h1 className="user-dashboard-name">{user?.first_name} {user?.last_name}</h1>
            <p className="user-dashboard-email">{user?.email}</p>
          </div>
        </section>

        {/* DOUBLE COLUMN LAYOUT WITH MENU SIDEBAR */}
        <div className="dashboard-double-grid">
          
          {/* COLUMN 1: SIDEBAR TAB LINKS */}
          <aside className="dashboard-sidebar-column">
            <div className="glass-card dashboard-menu-card reveal-on-scroll">
              <h2 className="sidebar-column-title">
                <Settings size={18} />
                <span>Dashboard Menu</span>
              </h2>
              <div className="dashboard-menu-links">
                <button 
                  className={`menu-tab-btn ${activeTab === 'applications' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  <Briefcase size={16} />
                  <span>Applications ({applications.length})</span>
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'saved_jobs' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('saved_jobs')}
                >
                  <Star size={16} />
                  <span>Saved Jobs ({savedPagination.total})</span>
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'notifications' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={16} />
                  <span>Notifications ({unreadNotifications})</span>
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'profile' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={16} />
                  <span>Profile & Resume</span>
                </button>
              </div>
            </div>
          </aside>

          {/* COLUMN 2: ACTIVE TAB VIEW */}
          <section className="dashboard-main-content">
            
            {/* SUB-VIEW 1: APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              loading ? (
                <DashboardTableSkeleton />
              ) : (
                <div className="glass-card applications-card reveal-on-scroll">
                  <div className="card-header">
                    <h2 className="main-column-title">
                      <Briefcase size={20} />
                      <span>Your Submitted Applications</span>
                    </h2>
                    <span className="applications-count-badge">{applications.length} Applied</span>
                  </div>

                  {applications.length > 0 ? (
                    <div className="applications-table-list">
                      {applications.map((app) => (
                        <article key={app.id} className="app-row-card">
                          <div className="app-row-header">
                            <img
                              src={app.company_logo ? `http://localhost:5000/uploads/images/${app.company_logo}` : 'https://ui-avatars.com/api/?name=Company&background=f1f5f9&color=64748b&bold=true'}
                              alt={`${app.company_name} Logo`}
                              className="app-company-logo"
                            />
                            <div className="app-row-titles">
                              <h3 className="app-job-title">{app.job_title}</h3>
                              <span className="app-company-details">{app.company_name} • {app.job_location}</span>
                            </div>
                            <div className="app-row-badge-wrap">
                              <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                                {app.status}
                              </span>
                            </div>
                          </div>

                          <div className="app-row-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px 0', borderBottom: '1px dashed var(--border-color)' }}>
                            <div className="status-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                              <div className="status-indicator-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)' }}>
                                <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}>Skills Match Check</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: app.has_required_skills ? 'var(--success)' : 'var(--warning)' }}>
                                  <span className="status-bullet-icon" style={{ display: 'inline-flex' }}>{app.has_required_skills ? '✓' : '⚠'}</span>
                                  <span>{app.has_required_skills ? 'Required Skills Matched' : 'Required Skills Missing'}</span>
                                </div>
                              </div>

                              <div className="status-indicator-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)' }}>
                                <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}>Interview Shortlist</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: ['Shortlisted', 'Interview Scheduled', 'Selected', 'Interview'].includes(app.status) ? 'var(--success)' : (app.status === 'Rejected' ? 'var(--danger)' : 'var(--text-secondary)') }}>
                                  <span className="status-bullet-icon" style={{ display: 'inline-flex' }}>{['Shortlisted', 'Interview Scheduled', 'Selected', 'Interview'].includes(app.status) ? '✓' : (app.status === 'Rejected' ? '✗' : '○')}</span>
                                  <span>{['Shortlisted', 'Interview Scheduled', 'Selected', 'Interview'].includes(app.status) ? 'Shortlisted for Interview' : (app.status === 'Rejected' ? 'Not Shortlisted (Rejected)' : 'Not Shortlisted Yet')}</span>
                                </div>
                              </div>

                              <div className="status-indicator-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)' }}>
                                <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}>Job Selection Status</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: app.status === 'Selected' ? 'var(--success)' : (app.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)') }}>
                                  <span className="status-bullet-icon" style={{ display: 'inline-flex' }}>{app.status === 'Selected' ? '🎉' : (app.status === 'Rejected' ? '❌' : '⏳')}</span>
                                  <span>{app.status === 'Selected' ? 'Selected for the Job' : (app.status === 'Rejected' ? 'Not Selected / Rejected' : 'Decision Pending')}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="app-row-footer">
                            <span className="app-date-label">
                              Applied: <strong>{new Date(app.created_at).toLocaleDateString()}</strong>
                            </span>
                            
                             <div className="app-action-links" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <button
                                onClick={() => toggleAppDetails(app.id)}
                                className="btn-text-action"
                                style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 'bold', color: 'var(--primary)', border: 'none', background: 'none', padding: 0 }}
                              >
                                <span>{expandedAppId === app.id ? 'Hide ATS Tracker' : 'Track Application'}</span>
                                <ChevronRight size={14} style={{ transform: expandedAppId === app.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                              </button>
                              <a
                                href={`http://localhost:5000/uploads/resumes/${app.resume}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-text-action link-download"
                                title="Download PDF Resume"
                              >
                                <Download size={14} />
                                <span>Resume</span>
                              </a>
                              <Link to={`/jobs/${app.job_id}`} className="btn-text-action link-view-job">
                                <span>View Job</span>
                                <ChevronRight size={14} />
                              </Link>
                            </div>
                          </div>

                          {/* ATS TRACKER EXPAND SECTION */}
                          {expandedAppId === app.id && (
                            <div className="ats-tracker-panel" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', animation: 'slideDown 0.3s ease', textAlign: 'left' }}>
                              {detailsLoading && !appDetails[app.id] ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                                  <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                                </div>
                              ) : appDetails[app.id] ? (
                                (() => {
                                  const details = appDetails[app.id];
                                  return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 10px' }}>
                                      


                                      {/* 1. Timeline section */}
                                      <div className="ats-tracker-section">
                                        <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                                          <Clock size={14} />
                                          <span>Application Timeline</span>
                                        </h4>
                                        
                                        <div className="timeline-trail" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--border-color)', marginLeft: '10px' }}>
                                          {details.timeline && details.timeline.length > 0 ? (
                                            details.timeline.map((event, idx) => (
                                              <div key={event.id} className="timeline-node" style={{ position: 'relative' }}>
                                                <span className="timeline-dot" style={{
                                                  position: 'absolute',
                                                  left: '-26px',
                                                  top: '4px',
                                                  width: '10px',
                                                  height: '10px',
                                                  borderRadius: '50%',
                                                  background: idx === details.timeline.length - 1 ? 'var(--primary)' : 'var(--text-tertiary)',
                                                  boxShadow: idx === details.timeline.length - 1 ? '0 0 8px var(--primary)' : 'none',
                                                  zIndex: 2
                                                }} />
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                                                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{event.status}</span>
                                                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{new Date(event.created_at).toLocaleString()}</span>
                                                </div>

                                              </div>
                                            ))
                                          ) : (
                                            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>No status history logged.</p>
                                          )}
                                        </div>
                                      </div>
                                      {/* Step-by-step interview rounds timeline */}
                                      <div className="ats-tracker-section" style={{ background: 'var(--bg-tertiary)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                                        <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                                          <CalendarCheck size={14} />
                                          <span>Interview Progression Stages</span>
                                        </h4>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                                          {['Technical Round', 'Managerial Round', 'HR Round', 'Final Round'].map((roundName) => {
                                            const dbRound = details.rounds?.find(r => r.round_name === roundName);
                                            const roundIntr = details.interviews?.find(i => i.interview_round === roundName);

                                            let stepStatus = 'Pending';
                                            if (dbRound) {
                                              stepStatus = dbRound.status;
                                            } else if (roundIntr) {
                                              stepStatus = roundIntr.status;
                                            }

                                            let icon = '⏳';
                                            let statusColor = 'var(--text-tertiary)';
                                            let badgeBg = 'var(--bg-primary)';
                                            let borderStyle = '1px dashed var(--border-color)';

                                            if (stepStatus === 'Passed') {
                                              icon = '✅';
                                              statusColor = 'var(--success)';
                                              badgeBg = 'var(--success-glow)';
                                              borderStyle = '1px solid var(--success)';
                                            } else if (stepStatus === 'Failed') {
                                              icon = '❌';
                                              statusColor = 'var(--danger)';
                                              badgeBg = 'var(--danger-glow)';
                                              borderStyle = '1px solid var(--danger)';
                                            } else if (['Scheduled', 'Rescheduled'].includes(stepStatus)) {
                                              icon = '📅';
                                              statusColor = 'var(--primary)';
                                              badgeBg = 'var(--primary-glow)';
                                              borderStyle = '1px solid var(--primary)';
                                            } else if (stepStatus === 'Hold') {
                                              icon = '⚠️';
                                              statusColor = '#f59e0b';
                                              badgeBg = 'rgba(245,158,11,0.1)';
                                              borderStyle = '1px solid #f59e0b';
                                            } else if (stepStatus === 'Cancelled') {
                                              icon = '🚫';
                                              statusColor = 'var(--text-tertiary)';
                                              badgeBg = 'var(--bg-primary)';
                                              borderStyle = '1px solid var(--border-color)';
                                            }

                                            if (roundName === 'Final Round' && !dbRound && !roundIntr) {
                                              return null;
                                            }

                                            return (
                                              <div 
                                                key={roundName} 
                                                style={{ 
                                                  display: 'flex', 
                                                  flexDirection: 'column', 
                                                  alignItems: 'center', 
                                                  textAlign: 'center',
                                                  padding: '12px', 
                                                  borderRadius: '6px', 
                                                  backgroundColor: badgeBg,
                                                  border: borderStyle,
                                                  transition: 'all 0.3s ease'
                                                }}
                                              >
                                                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{icon}</div>
                                                <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{roundName}</div>
                                                <div style={{ fontSize: '11px', color: statusColor, fontWeight: 700, marginTop: '4px', textTransform: 'uppercase' }}>
                                                  {stepStatus}
                                                </div>
                                                
                                                {['Scheduled', 'Rescheduled'].includes(stepStatus) && roundIntr && (
                                                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                                                    <Link 
                                                      to={`/interviews/${roundIntr.id}`} 
                                                      className="btn btn-primary btn-sm"
                                                      style={{ fontSize: '10px', padding: '4px 8px', textDecoration: 'none', display: 'block', textAlign: 'center' }}
                                                    >
                                                      View Details
                                                    </Link>
                                                    {roundIntr.attendance_status === 'Pending' && (
                                                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                                                        <button 
                                                          onClick={async () => {
                                                            try {
                                                              await api.post(`/interviews/${roundIntr.id}/attendance`, { attendance_status: 'Confirmed' });
                                                              showToast('Attendance confirmed!', 'success');
                                                              const updated = await api.get(`/applications/${details.id}`);
                                                              setAppDetails(prev => ({ ...prev, [details.id]: updated.data.data }));
                                                            } catch {
                                                              showToast('Failed to confirm attendance.', 'error');
                                                            }
                                                          }}
                                                          className="btn btn-success btn-sm" 
                                                          style={{ fontSize: '9px', padding: '2px 4px', height: 'auto', minWidth: '0', display: 'inline-flex', alignItems: 'center' }}
                                                        >
                                                          Confirm
                                                        </button>
                                                        <button 
                                                          onClick={async () => {
                                                            try {
                                                              await api.post(`/interviews/${roundIntr.id}/attendance`, { attendance_status: 'Reschedule Requested' });
                                                              showToast('Reschedule requested!', 'success');
                                                              const updated = await api.get(`/applications/${details.id}`);
                                                              setAppDetails(prev => ({ ...prev, [details.id]: updated.data.data }));
                                                            } catch {
                                                              showToast('Failed to request reschedule.', 'error');
                                                            }
                                                          }}
                                                          className="btn btn-secondary btn-sm" 
                                                          style={{ fontSize: '9px', padding: '2px 4px', height: 'auto', minWidth: '0', display: 'inline-flex', alignItems: 'center' }}
                                                        >
                                                          Reschedule
                                                        </button>
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      {/* 2. Interviews details */}
                                      {details.interviews && details.interviews.filter(i => i.status === 'Scheduled').length > 0 && (
                                        <div className="ats-tracker-section" style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                                            <Calendar size={14} />
                                            <span>Scheduled Interview Details</span>
                                          </h4>
                                          
                                          {details.interviews.filter(i => i.status === 'Scheduled').map((interview) => (
                                            <div key={interview.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                                                <div>
                                                  <strong>Round:</strong> <span style={{ color: 'var(--text-secondary)' }}>{interview.interview_round}</span>
                                                </div>
                                                <div>
                                                  <strong>Date & Time:</strong> <span style={{ color: 'var(--text-secondary)' }}>{interview.interview_date} at {interview.interview_time}</span>
                                                </div>
                                                <div>
                                                  <strong>Mode:</strong> <span style={{ color: 'var(--text-secondary)' }}>{interview.interview_type}</span>
                                                </div>
                                                <div>
                                                  <strong>Interviewer:</strong> <span style={{ color: 'var(--text-secondary)' }}>{interview.interviewer_name}</span>
                                                </div>
                                              </div>

                                              {interview.interview_type === 'Online' && interview.meeting_link && (
                                                <div style={{ marginTop: '4px' }}>
                                                  <strong>Meeting Link:</strong>{' '}
                                                  <a href={interview.meeting_link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}>
                                                    <span>Join Google Meet</span>
                                                    <ExternalLink size={12} />
                                                  </a>
                                                </div>
                                              )}

                                              {interview.interview_type === 'Offline' && interview.venue && (
                                                <div style={{ marginTop: '4px' }}>
                                                  <strong>Venue:</strong> <span style={{ color: 'var(--text-secondary)' }}>{interview.venue}</span>
                                                </div>
                                              )}

                                              {interview.additional_instructions && (
                                                <div style={{ marginTop: '4px', fontSize: '13px', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: '4px', borderLeft: '3px solid var(--primary)' }}>
                                                  <strong>Instructions:</strong> {interview.additional_instructions}
                                                </div>
                                              )}

                                              <div style={{ marginTop: '8px' }}>
                                                <Link 
                                                  to={`/interviews/${interview.id}`} 
                                                  className="btn btn-primary btn-sm" 
                                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 800, textDecoration: 'none', padding: '6px 12px', fontSize: '12px' }}
                                                >
                                                  <Calendar size={14} />
                                                  <span>View Complete Interview Details Page</span>
                                                  <ExternalLink size={12} />
                                                </Link>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* 3. Email log history */}
                                      <div className="ats-tracker-section">
                                        <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                                          <Mail size={14} />
                                          <span>Email Logs (Notification History)</span>
                                        </h4>
                                        {details.emails && details.emails.length > 0 ? (
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                                            {details.emails.map((email) => (
                                              <div key={email.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '13px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                  <strong style={{ color: 'var(--text-primary)' }}>{email.subject}</strong>
                                                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Sent on {new Date(email.created_at).toLocaleString()}</span>
                                                </div>
                                                <span style={{
                                                  fontSize: '11px',
                                                  padding: '2px 8px',
                                                  borderRadius: '10px',
                                                  fontWeight: 700,
                                                  backgroundColor: email.status === 'Sent' ? '#c6f6d5' : '#fed7d7',
                                                  color: email.status === 'Sent' ? '#22543d' : '#742a2a'
                                                }}>
                                                  {email.status}
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>No email notification history recorded.</p>
                                        )}
                                      </div>

                                    </div>
                                  );
                                })()
                              ) : (
                                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', padding: '0 10px' }}>Tracking details not found.</p>
                              )}
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-dashboard-applications">
                      <FileText size={48} className="empty-icon animate-pulse" />
                      <h3>No Active Applications</h3>
                      <p>You haven't applied to any job postings yet. Head to the listings catalog to explore active career paths.</p>
                      <Link to="/jobs" className="btn btn-primary">Find Jobs Now</Link>
                    </div>
                  )}
                </div>
              )
            )}

            {/* SUB-VIEW 2: PROFILE TAB */}
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div className="glass-card profile-editor-card reveal-on-scroll">
                  <h2 className="sidebar-column-title">
                    <User size={18} />
                    <span>Profile Settings</span>
                  </h2>

                  <form onSubmit={handleProfileSubmit} className="profile-form">
                    <div className="profile-names-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="first_name">First Name</label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          className="form-control"
                          value={profileData.first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="last_name">Last Name</label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          className="form-control"
                          value={profileData.last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Contact Phone</label>
                      <div className="input-row-with-icon">
                        <Phone size={14} className="input-inner-icon" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control input-icon-padded"
                          value={profileData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Linked Email Address</label>
                      <div className="input-row-with-icon" style={{ opacity: 0.7 }}>
                        <Mail size={14} className="input-inner-icon" />
                        <input
                          type="email"
                          className="form-control input-icon-padded"
                          value={user?.email || ''}
                          disabled
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary save-profile-btn" disabled={saveLoading} style={{ width: '100%' }}>
                      {saveLoading ? <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} /> : 'Save Profile Details'}
                    </button>
                  </form>
                </div>

                {/* Profile Resume Management Box */}
                <div className="glass-card profile-editor-card reveal-on-scroll" style={{ padding: '32px' }}>
                  <h2 className="sidebar-column-title">
                    <FileText size={18} />
                    <span>Manage Resume Document</span>
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                    Upload your profile resume document (PDF, DOC, or DOCX formats up to 5MB max size) so that recruiters can review your credentials dynamically.
                  </p>

                  {resumeLoading ? (
                    <div style={{ padding: '20px 0' }}>
                      <span className="spinner" style={{ width: '24px', height: '24px', borderWidth: '2px' }} />
                    </div>
                  ) : resume ? (
                    <div className="uploaded-resume-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText size={28} style={{ color: 'var(--primary)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{resume.filename}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Size: {(resume.size / 1024 / 1024).toFixed(2)} MB • Uploaded: {new Date(resume.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <a 
                          href="http://localhost:5000/api/profile/resume/download" 
                          className="btn btn-secondary btn-sm-saved" 
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                        >
                          <Download size={14} /> Download
                        </a>
                        <button 
                          onClick={handleResumeDelete} 
                          className="btn btn-remove-saved-job" 
                          style={{ padding: '8px 16px', fontSize: '13px' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="resume-uploader-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', gap: '12px' }}>
                      <FileText size={32} style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>No resume document has been uploaded yet.</span>
                      <input
                        type="file"
                        id="resume-profile-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="resume-profile-upload" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        {resumeUploading ? <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '2px', borderColor: '#fff' }} /> : <Upload size={14} />}
                        <span>Upload Resume (PDF/DOC/DOCX)</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: SAVED JOBS TAB */}
            {activeTab === 'saved_jobs' && (
              <div className="glass-card applications-card reveal-on-scroll">
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h2 className="main-column-title">
                    <Star size={20} fill="#ffaa00" stroke="#ffaa00" />
                    <span>Your Bookmarked Positions</span>
                  </h2>
                  <span className="applications-count-badge">{savedPagination.total} Saved</span>
                </div>

                <div className="saved-jobs-filters">
                  <input
                    type="text"
                    placeholder="Search by job title..."
                    className="filter-search-input"
                    value={savedSearch}
                    onChange={(e) => setSavedSearch(e.target.value)}
                  />
                  <select
                    className="filter-select"
                    value={savedJobType}
                    onChange={(e) => setSavedJobType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                  <select
                    className="filter-select"
                    value={savedLocation}
                    onChange={(e) => setSavedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Remote">Remote</option>
                  </select>
                  <select
                    className="filter-select"
                    value={savedSort}
                    onChange={(e) => setSavedSort(e.target.value)}
                  >
                    <option value="latest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                {savedJobsLoading ? (
                  <DashboardTableSkeleton />
                ) : savedJobs.length > 0 ? (
                  <div className="saved-jobs-list-layout">
                    {savedJobs.map((item) => (
                      <article key={item.id} className="saved-job-item-card">
                        <div className="saved-job-top-row">
                          <img
                            src={item.company_logo ? `http://localhost:5000/uploads/images/${item.company_logo}` : 'https://ui-avatars.com/api/?name=Company&background=f1f5f9&color=64748b&bold=true'}
                            alt={`${item.company_name} Logo`}
                            className="saved-company-logo-img"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.company_name)}&background=f1f5f9&color=64748b&bold=true`;
                            }}
                          />
                          <div className="saved-job-info-block">
                            <h3 className="saved-job-title-h3">{item.title}</h3>
                            <span className="saved-company-span">{item.company_name} • {item.location} • {item.job_type}</span>
                          </div>
                        </div>

                        <div className="saved-job-details-row">
                          <div className="saved-details-col">
                            <span className="saved-detail-lbl">Experience:</span>
                            <span className="saved-detail-val">{item.experience}</span>
                          </div>
                          <div className="saved-details-col">
                            <span className="saved-detail-lbl">Compensation:</span>
                            <span className="saved-detail-val">{formatSalary(item.salary_min, item.salary_max)}</span>
                          </div>
                          <div className="saved-details-col">
                            <span className="saved-detail-lbl">Bookmarked on:</span>
                            <span className="saved-detail-val">{new Date(item.saved_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="saved-job-actions-row">
                          <button
                            onClick={() => handleRemoveSaved(item.id)}
                            className="btn btn-secondary btn-remove-saved-job"
                          >
                            Remove
                          </button>
                          <div className="saved-right-buttons">
                            <Link to={`/jobs/${item.id}`} className="btn btn-outlined btn-sm-saved">
                              View Job
                            </Link>
                            <Link to={`/jobs/${item.id}/apply`} className="btn btn-primary btn-sm-saved">
                              Apply Now
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-saved-jobs-state">
                    <Star size={48} className="empty-star-icon animate-pulse" />
                    <h3>You haven't saved any jobs yet.</h3>
                    <p>Search our listings to find positions that match your technical skills and bookmark them for later review.</p>
                    <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
                  </div>
                )}

                {/* Saved Jobs Pagination Bar */}
                {savedPagination.totalPages > 1 && (
                  <div className="saved-pagination-bar-wrapper">
                    <button
                      className="pagination-btn"
                      onClick={() => handleSavedPageChange(savedPagination.page - 1)}
                      disabled={savedPagination.page === 1}
                    >
                      Prev
                    </button>
                    <div className="pagination-pages">
                      {Array.from({ length: savedPagination.totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          className={`page-number-btn ${savedPagination.page === p ? 'active-page-btn' : ''}`}
                          onClick={() => handleSavedPageChange(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <button
                      className="pagination-btn"
                      onClick={() => handleSavedPageChange(savedPagination.page + 1)}
                      disabled={savedPagination.page === savedPagination.totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SUB-VIEW 4: NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="glass-card applications-card reveal-on-scroll">
                <div className="card-header" style={{ marginBottom: '20px' }}>
                  <h2 className="main-column-title">
                    <Bell size={20} />
                    <span>Real-Time Notification Alerts</span>
                  </h2>
                  <span className="applications-count-badge">{unreadNotifications} Unread</span>
                </div>

                {notificationsLoading ? (
                  <div style={{ padding: '40px 0' }}>
                    <span className="spinner" style={{ width: '28px', height: '28px', borderWidth: '2.5px' }} />
                  </div>
                ) : notifications.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => { if (!n.is_read) handleMarkNotificationRead(n.id); }}
                        style={{
                          padding: '16px 20px',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: !n.is_read ? 'var(--primary-glow)' : 'var(--bg-tertiary)',
                          borderLeft: !n.is_read ? '4px solid var(--primary)' : '1px solid var(--border-color)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all var(--transition-fast)',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)' }}>{n.title}</h4>
                          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.message}</p>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{new Date(n.created_at).toLocaleString()}</span>
                        </div>
                        {!n.is_read && (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', flexShrink: 0, marginLeft: '12px' }} />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-dashboard-applications">
                    <Bell size={48} className="empty-icon animate-pulse" />
                    <h3>No Notification Messages</h3>
                    <p>You have no recent alerts. We will keep you updated when recruiters progress your active job applications.</p>
                  </div>
                )}
              </div>
            )}

          </section>

        </div>
      </div>

      <style>{`
        .dashboard-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Intro Banner Card */
        .dashboard-intro-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .dashboard-intro-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .avatar-uploader-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dashboard-large-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--primary);
          padding: 2px;
        }

        .avatar-upload-btn-label {
          position: absolute;
          bottom: -8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .avatar-upload-btn-label:hover {
          color: var(--primary);
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .dashboard-intro-titles {
          text-align: left;
        }

        .user-dashboard-role {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .user-dashboard-name {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .user-dashboard-email {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        /* Double Column Grid */
        .dashboard-double-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          align-items: start;
        }

        /* Sidebar Tabs Menu Styles */
        .dashboard-menu-card {
          padding: 24px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .dashboard-menu-card:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .sidebar-column-title {
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .dashboard-menu-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          width: 100%;
          text-align: left;
          background: none;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .menu-tab-btn:hover {
          background-color: var(--bg-tertiary);
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .tab-btn-active {
          background-color: var(--primary-glow) !important;
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }

        /* Profile Editor specific changes */
        .profile-editor-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .profile-editor-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .profile-names-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
          margin-top: 10px;
        }

        .input-row-with-icon {
          position: relative;
        }

        .input-inner-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .input-icon-padded {
          padding-left: 40px;
        }

        .save-profile-btn {
          height: 44px;
        }

        /* Applications column */
        .applications-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .applications-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .applications-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
        }

        .main-column-title {
          font-size: 20px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
        }

        .applications-count-badge {
          background-color: var(--primary-glow);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
        }

        .applications-table-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .app-row-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 20px;
          background-color: var(--bg-tertiary);
          transition: border-color var(--transition-normal), background-color var(--transition-normal);
          text-align: left;
        }

        .app-row-card:hover {
          border-color: var(--primary-glow);
          background-color: var(--bg-secondary);
        }

        .app-row-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 14px;
          border-bottom: 1px dashed var(--border-color);
        }

        .app-company-logo {
          width: 42px;
          height: 42px;
          object-fit: contain;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
        }

        .app-row-titles {
          flex-grow: 1;
        }

        .app-job-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .app-company-details {
          font-size: 12px;
          color: var(--text-tertiary);
          display: block;
          margin-top: 2px;
        }

        /* Status Badge Colors */
        .status-badge {
          display: inline-flex;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-applied { background-color: var(--primary-glow); color: var(--primary); }
        .status-review { background-color: rgba(245, 158, 11, 0.15); color: var(--warning); }
        .status-shortlisted { background-color: rgba(99, 102, 241, 0.15); color: var(--accent); }
        .status-interview { background-color: rgba(99, 102, 241, 0.25); color: var(--accent); }
        .status-selected { background-color: var(--success-glow); color: var(--success); }
        .status-rejected { background-color: var(--danger-glow); color: var(--danger); }

        .app-row-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          font-size: 13px;
        }

        .app-date-label {
          color: var(--text-tertiary);
        }

        .app-date-label strong {
          color: var(--text-secondary);
        }

        .app-action-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-text-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 13px;
        }

        .link-download {
          color: var(--primary);
        }

        .link-download:hover {
          text-decoration: underline;
        }

        .link-view-job {
          color: var(--text-secondary);
        }

        .link-view-job:hover {
          color: var(--primary);
        }

        .empty-dashboard-applications {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
          gap: 16px;
        }

        .empty-dashboard-applications h3 {
          font-size: 20px;
          color: var(--text-primary);
        }

        .empty-dashboard-applications p {
          max-width: 420px;
          font-size: 14px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        /* SAVED JOBS STYLING */
        .saved-jobs-filters {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .filter-search-input {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 14px;
        }

        .filter-select {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 14px;
          cursor: pointer;
        }

        .saved-jobs-list-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .saved-job-item-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 20px;
          background-color: var(--bg-tertiary);
          transition: border-color var(--transition-normal), background-color var(--transition-normal);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .saved-job-item-card:hover {
          border-color: var(--primary-glow);
          background-color: var(--bg-secondary);
        }

        .saved-job-top-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 12px;
          border-bottom: 1px dashed var(--border-color);
        }

        .saved-company-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          padding: 2px;
        }

        .saved-job-info-block {
          flex-grow: 1;
        }

        .saved-job-title-h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .saved-company-span {
          font-size: 12px;
          color: var(--text-tertiary);
          display: block;
          margin-top: 2px;
        }

        .saved-job-details-row {
          display: grid;
          grid-template-columns: 1.2fr 1.5fr 1.3fr;
          gap: 16px;
          font-size: 13px;
        }

        .saved-details-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .saved-detail-lbl {
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .saved-detail-val {
          color: var(--text-secondary);
          font-weight: 700;
        }

        .saved-job-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 14px;
        }

        .btn-remove-saved-job {
          border-color: var(--danger) !important;
          color: var(--danger) !important;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
        }

        .btn-remove-saved-job:hover {
          background-color: var(--danger-glow) !important;
        }

        .saved-right-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-sm-saved {
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 700;
        }

        .empty-saved-jobs-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
          gap: 16px;
        }

        .empty-star-icon {
          color: var(--text-tertiary);
        }

        .empty-saved-jobs-state h3 {
          font-size: 20px;
          color: var(--text-primary);
        }

        .empty-saved-jobs-state p {
          max-width: 420px;
          font-size: 14px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        /* Saved Jobs Pagination */
        .saved-pagination-bar-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0 0 0;
          margin-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .pagination-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 14px;
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .pagination-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-glow);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-pages {
          display: flex;
          gap: 6px;
        }

        .page-number-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 14px;
          transition: all var(--transition-fast);
          cursor: pointer;
          background: none;
        }

        .page-number-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .active-page-btn {
          background-color: var(--primary) !important;
          color: #ffffff !important;
          border-color: var(--primary) !important;
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 992px) {
          .dashboard-double-grid {
            grid-template-columns: 1fr;
          }
          
          .saved-jobs-filters {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .dashboard-intro-card {
            flex-direction: column;
            text-align: center;
            padding: 24px 16px;
          }
          
          .dashboard-intro-titles {
            text-align: center;
          }
          
          .profile-names-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .app-row-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .app-row-badge-wrap {
            margin-top: 4px;
          }
          
          .app-row-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .app-action-links {
            width: 100%;
            justify-content: space-between;
          }

          .saved-job-top-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .saved-job-details-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .saved-job-actions-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .saved-right-buttons {
            width: 100%;
            justify-content: space-between;
          }

          .btn-remove-saved-job {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
};

export default CandidateDashboard;
