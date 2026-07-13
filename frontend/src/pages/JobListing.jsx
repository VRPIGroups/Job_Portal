// frontend/src/pages/JobListing.jsx
import React, { useEffect, useState } from 'react';
import { useJobs } from '../context/JobsContext';
import { Search, MapPin, Briefcase, Calendar, RotateCcw, SlidersHorizontal, ArrowLeft, ArrowRight, ShieldAlert, Star } from 'lucide-react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { JobCardSkeleton } from '../components/Skeletons';

const JobListing = () => {
  const {
    jobs,
    skills,
    loading,
    pagination,
    filters,
    fetchJobs,
    updateFilters,
    resetFilters,
    savedJobIds,
    toggleSaveJob
  } = useJobs();

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const toggleSave = (jobId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(jobId, navigate, location);
  };

  // Synchronize URL search params with context filters on mount
  useEffect(() => {
    const jobTypeParam = searchParams.get('job_type');
    const experienceParam = searchParams.get('experience');
    const locationParam = searchParams.get('location');
    const searchParam = searchParams.get('search');

    const newFilters = {};
    let shouldUpdate = false;

    if (jobTypeParam !== null) {
      newFilters.job_type = jobTypeParam ? jobTypeParam.split(',') : [];
      shouldUpdate = true;
    }
    if (experienceParam !== null) {
      newFilters.experience = experienceParam ? experienceParam.split(',') : [];
      shouldUpdate = true;
    }
    if (locationParam !== null) {
      newFilters.location = locationParam ? locationParam.split(',') : [];
      shouldUpdate = true;
    }
    if (searchParam !== null) {
      newFilters.search = searchParam || '';
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      updateFilters(newFilters);
    } else {
      resetFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load jobs whenever filters change
  useEffect(() => {
    fetchJobs(1); // load first page of results
  }, [
    filters.search,
    filters.job_type,
    filters.location,
    filters.experience,
    filters.skills,
    filters.salary_min,
    filters.salary_max,
    filters.sort,
    fetchJobs
  ]);

  // Handle pagination clicks
  const handlePageChange = (pageNo) => {
    if (pageNo < 1 || pageNo > pagination.totalPages) return;
    fetchJobs(pageNo);
  };

  // Helper checkbox toggler
  const handleCheckboxToggle = (field, value) => {
    const activeList = [...filters[field]];
    const index = activeList.indexOf(value);
    
    if (index === -1) {
      activeList.push(value);
    } else {
      activeList.splice(index, 1);
    }
    
    updateFilters({ [field]: activeList });
  };

  // Handle multi salary range selection
  const handleSalaryRangeChange = (min, max) => {
    if (filters.salary_min === min && filters.salary_max === max) {
      // Toggle off
      updateFilters({ salary_min: '', salary_max: '' });
    } else {
      updateFilters({ salary_min: min, salary_max: max });
    }
  };

  // Format currency
  const formatSalary = (min, max) => {
    const format = (num) => new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(num);
    return `₹${format(min)} - ₹${format(max)}`;
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return `${diffDays - 1} days ago`;
  };

  const getLogoUrl = (logo) => {
    if (logo) return `http://localhost:5000/uploads/images/${logo}`;
    return `https://ui-avatars.com/api/?name=Company&background=f1f5f9&color=64748b&bold=true`;
  };

  // Pre-seed popular locations
  const popularLocations = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Remote'];
  // Pre-seed experience bands
  const experienceBands = ['0-2 Years', '3-5 Years', '5-8 Years', '8+ Years'];
  // Pre-seed job types
  const jobTypes = ['Full Time', 'Part Time', 'Internship', 'Contract', 'Remote'];

  return (
    <main className="job-listing-page animate-fade">
      <div className="container listing-container">
        
        {/* TOP SEARCH BAR */}
        <section className="listing-search-hero glass-card reveal-on-scroll">
          <Search className="hero-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by job title, description, or company name..."
            className="hero-search-input"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
          { (filters.search || filters.job_type.length || filters.location.length || filters.experience.length || filters.skills.length || filters.salary_min) && (
            <button onClick={resetFilters} className="btn-reset-filters-link" title="Reset All Filters">
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          )}
        </section>

        <div className="listing-layout-grid">
          
          {/* 1. FILTER SIDEBAR */}
          <aside className="filters-sidebar glass-card reveal-on-scroll">
            <div className="sidebar-header">
              <div className="sidebar-title-row">
                <SlidersHorizontal size={18} />
                <h3>Filters</h3>
              </div>
              <button onClick={resetFilters} className="btn-reset-text">Clear All</button>
            </div>

            {/* 1.1 Job Type Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Job Type</h4>
              <div className="filter-options">
                {jobTypes.map((type) => (
                  <label key={type} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.job_type.includes(type)}
                      onChange={() => handleCheckboxToggle('job_type', type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 1.2 Salary Ranges (as requested in prompt) */}
            <div className="filter-section">
              <h4 className="filter-title">Salary Range</h4>
              <div className="filter-options">
                {[
                  { label: '₹10,000 - ₹30,000', min: '10000', max: '30000' },
                  { label: '₹30,000 - ₹60,000', min: '30000', max: '60000' },
                  { label: '₹60,000 - ₹90,000', min: '60000', max: '90000' },
                  { label: '₹90,000 - ₹120,000', min: '90000', max: '120000' }
                ].map((tier) => (
                  <label key={tier.label} className="radio-label">
                    <input
                      type="checkbox"
                      checked={filters.salary_min === tier.min && filters.salary_max === tier.max}
                      onChange={() => handleSalaryRangeChange(tier.min, tier.max)}
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 1.3 Location Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Location</h4>
              <div className="filter-options">
                {popularLocations.map((loc) => (
                  <label key={loc} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.location.includes(loc)}
                      onChange={() => handleCheckboxToggle('location', loc)}
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 1.4 Experience Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Experience</h4>
              <div className="filter-options">
                {experienceBands.map((exp) => (
                  <label key={exp} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.experience.includes(exp)}
                      onChange={() => handleCheckboxToggle('experience', exp)}
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 1.5 Tech Skills Filter */}
            <div className="filter-section" style={{ borderBottom: 'none' }}>
              <h4 className="filter-title">Skills</h4>
              <div className="skills-badge-selector">
                {skills.map((skill) => {
                  const active = filters.skills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => handleCheckboxToggle('skills', skill.id)}
                      className={`skill-select-badge ${active ? 'skill-badge-active' : ''}`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* 2. CATALOG MAIN SECTION */}
          <section className="catalog-main">
            <header className="catalog-header glass-card reveal-on-scroll">
              <div className="catalog-count">
                <span>We found </span>
                <strong>{pagination.total}</strong>
                <span> jobs match your skills</span>
              </div>

              {/* Sorting */}
              <div className="sorting-group">
                <span className="sort-label">Sort by:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  className="sort-select"
                >
                  <option value="latest">Latest Posted</option>
                  <option value="oldest">Oldest Posted</option>
                  <option value="salary_desc">Salary: High to Low</option>
                  <option value="salary_asc">Salary: Low to High</option>
                </select>
              </div>
            </header>

            {/* Job Grid / List */}
            <div className="jobs-list-grid">
              {loading ? (
                Array(pagination.limit).fill(0).map((_, i) => <JobCardSkeleton key={i} />)
              ) : jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <article key={job.id} className="job-card reveal-on-scroll" style={{ transitionDelay: `${(index % 2) * 80}ms` }}>
                    {/* Header */}
                    <div className="job-card-header">
                      <div className="job-card-header-left">
                        <h3 className="job-card-title">{job.title}</h3>
                        <span className="job-company-name">{job.company_name}</span>
                      </div>
                      <button 
                        onClick={(e) => toggleSave(job.id, e)} 
                        className="btn-save-job"
                      >
                        <Star 
                          size={18} 
                          fill={savedJobIds.includes(Number(job.id)) ? '#ffaa00' : 'none'} 
                          stroke="#ffaa00" 
                        />
                        <span>{savedJobIds.includes(Number(job.id)) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>

                    {/* Body */}
                    <div className="job-card-body">
                      <div className="job-info-item">
                        <strong>Location:</strong> <span>{job.location}</span>
                      </div>
                      <div className="job-info-item">
                        <strong>Job Type:</strong> <span>{job.job_type}</span>
                      </div>
                      <div className="job-info-item">
                        <strong>Experience:</strong> <span>{job.experience}</span>
                      </div>

                      <div className="job-card-actions">
                        <Link to={`/jobs/${job.id}`} className="btn-apply-card">
                          Apply
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-catalog-state glass-card">
                  <ShieldAlert size={48} className="empty-icon animate-pulse" />
                  <h3>No Jobs Found</h3>
                  <p>We couldn't find any jobs matching your active search filters. Try adjusting your skills or salary ranges.</p>
                  <button onClick={resetFilters} className="btn btn-primary">Reset Search Filters</button>
                </div>
              )}
            </div>

            {/* SERVER-SIDE PAGINATION */}
            {pagination.totalPages > 1 && (
              <div className="pagination-bar glass-card">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  aria-label="Previous Page"
                >
                  <ArrowLeft size={16} />
                  <span>Prev</span>
                </button>
                
                <div className="pagination-pages">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={`page-number-btn ${pagination.page === p ? 'active-page-btn' : ''}`}
                      onClick={() => handlePageChange(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  aria-label="Next Page"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </section>

        </div>
      </div>

      <style>{`
        .job-listing-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .listing-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Hero Search */
        .listing-search-hero {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          gap: 16px;
        }

        .listing-search-hero:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .hero-search-icon {
          color: var(--text-tertiary);
          flex-shrink: 0;
        }

        .hero-search-input {
          width: 100%;
          font-size: 16px;
          color: var(--text-primary);
        }

        .btn-reset-filters-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .btn-reset-filters-link:hover {
          color: var(--primary);
        }

        /* Layout Grid */
        .listing-layout-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          align-items: start;
        }

        /* Sidebar Filters */
        .filters-sidebar {
          padding: 24px;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .filters-sidebar:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .sidebar-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--text-primary);
        }

        .sidebar-title-row h3 {
          font-size: 17px;
        }

        .btn-reset-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
        }

        .filter-section {
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .checkbox-label, .radio-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .checkbox-label input, .radio-label input {
          width: 16px;
          height: 16px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          cursor: pointer;
        }

        .skills-badge-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-select-badge {
          padding: 6px 12px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .skill-select-badge:hover {
          background-color: var(--bg-primary);
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .skill-badge-active {
          background-color: var(--primary-glow) !important;
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }

        /* Catalog Main */
        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          margin-bottom: 20px;
        }

        .catalog-header:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .catalog-count {
          font-size: 15px;
          color: var(--text-secondary);
        }

        .sorting-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sort-label {
          font-size: 14px;
          color: var(--text-tertiary);
        }

        .sort-select {
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          font-size: 14px;
          color: var(--text-primary);
          cursor: pointer;
        }

        .jobs-list-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        @media (max-width: 1280px) {
          .jobs-list-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .jobs-list-grid {
            grid-template-columns: 1fr;
          }
        }

        /* 2.1 Job Card Styles */
        .job-card {
          border-radius: 8px;
          overflow: hidden;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        /* 2.2 Header Layout */
        .job-card-header {
          background-color: #000000;
          color: #ffffff;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .job-card-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .job-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          font-family: var(--font-display);
        }

        .job-company-name {
          font-size: 13px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .btn-save-job {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }

        .btn-save-job:hover {
          opacity: 0.8;
        }

        /* 2.3 Body Layout */
        .job-card-body {
          background-color: #ffffff;
          border-left: 2px solid #ff5100;
          border-right: 2px solid #ff5100;
          border-bottom: 2px solid #ff5100;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          flex-grow: 1;
        }

        .job-info-item {
          font-size: 15px;
          color: #333333;
          display: flex;
          gap: 6px;
        }

        .job-info-item strong {
          color: #000000;
          font-weight: 700;
        }

        .job-card-actions {
          margin-top: auto;
          padding-top: 8px;
        }

        .btn-apply-card {
          display: inline-block;
          background-color: #ff5100;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          padding: 10px 32px;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.2);
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .btn-apply-card:hover {
          background-color: #e04800;
          transform: translateY(-1px);
        }

        @media (max-width: 576px) {
          .job-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .btn-save-job {
            align-self: flex-start;
          }
        }

        .empty-catalog-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 80px 40px;
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          gap: 16px;
        }

        .empty-catalog-state:hover {
          transform: none;
        }

        .empty-icon {
          color: var(--text-tertiary);
        }

        .empty-catalog-state h3 {
          font-size: 22px;
          color: var(--text-primary);
        }

        .empty-catalog-state p {
          max-width: 440px;
          font-size: 14px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        /* Server-Side Pagination Bar */
        .pagination-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          margin-top: 32px;
        }

        .pagination-bar:hover {
          transform: none;
          box-shadow: var(--shadow-md);
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
          .listing-layout-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-sidebar {
            display: none; /* In production, we could add a toggle button, but a hidden sidebar on tablet simplifies vanilla grids */
          }
        }

        @media (max-width: 576px) {
          .catalog-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          
          .sorting-group {
            width: 100%;
            justify-content: space-between;
          }
          
          .pagination-pages {
            display: none; /* simplify paging links on mobile */
          }
        }
      `}</style>
    </main>
  );
};

export default JobListing;
