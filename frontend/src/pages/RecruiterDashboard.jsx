// frontend/src/pages/RecruiterDashboard.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth, api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useJobs } from '../context/JobsContext';
import { DashboardTableSkeleton } from '../components/Skeletons';
import { Plus, Edit, Trash2, User, Phone, Mail, FileText, Download, Briefcase, Settings, Search, Check, X, ShieldAlert, FileCode, Clock, Calendar, FileSpreadsheet, FileDown, Star, MessageSquare, ChevronRight, RefreshCw, BarChart2, Award, Copy, ExternalLink } from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { skills: globalSkills } = useJobs();

  // Navigation tabs: 'overview' | 'jobs' | 'applicants' | 'company'
  const [activeTab, setActiveTab] = useState('overview');

  // Core Data States
  const [company, setCompany] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(true);

  // Dropdown Lists
  const [categories, setCategories] = useState([]);
  const [locationsList, setLocationsList] = useState([]);

  // Search & Filters for Applicants
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJobId, setFilterJobId] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Job Modal Dialog States
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    description: '',
    job_type: 'Full Time',
    salary_min: '',
    salary_max: '',
    location: '',
    experience: '0-1 years',
    skills: [], // array of skill IDs
    status: 'active'
  });
  const [jobActionLoading, setJobActionLoading] = useState(false);

  // Candidate Profile Drawer Drawer/Modal States
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const [dossierDetails, setDossierDetails] = useState(null);
  const [dossierLoading, setDossierLoading] = useState(false);
  const [drawerActiveTab, setDrawerActiveTab] = useState('profile');
  const [newNoteText, setNewNoteText] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);
  const [statusRemarks, setStatusRemarks] = useState('');

  // Analytics & Reports States
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [reportsData, setReportsData] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [activeReportType, setActiveReportType] = useState('hiring');

  // Feedback Submission States
  const [feedbackFormData, setFeedbackFormData] = useState({ interviewerName: '', feedbackText: '', rating: 5, recommendation: 'Recommend' });
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackInterviewId, setFeedbackInterviewId] = useState(null);

  // Global Interview Schedule States
  const [interviews, setInterviews] = useState([]);
  const [interviewsLoading, setInterviewsLoading] = useState(false);

  // Interview Scheduled Modal States
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
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

  // Company Edit Form States
  const [companyFormData, setCompanyFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    address: '',
    description: '',
    banner: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [companySaveLoading, setCompanySaveLoading] = useState(false);

  // Load Recruiter's Company details
  const loadCompanyDetails = useCallback(async () => {
    setCompanyLoading(true);
    try {
      const compRes = await api.get('/companies/my-company');
      if (compRes.data.success) {
        const matchingCompany = compRes.data.data;
        setCompany(matchingCompany);
        setCompanyFormData({
          name: matchingCompany.name || '',
          email: matchingCompany.email || '',
          phone: matchingCompany.phone || '',
          website: matchingCompany.website || '',
          industry: matchingCompany.industry || '',
          address: matchingCompany.address || '',
          description: matchingCompany.description || '',
          banner: matchingCompany.banner || ''
        });
      }
    } catch (err) {
      console.error('Failed to load company details:', err);
    } finally {
      setCompanyLoading(false);
    }
  }, []);

  // Fetch jobs posted by the company
  const loadJobs = useCallback(async () => {
    if (!company) return;
    setJobsLoading(true);
    try {
      const res = await api.get(`/jobs?status=all&limit=100&company_id=${company.id}`);
      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch (err) {
      showToast('Error loading company jobs.', 'error');
    } finally {
      setJobsLoading(false);
    }
  }, [company]);

  // Load applicants/applications pipeline
  const loadApplicants = useCallback(async () => {
    setApplicantsLoading(true);
    try {
      const res = await api.get('/applications');
      if (res.data.success) {
        setApplicants(res.data.data);
      }
    } catch (err) {
      showToast('Error loading candidate pipeline.', 'error');
    } finally {
      setApplicantsLoading(false);
    }
  }, []);

  // Load scheduled interviews for the company
  const loadInterviews = useCallback(async () => {
    setInterviewsLoading(true);
    try {
      const res = await api.get('/interviews');
      if (res.data.success) {
        setInterviews(res.data.data);
      }
    } catch (err) {
      showToast('Error loading scheduled interviews.', 'error');
    } finally {
      setInterviewsLoading(false);
    }
  }, []);

  // Load auxiliary lists (Categories and Locations)
  const loadAuxiliaryData = async () => {
    try {
      const catRes = await api.get('/admin/public/categories');
      if (catRes.data.success) {
        setCategories(catRes.data.data);
      }
      const locRes = await api.get('/admin/public/locations');
      if (locRes.data.success) {
        setLocationsList(locRes.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch auxiliary lists:', err);
    }
  };

  useEffect(() => {
    loadCompanyDetails();
    loadAuxiliaryData();
  }, [loadCompanyDetails]);

  useEffect(() => {
    if (company) {
      loadJobs();
      loadApplicants();
      loadInterviews();
    }
  }, [company, loadJobs, loadApplicants, loadInterviews]);

  const fetchDossierDetails = async (appId) => {
    setDossierLoading(true);
    try {
      const res = await api.get(`/applications/${appId}`);
      if (res.data.success) {
        setDossierDetails(res.data.data);
      }
    } catch (err) {
      showToast('Error loading candidate dossier.', 'error');
    } finally {
      setDossierLoading(false);
    }
  };

  useEffect(() => {
    if (selectedApplicant) {
      fetchDossierDetails(selectedApplicant.id);
      setDrawerActiveTab('profile');
      setStatusRemarks('');
    } else {
      setDossierDetails(null);
    }
  }, [selectedApplicant]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedApplicant) return;
    setNoteSaving(true);
    try {
      const res = await api.post(`/applications/${selectedApplicant.id}/notes`, {
        note_text: newNoteText.trim()
      });
      if (res.data.success) {
        showToast('Private note added successfully.', 'success');
        setNewNoteText('');
        fetchDossierDetails(selectedApplicant.id);
      }
    } catch (err) {
      showToast('Failed to add note.', 'error');
    } finally {
      setNoteSaving(false);
    }
  };

  const handleReparseResume = async () => {
    if (!selectedApplicant) return;
    setDossierLoading(true);
    try {
      const res = await api.post(`/applications/${selectedApplicant.id}/parse-resume`);
      if (res.data.success) {
        showToast('Resume parsed successfully.', 'success');
        fetchDossierDetails(selectedApplicant.id);
        loadApplicants(); // Refresh applicants matching metrics
      }
    } catch (err) {
      showToast('Resume parsing failed.', 'error');
    } finally {
      setDossierLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await api.get('/reports/analytics');
      if (res.data.success) {
        setAnalytics(res.data.data);
      }
    } catch (err) {
      console.error('Error loading analytics:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'analytics') {
      fetchAnalytics();
    }
  }, [activeTab]);

  const handleExportCSV = async (reportType) => {
    try {
      const res = await api.get(`/reports/export/${reportType}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${reportType}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      showToast(`CSV report for ${reportType} downloaded successfully!`, 'success');
    } catch (err) {
      showToast('Failed to export CSV report.', 'error');
    }
  };

  // Handle Form changes
  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setJobFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skillId) => {
    const numericId = parseInt(skillId);
    setJobFormData(prev => {
      const isSelected = prev.skills.includes(numericId);
      const newSkills = isSelected 
        ? prev.skills.filter(id => id !== numericId)
        : [...prev.skills, numericId];
      return { ...prev, skills: newSkills };
    });
  };

  // Trigger Create/Edit Modal
  const openCreateModal = () => {
    setModalMode('create');
    setEditingJobId(null);
    setJobFormData({
      title: '',
      description: '',
      job_type: 'Full Time',
      salary_min: '',
      salary_max: '',
      location: locationsList.length > 0 ? `${locationsList[0].city}, ${locationsList[0].state}` : '',
      experience: '0-1 years',
      skills: [],
      status: 'active'
    });
    setIsJobModalOpen(true);
  };

  const openEditModal = (job) => {
    setModalMode('edit');
    setEditingJobId(job.id);
    
    // Convert skills object list to ID list
    const jobSkillIds = Array.isArray(job.skills) 
      ? job.skills.map(s => s.id).filter(Boolean) 
      : [];

    setJobFormData({
      title: job.title || '',
      description: job.description || '',
      job_type: job.job_type || 'Full Time',
      salary_min: job.salary_min || '',
      salary_max: job.salary_max || '',
      location: job.location || '',
      experience: job.experience || '0-1 years',
      skills: jobSkillIds,
      status: job.status || 'active'
    });
    setIsJobModalOpen(true);
  };

  // Save Job (Submit create/update)
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!company) return;

    const { title, description, job_type, salary_min, salary_max, location, experience, skills } = jobFormData;
    if (!title || !description || !salary_min || !salary_max || !location || !experience) {
      showToast('Please complete all standard fields.', 'warning');
      return;
    }

    setJobActionLoading(true);
    try {
      const payload = {
        title,
        description,
        company_id: company.id,
        salary_min: parseInt(salary_min),
        salary_max: parseInt(salary_max),
        job_type,
        location,
        experience,
        skills,
        status: jobFormData.status
      };

      let res;
      if (modalMode === 'create') {
        res = await api.post('/jobs', payload);
      } else {
        res = await api.put(`/jobs/${editingJobId}`, payload);
      }

      if (res.data.success) {
        showToast(
          modalMode === 'create' ? '🎉 Job opportunity published successfully.' : '✏️ Job details updated successfully.',
          'success'
        );
        setIsJobModalOpen(false);
        loadJobs();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error processing job posting.', 'error');
    } finally {
      setJobActionLoading(false);
    }
  };

  // Delete Job Posting
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting? This will remove associated applications.')) {
      return;
    }
    try {
      const res = await api.delete(`/jobs/${jobId}`);
      if (res.data.success) {
        showToast('🗑️ Job posting deleted successfully.', 'success');
        loadJobs();
        loadApplicants();
      }
    } catch (err) {
      showToast('Failed to delete job posting.', 'error');
    }
  };

  // Toggle Job Status
  const handleToggleJobStatus = async (job) => {
    const newStatus = job.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await api.put(`/jobs/${job.id}`, {
        status: newStatus
      });
      if (res.data.success) {
        showToast(`Job status changed to ${newStatus}.`, 'success');
        loadJobs();
      }
    } catch (err) {
      showToast('Failed to update job status.', 'error');
    }
  };

  // Update application status
  const handleUpdateStatus = async (appId, newStatus, interviewDetails = null) => {
    setStatusChangeLoading(true);
    try {
      const payload = { status: newStatus, remarks: statusRemarks, ...interviewDetails };
      const res = await api.put(`/applications/${appId}/status`, payload);
      if (res.data.success) {
        showToast(`Candidate status updated to "${newStatus}" successfully!`, 'success');
        setStatusRemarks(''); // clear remarks after successful save
        
        // Refetch or update local status with all details returned from backend
        const updatedAppData = res.data.data;
        setApplicants(prev => prev.map(app => {
          if (app.id === appId) {
            return { ...app, ...updatedAppData };
          }
          return app;
        }));
        
        if (selectedApplicant && selectedApplicant.id === appId) {
          setSelectedApplicant(prev => ({ ...prev, ...updatedAppData }));
        }
        setIsInterviewModalOpen(false);
        loadInterviews();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update application status.', 'error');
    } finally {
      setStatusChangeLoading(false);
    }
  };

  // Trigger update status check
  const triggerUpdateStatus = (appId, newStatus) => {
    const interviewRoundsList = ['Interview Scheduled', 'Technical Round', 'Managerial Round', 'HR Round', 'Final Round'];
    if (interviewRoundsList.includes(newStatus)) {
      setSchedulingAppId(appId);
      const existingApp = applicants.find(a => a.id === appId);
      
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
      setIsInterviewModalOpen(true);
    } else {
      handleUpdateStatus(appId, newStatus);
    }
  };

  // Update Company profile details
  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    if (!company) return;

    setCompanySaveLoading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', companyFormData.name);
      formDataObj.append('email', companyFormData.email);
      formDataObj.append('phone', companyFormData.phone);
      formDataObj.append('website', companyFormData.website);
      formDataObj.append('industry', companyFormData.industry);
      formDataObj.append('address', companyFormData.address);
      formDataObj.append('description', companyFormData.description);
      formDataObj.append('banner', companyFormData.banner);

      if (logoFile) {
        formDataObj.append('logo', logoFile);
      }

      const res = await api.put(`/companies/${company.id}`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        showToast('Company profile details saved successfully!', 'success');
        setCompany(res.data.data);
        setLogoFile(null);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save company profile.', 'error');
    } finally {
      setCompanySaveLoading(false);
    }
  };

  // Filter and rank applicants based on score, search query, job, and status
  const filteredApplicants = applicants.filter(app => {
    const matchSearch = 
      `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.email && app.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.skills && app.skills.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchJob = filterJobId === 'all' || app.job_id === parseInt(filterJobId);
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;

    return matchSearch && matchJob && matchStatus;
  }).sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

  // Analytics Metrics computation
  const activeJobsCount = jobs.filter(j => j.status === 'active').length;
  const totalAppsCount = applicants.length;
  const shortlistedAppsCount = applicants.filter(a => ['Shortlisted', 'Interview Scheduled', 'Interview', 'Selected', 'Hired'].includes(a.status)).length;
  const interviewScheduledCount = applicants.filter(a => ['Interview Scheduled', 'Interview'].includes(a.status)).length;

  // Compute Average Resume Match Score dynamically
  const appsWithScores = applicants.filter(a => a.match_score !== null && a.match_score !== undefined);
  const averageMatchScore = appsWithScores.length > 0
    ? Math.round(appsWithScores.reduce((sum, a) => sum + parseInt(a.match_score, 10), 0) / appsWithScores.length)
    : 0;

  return (
    <>
      <div className="recruiter-dashboard-layout animate-fade">
      {/* 1. Header Hero Panel */}
      <section className="dashboard-hero-panel">
        <div className="hero-glass-overlay" />
        <div className="hero-content-row">
          <div className="company-logo-badge">
            {company?.logo ? (
              <img src={`http://localhost:5000/uploads/images/${company.logo}`} alt="Logo" className="company-logo-img" />
            ) : (
              <div className="logo-placeholder-avatar">
                {company?.name ? company.name.substring(0, 2).toUpperCase() : 'CO'}
              </div>
            )}
          </div>
          <div className="company-meta-details">
            <h1 className="company-title">{company?.name || 'Loading Company...'}</h1>
            <p className="recruiter-badge">Registered Recruiter Workspace: <b>{user?.first_name} {user?.last_name}</b></p>
            {company?.website && (
              <a href={company.website} target="_blank" rel="noreferrer" className="company-link-btn">
                Visit Corporate Website ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 2. Overview Stats Quick Cards */}
      <div className="dashboard-grid-stats">
        <div className="stat-glass-card hover-glow">
          <div className="stat-header">
            <span className="stat-title">Active Openings</span>
            <Briefcase size={22} className="stat-icon orange-icon" />
          </div>
          <div className="stat-value">{activeJobsCount} / {jobs.length}</div>
          <span className="stat-meta">Published career posts</span>
        </div>

        <div className="stat-glass-card hover-glow">
          <div className="stat-header">
            <span className="stat-title">Total Applicants</span>
            <User size={22} className="stat-icon" />
          </div>
          <div className="stat-value">{totalAppsCount}</div>
          <span className="stat-meta">Candidates pipeline size</span>
        </div>

        <div className="stat-glass-card hover-glow">
          <div className="stat-header">
            <span className="stat-title">Average ATS Score</span>
            <Award size={22} className="stat-icon" style={{ color: 'var(--primary)' }} />
          </div>
          <div className="stat-value">{averageMatchScore}%</div>
          <span className="stat-meta">Overall match quality</span>
        </div>

        <div className="stat-glass-card hover-glow">
          <div className="stat-header">
            <span className="stat-title">Shortlisted Candidates</span>
            <Check size={22} className="stat-icon green-icon" />
          </div>
          <div className="stat-value">{shortlistedAppsCount}</div>
          <span className="stat-meta">Passed ATS rules screening</span>
        </div>

        <div className="stat-glass-card hover-glow">
          <div className="stat-header">
            <span className="stat-title">Interviews Scheduled</span>
            <Check size={22} className="stat-icon green-icon" />
          </div>
          <div className="stat-value">{interviewScheduledCount}</div>
          <span className="stat-meta font-sans">Active feedback process</span>
        </div>
      </div>

      {/* 3. Navigation Controls */}
      <nav className="dashboard-nav-tabs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`tab-link ${activeTab === 'overview' ? 'tab-link-active' : ''}`}
        >
          Overview & Insights
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`tab-link ${activeTab === 'jobs' ? 'tab-link-active' : ''}`}
        >
          Manage Jobs ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('applicants')}
          className={`tab-link ${activeTab === 'applicants' ? 'tab-link-active' : ''}`}
        >
          Candidate Pipeline ({applicants.length})
        </button>
        <button
          onClick={() => setActiveTab('interviews')}
          className={`tab-link ${activeTab === 'interviews' ? 'tab-link-active' : ''}`}
        >
          Interview Schedule ({interviews.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`tab-link ${activeTab === 'analytics' ? 'tab-link-active' : ''}`}
        >
          ATS Analytics
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`tab-link ${activeTab === 'reports' ? 'tab-link-active' : ''}`}
        >
          Hiring Reports
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`tab-link ${activeTab === 'company' ? 'tab-link-active' : ''}`}
        >
          Company Profile
        </button>
      </nav>

      {/* 4. Tab Contents rendering */}
      <div className="tab-render-container">
        
        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="overview-tab-view animate-fade">
            <div className="overview-graphics-grid">
              {/* Left Side: Inline SVG Area Chart */}
              <div className="chart-glass-panel">
                <h3 className="panel-heading">Pipeline Submissions Trend</h3>
                <p className="panel-subtext">Recent months application flow volume analysis</p>
                <div className="svg-chart-container">
                  <svg viewBox="0 0 500 200" className="svg-area-chart">
                    <defs>
                      <linearGradient id="recruiterAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="40" y1="30" x2="480" y2="30" stroke="var(--border-color)" strokeDasharray="4" />
                    <line x1="40" y1="80" x2="480" y2="80" stroke="var(--border-color)" strokeDasharray="4" />
                    <line x1="40" y1="130" x2="480" y2="130" stroke="var(--border-color)" strokeDasharray="4" />
                    <line x1="40" y1="170" x2="480" y2="170" stroke="var(--border-color)" strokeWidth="1.5" />
                    
                    {/* Area Graph line */}
                    <path
                      d="M 40 170 C 100 130, 150 145, 200 90 C 250 80, 300 120, 350 45 C 400 40, 450 70, 480 25 L 480 170 Z"
                      fill="url(#recruiterAreaGrad)"
                    />
                    <path
                      d="M 40 170 C 100 130, 150 145, 200 90 C 250 80, 300 120, 350 45 C 400 40, 450 70, 480 25"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="3.5"
                    />

                    {/* Chart Points */}
                    <circle cx="200" cy="90" r="5" fill="var(--primary)" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="350" cy="45" r="5" fill="var(--primary)" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="480" cy="25" r="5" fill="var(--primary)" stroke="#ffffff" strokeWidth="1.5" />

                    {/* Label Axes */}
                    <text x="40" y="190" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Feb</text>
                    <text x="150" y="190" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Mar</text>
                    <text x="260" y="190" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Apr</text>
                    <text x="370" y="190" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">May</text>
                    <text x="475" y="190" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Jun</text>

                    <text x="30" y="173" fill="var(--text-secondary)" fontSize="9" textAnchor="end">0</text>
                    <text x="30" y="133" fill="var(--text-secondary)" fontSize="9" textAnchor="end">10</text>
                    <text x="30" y="83" fill="var(--text-secondary)" fontSize="9" textAnchor="end">30</text>
                    <text x="30" y="33" fill="var(--text-secondary)" fontSize="9" textAnchor="end">50+</text>
                  </svg>
                </div>
              </div>

              {/* Right Side: Circular Metrics Panel */}
              <div className="chart-glass-panel flex-center-col">
                <h3 className="panel-heading">Match Shortlist Rate</h3>
                <p className="panel-subtext">Candidates meeting 60% skills requirement</p>
                <div className="progress-ring-container">
                  <svg width="120" height="120" className="progress-ring">
                    <circle cx="60" cy="60" r="50" className="progress-ring-bg" stroke="var(--border-color)" strokeWidth="10" fill="transparent" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className="progress-ring-fill"
                      stroke="var(--primary)"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="314.15"
                      strokeDashoffset={totalAppsCount > 0 ? 314.15 - (314.15 * shortlistedAppsCount) / totalAppsCount : 314.15}
                    />
                  </svg>
                  <div className="progress-ring-text">
                    <span className="percent-val">
                      {totalAppsCount > 0 ? Math.round((shortlistedAppsCount / totalAppsCount) * 100) : 0}%
                    </span>
                    <span className="percent-label">Shortlisted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent applications table snippet */}
            <div className="panel-listing-card">
              <div className="panel-listing-header">
                <h3 className="panel-heading">Recent Pipeline Submissions</h3>
                <button onClick={() => setActiveTab('applicants')} className="link-text-btn">
                  View full list &rarr;
                </button>
              </div>
              
              {applicantsLoading ? (
                <DashboardTableSkeleton />
              ) : applicants.length === 0 ? (
                <div className="empty-state-panel">
                  <User size={36} />
                  <p>No recent candidate applications received for your jobs.</p>
                </div>
              ) : (
                <div className="responsive-table-wrapper">
                  <table className="glass-table-layout">
                    <thead>
                      <tr>
                        <th>Applicant</th>
                        <th>Job Posting</th>
                        <th>Experience</th>
                        <th>Skills</th>
                        <th>Match</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.slice(0, 5).map(app => (
                        <tr key={app.id}>
                          <td>
                            <div className="applicant-cell-info">
                              <span className="c-name">{app.first_name} {app.last_name}</span>
                              <span className="c-email">{app.email}</span>
                            </div>
                          </td>
                          <td><b>{app.job_title}</b></td>
                          <td>{app.experience || 'N/A'}</td>
                          <td>
                            <div className="skills-tags-row">
                              {(app.skills || '').split(',').slice(0, 3).map((sk, idx) => (
                                <span key={idx} className="skill-badge-tag">{sk.trim()}</span>
                              ))}
                              {(app.skills || '').split(',').length > 3 && (
                                <span className="skill-badge-tag-more">+{app.skills.split(',').length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td>
                            {app.has_required_skills ? (
                              <span className="match-pill green-pill">✔ High Match</span>
                            ) : (
                              <span className="match-pill gray-pill">✘ Low Match</span>
                            )}
                          </td>
                          <td>
                            <span className={`status-pill ${app.status?.toLowerCase().replace(' ', '-')}`}>
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <button onClick={() => setSelectedApplicant(app)} className="btn-table-action view-btn">
                              Inspect Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== INTERVIEW SCHEDULE TAB ==================== */}
        {activeTab === 'interviews' && (
          <div className="interviews-tab-view animate-fade">
            <div className="tab-action-header-row">
              <div>
                <h3 className="panel-heading">Scheduled Interviews</h3>
                <p className="panel-subtext">Manage upcoming and historical candidate interview rounds</p>
              </div>
              <button 
                onClick={loadInterviews} 
                className="btn btn-secondary flex-center-row" 
                style={{ gap: '6px', border: 'none', cursor: 'pointer' }} 
                disabled={interviewsLoading}
              >
                <RefreshCw size={14} className={interviewsLoading ? 'animate-spin' : ''} /> Refresh Schedule
              </button>
            </div>

            {interviewsLoading ? (
              <DashboardTableSkeleton />
            ) : interviews.length === 0 ? (
              <div className="empty-state-panel large-empty">
                <Calendar size={54} className="empty-icon" />
                <h3>No interviews scheduled yet</h3>
                <p>Scheduled interviews will appear here. Go to the Candidate Pipeline to schedule interviews.</p>
              </div>
            ) : (
              <div className="responsive-table-wrapper">
                <table className="glass-table-layout">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Job Position</th>
                      <th>Round / Type</th>
                      <th>Scheduled Time</th>
                      <th>Interviewer</th>
                      <th>Link / Venue</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map(intr => (
                      <tr key={intr.id}>
                        <td>
                          <div className="applicant-cell-info">
                            <span className="c-name">{intr.first_name} {intr.last_name}</span>
                            <span className="c-email">{intr.candidate_email}</span>
                          </div>
                        </td>
                        <td><b>{intr.job_title}</b></td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontWeight: 'bold' }}>{intr.interview_round}</span>
                            <span className="job-type-badge" style={{ alignSelf: 'flex-start', fontSize: '10px', padding: '1px 6px' }}>
                              {intr.interview_type}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px' }}>
                            <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={12} className="orange-icon" /> {intr.interview_date}
                            </span>
                            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              <Clock size={12} /> {intr.interview_time}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>{intr.interviewer_name || 'N/A'}</span>
                            {intr.interviewer_email && <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{intr.interviewer_email}</span>}
                          </div>
                        </td>
                        <td>
                          {intr.interview_type === 'Online' ? (
                            intr.meeting_link ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <a 
                                  href={intr.meeting_link} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="link-text-btn"
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}
                                >
                                  Join Call <ExternalLink size={12} />
                                </a>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(intr.meeting_link);
                                    showToast('Meeting link copied!', 'success');
                                  }} 
                                  className="action-icon-btn" 
                                  title="Copy Link"
                                  style={{ padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                  <Copy size={12} />
                                </button>
                              </div>
                            ) : (
                              <span style={{ color: 'var(--text-tertiary)' }}>No link provided</span>
                            )
                          ) : (
                            <span style={{ fontSize: '12px' }} title={intr.venue}>{intr.venue || 'N/A'}</span>
                          )}
                        </td>
                        <td>
                          <span className={`status-pill ${intr.status?.toLowerCase()}`}>
                            {intr.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions-row" style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                window.open(`/interviews/${intr.id}`, '_blank');
                              }}
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '11px', border: 'none', cursor: 'pointer' }}
                              title="View Details"
                            >
                              Details
                            </button>
                            {intr.status === 'Scheduled' && (
                              <>
                                <button
                                  onClick={() => {
                                    setFeedbackInterviewId(intr.id);
                                    setFeedbackFormData({ interviewerName: intr.interviewer_name || '', feedbackText: '', rating: 5, recommendation: 'Recommend' });
                                    setIsFeedbackModalOpen(true);
                                  }}
                                  className="btn btn-primary"
                                  style={{ padding: '4px 8px', fontSize: '11px', border: 'none', cursor: 'pointer' }}
                                >
                                  Feedback
                                </button>
                                <button
                                  onClick={async () => {
                                    if (window.confirm('Cancel this scheduled interview?')) {
                                      try {
                                        const res = await api.post(`/interviews/${intr.id}/cancel`);
                                        if (res.data.success) {
                                          showToast('Interview cancelled successfully.', 'success');
                                          loadInterviews();
                                          loadApplicants();
                                        }
                                      } catch (err) {
                                        showToast('Failed to cancel interview.', 'error');
                                      }
                                    }
                                  }}
                                  className="action-icon-btn delete-icon-btn"
                                  style={{ padding: '6px' }}
                                  title="Cancel Interview"
                                >
                                  <X size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== JOBS TAB ==================== */}
        {activeTab === 'jobs' && (
          <div className="jobs-tab-view animate-fade">
            <div className="tab-action-header-row">
              <div>
                <h3 className="panel-heading">Manage Published Openings</h3>
                <p className="panel-subtext">Publish and update career postings for your company</p>
              </div>
              <button onClick={openCreateModal} className="btn btn-primary add-job-btn">
                <Plus size={18} /> Publish New Job
              </button>
            </div>

            {jobsLoading ? (
              <DashboardTableSkeleton />
            ) : jobs.length === 0 ? (
              <div className="empty-state-panel large-empty">
                <Briefcase size={54} className="empty-icon" />
                <h3>No jobs published yet</h3>
                <p>Start publishing open opportunities to attract candidate applications.</p>
                <button onClick={openCreateModal} className="btn btn-primary">
                  Publish First Job
                </button>
              </div>
            ) : (
              <div className="responsive-table-wrapper">
                <table className="glass-table-layout">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Location</th>
                      <th>Job Type</th>
                      <th>Salary Range</th>
                      <th>Experience Req.</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => (
                      <tr key={job.id}>
                        <td>
                          <div className="job-title-cell">
                            <b>{job.title}</b>
                            <span className="job-date">Posted on {new Date(job.created_at).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td>{job.location}</td>
                        <td>
                          <span className="job-type-badge">{job.job_type}</span>
                        </td>
                        <td>
                          ₹{job.salary_min?.toLocaleString()} - ₹{job.salary_max?.toLocaleString()}
                        </td>
                        <td>{job.experience}</td>
                        <td>
                          <button
                            onClick={() => handleToggleJobStatus(job)}
                            className={`status-indicator-btn ${job.status === 'active' ? 'active-stat' : 'inactive-stat'}`}
                            title="Click to toggle status"
                          >
                            <span className="dot" /> {job.status === 'active' ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td>
                          <div className="table-actions-row">
                            <button
                              onClick={() => openEditModal(job)}
                              className="action-icon-btn edit-icon-btn"
                              title="Edit Job Posting"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="action-icon-btn delete-icon-btn"
                              title="Delete Job Posting"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== APPLICANTS TAB ==================== */}
        {activeTab === 'applicants' && (
          <div className="applicants-tab-view animate-fade">
            <div className="tab-action-header-row">
              <div>
                <h3 className="panel-heading">Candidate Application Pipeline</h3>
                <p className="panel-subtext">Review qualifications and track candidate statuses</p>
              </div>
            </div>

            {/* Filter controls ribbon */}
            <div className="filters-ribbon-card">
              <div className="search-bar-wrapper">
                <Search size={18} className="search-bar-icon" />
                <input
                  type="text"
                  placeholder="Search candidate name, email, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-bar-input"
                />
              </div>

              <div className="select-filters-row">
                <div className="filter-select-wrapper">
                  <label>Filter by Job:</label>
                  <select value={filterJobId} onChange={(e) => setFilterJobId(e.target.value)}>
                    <option value="all">All Jobs</option>
                    {jobs.map(j => (
                      <option key={j.id} value={j.id}>{j.title}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-select-wrapper">
                  <label>Filter by Status:</label>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Statuses</option>
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

            {applicantsLoading ? (
              <DashboardTableSkeleton />
            ) : filteredApplicants.length === 0 ? (
              <div className="empty-state-panel">
                <Search size={36} />
                <p>No candidates found matching the selected search criteria.</p>
              </div>
            ) : (
              <div className="responsive-table-wrapper">
                <table className="glass-table-layout">
                  <thead>
                    <tr>
                      <th>Applicant Details</th>
                      <th>Job Post</th>
                      <th>Resume Score</th>
                      <th>AI Rec.</th>
                      <th>Status</th>
                      <th>Submission Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants.map(app => (
                      <tr key={app.id}>
                        <td>
                          <div className="applicant-cell-info">
                            <span className="c-name">{app.first_name} {app.last_name}</span>
                            <span className="c-email">{app.email}</span>
                            {app.phone && <span className="c-phone">{app.phone}</span>}
                          </div>
                        </td>
                        <td><b>{app.job_title}</b></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                              width: '38px', 
                              height: '38px', 
                              borderRadius: '50%', 
                              border: '2.5px solid var(--border-color)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justify: 'center', 
                              fontWeight: 'bold', 
                              fontSize: '11px', 
                              color: (app.match_score >= 80) ? '#48bb78' : (app.match_score >= 50) ? '#ecc94b' : '#f56565',
                              backgroundColor: 'rgba(255,255,255,0.03)'
                            }}>
                              {app.match_score ?? 0}%
                            </div>
                          </div>
                        </td>
                        <td>
                          {app.ats_recommendation === 'Recommend' && (
                            <span className="match-pill green-pill" style={{ display: 'inline-flex', padding: '4px 8px', borderRadius: '4px', background: 'rgba(72,187,120,0.15)', color: '#48bb78', fontWeight: 'bold', fontSize: '11px', border: '1px solid rgba(72,187,120,0.3)' }}>Recommend</span>
                          )}
                          {app.ats_recommendation === 'Review' && (
                            <span className="match-pill yellow-pill" style={{ display: 'inline-flex', padding: '4px 8px', borderRadius: '4px', background: 'rgba(236,201,75,0.15)', color: '#ecc94b', fontWeight: 'bold', fontSize: '11px', border: '1px solid rgba(236,201,75,0.3)' }}>Review</span>
                          )}
                          {app.ats_recommendation === 'Reject' && (
                            <span className="match-pill red-pill" style={{ display: 'inline-flex', padding: '4px 8px', borderRadius: '4px', background: 'rgba(245,101,101,0.15)', color: '#f56565', fontWeight: 'bold', fontSize: '11px', border: '1px solid rgba(245,101,101,0.3)' }}>Reject</span>
                          )}
                          {!app.ats_recommendation && (
                            <span className="match-pill gray-pill" style={{ display: 'inline-flex', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '11px', border: '1px solid var(--border-color)' }}>Review</span>
                          )}
                        </td>
                        <td>
                          <select
                            value={app.status}
                            onChange={(e) => triggerUpdateStatus(app.id, e.target.value)}
                            disabled={statusChangeLoading}
                            className={`status-dropdown-select ${app.status?.toLowerCase().replace(' ', '-')}`}
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
                        </td>
                        <td>{new Date(app.created_at).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => setSelectedApplicant(app)} className="btn btn-secondary inspect-details-btn">
                            Inspect Candidate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== COMPANY PROFILE TAB ==================== */}
        {activeTab === 'company' && (
          <div className="company-tab-view animate-fade">
            <h3 className="panel-heading">Modify Corporate Profile</h3>
            <p className="panel-subtext">Manage details visible to applicants on job postings</p>

            <form onSubmit={handleCompanySubmit} className="company-edit-form-theme glass-card">
              <div className="form-grid-layout">
                
                {/* Logo & Banner fields */}
                <div className="logo-upload-section">
                  <label className="form-label-title">Company Logo</label>
                  <div className="logo-preview-row">
                    <div className="company-logo-badge large-badge">
                      {logoFile ? (
                        <img src={URL.createObjectURL(logoFile)} alt="Logo Preview" className="company-logo-img" />
                      ) : company?.logo ? (
                        <img src={`http://localhost:5000/uploads/images/${company.logo}`} alt="Logo" className="company-logo-img" />
                      ) : (
                        <div className="logo-placeholder-avatar large-avatar">CO</div>
                      )}
                    </div>
                    <div className="logo-input-instructions">
                      <input
                        type="file"
                        id="logo-upload-input"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="logo-upload-input" className="btn btn-secondary upload-logo-btn">
                        Upload Logo Icon
                      </label>
                      <span className="file-hint-text">PNG, JPG, or WEBP up to 2MB</span>
                    </div>
                  </div>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/banner.jpg"
                    value={companyFormData.banner}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, banner: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                {/* Grid Inputs */}
                <div className="form-input-wrapper">
                  <label className="form-label-title">Company Name *</label>
                  <input
                    type="text"
                    value={companyFormData.name}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, name: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Website URL</label>
                  <input
                    type="url"
                    value={companyFormData.website}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, website: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Contact Email Address</label>
                  <input
                    type="email"
                    value={companyFormData.email}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, email: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Contact Phone Number</label>
                  <input
                    type="tel"
                    value={companyFormData.phone}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, phone: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Industry Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Software, Finance, Healthcare"
                    value={companyFormData.industry}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, industry: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-wrapper full-width">
                  <label className="form-label-title">Office Headquarter Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 101, Tech Park, Bangalore"
                    value={companyFormData.address}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, address: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-wrapper full-width">
                  <label className="form-label-title">Company Description / Summary</label>
                  <textarea
                    rows={4}
                    value={companyFormData.description}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, description: e.target.value })}
                    className="form-textarea-input"
                    placeholder="Write a brief pitch about your company culture, products, and services..."
                  />
                </div>
              </div>

              <div className="form-actions-bar">
                <button type="submit" className="btn btn-primary" disabled={companySaveLoading}>
                  {companySaveLoading ? 'Saving Profile...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== ATS ANALYTICS TAB ==================== */}
        {activeTab === 'analytics' && (
          <div className="analytics-tab-view animate-fade">
            <div className="tab-action-header-row">
              <div>
                <h3 className="panel-heading">ATS Analytics Dashboard</h3>
                <p className="panel-subtext">Real-time candidate pipelines and recruiter performance metrics</p>
              </div>
              <button onClick={fetchAnalytics} className="btn btn-secondary flex-center-row" style={{ gap: '6px', border: 'none', cursor: 'pointer' }} disabled={analyticsLoading}>
                <RefreshCw size={14} className={analyticsLoading ? 'animate-spin' : ''} /> Refresh Data
              </button>
            </div>

            {analyticsLoading && !analytics ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
                <span className="spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
              </div>
            ) : analytics ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* 1. Stat cards grid */}
                <div className="stat-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                  <div className="stat-glass-card">
                    <span className="stat-title">Total Applications</span>
                    <div className="stat-value" style={{ color: 'var(--primary)' }}>{analytics.metrics.totalApplications}</div>
                  </div>
                  <div className="stat-glass-card">
                    <span className="stat-title">Under Review</span>
                    <div className="stat-value" style={{ color: '#d69e2e' }}>{analytics.metrics.underReview}</div>
                  </div>
                  <div className="stat-glass-card">
                    <span className="stat-title">Shortlisted</span>
                    <div className="stat-value" style={{ color: '#3182ce' }}>{analytics.metrics.shortlisted}</div>
                  </div>
                  <div className="stat-glass-card">
                    <span className="stat-title">Interviews Scheduled</span>
                    <div className="stat-value" style={{ color: '#dd6b20' }}>{analytics.metrics.interviewsScheduled}</div>
                  </div>
                  <div className="stat-glass-card">
                    <span className="stat-title">Selected</span>
                    <div className="stat-value" style={{ color: '#319795' }}>{analytics.metrics.selected}</div>
                  </div>
                  <div className="stat-glass-card">
                    <span className="stat-title">Hired</span>
                    <div className="stat-value" style={{ color: 'var(--success)' }}>{analytics.metrics.hired}</div>
                  </div>
                  <div className="stat-glass-card">
                    <span className="stat-title">Rejected</span>
                    <div className="stat-value" style={{ color: 'var(--danger)' }}>{analytics.metrics.rejected}</div>
                  </div>
                </div>

                {/* 2. Charts Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                  
                  {/* Chart A: Monthly Applications */}
                  <div className="chart-glass-panel">
                    <h3 className="panel-heading">Monthly Applications</h3>
                    <p className="panel-subtext">Application submission counts over past months</p>
                    <div style={{ height: '220px', marginTop: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px', borderBottom: '2px solid var(--border-color)', position: 'relative' }}>
                      {analytics.monthlyApplications && analytics.monthlyApplications.length > 0 ? (
                        analytics.monthlyApplications.map((m, idx) => {
                          const maxCount = Math.max(...analytics.monthlyApplications.map(x => x.applications), 1);
                          const pct = (m.applications / maxCount) * 100;
                          return (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px', gap: '8px' }}>
                              <div style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 'bold' }}>{m.applications}</div>
                              <div style={{ height: `${pct * 1.5}px`, minHeight: '4px', width: '32px', background: 'linear-gradient(to top, var(--primary) 0%, #3182ce 100%)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease', cursor: 'pointer' }} title={`${m.month}: ${m.applications}`} />
                              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', transform: 'rotate(-25deg)', whiteSpace: 'nowrap', marginTop: '8px' }}>{m.month}</div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-tertiary)', paddingBottom: '80px' }}>No monthly data available.</div>
                      )}
                    </div>
                  </div>

                  {/* Chart B: Hiring Funnel */}
                  <div className="chart-glass-panel">
                    <h3 className="panel-heading">Hiring Funnel</h3>
                    <p className="panel-subtext">Stage-by-stage candidate pipeline distribution</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                      {analytics.funnel.map((stage, idx) => {
                        const totalFunnel = Math.max(...analytics.funnel.map(x => x.count), 1);
                        const pct = (stage.count / totalFunnel) * 100;
                        return (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '120px', fontSize: '13px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>{stage.stage}</div>
                            <div style={{ flexGrow: 1, height: '14px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #319795 0%, #3182ce 100%)', transition: 'width 0.5s ease' }} />
                            </div>
                            <div style={{ width: '30px', fontSize: '13px', fontWeight: 'bold', textAlign: 'right', color: 'var(--text-primary)' }}>{stage.count}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chart C: Job-wise Applications */}
                  <div className="chart-glass-panel">
                    <h3 className="panel-heading">Job-wise Applications Breakdown</h3>
                    <p className="panel-subtext">Top 5 jobs with highest candidate volume</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                      {analytics.jobWiseApplications && analytics.jobWiseApplications.length > 0 ? (
                        analytics.jobWiseApplications.map((job, idx) => {
                          const maxJobCount = Math.max(...analytics.jobWiseApplications.map(x => x.applications), 1);
                          const pct = (job.applications / maxJobCount) * 100;
                          return (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{job.title}</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{job.applications} apps</span>
                              </div>
                              <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px' }}>No job applications recorded.</div>
                      )}
                    </div>
                  </div>

                  {/* Chart D: Recruiter Performance */}
                  <div className="chart-glass-panel">
                    <h3 className="panel-heading">Recruiter Action Pipeline</h3>
                    <p className="panel-subtext">Unique candidates processed by recruiters</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                      {analytics.recruiterPerformance && analytics.recruiterPerformance.length > 0 ? (
                        analytics.recruiterPerformance.map((rec, idx) => {
                          const maxRecCount = Math.max(...analytics.recruiterPerformance.map(x => x.processed), 1);
                          const pct = (rec.processed / maxRecCount) * 100;
                          return (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div className="avatar-small" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, #3182ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
                                {rec.name.charAt(0)}
                              </div>
                              <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '2px' }}>
                                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{rec.name}</span>
                                  <span style={{ color: 'var(--text-secondary)' }}>{rec.processed} Candidates</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #dd6b20 0%, var(--primary) 100%)', transition: 'width 0.5s' }} />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px' }}>No recruiter actions tracked.</div>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="empty-state-panel">
                <BarChart2 size={48} />
                <p>No analytics data available. Run database seeding or wait for job applications.</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== HIRING REPORTS TAB ==================== */}
        {activeTab === 'reports' && (
          <div className="reports-tab-view animate-fade">
            <div className="tab-action-header-row print-hide">
              <div>
                <h3 className="panel-heading">ATS Audit & Exports</h3>
                <p className="panel-subtext">Generate professional spreadsheets and candidate compliance dossiers</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => window.print()} className="btn btn-secondary flex-center-row" style={{ gap: '6px', border: 'none', cursor: 'pointer' }}>
                  <FileDown size={14} /> Print Report (PDF)
                </button>
                <button onClick={() => handleExportCSV(activeReportType)} className="btn btn-primary flex-center-row" style={{ gap: '6px', border: 'none', cursor: 'pointer' }}>
                  <FileSpreadsheet size={14} /> Export CSV Spreadsheet
                </button>
              </div>
            </div>

            {/* Print Header */}
            <div className="print-only-header" style={{ display: 'none', marginBottom: '30px', borderBottom: '2px solid #2d3748', paddingBottom: '10px' }}>
              <h1 style={{ fontSize: '26px', margin: '0 0 5px 0', color: '#2d3748' }}>Job Portal System - ATS Report</h1>
              <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
                Report Type: <strong>{activeReportType.replace('-', ' ').toUpperCase()}</strong> | Date Generated: {new Date().toLocaleDateString()} | Author: {company?.name || 'Recruitment Team'}
              </p>
            </div>

            {/* Ribbon selectors */}
            <div className="filters-ribbon-card print-hide" style={{ padding: '10px', display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px' }}>
              <button onClick={() => setActiveReportType('hiring')} className={`btn ${activeReportType === 'hiring' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '13px', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                Hiring Report
              </button>
              <button onClick={() => setActiveReportType('recruiter-performance')} className={`btn ${activeReportType === 'recruiter-performance' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '13px', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                Recruiter Performance
              </button>
              <button onClick={() => setActiveReportType('monthly-hiring')} className={`btn ${activeReportType === 'monthly-hiring' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '13px', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                Monthly Hiring Report
              </button>
              <button onClick={() => setActiveReportType('job-wise')} className={`btn ${activeReportType === 'job-wise' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '13px', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                Job-wise Report
              </button>
              <button onClick={() => setActiveReportType('company-wise')} className={`btn ${activeReportType === 'company-wise' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '13px', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                Company-wise Report
              </button>
            </div>

            {/* Reports Tables */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 className="panel-heading" style={{ marginBottom: '16px' }}>
                {activeReportType === 'hiring' && 'Hiring Report Preview'}
                {activeReportType === 'recruiter-performance' && 'Recruiter Performance Report Preview'}
                {activeReportType === 'monthly-hiring' && 'Monthly Hiring Report Preview'}
                {activeReportType === 'job-wise' && 'Job-wise Applications Report Preview'}
                {activeReportType === 'company-wise' && 'Company-wise Operational Report Preview'}
              </h3>

              {activeReportType === 'hiring' && (
                <div className="responsive-table-wrapper">
                  <table className="glass-table-layout">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Email</th>
                        <th>Job Title</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.map(app => (
                        <tr key={app.id}>
                          <td><b>{app.first_name} {app.last_name}</b></td>
                          <td>{app.email}</td>
                          <td>{app.job_title}</td>
                          <td><span className={`status-pill ${app.status?.toLowerCase().replace(' ', '-')}`}>{app.status}</span></td>
                          <td>{new Date(app.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeReportType === 'recruiter-performance' && (
                <div className="responsive-table-wrapper">
                  <table className="glass-table-layout">
                    <thead>
                      <tr>
                        <th>Recruiter</th>
                        <th>Role Position</th>
                        <th>Email</th>
                        <th>Posted Jobs</th>
                        <th>Candidates Managed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><b>{user?.first_name} {user?.last_name}</b></td>
                        <td>Lead Technical Recruiter</td>
                        <td>{user?.email}</td>
                        <td>{jobs.length}</td>
                        <td>{applicants.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeReportType === 'monthly-hiring' && (
                <div className="responsive-table-wrapper">
                  <table className="glass-table-layout">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Applications Received</th>
                        <th>Successfully Hired</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics?.monthlyApplications ? (
                        analytics.monthlyApplications.map((m, idx) => (
                          <tr key={idx}>
                            <td><b>{m.month}</b></td>
                            <td>{m.applications}</td>
                            <td>{applicants.filter(a => a.status === 'Hired' && new Date(a.created_at).toLocaleDateString().includes(m.month.split(' ')[0])).length}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" style={{ textAlign: 'center' }}>No monthly records logged.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeReportType === 'job-wise' && (
                <div className="responsive-table-wrapper">
                  <table className="glass-table-layout">
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Posting Status</th>
                        <th>Job Type</th>
                        <th>Applications Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map(j => (
                        <tr key={j.id}>
                          <td><b>{j.title}</b></td>
                          <td><span className={`status-pill ${j.status === 'active' ? 'applied' : 'rejected'}`}>{j.status}</span></td>
                          <td>{j.job_type}</td>
                          <td>{applicants.filter(a => a.job_id === j.id).length} apps</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeReportType === 'company-wise' && (
                <div className="responsive-table-wrapper">
                  <table className="glass-table-layout">
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Website</th>
                        <th>Total Open Positions</th>
                        <th>Active Applications Pipeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {company && (
                        <tr>
                          <td><b>{company.name}</b></td>
                          <td><a href={company.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{company.website}</a></td>
                          <td>{jobs.length} open jobs</td>
                          <td>{applicants.length} candidates</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>

      {/* ==================== PUBLISH/EDIT JOB MODAL DIALOG ==================== */}
      {isJobModalOpen && (
        <div className="modal-backdrop-overlay animate-fade">
          <div className="modal-glass-card-container animate-slide-up">
            <div className="modal-header">
              <h2 className="modal-heading">
                {modalMode === 'create' ? 'Publish Job Opportunity' : 'Update Job Opportunity Details'}
              </h2>
              <button onClick={() => setIsJobModalOpen(false)} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="modal-form-theme">
              <div className="modal-form-grid">
                
                <div className="form-input-wrapper full-width">
                  <label className="form-label-title">Job Position Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={jobFormData.title}
                    onChange={handleJobInputChange}
                    className="form-text-input"
                    placeholder="e.g. Senior Frontend Engineer"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Job Type *</label>
                  <select name="job_type" value={jobFormData.job_type} onChange={handleJobInputChange} className="form-text-input">
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Location Requirement *</label>
                  <input
                    type="text"
                    name="location"
                    value={jobFormData.location}
                    onChange={handleJobInputChange}
                    className="form-text-input"
                    placeholder="e.g. Mumbai, MH or Remote"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Minimum Salary (Annual) *</label>
                  <input
                    type="number"
                    name="salary_min"
                    value={jobFormData.salary_min}
                    onChange={handleJobInputChange}
                    className="form-text-input"
                    placeholder="e.g. 600000"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Maximum Salary (Annual) *</label>
                  <input
                    type="number"
                    name="salary_max"
                    value={jobFormData.salary_max}
                    onChange={handleJobInputChange}
                    className="form-text-input"
                    placeholder="e.g. 1200000"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Experience Level Requirement *</label>
                  <select name="experience" value={jobFormData.experience} onChange={handleJobInputChange} className="form-text-input">
                    <option value="0-1 years">0-1 years (Entry)</option>
                    <option value="1-3 years">1-3 years (Junior)</option>
                    <option value="3-5 years">3-5 years (Mid)</option>
                    <option value="5-8 years">5-8 years (Senior)</option>
                    <option value="8+ years">8+ years (Lead/Director)</option>
                  </select>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Job Status</label>
                  <select name="status" value={jobFormData.status} onChange={handleJobInputChange} className="form-text-input">
                    <option value="active">Active (Open to Apply)</option>
                    <option value="inactive">Inactive (Closed / Draft)</option>
                  </select>
                </div>

                {/* Skills Checkbox selectors */}
                <div className="form-input-wrapper full-width">
                  <label className="form-label-title">Tag Required Skills</label>
                  <div className="skills-checklist-grid">
                    {globalSkills.map(sk => {
                      const isChecked = jobFormData.skills.includes(sk.id);
                      return (
                        <label key={sk.id} className="skill-check-item">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSkillToggle(sk.id)}
                          />
                          <span className="skill-check-text">{sk.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="form-input-wrapper full-width">
                  <label className="form-label-title">Job Role Description *</label>
                  <textarea
                    name="description"
                    rows={5}
                    value={jobFormData.description}
                    onChange={handleJobInputChange}
                    className="form-textarea-input"
                    placeholder="Outline job responsibilities, candidate specifications, perks, and requirements..."
                    required
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="button" onClick={() => setIsJobModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={jobActionLoading}>
                  {jobActionLoading ? 'Processing...' : modalMode === 'create' ? 'Publish Job Opportunity' : 'Save Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== INTERVIEW SCHEDULING MODAL ==================== */}
      {isInterviewModalOpen && (
        <div className="modal-backdrop-overlay animate-fade">
          <div className="modal-glass-card-container animate-slide-up" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h2 className="modal-heading">Schedule Candidate Interview</h2>
              <button 
                onClick={() => {
                  setIsInterviewModalOpen(false);
                }} 
                className="modal-close-btn"
              >
                <X size={24} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStatus(schedulingAppId, interviewFormData.interviewRound, interviewFormData);
              }} 
              className="modal-form-theme"
            >
              <div className="modal-form-grid">
                
                <div className="form-input-wrapper">
                  <label className="form-label-title">Interview Round *</label>
                  <select 
                    value={interviewFormData.interviewRound} 
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewRound: e.target.value })}
                    className="form-text-input"
                  >
                    <option value="Technical Round">Technical Round</option>
                    <option value="Managerial Round">Managerial Round</option>
                    <option value="HR Round">HR Round</option>
                    <option value="Final Round">Final Round (Optional)</option>
                  </select>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Round Number *</label>
                  <input
                    type="number"
                    min="1"
                    value={interviewFormData.roundNumber}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, roundNumber: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Interview Date *</label>
                  <input
                    type="date"
                    value={interviewFormData.interviewDate}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewDate: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Interview Time *</label>
                  <input
                    type="time"
                    value={interviewFormData.interviewTime}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewTime: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Duration</label>
                  <select 
                    value={interviewFormData.duration}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, duration: e.target.value })}
                    className="form-text-input"
                  >
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="60 minutes">60 minutes</option>
                    <option value="90 minutes">90 minutes</option>
                  </select>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Timezone</label>
                  <input
                    type="text"
                    value={interviewFormData.timezone}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, timezone: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Interview Mode *</label>
                  <select 
                    value={interviewFormData.interviewMode} 
                    onChange={(e) => setInterviewFormData({ 
                      ...interviewFormData, 
                      interviewMode: e.target.value,
                      meetingLink: '',
                      venue: '' 
                    })} 
                    className="form-text-input"
                  >
                    <option value="Online">Online / Video Call</option>
                    <option value="Offline">Offline / Face-to-Face</option>
                  </select>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Interviewer Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={interviewFormData.interviewerName}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewerName: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Interviewer Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Engineer"
                    value={interviewFormData.interviewerDesignation}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewerDesignation: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering"
                    value={interviewFormData.department}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, department: e.target.value })}
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-wrapper full-width">
                  <label className="form-label-title">Interviewer Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g. john.doe@company.com"
                    value={interviewFormData.interviewerEmail}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewerEmail: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                {interviewFormData.interviewMode === 'Online' ? (
                  <div className="form-input-wrapper full-width">
                    <label className="form-label-title">Meeting Link *</label>
                    <input
                      type="url"
                      placeholder="e.g. https://meet.google.com/abc-defg-hij"
                      value={interviewFormData.meetingLink}
                      onChange={(e) => setInterviewFormData({ ...interviewFormData, meetingLink: e.target.value })}
                      className="form-text-input"
                      required
                    />
                  </div>
                ) : (
                  <div className="form-input-wrapper full-width">
                    <label className="form-label-title">Office Venue Location *</label>
                    <input
                      type="text"
                      placeholder="e.g. Conference Room A, HQ Bangalore"
                      value={interviewFormData.venue}
                      onChange={(e) => setInterviewFormData({ ...interviewFormData, venue: e.target.value })}
                      className="form-text-input"
                      required
                    />
                  </div>
                )}

                <div className="form-input-wrapper full-width">
                  <label className="form-label-title">Preparation Instructions</label>
                  <textarea
                    rows={2}
                    placeholder="Provide details about format, files to bring, etc."
                    value={interviewFormData.instructions}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, instructions: e.target.value })}
                    className="form-textarea-input"
                  />
                </div>

              </div>

              <div className="modal-actions-bar">
                <button 
                  type="button" 
                  onClick={() => setIsInterviewModalOpen(false)} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={statusChangeLoading}>
                  {statusChangeLoading ? 'Scheduling...' : 'Save & Schedule Interview'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== CANDIDATE DETAIL DRAWER MODAL ==================== */}
      {selectedApplicant && (
        <div 
          className="modal-backdrop-overlay animate-fade" 
          style={{ zIndex: 999999, cursor: 'pointer' }}
          onClick={() => setSelectedApplicant(null)}
        >
          <div 
            className="drawer-panel-container animate-slide-left" 
            style={{ width: '800px', maxWidth: '90vw', display: 'flex', flexDirection: 'column', cursor: 'default' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 className="drawer-heading" style={{ margin: 0 }}>Candidate Dossier & ATS</h3>
                {dossierLoading && <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />}
              </div>
              <button onClick={() => setSelectedApplicant(null)} className="drawer-close-btn" style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={24} />
              </button>
            </div>

            {/* Tab buttons for dossier drawer */}
            <div className="drawer-nav-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', padding: '10px 24px', background: 'var(--bg-secondary)', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setSelectedApplicant(null)} 
                style={{ 
                  border: '1px solid var(--border-color)', 
                  background: 'var(--bg-tertiary)', 
                  padding: '8px 16px', 
                  fontSize: '13px', 
                  fontWeight: 'bold', 
                  color: 'var(--text-primary)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginRight: '12px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'background-color 0.2s'
                }}
              >
                ← Go Back
              </button>
              <button onClick={() => setDrawerActiveTab('profile')} className={`drawer-tab-link ${drawerActiveTab === 'profile' ? 'active' : ''}`} style={{ border: 'none', background: 'none', padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', borderBottom: drawerActiveTab === 'profile' ? '3px solid var(--primary)' : 'none', color: drawerActiveTab === 'profile' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                Profile & Resume
              </button>
              <button onClick={() => setDrawerActiveTab('timeline')} className={`drawer-tab-link ${drawerActiveTab === 'timeline' ? 'active' : ''}`} style={{ border: 'none', background: 'none', padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', borderBottom: drawerActiveTab === 'timeline' ? '3px solid var(--primary)' : 'none', color: drawerActiveTab === 'timeline' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                ATS Timeline
              </button>
              <button onClick={() => setDrawerActiveTab('interviews')} className={`drawer-tab-link ${drawerActiveTab === 'interviews' ? 'active' : ''}`} style={{ border: 'none', background: 'none', padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', borderBottom: drawerActiveTab === 'interviews' ? '3px solid var(--primary)' : 'none', color: drawerActiveTab === 'interviews' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                Interviews
              </button>
              <button onClick={() => setDrawerActiveTab('notes')} className={`drawer-tab-link ${drawerActiveTab === 'notes' ? 'active' : ''}`} style={{ border: 'none', background: 'none', padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', borderBottom: drawerActiveTab === 'notes' ? '3px solid var(--primary)' : 'none', color: drawerActiveTab === 'notes' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                Private Notes
              </button>
            </div>

            <div className="drawer-scroll-body" style={{ padding: '24px', overflowY: 'auto', flexGrow: 1, maxHeight: 'calc(100vh - 120px)' }}>
              
              {/* Header profile card info */}
              <div className="drawer-profile-card text-center" style={{ marginBottom: '24px', textAlign: 'center' }}>
                <div className="drawer-avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, #3182ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: 'bold', margin: '0 auto 12px auto' }}>
                  {selectedApplicant.first_name.charAt(0)}{selectedApplicant.last_name.charAt(0)}
                </div>
                <h2 className="profile-fullname" style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{selectedApplicant.first_name} {selectedApplicant.last_name}</h2>
                <span className="profile-role-sub text-tertiary" style={{ fontSize: '13px' }}>
                  Applicant to <b>{selectedApplicant.job_title}</b> • Current Status: <span className={`status-pill ${selectedApplicant.status?.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '11px', display: 'inline-block' }}>{selectedApplicant.status}</span>
                </span>
              </div>

              {/* DRAWER CONTENT BY TAB */}
              {drawerActiveTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                  
                  {/* AI ATS Analysis Summary Card */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '18px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>AI ATS Analysis Summary</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                      <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        borderRadius: '50%', 
                        border: '4px solid var(--border-color)', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justify: 'center', 
                        fontWeight: 'bold', 
                        fontSize: '16px', 
                        color: ((dossierDetails?.score_data?.match_score ?? selectedApplicant.match_score ?? 0) >= 80) ? '#48bb78' : ((dossierDetails?.score_data?.match_score ?? selectedApplicant.match_score ?? 0) >= 50) ? '#ecc94b' : '#f56565',
                        backgroundColor: 'rgba(255,255,255,0.02)'
                      }}>
                        <span>{dossierDetails?.score_data?.match_score ?? selectedApplicant.match_score ?? 0}%</span>
                        <span style={{ fontSize: '9px', fontWeight: 'normal', color: 'var(--text-secondary)' }}>Score</span>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <strong>AI Recommendation:</strong>
                          {(dossierDetails?.score_data?.ats_recommendation ?? selectedApplicant.ats_recommendation) === 'Recommend' && (
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(72,187,120,0.15)', color: '#48bb78', fontWeight: 'bold', fontSize: '12px' }}>Recommend</span>
                          )}
                          {(dossierDetails?.score_data?.ats_recommendation ?? selectedApplicant.ats_recommendation) === 'Review' && (
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(236,201,75,0.15)', color: '#ecc94b', fontWeight: 'bold', fontSize: '12px' }}>Review</span>
                          )}
                          {(dossierDetails?.score_data?.ats_recommendation ?? selectedApplicant.ats_recommendation) === 'Reject' && (
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(245,101,101,0.15)', color: '#f56565', fontWeight: 'bold', fontSize: '12px' }}>Reject</span>
                          )}
                          {!(dossierDetails?.score_data?.ats_recommendation ?? selectedApplicant.ats_recommendation) && (
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '12px' }}>Review</span>
                          )}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                          Screening Details: {(dossierDetails?.score_data?.match_score ?? selectedApplicant.match_score ?? 0) >= 80 ? 'Highly Qualified (Auto-Shortlisted)' : (dossierDetails?.score_data?.match_score ?? selectedApplicant.match_score ?? 0) >= 50 ? 'Requires Manual Recruiter Review' : 'Below Threshold Match Rate'}
                        </div>
                      </div>
                    </div>

                    {/* Matched and Missing Skills lists */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <div>
                        <strong style={{ color: '#48bb78', display: 'flex', alignItems: 'center', gap: '4px' }}>✔ Matched Skills</strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                          {(dossierDetails?.score_data?.matched_skills ?? selectedApplicant.matched_skills) ? (
                            (dossierDetails?.score_data?.matched_skills ?? selectedApplicant.matched_skills).split(',').map((s, i) => (
                              <span key={i} style={{ padding: '2px 6px', background: 'rgba(72,187,120,0.08)', border: '1px solid rgba(72,187,120,0.2)', color: '#48bb78', borderRadius: '4px', fontSize: '11px' }}>{s.trim()}</span>
                            ))
                          ) : (
                            <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>None</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <strong style={{ color: '#f56565', display: 'flex', alignItems: 'center', gap: '4px' }}>✘ Missing Skills</strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                          {(dossierDetails?.score_data?.missing_skills ?? selectedApplicant.missing_skills) ? (
                            (dossierDetails?.score_data?.missing_skills ?? selectedApplicant.missing_skills).split(',').map((s, i) => (
                              <span key={i} style={{ padding: '2px 6px', background: 'rgba(245,101,101,0.08)', border: '1px solid rgba(245,101,101,0.2)', color: '#f56565', borderRadius: '4px', fontSize: '11px' }}>{s.trim()}</span>
                            ))
                          ) : (
                            <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Contact Info */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Contact Info</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
                      <div><strong>Email:</strong> {selectedApplicant.email}</div>
                      <div><strong>Phone:</strong> {selectedApplicant.phone || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Resume Parser Details */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 className="detail-section-title" style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Resume Parser Extraction</h4>
                      <button onClick={handleReparseResume} className="btn-text-action flex-center-row" style={{ gap: '4px', cursor: 'pointer', border: 'none', background: 'none', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }} title="Re-execute file extraction rules">
                        <RefreshCw size={12} /> <span style={{ marginLeft: '4px' }}>Re-Parse Resume</span>
                      </button>
                    </div>

                    {dossierDetails && dossierDetails.resume_data ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                        <div><strong>Extracted Name:</strong> {dossierDetails.resume_data.full_name || dossierDetails.resume_data.name || 'N/A'}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                          <div><strong>Extracted Email:</strong> {dossierDetails.resume_data.email || 'N/A'}</div>
                          <div><strong>Extracted Phone:</strong> {dossierDetails.resume_data.phone || 'N/A'}</div>
                        </div>
                        <div><strong>Education:</strong> {dossierDetails.resume_data.education || 'N/A'}</div>
                        <div><strong>Experience:</strong> {dossierDetails.resume_data.experience || 'N/A'}</div>
                        <div><strong>Certifications:</strong> {dossierDetails.resume_data.certifications || 'N/A'}</div>
                        <div><strong>Projects:</strong> {dossierDetails.resume_data.projects || 'N/A'}</div>
                        <div>
                          <strong>Skills Extracted:</strong>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                            {(dossierDetails.resume_data.skills || '').split(',').map((sk, idx) => (
                              <span key={idx} className="skill-badge-tag" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{sk.trim()}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>No parsed resume data available. Click Re-Parse to extract.</p>
                    )}
                  </div>

                  {/* Resume PDF Embed Preview */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Resume Preview & Download</h4>
                    <iframe
                      src={`http://localhost:5000/uploads/resumes/${selectedApplicant.resume}`}
                      style={{ width: '100%', height: '400px', border: '1px solid var(--border-color)', borderRadius: '4px', marginBottom: '10px' }}
                      title="Candidate Resume Preview"
                    />
                    <a
                      href={`http://localhost:5000/uploads/resumes/${selectedApplicant.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary flex-center-row"
                      style={{ width: '100%', gap: '6px', justifyContent: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                    >
                      <Download size={14} /> <span>Download Document</span>
                    </a>
                  </div>

                  {/* Cover letter text */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Structured Cover Letter Details</h4>
                    <pre className="cover-letter-preview" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '12px', margin: 0, textAlign: 'left' }}>
                      {selectedApplicant.cover_letter || 'No details provided.'}
                    </pre>
                  </div>

                </div>
              )}

              {drawerActiveTab === 'timeline' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                  
                  {/* Status changer form */}
                  <div className="drawer-status-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Advance Pipeline State</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        <div className="form-input-wrapper" style={{ marginBottom: 0 }}>
                          <label className="form-label-title" style={{ fontSize: '12px' }}>New Pipeline Status</label>
                          <select
                            value={selectedApplicant.status}
                            onChange={(e) => triggerUpdateStatus(selectedApplicant.id, e.target.value)}
                            disabled={statusChangeLoading}
                            className="form-text-input"
                            style={{ fontWeight: 'bold' }}
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
                        
                        <div className="form-input-wrapper" style={{ marginBottom: 0 }}>
                          <label className="form-label-title" style={{ fontSize: '12px' }}>Status Remarks / Change Notes</label>
                          <input
                            type="text"
                            placeholder="Optional remark (e.g. Good communication skills)"
                            value={statusRemarks}
                            onChange={(e) => setStatusRemarks(e.target.value)}
                            className="form-text-input"
                          />
                        </div>
                      </div>
                      
                      {!['Interview Scheduled', 'Technical Round', 'Managerial Round', 'HR Round', 'Final Round'].includes(selectedApplicant.status) && (
                        <button
                          onClick={() => handleUpdateStatus(selectedApplicant.id, selectedApplicant.status)}
                          className="btn btn-primary"
                          style={{ width: '100%', cursor: 'pointer', border: 'none' }}
                          disabled={statusChangeLoading}
                        >
                          {statusChangeLoading ? 'Saving Transition...' : 'Update Pipeline Status & Dispatch Email'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Application timeline history */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 16px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Status Timeline Trail</h4>
                    
                    <div className="timeline-trail" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--border-color)', marginLeft: '12px' }}>
                      {dossierDetails && dossierDetails.timeline && dossierDetails.timeline.length > 0 ? (
                        dossierDetails.timeline.map((event, idx) => (
                          <div key={event.id} className="timeline-node" style={{ position: 'relative', textAlign: 'left' }}>
                            <span className="timeline-dot" style={{
                              position: 'absolute',
                              left: '-30px',
                              top: '4px',
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: idx === dossierDetails.timeline.length - 1 ? 'var(--primary)' : 'var(--text-tertiary)',
                              boxShadow: idx === dossierDetails.timeline.length - 1 ? '0 0 8px var(--primary)' : 'none',
                              zIndex: 2
                            }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{event.status}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                                {new Date(event.created_at).toLocaleString()}
                                {event.changed_by_first && ` by ${event.changed_by_first} ${event.changed_by_last}`}
                              </span>
                            </div>
                            {event.remarks && (
                              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', fontStyle: 'italic', background: 'var(--bg-tertiary)', padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                Remarks: {event.remarks}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>No status changes recorded yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Email logs */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Nodemailer Dispatch History</h4>
                    
                    {dossierDetails && dossierDetails.emails && dossierDetails.emails.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {dossierDetails.emails.map(email => (
                          <div key={email.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '13px', textAlign: 'left' }}>
                            <div>
                              <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{email.subject}</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Sent to {email.to_email} on {new Date(email.created_at).toLocaleString()}</div>
                            </div>
                            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', backgroundColor: email.status === 'Sent' ? '#c6f6d5' : '#fed7d7', color: email.status === 'Sent' ? '#22543d' : '#742a2a' }}>
                              {email.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>No automated emails dispatched for this application.</p>
                    )}
                  </div>

                </div>
              )}

              {drawerActiveTab === 'interviews' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                  
                  {/* Schedule action button */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Interview Scheduler</h4>
                    <button
                      onClick={() => triggerUpdateStatus(selectedApplicant.id, 'Interview Scheduled')}
                      className="btn btn-primary flex-center-row"
                      style={{ width: '100%', gap: '6px', justifyContent: 'center', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Plus size={16} /> <span>Schedule New Interview Round</span>
                    </button>
                  </div>

                  {/* Active scheduled interviews list */}
                  {dossierDetails && dossierDetails.interviews && dossierDetails.interviews.length > 0 && (
                    <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                      <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Scheduled & Historic Rounds</h4>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {dossierDetails.interviews.map((intr) => (
                          <div key={intr.id} style={{ padding: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{intr.interview_round}</strong>
                              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', backgroundColor: intr.status === 'Scheduled' ? '#feebc8' : (intr.status === 'Completed' ? '#c6f6d5' : '#fed7d7'), color: intr.status === 'Scheduled' ? '#c05621' : (intr.status === 'Completed' ? '#22543d' : '#742a2a') }}>
                                {intr.status}
                              </span>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                              <div><strong>Date & Time:</strong> {intr.interview_date} at {intr.interview_time}</div>
                              <div><strong>Mode:</strong> {intr.interview_type}</div>
                              <div><strong>Interviewer:</strong> {intr.interviewer_name} ({intr.interviewer_email || 'N/A'})</div>
                              {intr.interview_type === 'Online' ? (
                                <div><strong>Meeting:</strong> <a href={intr.meeting_link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Join Call</a></div>
                              ) : (
                                <div><strong>Venue:</strong> {intr.venue}</div>
                              )}
                            </div>

                            {intr.additional_instructions && (
                              <div style={{ fontSize: '12px', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid var(--primary)', marginBottom: '10px' }}>
                                <strong>Instructions:</strong> {intr.additional_instructions}
                              </div>
                            )}

                            {/* Interview Feedback list */}
                            {intr.feedback && intr.feedback.length > 0 ? (
                              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--border-color)', fontSize: '13px' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Interview Feedback:</strong>
                                {intr.feedback.map(fb => (
                                  <div key={fb.id} style={{ background: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border-color)', marginTop: '6px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '12px' }}>
                                      <span>By {fb.interviewer_name}</span>
                                      <span style={{ color: 'var(--primary)' }}>Rating: {fb.rating || 'N/A'}/5</span>
                                    </div>
                                    <p style={{ margin: '4px 0 0 0', fontStyle: 'italic' }}>{fb.feedback_text}</p>
                                  </div>
                                ))}
                              </div>
                            ) : null}

                            {/* Actions for Scheduled interviews */}
                            {intr.status === 'Scheduled' && (
                              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                <button
                                  onClick={async () => {
                                    if (window.confirm('Cancel this scheduled interview?')) {
                                      try {
                                        const res = await api.post(`/interviews/${intr.id}/cancel`);
                                        if (res.data.success) {
                                          showToast('Interview cancelled successfully.', 'success');
                                          fetchDossierDetails(selectedApplicant.id);
                                          loadApplicants();
                                        }
                                      } catch (err) {
                                        showToast('Failed to cancel interview.', 'error');
                                      }
                                    }
                                  }}
                                  className="btn btn-secondary"
                                  style={{ padding: '6px 12px', fontSize: '12px', flexGrow: 1, border: 'none', cursor: 'pointer' }}
                                >
                                  Cancel Interview
                                </button>
                                <button
                                  onClick={() => {
                                    setFeedbackInterviewId(intr.id);
                                    setFeedbackFormData({ interviewerName: intr.interviewer_name || '', feedbackText: '', rating: 5, recommendation: 'Recommend' });
                                    setIsFeedbackModalOpen(true);
                                  }}
                                  className="btn btn-primary"
                                  style={{ padding: '6px 12px', fontSize: '12px', flexGrow: 1, border: 'none', cursor: 'pointer' }}
                                >
                                  Submit Feedback
                                </button>
                              </div>
                            )}

                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {drawerActiveTab === 'notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                  
                  {/* Add Private Note Form */}
                  <form onSubmit={handleAddNote} className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 className="detail-section-title" style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Add Recruiter Note</h4>
                    <textarea
                      rows={3}
                      placeholder="e.g. Good communication skills, strong React expertise, recommended for technical round."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="form-textarea-input"
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', cursor: 'pointer', border: 'none' }} disabled={noteSaving}>
                      {noteSaving ? 'Saving note...' : 'Save Private Note'}
                    </button>
                  </form>

                  {/* Notes history list */}
                  <div className="drawer-detail-card glass-panel" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <h4 className="detail-section-title" style={{ margin: '0 0 12px 0', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Private Notes Trail</h4>
                    
                    {dossierDetails && dossierDetails.notes && dossierDetails.notes.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {dossierDetails.notes.map(note => (
                          <div key={note.id} style={{ padding: '12px 14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '13px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                              <span>{note.recruiter_first} {note.recruiter_last}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{new Date(note.created_at).toLocaleDateString()}</span>
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{note.note_text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>No private notes recorded for this applicant.</p>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-MODAL: INTERVIEW FEEDBACK MODAL ==================== */}
      {isFeedbackModalOpen && (
        <div className="modal-backdrop-overlay animate-fade" style={{ zIndex: 110 }}>
          <div className="modal-glass-card-container animate-slide-up" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 className="modal-heading">Submit Interview Feedback</h2>
              <button onClick={() => setIsFeedbackModalOpen(false)} className="modal-close-btn" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await api.post(`/interviews/${feedbackInterviewId}/feedback`, {
                    interviewer_name: feedbackFormData.interviewerName,
                    feedback_text: feedbackFormData.feedbackText,
                    rating: feedbackFormData.rating,
                    recommendation: feedbackFormData.recommendation
                  });
                  if (res.data.success) {
                    showToast('Feedback submitted successfully and status advanced to Interview Completed!', 'success');
                    setIsFeedbackModalOpen(false);
                    if (selectedApplicant) {
                      fetchDossierDetails(selectedApplicant.id);
                    }
                    loadApplicants();
                    loadInterviews();
                  }
                } catch (err) {
                  showToast('Failed to submit interview feedback.', 'error');
                }
              }}
              className="modal-form-theme"
            >
              <div className="modal-form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-input-wrapper">
                  <label className="form-label-title">Interviewer Name *</label>
                  <input
                    type="text"
                    value={feedbackFormData.interviewerName}
                    onChange={(e) => setFeedbackFormData({ ...feedbackFormData, interviewerName: e.target.value })}
                    className="form-text-input"
                    required
                  />
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Interviewer Rating (1 to 5) *</label>
                  <select
                    value={feedbackFormData.rating}
                    onChange={(e) => setFeedbackFormData({ ...feedbackFormData, rating: parseInt(e.target.value) })}
                    className="form-text-input"
                  >
                    <option value={5}>5 - Excellent Fit</option>
                    <option value={4}>4 - Good Fit</option>
                    <option value={3}>3 - Average Fit</option>
                    <option value={2}>2 - Below Average</option>
                    <option value={1}>1 - Weak Fit</option>
                  </select>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Hiring Recommendation *</label>
                  <select
                    value={feedbackFormData.recommendation}
                    onChange={(e) => setFeedbackFormData({ ...feedbackFormData, recommendation: e.target.value })}
                    className="form-text-input"
                  >
                    <option value="Recommend">Recommend (Advance to next stage)</option>
                    <option value="Strongly Recommend">Strongly Recommend (Mark Selected)</option>
                    <option value="Hold">Hold</option>
                    <option value="Reject">Reject (Mark Rejected)</option>
                  </select>
                </div>

                <div className="form-input-wrapper">
                  <label className="form-label-title">Written Evaluation Feedback *</label>
                  <textarea
                    rows={4}
                    placeholder="Provide technical evaluation, coding skills review, communication observations..."
                    value={feedbackFormData.feedbackText}
                    onChange={(e) => setFeedbackFormData({ ...feedbackFormData, feedbackText: e.target.value })}
                    className="form-textarea-input"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="button" onClick={() => setIsFeedbackModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Feedback & Complete Round
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Embedded inline vanilla stylesheet system */}
      <style>{`
        .recruiter-dashboard-layout {
          max-width: var(--container-max);
          margin: 40px auto;
          padding: 0 20px;
          color: var(--text-primary);
        }

        /* 1. Hero Panel styling */
        .dashboard-hero-panel {
          position: relative;
          background: linear-gradient(135deg, #2b170c 0%, #0d1324 100%);
          border-radius: var(--radius-lg);
          padding: 40px;
          margin-bottom: 30px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .hero-glass-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, rgba(255, 81, 0, 0.12), transparent 60%);
          pointer-events: none;
        }

        .hero-content-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .company-logo-badge {
          width: 90px;
          height: 90px;
          background-color: #ffffff;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 2px solid var(--primary);
          box-shadow: var(--shadow-md);
        }

        .company-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .logo-placeholder-avatar {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          color: var(--primary);
        }

        .company-meta-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .company-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #ffffff;
          margin: 0;
        }

        .recruiter-badge {
          color: var(--text-secondary);
          font-size: 14px;
          margin: 0;
        }

        .company-link-btn {
          align-self: flex-start;
          margin-top: 6px;
          color: var(--primary);
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .company-link-btn:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }

        /* 2. Grid stats quick cards */
        .dashboard-grid-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 35px;
        }

        .stat-glass-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .stat-glass-card.hover-glow:hover {
          transform: translateY(-2px);
          border-color: var(--primary-glow);
          box-shadow: var(--shadow-lg), 0 0 15px var(--primary-glow);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-icon {
          color: var(--text-tertiary);
        }

        .stat-icon.orange-icon {
          color: var(--primary);
        }

        .stat-icon.green-icon {
          color: var(--success);
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-meta {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        /* 3. Navigation Controls tabs */
        .dashboard-nav-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid var(--border-color);
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .tab-link {
          background: none;
          border: none;
          padding: 14px 24px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 14px;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color var(--transition-fast);
          white-space: nowrap;
        }

        .tab-link:hover {
          color: var(--primary);
        }

        .tab-link-active {
          color: var(--text-primary);
        }

        .tab-link-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--primary);
          border-radius: var(--radius-full);
        }

        /* 4. Tab contents common styling */
        .tab-render-container {
          min-height: 300px;
        }

        .tab-action-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          gap: 20px;
        }

        .panel-heading {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 4px 0;
          color: var(--text-primary);
        }

        .panel-subtext {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Overview Tab Layout */
        .overview-graphics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }

        .chart-glass-panel {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .flex-center-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .svg-chart-container {
          width: 100%;
          margin-top: 15px;
        }

        .svg-area-chart {
          width: 100%;
          height: auto;
          display: block;
        }

        .progress-ring-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin-top: 25px;
        }

        .progress-ring-fill {
          transform: rotate(-90deg);
          transform-origin: 60px 60px;
          transition: stroke-dashoffset 0.8s ease-in-out;
        }

        .progress-ring-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .percent-val {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .percent-label {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          margin-top: 2px;
        }

        .panel-listing-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .panel-listing-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .link-text-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .link-text-btn:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }

        /* Glass table layout defaults */
        .responsive-table-wrapper {
          width: 100%;
          overflow-x: auto;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .glass-table-layout {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .glass-table-layout th {
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: 700;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          font-family: var(--font-display);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .glass-table-layout td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
          vertical-align: middle;
        }

        .glass-table-layout tbody tr:last-child td {
          border-bottom: none;
        }

        .glass-table-layout tbody tr:hover td {
          background-color: rgba(255, 81, 0, 0.015);
        }

        /* Cell detail blocks */
        .applicant-cell-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .c-name {
          font-weight: 700;
          font-size: 14.5px;
        }

        .c-email {
          color: var(--text-secondary);
          font-size: 12px;
        }

        .c-phone {
          color: var(--text-tertiary);
          font-size: 11.5px;
        }

        .skills-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skill-badge-tag {
          font-size: 11px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xs);
          padding: 3px 8px;
          color: var(--text-secondary);
        }

        .skill-badge-tag-more {
          font-size: 10px;
          font-weight: 700;
          color: var(--primary);
          background-color: var(--primary-glow);
          border-radius: var(--radius-xs);
          padding: 3px 6px;
        }

        .match-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 700;
          border-radius: var(--radius-full);
          line-height: 1;
        }

        .match-pill.green-pill {
          background-color: var(--success-glow);
          color: var(--success);
        }

        .match-pill.gray-pill {
          background-color: var(--bg-tertiary);
          color: var(--text-tertiary);
        }

        .status-pill {
          display: inline-block;
          font-size: 11.5px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          text-align: center;
          line-height: 1;
        }

        .status-pill.applied {
          background-color: var(--primary-glow);
          color: var(--primary);
        }

        .status-pill.under-review {
          background-color: rgba(245, 158, 11, 0.12);
          color: var(--warning);
        }

        .status-pill.shortlisted {
          background-color: var(--success-glow);
          color: var(--success);
        }

        .status-pill.interview-scheduled {
          background-color: rgba(59, 130, 246, 0.12);
          color: #3b82f6;
        }

        .status-pill.selected {
          background-color: rgba(16, 185, 129, 0.2);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .status-pill.rejected {
          background-color: var(--danger-glow);
          color: var(--danger);
        }

        /* Status toggles & dropdown inputs */
        .status-dropdown-select {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          padding: 6px 12px;
          font-size: 12.5px;
          font-weight: 700;
          outline: none;
          cursor: pointer;
          transition: border var(--transition-fast);
        }

        .status-dropdown-select:hover {
          border-color: var(--primary);
        }

        .status-dropdown-select.applied { border-left: 4px solid var(--primary); }
        .status-dropdown-select.under-review { border-left: 4px solid var(--warning); }
        .status-dropdown-select.shortlisted { border-left: 4px solid var(--success); }
        .status-dropdown-select.interview-scheduled { border-left: 4px solid #3b82f6; }
        .status-dropdown-select.selected { border-left: 4px solid var(--success); }
        .status-dropdown-select.rejected { border-left: 4px solid var(--danger); }

        .btn-table-action {
          border: none;
          background: none;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .btn-table-action.view-btn {
          color: var(--primary);
        }

        .btn-table-action.view-btn:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }

        /* Job listing tab specific status button */
        .job-title-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .job-date {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .job-type-badge {
          background-color: var(--peach-light);
          border: 1px solid var(--peach-border);
          color: var(--primary);
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-xs);
        }

        .status-indicator-btn {
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-full);
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .status-indicator-btn .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-indicator-btn.active-stat {
          color: var(--success);
          border-color: rgba(16, 185, 129, 0.3);
          background-color: var(--success-glow);
        }

        .status-indicator-btn.active-stat .dot {
          background-color: var(--success);
        }

        .status-indicator-btn.inactive-stat {
          color: var(--text-tertiary);
          border-color: var(--border-color);
          background-color: var(--bg-tertiary);
        }

        .status-indicator-btn.inactive-stat .dot {
          background-color: var(--text-tertiary);
        }

        .table-actions-row {
          display: flex;
          gap: 8px;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-icon-btn.edit-icon-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .action-icon-btn.delete-icon-btn:hover {
          color: var(--danger);
          border-color: var(--danger);
          background-color: var(--danger-glow);
        }

        /* Filter ribbon card styling */
        .filters-ribbon-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow-sm);
        }

        .search-bar-wrapper {
          position: relative;
          flex-grow: 1;
          max-width: 450px;
          display: flex;
          align-items: center;
        }

        .search-bar-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-bar-input {
          width: 100%;
          height: 44px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          outline: none;
          color: var(--text-primary);
          padding: 0 16px 0 44px;
          font-family: var(--font-sans);
          font-size: 14px;
          transition: all var(--transition-fast);
        }

        .search-bar-input:focus {
          border-color: var(--primary);
          background-color: var(--bg-secondary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .select-filters-row {
          display: flex;
          gap: 16px;
        }

        .filter-select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
        }

        .filter-select-wrapper label {
          font-weight: 700;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .filter-select-wrapper select {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          height: 44px;
          padding: 0 14px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        .filter-select-wrapper select:focus {
          border-color: var(--primary);
        }

        /* Company Form inputs */
        .company-edit-form-theme {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 30px;
          box-shadow: var(--shadow-sm);
        }

        .form-grid-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .logo-upload-section {
          grid-column: span 2;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 24px;
          margin-bottom: 8px;
        }

        .logo-preview-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 10px;
        }

        .company-logo-badge.large-badge {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
        }

        .logo-placeholder-avatar.large-avatar {
          font-size: 28px;
        }

        .logo-input-instructions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .file-hint-text {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .form-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-input-wrapper.full-width {
          grid-column: span 2;
        }

        .form-label-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          color: var(--text-secondary);
        }

        .form-text-input {
          height: 48px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          outline: none;
          color: var(--text-primary);
          padding: 0 16px;
          font-family: var(--font-sans);
          font-size: 14.5px;
          transition: all var(--transition-fast);
        }

        .form-text-input:focus {
          border-color: var(--primary);
          background-color: var(--bg-secondary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .form-textarea-input {
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          outline: none;
          color: var(--text-primary);
          padding: 14px 16px;
          font-family: var(--font-sans);
          font-size: 14.5px;
          resize: vertical;
          transition: all var(--transition-fast);
        }

        .form-textarea-input:focus {
          border-color: var(--primary);
          background-color: var(--bg-secondary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .form-actions-bar {
          margin-top: 30px;
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
          display: flex;
          justify-content: flex-end;
        }

        /* 5. Modal Dialog Box styling */
        .modal-backdrop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-glass-card-container {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 750px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-xl);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 24px 30px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-heading {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          margin: 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--primary);
        }

        .modal-form-theme {
          padding: 30px;
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .skills-checklist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
          max-height: 180px;
          overflow-y: auto;
        }

        .skill-check-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .skill-check-item input {
          accent-color: var(--primary);
          width: 16px;
          height: 16px;
        }

        .skill-check-text {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .modal-actions-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
        }

        /* 6. Candidate Detail Inspect Drawer Panel styling */
        .drawer-panel-container {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 500px;
          background-color: var(--bg-secondary);
          border-left: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
          z-index: 2100;
          display: flex;
          flex-direction: column;
        }

        .drawer-header {
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .drawer-heading {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          margin: 0;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .drawer-scroll-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .drawer-profile-card {
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .drawer-avatar {
          width: 64px;
          height: 64px;
          background-color: var(--primary-glow);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px auto;
        }

        .profile-fullname {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 4px 0;
        }

        .profile-role-sub {
          font-size: 13.5px;
        }

        .glass-panel {
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
        }

        .detail-section-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          margin: 0 0 12px 0;
        }

        .status-updater-row {
          display: flex;
          width: 100%;
        }

        .status-dropdown-select.large-dropdown {
          width: 100%;
          height: 48px;
          font-size: 14.5px;
        }

        .skills-match-status-row {
          margin-bottom: 14px;
        }

        .match-flag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: var(--radius-xs);
        }

        .match-flag.high-match {
          background-color: var(--success-glow);
          color: var(--success);
        }

        .match-flag.low-match {
          background-color: var(--danger-glow);
          color: var(--danger);
        }

        .sub-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-secondary);
          margin: 0 0 8px 0;
        }

        .info-list-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13.5px;
        }

        .info-icon {
          color: var(--text-tertiary);
        }

        .resume-icon-badge {
          gap: 10px;
          margin-bottom: 14px;
        }

        .resume-icon {
          padding: 4px;
        }

        .resume-icon.red { color: var(--danger); }
        .resume-icon.blue { color: #3b82f6; }

        .resume-file-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .download-resume-action-btn {
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 700;
          text-decoration: none;
        }

        .cover-letter-preview {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xs);
          padding: 14px;
          white-space: pre-wrap;
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.5;
          max-height: 250px;
          overflow-y: auto;
          color: var(--text-primary);
          margin: 0;
        }

        /* 7. General utility styles */
        .empty-state-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
          color: var(--text-tertiary);
          gap: 12px;
        }

        .empty-state-panel.large-empty {
          padding: 80px 40px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .empty-icon {
          color: var(--border-color);
        }

        /* Animation timings */
        .animate-fade {
          animation: dashboardFade 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: dashboardSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-left {
          animation: dashboardSlideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes dashboardFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes dashboardSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes dashboardSlideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* 8. Responsiveness breakdown */
        @media (max-width: 992px) {
          .dashboard-grid-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .overview-graphics-grid {
            grid-template-columns: 1fr;
          }

          .form-grid-layout {
            grid-template-columns: 1fr;
          }
          
          .logo-upload-section, .form-input-wrapper.full-width {
            grid-column: span 1;
          }

          .modal-form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-input-wrapper.full-width {
            grid-column: span 1;
          }

          .skills-checklist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .dashboard-grid-stats {
            grid-template-columns: 1fr;
          }

          .hero-content-row {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .company-logo-badge {
            margin: 0 auto;
          }

          .company-meta-details {
            align-items: center;
          }

          .company-link-btn {
            align-self: center;
          }

          .tab-action-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .filters-ribbon-card {
            flex-direction: column;
            align-items: stretch;
          }

          .select-filters-row {
            flex-direction: column;
            gap: 12px;
          }

          .skills-checklist-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ATS and Drawer custom styles */
        .drawer-tab-link {
          transition: all 0.2s ease;
        }
        .drawer-tab-link:hover {
          color: var(--primary) !important;
          background-color: var(--bg-tertiary) !important;
        }
        .drawer-tab-link.active {
          border-bottom: 3px solid var(--primary) !important;
          color: var(--primary) !important;
        }
        
        .timeline-dot {
          transition: transform 0.2s ease;
        }
        .timeline-node:hover .timeline-dot {
          transform: scale(1.3);
        }

        /* Print styling rules */
        @media print {
          body * {
            visibility: hidden;
          }
          .reports-tab-view, .reports-tab-view * {
            visibility: visible;
          }
          .reports-tab-view {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          .print-hide {
            display: none !important;
          }
          .print-only-header {
            display: block !important;
          }
          .glass-card {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .glass-table-layout th {
            background: #edf2f7 !important;
            color: #2d3748 !important;
            border-bottom: 2px solid #cbd5e0 !important;
          }
          .glass-table-layout td {
            color: #2d3748 !important;
            border-bottom: 1px solid #e2e8f0 !important;
          }
        }

        .spinner {
          display: inline-block;
          border: 3px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default RecruiterDashboard;
