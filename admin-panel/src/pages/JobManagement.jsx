// admin-panel/src/pages/JobManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Plus, Search, Edit2, Trash2, X, Briefcase, RefreshCw, Eye, Tag, AlertTriangle } from 'lucide-react';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  
  // Search & Filter
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_id: '',
    salary_min: '',
    salary_max: '',
    job_type: 'Full-time',
    location: 'On-site',
    experience: 'Entry Level',
    skills: [], // array of skill IDs
    status: 'active'
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
  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const fetchJobs = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/jobs', {
        params: { 
          search: search || undefined, 
          status: status, // Admin role can bypass public active-only filter
          limit: 100 
        }
      });
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve job directory.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchSupportingData = async () => {
    try {
      const [compRes, skillRes] = await Promise.all([
        api.get('/companies'),
        api.get('/jobs/skills')
      ]);

      if (compRes.data.success) {
        setCompanies(compRes.data.data);
      } else {
        setCompanies(compRes.data);
      }

      if (skillRes.data.success) {
        setSkillsList(skillRes.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve companies or skills helper lists.', 'warning');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 450); // debounce search
    return () => clearTimeout(timer);
  }, [search, status]);

  useEffect(() => {
    fetchSupportingData();
  }, []);

  const handleOpenCreateModal = () => {
    if (companies.length === 0) {
      showToast('Please register at least one company before creating jobs.', 'warning');
      return;
    }

    setModalType('create');
    setFormData({
      title: '',
      description: '',
      company_id: companies[0]?.id || '',
      salary_min: '',
      salary_max: '',
      job_type: 'Full-time',
      location: 'On-site',
      experience: 'Entry Level',
      skills: [],
      status: 'active'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (job) => {
    setModalType('edit');
    setSelectedJob(job);
    
    // Extract skill IDs associated with the job
    const associatedSkillIds = Array.isArray(job.skills) 
      ? job.skills.map(s => s.id) 
      : [];

    setFormData({
      title: job.title || '',
      description: job.description || '',
      company_id: job.company_id || '',
      salary_min: job.salary_min || '',
      salary_max: job.salary_max || '',
      job_type: job.job_type || 'Full-time',
      location: job.location || 'On-site',
      experience: job.experience || 'Entry Level',
      skills: associatedSkillIds,
      status: job.status || 'active'
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skillId) => {
    setFormData(prev => {
      const alreadySelected = prev.skills.includes(skillId);
      const newSkills = alreadySelected 
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId];
      return { ...prev, skills: newSkills };
    });
  };

  const handleToggleJobStatus = async (job) => {
    const newStatus = job.status === 'active' ? 'inactive' : 'active';
    try {
      const response = await api.put(`/jobs/${job.id}`, { status: newStatus });
      if (response.data.success) {
        showToast(`Job status updated to ${newStatus}.`, 'success');
        setJobs(jobs.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
      }
    } catch (err) {
      showToast('Failed to update job status.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company_id || !formData.salary_min || !formData.salary_max) {
      showToast('All fields marked * are required.', 'warning');
      return;
    }

    if (parseInt(formData.salary_min) > parseInt(formData.salary_max)) {
      showToast('Minimum salary cannot exceed maximum salary.', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      let response;
      if (modalType === 'create') {
        response = await api.post('/jobs', formData);
        if (response.data.success) {
          showToast('Job posting published successfully.', 'success');
          setShowModal(false);
          fetchJobs(true);
        }
      } else {
        response = await api.put(`/jobs/${selectedJob.id}`, formData);
        if (response.data.success) {
          showToast('Job posting modified successfully.', 'success');
          setShowModal(false);
          fetchJobs(true);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save job details.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to permanently delete this job posting? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await api.delete(`/jobs/${id}`);
      if (response.data.success) {
        showToast('Job posting permanently deleted.', 'success');
        setJobs(jobs.filter(j => j.id !== id));
      }
    } catch (err) {
      showToast('Failed to delete job posting.', 'error');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchJobs(true);
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Title Header */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper">
            <Briefcase size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Opportunities & Job Postings</h2>
            <p>Create career opportunities, publish job descriptions, manage skill tags, and audit recruiter requirements.</p>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-secondary btn-refresh" 
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
          >
            <RefreshCw size={16} className={isRefreshing ? 'spin-animation' : ''} />
          </button>
          <button className="btn btn-primary" onClick={handleOpenCreateModal}>
            <Plus size={18} />
            <span>Publish Job Listing</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {jobs.length} records
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
              id="status-select" 
              className="filter-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Postings</option>
              <option value="inactive">Closed / Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Table */}
      {loading ? (
        <div className="directory-skeleton">
          <div className="table-responsive-wrapper">
            <div className="skeleton-header shimmer-wrapper"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-row shimmer-wrapper"></div>
            ))}
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="empty-state glass-card">
          <Briefcase size={48} className="warning-icon" />
          <h3>No Job Postings Found</h3>
          <p>No job records match your current directory configurations. Click "Publish Job Listing" to create one.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Job Title & Company</th>
                <th>Job Details</th>
                <th>Salary Range</th>
                <th>Required Skill Tags</th>
                <th>Posting Status</th>
                <th>Date Published</th>
                <th>Action Controls</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="job-title-cell">
                      <div className="company-logo-badge">
                        {job.company_logo ? (
                          <img 
                            src={`http://localhost:5000/uploads/images/${job.company_logo}`} 
                            alt="" 
                            className="company-logo-mini"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="company-logo-placeholder-mini">
                          {job.company_name ? job.company_name[0] : 'J'}
                        </div>
                      </div>
                      <div className="job-name-wrap">
                        <span className="job-fullname-text">{job.title}</span>
                        <span className="job-company-subtitle">{job.company_name}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="job-details-stacked">
                      <span className="job-pill-desc type-pill">{job.job_type}</span>
                      <span className="job-detail-text">{job.location}</span>
                      <span className="job-detail-text">{job.experience}</span>
                    </div>
                  </td>
                  <td>
                    <span className="salary-range-text">
                      ₹{job.salary_min?.toLocaleString('en-IN')} - ₹{job.salary_max?.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <div className="table-skills-list">
                      {Array.isArray(job.skills) && job.skills.length > 0 ? (
                        job.skills.map((skill, index) => (
                          <span key={index} className="skill-item-pill">{skill.name}</span>
                        ))
                      ) : (
                        <span className="text-muted" style={{ fontSize: '12px' }}>None required</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span 
                      className={`status-pill clickable-pill ${job.status === 'active' ? 'pill-active' : 'pill-inactive'}`}
                      onClick={() => handleToggleJobStatus(job)}
                      title="Click to toggle status"
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <span className="date-published-text">
                      {new Date(job.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      <button 
                        className="btn-icon-action" 
                        title="Edit Job"
                        onClick={() => handleOpenEditModal(job)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="btn-icon-action btn-icon-danger" 
                        title="Delete Job"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination bar */}
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing {jobs.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, jobs.length)} of {jobs.length} records
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

      {/* Add / Edit Form Modal */}
      {showModal && (
        <div className="modal-backdrop animate-fade">
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <h3>{modalType === 'create' ? '💼 Publish Career Opportunity' : '✏️ Modify Job Listing'}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-scrollable">
              <div className="modal-form-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                
                {/* Job Title */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" htmlFor="job-title">Job Title *</label>
                  <input
                    id="job-title"
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="e.g. Lead React Developer"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Company Select */}
                <div className="form-group">
                  <label className="form-label" htmlFor="company-select">Hiring Company *</label>
                  <select
                    id="company-select"
                    name="company_id"
                    className="form-control"
                    value={formData.company_id}
                    onChange={handleInputChange}
                    required
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Job Type */}
                <div className="form-group">
                  <label className="form-label" htmlFor="job-type">Employment Type</label>
                  <select
                    id="job-type"
                    name="job_type"
                    className="form-control"
                    value={formData.job_type}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                {/* Location */}
                <div className="form-group">
                  <label className="form-label" htmlFor="job-location">Location Type</label>
                  <select
                    id="job-location"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleInputChange}
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div className="form-group">
                  <label className="form-label" htmlFor="job-experience">Experience Level</label>
                  <select
                    id="job-experience"
                    name="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Lead / Executive">Lead / Executive</option>
                  </select>
                </div>

                {/* Salary Min */}
                <div className="form-group">
                  <label className="form-label" htmlFor="salary-min">Salary Min (₹ INR) *</label>
                  <input
                    id="salary-min"
                    type="number"
                    name="salary_min"
                    className="form-control"
                    placeholder="e.g. 80000"
                    value={formData.salary_min}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Salary Max */}
                <div className="form-group">
                  <label className="form-label" htmlFor="salary-max">Salary Max (₹ INR) *</label>
                  <input
                    id="salary-max"
                    type="number"
                    name="salary_max"
                    className="form-control"
                    placeholder="e.g. 120000"
                    value={formData.salary_max}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Status Toggle */}
                <div className="form-group">
                  <label className="form-label" htmlFor="job-status">Listing Status</label>
                  <select
                    id="job-status"
                    name="status"
                    className="form-control"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active / Open</option>
                    <option value="inactive">Inactive / Closed</option>
                  </select>
                </div>

                {/* Description */}
                <div className="form-group full-width-field" style={{ gridColumn: 'span 3' }}>
                  <label className="form-label" htmlFor="job-description">Job Roles, Requirements & Description *</label>
                  <textarea
                    id="job-description"
                    name="description"
                    className="form-control form-textarea"
                    placeholder="Provide a comprehensive job description. Outline target responsibilities, expectations, and credentials required..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                {/* Required Skills Picker */}
                <div className="form-group full-width-field" style={{ gridColumn: 'span 3' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={14} />
                    <span>Associate Required Technical Skills</span>
                  </label>
                  <p className="skills-subtitle">Select the technology credentials applicants should have for automatic matching index scores.</p>
                  
                  <div className="skills-checkbox-grid">
                    {skillsList.map(skill => {
                      const isChecked = formData.skills.includes(skill.id);
                      return (
                        <div 
                          key={skill.id} 
                          className={`skill-checkbox-card ${isChecked ? 'skill-card-checked' : ''}`}
                          onClick={() => handleSkillToggle(skill.id)}
                        >
                          <span className="skill-card-name">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={isSaving}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="spinner" style={{ borderTopColor: '#ffffff' }}></div>
                      <span>Publishing Posting...</span>
                    </>
                  ) : (
                    <span>Save Job Posting</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .spin-animation { animation: spin 1s linear infinite; }
        .btn-refresh { height: 38px; }

        /* Job-specific table cell styles */
        .job-title-cell { display: flex; align-items: center; gap: 12px; }
        .company-logo-badge { position: relative; width: 38px; height: 38px; flex-shrink: 0; }
        .company-logo-mini { width: 38px; height: 38px; border-radius: 8px; object-fit: contain; background-color: #ffffff; padding: 2px; border: 1px solid var(--border-color); }
        .company-logo-placeholder-mini { width: 38px; height: 38px; border-radius: 8px; background-color: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; text-transform: uppercase; border: 1px solid #dbeafe; }
        .job-name-wrap { display: flex; flex-direction: column; }
        .job-fullname-text { font-weight: 700; color: var(--text-primary); line-height: 1.3; font-size: 14px; }
        .job-company-subtitle { font-size: 12px; color: #2563eb; font-weight: 600; margin-top: 2px; }
        .job-details-stacked { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
        .job-pill-desc.type-pill { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background-color: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; }
        .job-detail-text { font-size: 12px; color: #64748b; font-weight: 500; }
        .salary-range-text { font-weight: 700; color: var(--text-primary); font-size: 13px; }
        .table-skills-list { display: flex; flex-wrap: wrap; gap: 6px; max-width: 220px; }
        .skill-item-pill { font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: var(--radius-full); background-color: #fff7ed; color: #ff5100; border: 1px solid #ffedd5; text-transform: uppercase; letter-spacing: 0.5px; }
        .clickable-pill { cursor: pointer; transition: transform var(--transition-fast); }
        .clickable-pill:hover { transform: scale(1.05); }

        /* Skills Checkbox Grid */
        .skills-subtitle { font-size: 12px; color: var(--text-tertiary); margin-bottom: 12px; }
        .skills-checkbox-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; max-height: 160px; overflow-y: auto; padding: 8px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background-color: var(--bg-tertiary); }
        .skill-checkbox-card { padding: 8px 12px; border-radius: var(--radius-xs); border: 1px solid var(--border-color); background-color: var(--bg-secondary); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all var(--transition-fast); user-select: none; }
        .skill-checkbox-card:hover { border-color: var(--primary); transform: translateY(-1px); }
        .skill-card-checked { background-color: var(--primary-glow) !important; border-color: var(--primary) !important; }
        .skill-card-checked .skill-card-name { color: var(--primary); font-weight: 700; }
        .skill-card-name { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-align: center; text-transform: uppercase; }
      `}</style>



    </div>
  );
};

export default JobManagement;
