// admin-panel/src/pages/AtsManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { 
  Search, Users, FileText, Calendar, Mail, BarChart2, RefreshCw, X, Check, 
  AlertCircle, Edit, Trash2, UserCheck, UserX, Download, Send, Star, 
  ChevronLeft, ChevronRight, Award, Plus, Info, Clock, CheckCircle, 
  XCircle, ExternalLink, Paperclip, Clipboard, Filter
} from 'lucide-react';

const AtsManagement = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Navigation tab state: 'dashboard' | 'candidates' | 'applications' | 'interviews' | 'emails' | 'reports'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Loaders
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // --- CORE DATA STATES ---
  const [recruiters, setRecruiters] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [emailLogsPagination, setEmailLogsPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [analytics, setAnalytics] = useState(null);

  // --- FILTERS & SEARCH STATES ---
  const [candidateSearch, setCandidateSearch] = useState('');
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [emailSearch, setEmailSearch] = useState('');
  const [emailStatusFilter, setEmailStatusFilter] = useState('all');
  const [emailPage, setEmailPage] = useState(1);

  // --- DRAWER & DETAIL MODALS ---
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [activeCandidateSubTab, setActiveCandidateSubTab] = useState('profile');
  const [newNoteText, setNewNoteText] = useState('');

  // --- INTERVIEW SCHEDULING MODAL ---
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

  // --- INTERVIEW FEEDBACK VIEW MODAL ---
  const [viewFeedbackInterview, setViewFeedbackInterview] = useState(null);

  // --- MANUAL EMAIL MODAL ---
  const [showManualEmailModal, setShowManualEmailModal] = useState(false);
  const [manualEmailData, setManualEmailData] = useState({ to_email: '', subject: '', body: '', application_id: '' });

  // --- REPORTS GENERATION STATES ---
  const [selectedReportType, setSelectedReportType] = useState('hiring');
  const [reportPreviewData, setReportPreviewData] = useState([]);

  // --- CALENDAR DATE STATES ---
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // ==========================================
  // API LOADERS
  // ==========================================

  // Fetch Recruiters (for assignments)
  const fetchRecruiters = async () => {
    try {
      const res = await api.get('/ats/recruiters');
      if (res.data.success) {
        setRecruiters(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load recruiters list:', err);
    }
  };

  // Fetch Dashboard Stats and Analytics
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ats/reports/analytics');
      if (res.data.success) {
        setAnalytics(res.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve ATS analytics.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Candidates
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ats/candidates', {
        params: { search: candidateSearch || undefined }
      });
      if (res.data.success) {
        setCandidates(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load candidates.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Applications
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/applications', {
        params: {
          search: appSearch || undefined,
          status: appStatusFilter !== 'all' ? appStatusFilter : undefined
        }
      });
      if (res.data.success) {
        setApplications(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load applications.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Interviews (Calendar list)
  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ats/interviews');
      if (res.data.success) {
        setInterviews(res.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve interviews list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Email Logs
  const fetchEmailLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ats/emails/logs', {
        params: {
          page: emailPage,
          limit: 10,
          search: emailSearch || undefined,
          status: emailStatusFilter !== 'all' ? emailStatusFilter : undefined
        }
      });
      if (res.data.success) {
        setEmailLogs(res.data.data);
        setEmailLogsPagination(res.data.pagination);
      }
    } catch (err) {
      showToast('Failed to load email logs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Reports Preview
  const generateReportPreview = async () => {
    setLoading(true);
    try {
      // Mock generate report locally by fetching active list or export endpoints
      if (selectedReportType === 'hiring') {
        const res = await api.get('/applications');
        if (res.data.success) setReportPreviewData(res.data.data);
      } else if (selectedReportType === 'recruiter') {
        setReportPreviewData(recruiters);
      } else if (selectedReportType === 'company') {
        const res = await api.get('/companies');
        if (res.data.success) setReportPreviewData(res.data.data);
      } else if (selectedReportType === 'job') {
        const res = await api.get('/jobs?status=all&limit=100');
        if (res.data.success) setReportPreviewData(res.data.data);
      } else if (selectedReportType === 'interview') {
        const res = await api.get('/ats/interviews');
        if (res.data.success) setReportPreviewData(res.data.data);
      }
    } catch (err) {
      showToast('Failed to generate report preview.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific Candidate details (Application History, resume data, notes, interviews)
  const fetchCandidateDetails = async (applicationId) => {
    setDetailsLoading(true);
    try {
      const res = await api.get(`/applications/${applicationId}`);
      if (res.data.success) {
        setCandidateDetails(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load candidate profile details.', 'error');
    } finally {
      setDetailsLoading(false);
    }
  };

  // Switch tabs loader
  useEffect(() => {
    fetchRecruiters(); // always pre-cache recruiters
    if (activeTab === 'dashboard') fetchAnalytics();
    if (activeTab === 'candidates') fetchCandidates();
    if (activeTab === 'applications') fetchApplications();
    if (activeTab === 'interviews') fetchInterviews();
    if (activeTab === 'emails') fetchEmailLogs();
    if (activeTab === 'reports') generateReportPreview();
  }, [activeTab, emailPage]);

  // Debounced/triggers for searches
  useEffect(() => {
    if (activeTab === 'candidates') {
      const t = setTimeout(fetchCandidates, 400);
      return () => clearTimeout(t);
    }
  }, [candidateSearch]);

  useEffect(() => {
    if (activeTab === 'applications') {
      const t = setTimeout(fetchApplications, 400);
      return () => clearTimeout(t);
    }
  }, [appSearch, appStatusFilter]);

  useEffect(() => {
    if (activeTab === 'emails') {
      const t = setTimeout(fetchEmailLogs, 400);
      return () => clearTimeout(t);
    }
  }, [emailSearch, emailStatusFilter]);

  useEffect(() => {
    if (activeTab === 'reports') {
      generateReportPreview();
    }
  }, [selectedReportType]);


  // ==========================================
  // CORE BUSINESS ACTIONS
  // ==========================================

  // Status transitions
  const handleUpdateStatus = async (appId, newStatus, interviewDetails = null) => {
    setActionLoading(true);
    try {
      const payload = { status: newStatus, ...interviewDetails };
      const res = await api.put(`/applications/${appId}/status`, payload);
      if (res.data.success) {
        showToast(`Pipeline transitioned to: ${newStatus}`, 'success');
        // Refresh local items
        if (activeTab === 'applications') fetchApplications();
        if (activeTab === 'candidates' && selectedCandidate) fetchCandidateDetails(selectedCandidate.app_id);
        setShowInterviewModal(false);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update application pipeline status.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Status dropdown callback helper
  const triggerStatusChange = (appId, newStatus) => {
    const interviewRoundsList = ['Interview Scheduled', 'Technical Round', 'Managerial Round', 'HR Round', 'Final Round'];
    if (interviewRoundsList.includes(newStatus)) {
      setSchedulingAppId(appId);
      const existingApp = applications.find(a => a.id === appId);
      
      // Determine what round this is
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

  // Assign Recruiter to Application
  const handleAssignRecruiterToApp = async (appId, recruiterUserId) => {
    setActionLoading(true);
    try {
      const res = await api.patch(`/applications/${appId}/assign-recruiter`, { recruiter_id: recruiterUserId });
      if (res.data.success) {
        showToast(res.data.message || 'Recruiter assignment updated.', 'success');
        if (activeTab === 'applications') fetchApplications();
        if (activeTab === 'candidates' && selectedCandidate) fetchCandidateDetails(selectedCandidate.app_id);
      }
    } catch (err) {
      showToast('Failed to update recruiter assignment.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Add Candidate Private Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !candidateDetails) return;
    setActionLoading(true);
    try {
      const res = await api.post(`/applications/${candidateDetails.id}/notes`, { note_text: newNoteText.trim() });
      if (res.data.success) {
        showToast('Private timeline note added successfully.', 'success');
        setNewNoteText('');
        fetchCandidateDetails(candidateDetails.id);
      }
    } catch (err) {
      showToast('Failed to record candidate note.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Manual resume re-parsing
  const handleReparseResume = async (appId) => {
    setDetailsLoading(true);
    try {
      const res = await api.post(`/applications/${appId}/parse-resume`);
      if (res.data.success) {
        showToast('Resume parsed and scores synchronized.', 'success');
        fetchCandidateDetails(appId);
      }
    } catch (err) {
      showToast('Resume parsing failed.', 'error');
    } finally {
      setDetailsLoading(false);
    }
  };

  // Retry failed email logs
  const handleRetryEmail = async (emailId) => {
    setActionLoading(true);
    try {
      const res = await api.post(`/ats/emails/retry/${emailId}`);
      if (res.data.success) {
        showToast('Email log retried and sent.', 'success');
        fetchEmailLogs();
      }
    } catch (err) {
      showToast('Retry attempt failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Send Manual Candidate Email
  const handleSendManualEmail = async (e) => {
    e.preventDefault();
    const { to_email, subject, body, application_id } = manualEmailData;
    if (!to_email || !subject || !body) {
      showToast('Please fill all mandatory email fields.', 'warning');
      return;
    }
    setActionLoading(true);
    try {
      const res = await api.post('/ats/emails/send-manual', {
        to_email,
        subject,
        body,
        application_id: application_id ? parseInt(application_id) : null
      });
      if (res.data.success) {
        showToast('Manual email sent and logged.', 'success');
        setShowManualEmailModal(false);
        setManualEmailData({ to_email: '', subject: '', body: '', application_id: '' });
        if (activeTab === 'emails') fetchEmailLogs();
      }
    } catch (err) {
      showToast('Failed to dispatch manual email.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Cancel Interview
  const handleCancelInterview = async (interviewId) => {
    if (!window.confirm('Are you sure you want to cancel this interview?')) return;
    setActionLoading(true);
    try {
      const res = await api.post(`/ats/interviews/${interviewId}/cancel`);
      if (res.data.success) {
        showToast('Interview cancelled successfully.', 'success');
        if (activeTab === 'interviews') fetchInterviews();
        if (candidateDetails) fetchCandidateDetails(candidateDetails.id);
      }
    } catch (err) {
      showToast('Failed to cancel interview.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Reports Exports
  const handleExportCSV = () => {
    try {
      const headers = selectedReportType === 'hiring' 
        ? 'Application ID,Candidate Name,Email,Job,Status,Applied Date' 
        : selectedReportType === 'recruiter' 
        ? 'Recruiter ID,Name,Email,Position,Company' 
        : selectedReportType === 'company'
        ? 'Company ID,Name,Website,Industry'
        : selectedReportType === 'job'
        ? 'Job ID,Title,Company,Status,Type'
        : 'Interview ID,Candidate Email,Date,Time,Interviewer,Status';
      
      let rows = '';
      reportPreviewData.forEach(item => {
        if (selectedReportType === 'hiring') {
          rows += `\n${item.id},"${item.first_name} ${item.last_name}",${item.email},"${item.job_title}",${item.status},"${new Date(item.created_at).toLocaleDateString()}"`;
        } else if (selectedReportType === 'recruiter') {
          rows += `\n${item.id},"${item.first_name} ${item.last_name}",${item.email},"${item.position || 'Recruiter'}","${item.company_name}"`;
        } else if (selectedReportType === 'company') {
          rows += `\n${item.id},"${item.name}",${item.website || 'N/A'},"${item.industry || 'N/A'}"`;
        } else if (selectedReportType === 'job') {
          rows += `\n${item.id},"${item.title}","${item.company_name}",${item.status},${item.job_type}`;
        } else {
          rows += `\n${item.id},${item.candidate_email},${item.interview_date},${item.interview_time},"${item.interviewer_name}",${item.status}`;
        }
      });

      const csvContent = headers + rows;
      const url = window.URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ats_report_${selectedReportType}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      showToast(`Exported CSV for ${selectedReportType} report!`, 'success');
    } catch (err) {
      showToast('Failed to export CSV.', 'error');
    }
  };

  // Print/PDF trigger
  const handlePrint = () => {
    window.print();
  };

  // ==========================================
  // RENDER INTERVIEW CALENDAR UTILS
  // ==========================================
  const renderCalendar = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Padding for previous month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`prev-${i}`} className="calendar-day-empty"></div>);
    }

    // Days of current month
    for (let day = 1; day <= totalDays; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayInterviews = interviews.filter(intr => intr.interview_date === dateString);

      days.push(
        <div key={day} className="calendar-day">
          <span className="day-number">{day}</span>
          <div className="day-events">
            {dayInterviews.map(intr => (
              <div 
                key={intr.id} 
                className={`event-badge badge-status-${intr.status}`}
                title={`${intr.interview_round} with ${intr.first_name} ${intr.last_name}`}
                onClick={() => navigate(`/interviews/${intr.id}`)}
              >
                <span className="event-time">{intr.interview_time}</span>
                <span className="event-title">{intr.first_name} ({intr.interview_type})</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="calendar-widget">
        <div className="calendar-nav-header">
          <button className="btn btn-secondary btn-icon-sm" onClick={() => setCurrentCalendarDate(new Date(year, month - 1, 1))}>
            <ChevronLeft size={16} />
          </button>
          <h4>{monthNames[month]} {year}</h4>
          <button className="btn btn-secondary btn-icon-sm" onClick={() => setCurrentCalendarDate(new Date(year, month + 1, 1))}>
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="calendar-days-grid-header">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        <div className="calendar-days-grid">
          {days}
        </div>
      </div>
    );
  };


  // ==========================================
  // SUB-TAB VIEWS RENDERING
  // ==========================================

  // 1. Dashboard Tab View
  const renderDashboardTab = () => {
    if (!analytics) return <div className="loading-state">Loading metrics...</div>;
    const m = analytics.metrics;

    // Draw hiring funnel totals
    const maxFunnelCount = Math.max(...analytics.funnel.map(f => f.count), 1);

    return (
      <div className="ats-dashboard-view">
        {/* KPI counts summary grid */}
        <div className="dashboard-stats-grid">
          <div className="ats-stat-card border-blue">
            <span className="stat-icon"><Users size={20} style={{ color: '#3b82f6' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{candidates.length || '—'}</span>
              <span className="stat-lbl">Unique Candidates</span>
            </div>
          </div>
          <div className="ats-stat-card border-orange">
            <span className="stat-icon"><FileText size={20} style={{ color: '#f59e0b' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.totalApplications}</span>
              <span className="stat-lbl">Total Applications</span>
            </div>
          </div>
          <div className="ats-stat-card border-green">
            <span className="stat-icon"><Plus size={20} style={{ color: '#10b981' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.newApplications}</span>
              <span className="stat-lbl">New Applications</span>
            </div>
          </div>
          <div className="ats-stat-card border-purple">
            <span className="stat-icon"><Clock size={20} style={{ color: '#8b5cf6' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.underReview}</span>
              <span className="stat-lbl">Under Review</span>
            </div>
          </div>
          <div className="ats-stat-card border-pink">
            <span className="stat-icon"><Star size={20} style={{ color: '#ec4899' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.shortlisted}</span>
              <span className="stat-lbl">Shortlisted</span>
            </div>
          </div>
          <div className="ats-stat-card border-indigo">
            <span className="stat-icon"><Calendar size={20} style={{ color: '#6366f1' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.interviewsScheduled}</span>
              <span className="stat-lbl">Interviews Scheduled</span>
            </div>
          </div>
          <div className="ats-stat-card border-teal">
            <span className="stat-icon"><CheckCircle size={20} style={{ color: '#14b8a6' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.interviewCompleted}</span>
              <span className="stat-lbl">Interviews Completed</span>
            </div>
          </div>
          <div className="ats-stat-card border-success">
            <span className="stat-icon"><UserCheck size={20} style={{ color: 'var(--success)' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.selected}</span>
              <span className="stat-lbl">Selected Candidates</span>
            </div>
          </div>
          <div className="ats-stat-card border-danger">
            <span className="stat-icon"><UserX size={20} style={{ color: 'var(--danger)' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.rejected}</span>
              <span className="stat-lbl">Rejected</span>
            </div>
          </div>
          <div className="ats-stat-card border-accent">
            <span className="stat-icon"><Send size={20} style={{ color: 'var(--accent)' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.offerSent}</span>
              <span className="stat-lbl">Offer Sent</span>
            </div>
          </div>
          <div className="ats-stat-card border-green">
            <span className="stat-icon"><CheckCircle size={20} style={{ color: '#10b981' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.hired}</span>
              <span className="stat-lbl">Hired</span>
            </div>
          </div>
          <div className="ats-stat-card border-yellow">
            <span className="stat-icon"><Award size={20} style={{ color: '#eab308' }} /></span>
            <div className="stat-texts">
              <span className="stat-val">{m.averageResumeScore}%</span>
              <span className="stat-lbl">Avg Match Score</span>
            </div>
          </div>
        </div>

        {/* Visual Charts & Performance Rows */}
        <div className="dashboard-charts-grid">
          {/* Hiring Funnel Custom SVG */}
          <div className="glass-card chart-card">
            <h3>Hiring Funnel</h3>
            <div className="funnel-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {analytics.funnel.map((item, idx) => {
                const pct = (item.count / maxFunnelCount) * 100;
                return (
                  <div key={idx} className="funnel-row">
                    <span className="funnel-label">{item.stage}</span>
                    <div className="funnel-track" style={{ flexGrow: 1, backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', height: '24px', position: 'relative' }}>
                      <div 
                        className="funnel-fill" 
                        style={{ 
                          width: `${pct}%`, 
                          backgroundColor: idx % 2 === 0 ? 'var(--primary)' : 'rgba(255, 81, 0, 0.6)', 
                          height: '100%', 
                          borderRadius: '4px',
                          transition: 'width 0.8s ease'
                        }}
                      ></div>
                      <span className="funnel-count" style={{ position: 'absolute', right: '10px', top: '3px', fontWeight: 800, fontSize: '11px', color: 'var(--text-primary)' }}>{item.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Applications Line/Bar Chart (Custom Render) */}
          <div className="glass-card chart-card">
            <h3>Monthly Applications</h3>
            {analytics.monthlyApplications.length > 0 ? (
              <div className="bar-chart-custom" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', marginTop: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                {analytics.monthlyApplications.map((item, idx) => {
                  const maxVal = Math.max(...analytics.monthlyApplications.map(m => m.applications), 1);
                  const h = (item.applications / maxVal) * 160;
                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800 }}>{item.applications}</span>
                      <div style={{ width: '36px', height: `${h}px`, background: 'linear-gradient(to top, var(--primary), var(--primary-glow))', borderRadius: '4px 4px 0 0' }}></div>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{item.month}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-tertiary)' }}>No application data loaded yet.</div>
            )}
          </div>

          {/* Recruiter Performance */}
          <div className="glass-card chart-card">
            <h3>Recruiter Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              {analytics.recruiterPerformance.map((rec, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '10px 14px', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
                      {rec.name[0]}
                    </div>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, display: 'block' }}>{rec.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Hiring Recruiter</span>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '13px' }}>{rec.processed} processes</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job-wise Application breakdown */}
          <div className="glass-card chart-card">
            <h3>Job Openings Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {analytics.jobWiseApplications.map((job, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                    <span>{job.title}</span>
                    <span style={{ color: 'var(--primary)' }}>{job.applications} applications</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                    <div 
                      style={{ 
                        width: `${Math.min((job.applications / (analytics.metrics.totalApplications || 1)) * 100, 100)}%`, 
                        height: '100%', 
                        backgroundColor: 'var(--primary)', 
                        borderRadius: '4px' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Candidates Tab View
  const renderCandidatesTab = () => {
    return (
      <div className="candidates-tab-view animate-fade">
        <div className="filter-search-card">
          <div className="records-badge">{candidates.length} unique candidates</div>
          <div className="controls-right">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Candidate Full Name</th>
                <th>Contact Details</th>
                <th>Registered Date</th>
                <th>Applications Count</th>
                <th>Latest Uploaded Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(cand => (
                <tr key={cand.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="candidate-avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        {cand.first_name[0]}{cand.last_name[0]}
                      </div>
                      <span style={{ fontWeight: 700 }}>{cand.first_name} {cand.last_name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px' }}>
                      <span>{cand.email}</span>
                      <span className="text-muted">{cand.phone || '—'}</span>
                    </div>
                  </td>
                  <td>{new Date(cand.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="badge-count" style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                      {cand.applications_count} jobs
                    </span>
                  </td>
                  <td>
                    {cand.resume_file ? (
                      <a 
                        href={`http://localhost:5000/uploads/resumes/${cand.resume_file}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-resume-link"
                      >
                        <FileText size={14} />
                        <span>Resume</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-muted" style={{ fontSize: '12px' }}>No upload</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        // find application id
                        const app = cand.applications[0];
                        if (app) {
                          setSelectedCandidate(cand);
                          fetchCandidateDetails(app.id);
                        } else {
                          showToast('This candidate has not applied to any job openings yet.', 'warning');
                        }
                      }}
                    >
                      <span>View File</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 3. Applications Tab View
  const renderApplicationsTab = () => {
    return (
      <div className="applications-tab-view animate-fade">
        <div className="filter-search-card">
          <div className="records-badge">{applications.length} applications</div>
          <div className="controls-right">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search applications..." 
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <span className="status-filter-label"><Filter size={12} /> STATUS:</span>
              <select 
                className="filter-select"
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
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

        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Target Job Role</th>
                <th>Company</th>
                <th>Assigned Recruiter</th>
                <th>Resume Analysis</th>
                <th>Stage Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700 }}>{app.first_name} {app.last_name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{app.email}</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 700 }}>{app.job_title}</span></td>
                  <td>{app.company_name}</td>
                  <td>
                    <select
                      className="form-control select-sm"
                      style={{ fontSize: '12px', padding: '4px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                      value={app.assigned_recruiter_id || ''}
                      onChange={(e) => handleAssignRecruiterToApp(app.id, e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">Unassigned</option>
                      {recruiters.map(r => (
                        <option key={r.id} value={r.id}>{r.first_name} {r.last_name} ({r.company_name})</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge-match-score" style={{ backgroundColor: app.match_score >= 80 ? 'var(--success-glow)' : 'var(--bg-tertiary)', color: app.match_score >= 80 ? 'var(--success)' : 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>
                        {app.match_score !== undefined ? `${app.match_score}%` : 'Pending'}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{app.ats_recommendation || 'Scanned'}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill pill-${app.status.replace(/\s+/g, '')}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select 
                        className="pipeline-dropdown"
                        value={app.status}
                        onChange={(e) => triggerStatusChange(app.id, e.target.value)}
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
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedCandidate({ ...app, app_id: app.id });
                          fetchCandidateDetails(app.id);
                        }}
                      >
                        <Info size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 4. Interviews Calendar Tab View
  const renderInterviewsTab = () => {
    return (
      <div className="interviews-tab-view animate-fade">
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.25fr', gap: '20px' }}>
          {/* Main Grid Calendar */}
          <div className="glass-card" style={{ padding: '20px' }}>
            {renderCalendar()}
          </div>

          {/* Side Panel: Scheduled List & Action logs */}
          <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>Scheduled Interviews List</h3>
            <div className="interviews-scroll-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
              {interviews.filter(i => i.status === 'Scheduled').length === 0 ? (
                <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: '20px 0' }}>No pending scheduled interviews.</div>
              ) : (
                interviews.filter(i => i.status === 'Scheduled').map(intr => (
                  <div key={intr.id} className="scheduled-interview-item" style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--bg-tertiary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 800, fontSize: '13px' }}>{intr.first_name} {intr.last_name}</span>
                      <span style={{ fontSize: '10px', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>{intr.interview_type}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Job: <strong>{intr.job_title}</strong></span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <Calendar size={12} />
                      <span>{intr.interview_date} at {intr.interview_time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      <Users size={12} />
                      <span>Interviewer: {intr.interviewer_name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                      <Link to={`/interviews/${intr.id}`} className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '11px', flexGrow: 1, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        Evaluate
                      </Link>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '11px', flexGrow: 1 }} onClick={() => triggerStatusChange(intr.application_id, 'Interview Scheduled')}>
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5. Emails logs Tab View
  const renderEmailsTab = () => {
    return (
      <div className="emails-tab-view animate-fade">
        <div className="filter-search-card">
          <div className="records-badge">{emailLogsPagination.total} email logs</div>
          <div className="controls-right">
            <button 
              className="btn btn-primary"
              onClick={() => {
                setManualEmailData({ to_email: '', subject: '', body: '', application_id: '' });
                setShowManualEmailModal(true);
              }}
            >
              <Send size={16} />
              <span>Send Manual Email</span>
            </button>
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search email logs..." 
                value={emailSearch}
                onChange={(e) => {
                  setEmailSearch(e.target.value);
                  setEmailPage(1);
                }}
              />
            </div>
            <div className="filter-box">
              <span className="status-filter-label">EMAIL STATUS:</span>
              <select 
                className="filter-select"
                value={emailStatusFilter}
                onChange={(e) => {
                  setEmailStatusFilter(e.target.value);
                  setEmailPage(1);
                }}
              >
                <option value="all">All Logs</option>
                <option value="Sent">Sent</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Recipient Email</th>
                <th>Subject Line</th>
                <th>Sent / Dispatched Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {emailLogs.map(log => (
                <tr key={log.id}>
                  <td><span style={{ fontWeight: 600 }}>{log.to_email}</span></td>
                  <td>{log.subject}</td>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                  <td>
                    <span className={`status-pill pill-${log.status}`}>
                      {log.status === 'Sent' ? 'Sent' : 'Delivery Failed'}
                    </span>
                  </td>
                  <td>
                    {log.status === 'Failed' ? (
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleRetryEmail(log.id)}
                        disabled={actionLoading}
                      >
                        <RefreshCw size={12} />
                        <span>Retry</span>
                      </button>
                    ) : (
                      <span className="text-muted" style={{ fontSize: '12px' }}>✓ Logged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Logs pagination */}
          {emailLogsPagination.totalPages > 1 && (
            <div className="pagination-wrapper" style={{ borderTop: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', justifyContent: 'flex-end' }}>
              <div className="pagination-buttons" style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="pagination-btn" 
                  disabled={emailPage === 1}
                  onClick={() => setEmailPage(prev => prev - 1)}
                >
                  Prev
                </button>
                <span style={{ alignSelf: 'center', fontSize: '13px', fontWeight: 700 }}>Page {emailPage} of {emailLogsPagination.totalPages}</span>
                <button 
                  className="pagination-btn"
                  disabled={emailPage === emailLogsPagination.totalPages}
                  onClick={() => setEmailPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 6. Reports Tab View
  const renderReportsTab = () => {
    return (
      <div className="reports-tab-view animate-fade">
        <div className="filter-search-card">
          <div className="records-badge">Report Preview Dashboard</div>
          <div className="controls-right" style={{ gap: '16px' }}>
            <div className="filter-box">
              <span className="status-filter-label">REPORT TYPE:</span>
              <select 
                className="filter-select"
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
              >
                <option value="hiring">Hiring & Applications Report</option>
                <option value="recruiter">Recruiter Performance Report</option>
                <option value="company">Company Performance Report</option>
                <option value="job">Job-wise Openings Report</option>
                <option value="interview">Interview Schedule Report</option>
              </select>
            </div>
            <button className="btn btn-secondary" onClick={handleExportCSV}>
              <Download size={16} />
              <span>Export CSV/Excel</span>
            </button>
            <button className="btn btn-primary" onClick={handlePrint}>
              <FileText size={16} />
              <span>Print Report / PDF</span>
            </button>
          </div>
        </div>

        {/* Printable styled report viewport */}
        <div id="printable-report" className="table-responsive-wrapper glass-card" style={{ padding: '24px' }}>
          <div className="report-header" style={{ marginBottom: '24px', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px' }}>
            <h2 style={{ color: 'var(--primary)', margin: 0, textTransform: 'uppercase' }}>Recruitment Analytics Report</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Report Scope: {selectedReportType.toUpperCase()} | Generated on: {new Date().toLocaleString()}</p>
          </div>

          <table className="admin-data-table font-mono-table" style={{ width: '100%' }}>
            {selectedReportType === 'hiring' && (
              <>
                <thead>
                  <tr>
                    <th>App ID</th>
                    <th>Candidate</th>
                    <th>Email</th>
                    <th>Target Role</th>
                    <th>Pipeline Status</th>
                    <th>Application Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.first_name} {item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.job_title}</td>
                      <td>{item.status}</td>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {selectedReportType === 'recruiter' && (
              <>
                <thead>
                  <tr>
                    <th>Recruiter ID</th>
                    <th>Recruiter Name</th>
                    <th>Email</th>
                    <th>Corporate Designation</th>
                    <th>Company Partner</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.map(item => (
                    <tr key={item.recruiter_id}>
                      <td>{item.recruiter_id}</td>
                      <td>{item.first_name} {item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.position || 'Recruiter'}</td>
                      <td>{item.company_name}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {selectedReportType === 'company' && (
              <>
                <thead>
                  <tr>
                    <th>Company ID</th>
                    <th>Corporate Name</th>
                    <th>Website URL</th>
                    <th>Industrial Core Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.website || 'N/A'}</td>
                      <td>{item.industry || 'Tech Core'}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {selectedReportType === 'job' && (
              <>
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Title Heading</th>
                    <th>Partner Corporate</th>
                    <th>List Status</th>
                    <th>Job Type</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.company_name}</td>
                      <td>{item.status}</td>
                      <td>{item.job_type}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}

            {selectedReportType === 'interview' && (
              <>
                <thead>
                  <tr>
                    <th>Int ID</th>
                    <th>Candidate Email</th>
                    <th>Scheduled Date</th>
                    <th>Time</th>
                    <th>Interviewer Name</th>
                    <th>Interview Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPreviewData.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.candidate_email}</td>
                      <td>{item.interview_date}</td>
                      <td>{item.interview_time}</td>
                      <td>{item.interviewer_name}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    );
  };


  // ==========================================
  // SIDE DRAWER - CANDIDATE RESUME PROFILE EVALUATION
  // ==========================================
  const renderCandidateDrawer = () => {
    if (!selectedCandidate || !candidateDetails) return null;
    const detail = candidateDetails;

    // Split resume data arrays safely
    const skillsList = detail.resume_data?.skills 
      ? detail.resume_data.skills.split(',').map(s => s.trim())
      : detail.skills 
      ? detail.skills.split(',').map(s => s.trim())
      : [];
    
    const matchedSkills = detail.score_data?.matched_skills
      ? detail.score_data.matched_skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const missingSkills = detail.score_data?.missing_skills
      ? detail.score_data.missing_skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    return (
      <div className="drawer-overlay animate-fade">
        <div className="drawer-container animate-slide-left glass-card">
          <div className="drawer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
                {detail.first_name[0]}{detail.last_name[0]}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>{detail.first_name} {detail.last_name}</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Target Role: <strong>{detail.job_title}</strong></span>
              </div>
            </div>
            <button className="btn-close" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => {
              setSelectedCandidate(null);
              setCandidateDetails(null);
            }}>
              <X size={20} />
            </button>
          </div>

          {/* Drawer tab navigation */}
          <div className="drawer-nav-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '16px', gap: '20px' }}>
            <button className={`drawer-tab-btn ${activeCandidateSubTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveCandidateSubTab('profile')}>Profile Dossier</button>
            <button className={`drawer-tab-btn ${activeCandidateSubTab === 'resume' ? 'active' : ''}`} onClick={() => setActiveCandidateSubTab('resume')}>AI Resume Analysis</button>
            <button className={`drawer-tab-btn ${activeCandidateSubTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveCandidateSubTab('timeline')}>Timeline & Notes</button>
          </div>

          <div className="drawer-tab-content" style={{ overflowY: 'auto', flexGrow: 1, paddingRight: '4px' }}>
            {activeCandidateSubTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Contact Widget */}
                <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 800 }}>Candidate Contact</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
                    <span>Email: <strong>{detail.email}</strong></span>
                    <span>Phone: <strong>{detail.phone || 'N/A'}</strong></span>
                  </div>
                </div>

                {/* Cover letter card */}
                <div className="glass-card" style={{ padding: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 800, marginBottom: '10px' }}>Application Details / Cover Letter</h4>
                  <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: '12px', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {detail.cover_letter || 'No Cover letter supplied.'}
                  </pre>
                </div>

                {/* Submissions list */}
                <div>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 800, marginBottom: '10px' }}>Interviews scheduled</h4>
                  {detail.interviews.length === 0 ? (
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>No interviews scheduled.</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {detail.interviews.map(intr => (
                        <div key={intr.id} style={{ border: '1px solid var(--border-color)', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ display: 'block', fontWeight: 700 }}>{intr.interview_round} ({intr.interview_type})</span>
                            <span style={{ color: 'var(--text-tertiary)' }}>{intr.interview_date} at {intr.interview_time} | Interviewer: {intr.interviewer_name}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className={`status-pill pill-${intr.status}`}>{intr.status}</span>
                            <button 
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '2px 6px', fontSize: '10px', height: 'auto' }}
                              onClick={() => {
                                setSelectedCandidate(null);
                                setCandidateDetails(null);
                                navigate(`/interviews/${intr.id}`);
                              }}
                            >
                              Open Portal
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCandidateSubTab === 'resume' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Score capsule */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '6px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 900 }}>{detail.score_data?.match_score || '—'}%</h3>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Overall Match Recommendation: <strong>{detail.score_data?.ats_recommendation || 'Scanned'}</strong></span>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleReparseResume(detail.id)}>
                    <RefreshCw size={14} />
                    <span>Re-Evaluate</span>
                  </button>
                </div>

                {/* PDF viewing link */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Extracted PDF Resume Document</span>
                  <a href={`http://localhost:5000/uploads/resumes/${detail.resume}`} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                    <Download size={14} />
                    <span>Download PDF</span>
                  </a>
                </div>

                {/* Match Skills Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="glass-card" style={{ padding: '14px', borderLeft: '3px solid var(--success)' }}>
                    <h5 style={{ margin: 0, fontSize: '12px', color: 'var(--success)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Matched Skills</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {matchedSkills.length > 0 ? matchedSkills.map((s, i) => (
                        <span key={i} style={{ fontSize: '11px', padding: '2px 8px', background: 'var(--success-glow)', color: 'var(--success)', borderRadius: '4px', fontWeight: 700 }}>{s}</span>
                      )) : <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>None matched</span>}
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '14px', borderLeft: '3px solid var(--danger)' }}>
                    <h5 style={{ margin: 0, fontSize: '12px', color: 'var(--danger)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Missing Skills</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {missingSkills.length > 0 ? missingSkills.map((s, i) => (
                        <span key={i} style={{ fontSize: '11px', padding: '2px 8px', background: 'var(--danger-glow)', color: 'var(--danger)', borderRadius: '4px', fontWeight: 700 }}>{s}</span>
                      )) : <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>None missing</span>}
                    </div>
                  </div>
                </div>

                {/* AI Extracted Bio Details */}
                <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>Extracted Metadata</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>EXPERIENCE:</strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{detail.resume_data?.experience || 'Experience details not extracted.'}</span>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>EDUCATION:</strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{detail.resume_data?.education || 'Education details not extracted.'}</span>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>PROJECTS / CERTIFICATIONS:</strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{detail.resume_data?.projects || 'Projects and certificates not extracted.'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCandidateSubTab === 'timeline' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Notes posting form */}
                <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <textarea
                    className="form-control"
                    placeholder="Enter private note/remark for this candidate's evaluation timeline..."
                    rows={3}
                    style={{ width: '100%', fontSize: '13px', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-end' }}>
                    <span>Add Timeline Note</span>
                  </button>
                </form>

                {/* History timeline queue */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 800 }}>Timeline & Notes Log</h4>
                  
                  {/* Status transitions timeline */}
                  <div className="timeline-trail" style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '2px solid var(--border-color)', paddingLeft: '16px', marginLeft: '6px' }}>
                    {/* Notes */}
                    {detail.notes.map(note => (
                      <div key={`note-${note.id}`} style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '-23px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--bg-primary)' }}></span>
                        <div style={{ fontSize: '12px', background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '4px' }}>
                          <span style={{ display: 'block', fontWeight: 800 }}>{note.recruiter_first} {note.recruiter_last} (Note)</span>
                          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>{note.note_text}</p>
                          <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{new Date(note.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}

                    {/* Timeline History */}
                    {detail.timeline.map(hist => (
                      <div key={`hist-${hist.id}`} style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '-23px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border-color)', border: '2px solid var(--bg-primary)' }}></span>
                        <div style={{ fontSize: '12px' }}>
                          <span style={{ fontWeight: 800 }}>Pipeline Event: Status set to "{hist.status}"</span>
                          <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)', fontSize: '11px' }}>{hist.remarks}</p>
                          <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                            {new Date(hist.created_at).toLocaleString()} {hist.changed_by_first ? `by ${hist.changed_by_first} ${hist.changed_by_last}` : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };


  // ==========================================
  // VIEW RENDERER
  // ==========================================
  return (
    <div className="admin-page-container animate-fade">
      
      {/* Upper header title widget */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: 'var(--primary-glow)', color: 'var(--primary)' }}>
            <BarChart2 size={22} />
          </div>
          <div className="header-info">
            <h2>Hiring ATS Management Console</h2>
            <p>Admin control center for candidate evaluations, AI resume scores, pipeline stages, calendar scheduling, and mail alerts.</p>
          </div>
        </div>
      </div>

      {/* Console Tab bar */}
      <div className="ats-tabs-navigation glass-card" style={{ display: 'flex', padding: '6px 12px', marginBottom: '24px', gap: '10px', borderBottom: '1px solid var(--border-color)' }}>
        <button className={`ats-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <BarChart2 size={16} /><span>ATS Analytics</span>
        </button>
        <button className={`ats-nav-btn ${activeTab === 'candidates' ? 'active' : ''}`} onClick={() => setActiveTab('candidates')}>
          <Users size={16} /><span>Candidates DB</span>
        </button>
        <button className={`ats-nav-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
          <FileText size={16} /><span>Stage Workflow</span>
        </button>
        <button className={`ats-nav-btn ${activeTab === 'interviews' ? 'active' : ''}`} onClick={() => setActiveTab('interviews')}>
          <Calendar size={16} /><span>Interview Calendar</span>
        </button>
        <button className={`ats-nav-btn ${activeTab === 'emails' ? 'active' : ''}`} onClick={() => setActiveTab('emails')}>
          <Mail size={16} /><span>Email Audit Logs</span>
        </button>
        <button className={`ats-nav-btn ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
          <FileText size={16} /><span>Reports Export</span>
        </button>
      </div>

      {/* Main Viewport switcher */}
      {loading ? (
        <div className="directory-skeleton">
          <div className="table-responsive-wrapper">
            <div className="skeleton-header shimmer-wrapper"></div>
            {[1, 2, 3, 4].map(i => <div key={i} className="skeleton-row shimmer-wrapper"></div>)}
          </div>
        </div>
      ) : (
        <>
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'candidates' && renderCandidatesTab()}
          {activeTab === 'applications' && renderApplicationsTab()}
          {activeTab === 'interviews' && renderInterviewsTab()}
          {activeTab === 'emails' && renderEmailsTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </>
      )}

      {/* Render Candidate Drawer */}
      {selectedCandidate && renderCandidateDrawer()}

      {/* ==========================================
          MODALS VIEWPORT
          ========================================== */}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="modal-backdrop animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '600px', width: '100%', margin: '0 20px', padding: '24px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Schedule / Modify Interview</h3>
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

      {/* View Interview Feedback Modal */}
      {viewFeedbackInterview && (
        <div className="modal-backdrop animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '550px', width: '100%', margin: '0 20px', padding: '24px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Interview Details & Feedback</h3>
              <button className="btn-close" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setViewFeedbackInterview(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>INTERVIEW ROUND:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{viewFeedbackInterview.interview_round} ({viewFeedbackInterview.interview_type})</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)' }}>DATE:</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{viewFeedbackInterview.interview_date}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)' }}>TIME:</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{viewFeedbackInterview.interview_time}</span>
                </div>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>INTERVIEWER:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{viewFeedbackInterview.interviewer_name} ({viewFeedbackInterview.interviewer_email || 'No email'})</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>STATUS:</strong>
                <span className={`status-pill pill-${viewFeedbackInterview.status}`}>{viewFeedbackInterview.status}</span>
              </div>

              {/* Feedback lists */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px' }}>EVALUATION FEEDBACK:</strong>
                {candidateDetails && candidateDetails.interviews.find(i => i.id === viewFeedbackInterview.id)?.feedback?.length > 0 ? (
                  candidateDetails.interviews.find(i => i.id === viewFeedbackInterview.id).feedback.map((f, i) => (
                    <div key={i} style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                        <span>Interviewer: {f.interviewer_name}</span>
                        <span style={{ color: 'var(--primary)' }}>Rating: {f.rating}/5</span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-secondary)' }}>"{f.feedback_text}"</p>
                    </div>
                  ))
                ) : (
                  <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Pending technical interviewer evaluation submission.</div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '15px' }}>
              <button className="btn btn-secondary" onClick={() => setViewFeedbackInterview(null)}>Close View</button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Send Email Modal */}
      {showManualEmailModal && (
        <div className="modal-backdrop animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '550px', width: '100%', margin: '0 20px', padding: '24px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Compose Manual Candidate Email</h3>
              <button className="btn-close" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setShowManualEmailModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendManualEmail} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Recipient Email *</label>
                <input
                  type="email"
                  className="form-control"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                  placeholder="candidate@email.com"
                  value={manualEmailData.to_email}
                  onChange={(e) => setManualEmailData({ ...manualEmailData, to_email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Subject Line *</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                  placeholder="Enter email subject line"
                  value={manualEmailData.subject}
                  onChange={(e) => setManualEmailData({ ...manualEmailData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Optional Associated Application ID</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                  placeholder="e.g. 5"
                  value={manualEmailData.application_id}
                  onChange={(e) => setManualEmailData({ ...manualEmailData, application_id: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email Content (HTML Supported) *</label>
                <textarea
                  className="form-control"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', resize: 'vertical' }}
                  rows={6}
                  placeholder="<p>Welcome, candidate...</p>"
                  value={manualEmailData.body}
                  onChange={(e) => setManualEmailData({ ...manualEmailData, body: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowManualEmailModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={actionLoading}>
                  <Send size={14} />
                  <span>Send Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled inline sheet styles */}
      <style>{`
        /* Tab buttons styling */
        .ats-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: var(--radius-sm);
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          background-color: transparent;
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .ats-nav-btn:hover {
          color: var(--primary);
          background-color: var(--primary-glow);
        }
        .ats-nav-btn.active {
          color: #ffffff;
          background-color: var(--primary);
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.25);
        }

        /* Stats Cards */
        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .ats-stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background-color: #ffffff;
          border-radius: var(--radius-md);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          border-left: 4px solid var(--border-color);
        }
        .theme-dark .ats-stat-card {
          background-color: var(--bg-secondary);
        }
        .ats-stat-card.border-blue { border-left-color: #3b82f6; }
        .ats-stat-card.border-orange { border-left-color: #f59e0b; }
        .ats-stat-card.border-green { border-left-color: #10b981; }
        .ats-stat-card.border-purple { border-left-color: #8b5cf6; }
        .ats-stat-card.border-pink { border-left-color: #ec4899; }
        .ats-stat-card.border-indigo { border-left-color: #6366f1; }
        .ats-stat-card.border-teal { border-left-color: #14b8a6; }
        .ats-stat-card.border-success { border-left-color: var(--success); }
        .ats-stat-card.border-danger { border-left-color: var(--danger); }
        .ats-stat-card.border-accent { border-left-color: var(--accent); }
        .ats-stat-card.border-yellow { border-left-color: #eab308; }

        .stat-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          background-color: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-texts {
          display: flex;
          flex-direction: column;
        }
        .stat-val {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .stat-lbl {
          font-size: 11px;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        /* Charts grid */
        .dashboard-charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .chart-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .funnel-label {
          width: 120px;
          font-size: 11px;
          font-weight: 800;
          text-align: right;
          margin-right: 12px;
          color: var(--text-secondary);
        }
        .funnel-row {
          display: flex;
          align-items: center;
        }

        /* Table details */
        .badge-count {
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
        }
        .btn-resume-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: var(--primary);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--primary);
          background-color: var(--primary-glow);
          text-decoration: none;
        }
        .btn-resume-link:hover {
          background-color: var(--primary);
          color: #ffffff;
        }

        /* Drawer Overlay */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(4px);
          z-index: 999;
          display: flex;
          justify-content: flex-end;
        }
        .drawer-container {
          width: 100%;
          max-width: 550px;
          height: 100%;
          background-color: #ffffff;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.08);
          animation: slideLeft 0.3s ease-out;
        }
        .theme-dark .drawer-container {
          background-color: var(--bg-secondary);
        }
        
        .drawer-tab-btn {
          font-size: 13px;
          font-weight: 800;
          color: var(--text-tertiary);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 8px 0;
          cursor: pointer;
        }
        .drawer-tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        /* Calendar grid */
        .calendar-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .calendar-nav-header h4 { margin: 0; font-size: 16px; font-weight: 800; }
        .calendar-days-grid-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-weight: 800;
          font-size: 11px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
          margin-bottom: 8px;
        }
        .calendar-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        .calendar-day {
          border: 1px solid var(--border-color);
          border-radius: 4px;
          min-height: 80px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-tertiary);
        }
        .calendar-day-empty {
          min-height: 80px;
          background-color: transparent;
        }
        .day-number {
          font-size: 10px;
          font-weight: 800;
          color: var(--text-tertiary);
          align-self: flex-end;
        }
        .day-events {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 4px;
        }
        .event-badge {
          font-size: 9px;
          font-weight: 800;
          padding: 2px 4px;
          border-radius: 2px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          flex-direction: column;
        }
        .event-badge.badge-status-Scheduled {
          background-color: var(--accent-glow);
          color: var(--accent);
          border-left: 2px solid var(--accent);
        }
        .event-badge.badge-status-Completed {
          background-color: var(--success-glow);
          color: var(--success);
          border-left: 2px solid var(--success);
        }
        .event-badge.badge-status-Cancelled {
          background-color: var(--danger-glow);
          color: var(--danger);
          border-left: 2px solid var(--danger);
        }

        .event-time { font-weight: 900; opacity: 0.8; }
        
        /* Status History dots list */
        .timeline-trail div { margin-bottom: 12px; }
        
        /* Font monospace styling for code report prints */
        .font-mono-table td { font-family: monospace; font-size: 11px; }

        @media print {
          body * { visibility: hidden; }
          #printable-report, #printable-report * { visibility: visible; }
          #printable-report { position: absolute; left: 0; top: 0; width: 100%; border: none; }
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AtsManagement;
