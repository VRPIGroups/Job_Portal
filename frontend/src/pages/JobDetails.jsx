// frontend/src/pages/JobDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../context/AuthContext';
import { JobDetailsSkeleton } from '../components/Skeletons';
import { MapPin, Briefcase, Calendar, IndianRupee, ExternalLink, ShieldCheck, CheckCircle, Star } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { savedJobIds, toggleSaveJob } = useJobs();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        if (res.data.success) {
          setJob(res.data.data);
        }
      } catch (err) {
        showToast(err.response?.data?.message || 'Error loading job details.', 'error');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigate, showToast]);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      showToast('Please log in to submit your job application.', 'warning');
      navigate('/login', { state: { from: { pathname: `/jobs/${id}/apply` } } });
    } else {
      navigate(`/jobs/${id}/apply`);
    }
  };

  const formatSalary = (min, max) => {
    const format = (num) => new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(num);
    return `₹${format(min)} - ₹${format(max)}`;
  };

  const getLogoUrl = (logo) => {
    if (logo) return `http://localhost:5000/uploads/images/${logo}`;
    return `https://ui-avatars.com/api/?name=Company&background=f1f5f9&color=64748b&bold=true`;
  };

  if (loading) {
    return (
      <div className="container job-details-container" style={{ padding: '60px 20px' }}>
        <JobDetailsSkeleton />
      </div>
    );
  }

  if (!job) return null;

  return (
    <main className="job-details-page animate-fade">
      <div className="container job-details-container">
        
        {/* 1. HEADER HERO BAR */}
        <section className="details-header-card glass-card reveal-on-scroll">
          <div className="header-brand-row">
            <img
              src={getLogoUrl(job.company_logo)}
              alt={`${job.company_name} Logo`}
              className="details-company-logo"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name)}&background=f1f5f9&color=64748b&bold=true`;
              }}
            />
            <div className="header-meta-titles">
              <span className="details-company-name">{job.company_name}</span>
              <h1 className="details-job-title">{job.title}</h1>
              
              <div className="header-quick-info">
                <span className="quick-badge">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </span>
                <span className="quick-badge">
                  <Briefcase size={14} />
                  <span>{job.job_type}</span>
                </span>
                <span className="quick-badge">
                  <IndianRupee size={14} />
                  <span className="salary-highlight">{formatSalary(job.salary_min, job.salary_max)}</span>
                </span>
                <span className="quick-badge text-muted">
                  <Calendar size={14} />
                  <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="header-cta-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => toggleSaveJob(job.id, navigate, location)} 
              className={`btn ${savedJobIds.includes(Number(job.id)) ? 'btn-secondary' : 'btn-outlined'}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', border: '2px solid #ff5100', borderRadius: '8px', backgroundColor: savedJobIds.includes(Number(job.id)) ? 'rgba(255, 81, 0, 0.08)' : 'transparent', color: '#ff5100' }}
            >
              <Star size={18} fill={savedJobIds.includes(Number(job.id)) ? '#ff5100' : 'none'} stroke="#ff5100" />
              <span>{savedJobIds.includes(Number(job.id)) ? 'Saved' : 'Save Job'}</span>
            </button>
            <button onClick={handleApplyClick} className="btn btn-primary btn-hero-apply">
              Apply Now
            </button>
          </div>
        </section>

        {/* 2. SPLIT LAYOUT */}
        <div className="details-split-grid">
          
          {/* 2.1 Main Sheet (Left Column) */}
          <section className="details-main-sheet">
            
            {/* Description & Qualifications */}
            <article className="details-section-card glass-card reveal-on-scroll">
              <h2 className="section-title-label">Job Overview</h2>
              <div className="details-text-content">
                {/* Process breaks inside text */}
                {job.description ? job.description.split('\n').map((para, i) => (
                  <p key={i} className="details-paragraph">{para}</p>
                )) : ''}
              </div>
            </article>

            {/* Core Tech Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <article className="details-section-card glass-card reveal-on-scroll">
                <h2 className="section-title-label">Required Technologies</h2>
                <p className="skills-subtitle">Candidates holding matching experience in the following tags will be prioritized:</p>
                <div className="details-skills-badge-row">
                  {job.skills.map((skill) => (
                    <span key={skill.id} className="skill-details-badge">
                      <ShieldCheck size={14} />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </article>
            )}

            {/* Highlighted Responsibilities */}
            <article className="details-section-card glass-card reveal-on-scroll">
              <h2 className="section-title-label">Responsibilities</h2>
              <ul className="details-bullets-list">
                <li>Write clean, modular, and high-performance code adhering to industry standards.</li>
                <li>Collaborate with product designers, managers, and system architects to construct features.</li>
                <li>Perform automated unit tests and participate in smart code reviews.</li>
                <li>Deploy, secure, and maintain REST endpoints inside modern container pipelines.</li>
              </ul>
            </article>

            {/* Benefits & Perks */}
            <article className="details-section-card glass-card reveal-on-scroll">
              <h2 className="section-title-label">Company Perks & Benefits</h2>
              <div className="benefits-grid">
                <div className="benefit-pill">
                  <CheckCircle size={14} />
                  <span>Comprehensive Health Insurance</span>
                </div>
                <div className="benefit-pill">
                  <CheckCircle size={14} />
                  <span>Flexible WFH & Remote Hours</span>
                </div>
                <div className="benefit-pill">
                  <CheckCircle size={14} />
                  <span>Annual Skill & Gym Allowances</span>
                </div>
                <div className="benefit-pill">
                  <CheckCircle size={14} />
                  <span>Quarterly Team Retreats</span>
                </div>
              </div>
            </article>
          </section>

          {/* 2.2 Sidebar (Right Column) */}
          <aside className="details-sidebar">
            <div className="sidebar-sticky-card glass-card reveal-on-scroll">
              <h3 className="sidebar-card-title">Hiring Organization</h3>
              <div className="sidebar-company-logo-wrapper">
                <img
                  src={getLogoUrl(job.company_logo)}
                  alt={`${job.company_name} Logo`}
                  className="sidebar-logo-img"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name)}&background=f1f5f9&color=64748b&bold=true`;
                  }}
                />
                <h4 className="sidebar-company-name">{job.company_name}</h4>
              </div>
              
              <p className="sidebar-company-desc">
                {job.company_description || 'No corporate description provided.'}
              </p>

              <div className="sidebar-metadata-rows">
                <div className="meta-row">
                  <span className="meta-row-label">Workplace:</span>
                  <span className="meta-row-value">{job.location}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-row-label">Job Category:</span>
                  <span className="meta-row-value">{job.job_type}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-row-label">Experience:</span>
                  <span className="meta-row-value">{job.experience}</span>
                </div>
              </div>

              {job.company_website && (
                <a
                  href={job.company_website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary w-full sidebar-website-btn"
                  style={{ width: '100%' }}
                >
                  <span>Visit Website</span>
                  <ExternalLink size={14} />
                </a>
              )}

              <button
                onClick={handleApplyClick}
                className="btn btn-primary w-full sidebar-apply-btn"
                style={{ width: '100%', marginTop: '16px' }}
              >
                Apply for this Position
              </button>
            </div>
          </aside>

        </div>
      </div>

      <style>{`
        .job-details-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .job-details-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Header Card */
        .details-header-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .details-header-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .header-brand-row {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .details-company-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          padding: 4px;
        }

        .header-meta-titles {
          display: flex;
          flex-direction: column;
        }

        .details-company-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .details-job-title {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .header-quick-info {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .quick-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .quick-badge svg {
          color: var(--text-tertiary);
        }

        .salary-highlight {
          color: var(--success) !important;
          font-weight: 700;
        }

        .btn-hero-apply {
          padding: 12px 32px;
          font-size: 16px;
          font-family: var(--font-display);
        }

        /* Split Grid Layout */
        .details-split-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .details-main-sheet {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .details-section-card {
          padding: 32px;
          background-color: var(--bg-secondary);
        }

        .details-section-card:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .section-title-label {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }

        .details-text-content {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .details-paragraph {
          margin-bottom: 16px;
        }

        .details-paragraph:last-child {
          margin-bottom: 0;
        }

        .skills-subtitle {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-bottom: 16px;
        }

        .details-skills-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-details-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .skill-details-badge svg {
          color: var(--primary);
        }

        .details-bullets-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 15px;
          color: var(--text-secondary);
        }

        .details-bullets-list li {
          position: relative;
          padding-left: 24px;
          line-height: 1.6;
        }

        .details-bullets-list li::before {
          content: '✔';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .benefit-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .benefit-pill svg {
          color: var(--success);
        }

        /* Sidebar Styles */
        .sidebar-sticky-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
        }

        .sidebar-sticky-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .sidebar-card-title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 20px;
          color: var(--text-primary);
        }

        .sidebar-company-logo-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .sidebar-logo-img {
          width: 54px;
          height: 54px;
          object-fit: contain;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
        }

        .sidebar-company-name {
          font-size: 16px;
          font-weight: 700;
        }

        .sidebar-company-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-tertiary);
          margin-bottom: 24px;
        }

        .sidebar-metadata-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
          font-size: 14px;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
        }

        .meta-row-label {
          color: var(--text-tertiary);
        }

        .meta-row-value {
          font-weight: 600;
          color: var(--text-primary);
        }

        .sidebar-website-btn {
          height: 42px;
        }

        @media (max-width: 992px) {
          .details-header-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
          }
          
          .header-cta-actions {
            width: 100%;
          }
          
          .btn-hero-apply {
            width: 100%;
          }
          
          .details-split-grid {
            grid-template-columns: 1fr;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
};

export default JobDetails;
