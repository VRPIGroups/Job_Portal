// admin-panel/src/pages/ApplicationManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Search, FileText, CheckCircle, Clock, XCircle, AlertCircle, ExternalLink, Download, RefreshCw, X } from 'lucide-react';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Interview Scheduled Modal States
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [schedulingAppId, setSchedulingAppId] = useState(null);
  const [interviewFormData, setInterviewFormData] = useState({
    interviewDate: '',
    interviewTime: '',
    interviewMode: 'Online',
    meetingLink: '',
    venue: '',
    interviewerName: '',
    interviewerEmail: '',
    instructions: '',
    interviewRound: 'Technical Round',
    roundNumber: '1',
    interviewerDesignation: '',
    department: '',
    duration: '60 minutes',
    timezone: 'IST (UTC+5:30)'
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset current page on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const fetchApplications = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/applications', {
        params: {
          search: search || undefined,
          status: status !== 'all' ? status : undefined
        }
      });
      if (response.data.success) {
        setApplications(response.data.data);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to retrieve applications.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications();
    }, 450); // debounce search
    return () => clearTimeout(timer);
  }, [search, status]);

  const handleUpdateStatus = async (appId, newStatus, interviewDetails = null) => {
    try {
      const payload = { status: newStatus, ...interviewDetails };
      const response = await api.put(`/applications/${appId}/status`, payload);
      if (response.data.success) {
        showToast(`Application status set to ${newStatus}.`, 'success');
        const updatedAppData = response.data.data;
        setApplications(applications.map(app => app.id === appId ? { ...app, ...updatedAppData } : app));
        setShowInterviewModal(false);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update application pipeline state.', 'error');
    }
  };

  const triggerUpdateStatus = (appId, newStatus) => {
    const interviewRoundsList = ['Interview Scheduled', 'Technical Round', 'Managerial Round', 'HR Round', 'Final Round'];
    if (interviewRoundsList.includes(newStatus)) {
      setSchedulingAppId(appId);
      const existingApp = applications.find(a => a.id === appId);
      
      let defaultRound = 'Technical Round';
      if (newStatus !== 'Interview Scheduled') {
        defaultRound = newStatus;
      }

      setInterviewFormData({
        interviewDate: existingApp?.interview_date || '',
        interviewTime: existingApp?.interview_time || '',
        interviewMode: existingApp?.interview_mode || 'Online',
        meetingLink: existingApp?.meeting_link || '',
        venue: existingApp?.venue || '',
        interviewerName: existingApp?.interviewer_name || '',
        interviewerEmail: existingApp?.interviewer_email || '',
        instructions: existingApp?.instructions || '',
        interviewRound: defaultRound,
        roundNumber: '1',
        interviewerDesignation: '',
        department: '',
        duration: '60 minutes',
        timezone: 'IST (UTC+5:30)'
      });
      setShowInterviewModal(true);
    } else {
      handleUpdateStatus(appId, newStatus);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchApplications(true);
  };

  const getStatusIcon = (s) => {
    switch (s) {
      case 'Applied': return <Clock size={14} style={{ color: 'var(--warning)' }} />;
      case 'Under Review': return <AlertCircle size={14} style={{ color: 'var(--primary)' }} />;
      case 'Shortlisted': return <CheckCircle size={14} style={{ color: 'var(--success)' }} />;
      case 'Interview Scheduled': return <Clock size={14} style={{ color: 'var(--accent)' }} />;
      case 'Selected': return <CheckCircle size={14} style={{ color: 'var(--success)' }} />;
      case 'Rejected': return <XCircle size={14} style={{ color: 'var(--danger)' }} />;
      default: return null;
    }
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Title Header */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            <FileText size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Application Auditing Dashboard</h2>
            <p>Review candidate profiles, evaluate resumes, filter applicants, and update hiring pipeline status settings.</p>
          </div>
        </div>
        <button 
          className="btn btn-secondary btn-refresh" 
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin-animation' : ''} />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {applications.length} records
        </div>

        <div className="controls-right">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <span className="status-filter-label">STATUS FILTER:</span>
            <select 
              id="app-status-select" 
              className="filter-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All States</option>
              <option value="Applied">Applied</option>
              <option value="Resume Screening">Resume Screening</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Technical Round">Technical Round</option>
              <option value="Technical Round Result">Technical Round Result</option>
              <option value="Managerial Round">Managerial Round</option>
              <option value="Managerial Round Result">Managerial Round Result</option>
              <option value="HR Round">HR Round</option>
              <option value="HR Round Result">HR Round Result</option>
              <option value="Final Round">Final Round</option>
              <option value="Final Round Result">Final Round Result</option>
              <option value="Interview Completed">Interview Completed</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer Sent">Offer Sent</option>
              <option value="Offer Letter Sent">Offer Letter Sent</option>
              <option value="Offer Accepted">Offer Accepted</option>
              <option value="Hired">Hired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Database Table */}
      {loading ? (
        <div className="directory-skeleton">
          <div className="table-responsive-wrapper">
            <div className="skeleton-header shimmer-wrapper"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-row shimmer-wrapper"></div>
            ))}
          </div>
        </div>
      ) : applications.length === 0 ? (
        <div className="empty-state glass-card">
          <FileText size={48} className="warning-icon" />
          <h3>No Applications Received</h3>
          <p>No job application submissions matched your search filters at this time.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Target Career Job Role</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Document Resume</th>
                <th>Current Status</th>
                <th>Hiring Pipeline Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="applicant-cell">
                      <span className="applicant-fullname">{app.first_name} {app.last_name}</span>
                      <span className="applicant-details-sub">{app.email}</span>
                      <span className="applicant-details-sub">{app.phone || '—'}</span>
                    </div>
                  </td>
                  <td>
                    <span className="job-target-title">{app.job_title}</span>
                  </td>
                  <td>
                    <span className="company-text-td">{app.company_name}</span>
                  </td>
                  <td>
                    <span className="date-td">
                      {new Date(app.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    {app.resume ? (
                      <a 
                        href={`http://localhost:5000/uploads/resumes/${app.resume}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-resume-link"
                      >
                        <FileText size={14} />
                        <span>View Resume</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-muted" style={{ fontSize: '12px' }}>No file uploaded</span>
                    )}
                  </td>
                  <td>
                    <div className="status-cell-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                      {/* Main Status Pill */}
                      <span className={`status-pill pill-${app.status.replace(/\s+/g, '')}`}>
                        <span className="status-bullet-icon">{getStatusIcon(app.status)}</span>
                        <span>{app.status}</span>
                      </span>

                      {/* Nested Compact Indicators */}
                      <div className="status-sub-indicators" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
                        {/* Skills Match */}
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          fontSize: '10px', 
                          fontWeight: 700, 
                          color: app.has_required_skills ? 'var(--success)' : 'var(--text-tertiary)',
                          background: app.has_required_skills ? 'var(--success-glow)' : 'var(--bg-tertiary)',
                          border: `1px solid ${app.has_required_skills ? 'var(--success)' : 'var(--border-color)'}`,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {app.has_required_skills ? '✓ Skills Matched' : '⚠ Skills Missing'}
                        </span>

                        {/* Interview Shortlist */}
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          fontSize: '10px', 
                          fontWeight: 700, 
                          color: ['Shortlisted', 'Interview Scheduled', 'Selected'].includes(app.status) ? 'var(--success)' : 'var(--text-tertiary)',
                          background: ['Shortlisted', 'Interview Scheduled', 'Selected'].includes(app.status) ? 'var(--success-glow)' : 'var(--bg-tertiary)',
                          border: `1px solid ${['Shortlisted', 'Interview Scheduled', 'Selected'].includes(app.status) ? 'var(--success)' : 'var(--border-color)'}`,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {['Shortlisted', 'Interview Scheduled', 'Selected'].includes(app.status) ? '✓ Shortlisted' : '○ Not Shortlisted'}
                        </span>

                        {/* Selection status */}
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          fontSize: '10px', 
                          fontWeight: 700, 
                          color: app.status === 'Selected' ? 'var(--success)' : (app.status === 'Rejected' ? 'var(--danger)' : 'var(--text-tertiary)'),
                          background: app.status === 'Selected' ? 'var(--success-glow)' : (app.status === 'Rejected' ? 'var(--danger-glow)' : 'var(--bg-tertiary)'),
                          border: `1px solid ${app.status === 'Selected' ? 'var(--success)' : (app.status === 'Rejected' ? 'var(--danger)' : 'var(--border-color)')}`,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {app.status === 'Selected' ? '🎉 Selected' : (app.status === 'Rejected' ? '❌ Rejected' : '⏳ Pending Job Decision')}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="pipeline-actions">
                      <select
                        className="pipeline-dropdown"
                        value={app.status}
                        onChange={(e) => triggerUpdateStatus(app.id, e.target.value)}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Resume Screening">Resume Screening</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Technical Round">Technical Round</option>
                        <option value="Technical Round Result">Technical Round Result</option>
                        <option value="Managerial Round">Managerial Round</option>
                        <option value="Managerial Round Result">Managerial Round Result</option>
                        <option value="HR Round">HR Round</option>
                        <option value="HR Round Result">HR Round Result</option>
                        <option value="Final Round">Final Round</option>
                        <option value="Final Round Result">Final Round Result</option>
                        <option value="Interview Completed">Interview Completed</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer Sent">Offer Sent</option>
                        <option value="Offer Letter Sent">Offer Letter Sent</option>
                        <option value="Offer Accepted">Offer Accepted</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination bar */}
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing {applications.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, applications.length)} of {applications.length} records
            </div>
            {totalPages > 1 && (
              <div className="pagination-buttons">
                <button 
                  className="pagination-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  type="button"
                >
                  &lt;
                </button>
                
                {(() => {
                  const pageNumbers = [];
                  for (let i = 1; i <= totalPages; i++) {
                    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                      pageNumbers.push(
                        <button
                          key={i}
                          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
                          onClick={() => setCurrentPage(i)}
                          type="button"
                        >
                          {i}
                        </button>
                      );
                    } else if (i === 2 && currentPage > 3) {
                      pageNumbers.push(<span key="ellipsis-start" className="pagination-ellipsis">...</span>);
                      i = currentPage - 2; // skip forward
                    } else if (i === currentPage + 2 && currentPage < totalPages - 2) {
                      pageNumbers.push(<span key="ellipsis-end" className="pagination-ellipsis">...</span>);
                      i = totalPages - 1; // skip forward
                    }
                  }
                  return pageNumbers;
                })()}

                <button 
                  className="pagination-btn" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  type="button"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="modal-backdrop animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '650px', width: '100%', margin: '0 20px', padding: '24px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Schedule Candidate Interview</h3>
              <button className="btn-close" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setShowInterviewModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStatus(schedulingAppId, interviewFormData.interviewRound, interviewFormData);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Interview Round *</label>
                  <select 
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={interviewFormData.interviewRound} 
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewRound: e.target.value })}
                  >
                    <option value="Technical Round">Technical Round</option>
                    <option value="Managerial Round">Managerial Round</option>
                    <option value="HR Round">HR Round</option>
                    <option value="Final Round">Final Round (Optional)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Round Number *</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={interviewFormData.roundNumber}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, roundNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Interview Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={interviewFormData.interviewDate}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Interview Time *</label>
                  <input
                    type="time"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={interviewFormData.interviewTime}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewTime: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Duration</label>
                  <select 
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={interviewFormData.duration}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, duration: e.target.value })}
                  >
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="60 minutes">60 minutes</option>
                    <option value="90 minutes">90 minutes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Timezone</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={interviewFormData.timezone}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, timezone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Interview Mode *</label>
                  <select 
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={interviewFormData.interviewMode} 
                    onChange={(e) => setInterviewFormData({ 
                      ...interviewFormData, 
                      interviewMode: e.target.value,
                      meetingLink: '',
                      venue: '' 
                    })} 
                  >
                    <option value="Online">Online / Video Call</option>
                    <option value="Offline">Offline / Face-to-Face</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Interviewer Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    placeholder="e.g. John Doe"
                    value={interviewFormData.interviewerName}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewerName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Interviewer Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    placeholder="e.g. Lead Engineer"
                    value={interviewFormData.interviewerDesignation}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewerDesignation: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    placeholder="e.g. Engineering"
                    value={interviewFormData.department}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Interviewer Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                  placeholder="e.g. john.doe@company.com"
                  value={interviewFormData.interviewerEmail}
                  onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewerEmail: e.target.value })}
                  required
                />
              </div>

              {interviewFormData.interviewMode === 'Online' ? (
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Meeting Link *</label>
                  <input
                    type="url"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    placeholder="e.g. https://meet.google.com/abc-defg-hij"
                    value={interviewFormData.meetingLink}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, meetingLink: e.target.value })}
                    required
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Office Venue Location *</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    placeholder="e.g. Conference Room A, HQ Bangalore"
                    value={interviewFormData.venue}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, venue: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Preparation Instructions</label>
                <textarea
                  className="form-control"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', resize: 'vertical' }}
                  rows={2}
                  value={interviewFormData.instructions}
                  onChange={(e) => setInterviewFormData({ ...interviewFormData, instructions: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowInterviewModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule Interview</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .spin-animation { animation: spin 1s linear infinite; }
        .btn-refresh { height: 38px; }

        /* Application-specific cell styles */
        .applicant-cell { display: flex; flex-direction: column; text-align: left; }
        .applicant-fullname { font-weight: 700; color: var(--text-primary); }
        .applicant-details-sub { font-size: 12px; color: var(--text-tertiary); margin-top: 1px; }
        .job-target-title { font-weight: 700; color: var(--text-primary); }
        .company-text-td { font-weight: 600; color: var(--text-secondary); }
        .btn-resume-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--primary); padding: 6px 12px; border-radius: var(--radius-xs); border: 1px solid var(--primary); background-color: var(--primary-glow); transition: all var(--transition-fast); }
        .btn-resume-link:hover { background-color: var(--primary); color: #ffffff; }

        /* Pipeline Dropdown */
        .pipeline-dropdown { height: 34px; padding: 0 8px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-xs); color: var(--text-primary); font-size: 12px; font-weight: 700; cursor: pointer; transition: all var(--transition-fast); }
        .pipeline-dropdown:hover { border-color: var(--primary); }
        .status-cell-wrapper { display: flex; align-items: center; }
        .status-bullet-icon { display: inline-flex; align-items: center; margin-right: 4px; }

        /* Application status pill colors */
        .pill-Applied { background-color: rgba(245, 158, 11, 0.12); color: var(--warning); border: 1px solid rgba(245, 158, 11, 0.3); }
        .pill-UnderReview { background-color: var(--primary-glow); color: var(--primary); border: 1px solid var(--primary); }
        .pill-Shortlisted { background-color: var(--success-glow); color: var(--success); border: 1px solid var(--success); }
        .pill-InterviewScheduled { background-color: var(--accent-glow); color: var(--accent); border: 1px solid var(--accent); }
        .pill-Selected { background-color: var(--success-glow); color: var(--success); border: 1px solid var(--success); }
        .pill-Rejected { background-color: var(--danger-glow); color: var(--danger); border: 1px solid var(--danger); }
      `}</style>

    
    </div>
  );
};

export default ApplicationManagement;
