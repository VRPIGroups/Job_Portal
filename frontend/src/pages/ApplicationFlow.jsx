// frontend/src/pages/ApplicationFlow.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth, api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Briefcase, ArrowLeft, Send, Upload, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

const ApplicationFlow = () => {
  const { id } = useParams(); // job_id
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    highest_qualification: '',
    school_university: '',
    passing_year: '',
    current_company: '',
    current_salary: '',
    expected_salary: '',
    experience: '',
    skills: '',
    cover_letter: ''
  });

  // Prefill details from user context
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: `${user.first_name} ${user.last_name}`.trim(),
        email: user.email,
        phone: user.phone || ''
      }));
    }
  }, [user]);

  // Load associated job title on mount
  useEffect(() => {
    const fetchJobInfo = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        if (res.data.success) {
          setJob(res.data.data);
          
          if (res.data.data.status !== 'active') {
            showToast('This job posting is closed.', 'error');
            navigate('/jobs');
          }
        }
      } catch (err) {
        showToast('Error loading job info.', 'error');
        navigate('/jobs');
      } finally {
        setJobLoading(false);
      }
    };
    fetchJobInfo();
  }, [id, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Strict Client PDF validation
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' || file.type !== 'application/pdf') {
      showToast('Invalid file format. Resume must be a PDF file.', 'error');
      e.target.value = ''; // clear input
      return;
    }

    if (file.size > 5242880) {
      // 5MB limit
      showToast('File size is too large. Max limit is 5MB.', 'error');
      e.target.value = '';
      return;
    }

    setResumeFile(file);
    setResumeName(file.name);
    showToast('PDF Resume uploaded and verified.', 'info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      showToast('Please upload your resume in PDF format.', 'warning');
      return;
    }

    setLoading(true);

    try {
      // Build multipart/form-data payload
      const data = new FormData();
      data.append('job_id', id);
      data.append('resume', resumeFile);
      
      // Append core fields
      data.append('full_name', formData.full_name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('highest_qualification', formData.highest_qualification);
      data.append('school_university', formData.school_university);
      data.append('passing_year', formData.passing_year);
      data.append('current_company', formData.current_company);
      data.append('current_salary', formData.current_salary);
      data.append('expected_salary', formData.expected_salary);
      data.append('experience', formData.experience);
      data.append('skills', formData.skills);
      data.append('cover_letter', formData.cover_letter);

      // Submit application
      const res = await api.post('/applications', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        showToast('Application Submitted Successfully!', 'success');
        // Redirect to success page carrying state metadata
        navigate('/success', {
          state: {
            applicationId: res.data.data.application_id,
            appliedJob: res.data.data.applied_job,
            companyName: job.company_name,
            submissionDate: res.data.data.submission_date
          }
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error submitting application.';
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading) {
    return (
      <div className="application-flow-loading">
        <div className="spinner"></div>
        <p>Loading application data...</p>
        <style>{`
          .application-flow-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            gap: 16px;
            color: var(--text-secondary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="application-flow-page animate-fade">
      <div className="container flow-container">
        
        {/* BACK ANCHOR */}
        <Link to={`/jobs/${id}`} className="back-link-btn">
          <ArrowLeft size={16} />
          <span>Back to Job Details</span>
        </Link>

        {/* JOB BANNER */}
        {job && (
          <section className="job-summary-banner glass-card reveal-on-scroll">
            <Briefcase size={24} className="banner-icon" />
            <div>
              <span className="banner-company">{job.company_name}</span>
              <h2 className="banner-title">Applying for: {job.title}</h2>
              <span className="banner-location">{job.location} • {job.job_type}</span>
            </div>
          </section>
        )}

        {/* APPLICATION FORM */}
        <div className="glass-card form-container-card reveal-on-scroll">
          <form onSubmit={handleSubmit} className="application-form">
            
            {/* Phase 1: Personal Info */}
            <div className="form-section-block">
              <h3 className="section-block-title">1. Personal Information</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="full_name">Full Name *</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="form-control"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Contact Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 xxxxx xxxxx"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phase 2: Education Details */}
            <div className="form-section-block">
              <h3 className="section-block-title">2. Education Information</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="highest_qualification">Highest Qualification *</label>
                  <input
                    type="text"
                    id="highest_qualification"
                    name="highest_qualification"
                    placeholder="e.g. B.Tech / MBA / MCA"
                    className="form-control"
                    value={formData.highest_qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="school_university">School / University *</label>
                  <input
                    type="text"
                    id="school_university"
                    name="school_university"
                    placeholder="e.g. Stanford University"
                    className="form-control"
                    value={formData.school_university}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="passing_year">Passing Year *</label>
                <input
                  type="text"
                  id="passing_year"
                  name="passing_year"
                  placeholder="e.g. 2024"
                  className="form-control"
                  value={formData.passing_year}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phase 3: Professional Details */}
            <div className="form-section-block">
              <h3 className="section-block-title">3. Professional Information</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="current_company">Current Company</label>
                  <input
                    type="text"
                    id="current_company"
                    name="current_company"
                    placeholder="TechSynergy Pvt Ltd"
                    className="form-control"
                    value={formData.current_company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="experience">Years of Experience *</label>
                  <select
                    id="experience"
                    name="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose experience range</option>
                    <option value="0-2 Years">0-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5-8 Years">5-8 Years</option>
                    <option value="8+ Years">8+ Years</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="current_salary">Current Monthly Salary (INR)</label>
                  <input
                    type="text"
                    id="current_salary"
                    name="current_salary"
                    placeholder="e.g. ₹40,000"
                    className="form-control"
                    value={formData.current_salary}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="expected_salary">Expected Monthly Salary (INR) *</label>
                  <input
                    type="text"
                    id="expected_salary"
                    name="expected_salary"
                    placeholder="e.g. ₹60,000"
                    className="form-control"
                    value={formData.expected_salary}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="skills">Professional Skills (Comma Separated) *</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="React.js, Node.js, JavaScript, REST API, Git"
                  className="form-control"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phase 4: Resume PDF Upload */}
            <div className="form-section-block">
              <h3 className="section-block-title">4. Upload Resume (PDF Only) *</h3>
              <div className="file-uploader-box">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-hidden-input"
                  required
                />
                <label htmlFor="resume" className="uploader-label">
                  {resumeName ? (
                    <div className="uploaded-file-details">
                      <FileText size={40} className="file-icon" />
                      <span className="file-title">{resumeName}</span>
                      <span className="file-change-text">Click to choose a different PDF file</span>
                    </div>
                  ) : (
                    <div className="uploader-prompt">
                      <Upload size={38} className="upload-arrow" />
                      <span className="upload-main-text">Upload Resume PDF</span>
                      <span className="upload-sub-text">Drag and drop or click to browse. Max size 5MB.</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Phase 5: Cover Letter */}
            <div className="form-section-block" style={{ borderBottom: 'none' }}>
              <h3 className="section-block-title">5. Cover Letter</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="cover_letter">Explain why you are a great fit for this role</label>
                <textarea
                  id="cover_letter"
                  name="cover_letter"
                  rows={6}
                  placeholder="Dear Hiring Manager, I am writing to express my strong interest..."
                  className="form-control"
                  style={{ resize: 'vertical' }}
                  value={formData.cover_letter}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Form actions */}
            <div className="form-cta-actions">
              <Link to={`/jobs/${id}`} className="btn btn-secondary cancel-btn">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

      <style>{`
        .application-flow-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .flow-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
        }

        .back-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          transition: color var(--transition-fast);
          align-self: flex-start;
        }

        .back-link-btn:hover {
          color: var(--primary);
        }

        /* Banner summary */
        .job-summary-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 32px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .job-summary-banner:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .banner-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .banner-company {
          font-size: 12px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .banner-title {
          font-size: 20px;
          font-weight: 800;
          margin-top: 2px;
        }

        .banner-location {
          font-size: 13px;
          color: var(--text-tertiary);
          display: block;
          margin-top: 4px;
        }

        /* Form Card */
        .form-container-card {
          padding: 48px;
          background-color: var(--bg-secondary);
        }

        .form-container-card:hover {
          transform: none;
          box-shadow: var(--shadow-xl);
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 40px;
          text-align: left;
        }

        .form-section-block {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border-color);
        }

        .section-block-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* File Upload styling */
        .file-uploader-box {
          width: 100%;
        }

        .file-hidden-input {
          display: none;
        }

        .uploader-label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 180px;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          background-color: var(--bg-tertiary);
          cursor: pointer;
          transition: all var(--transition-normal);
          padding: 24px;
        }

        .uploader-label:hover {
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .uploader-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .upload-arrow {
          color: var(--text-tertiary);
          transition: color var(--transition-fast), transform var(--transition-normal);
        }

        .uploader-label:hover .upload-arrow {
          color: var(--primary);
          transform: translateY(-4px);
        }

        .upload-main-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          color: var(--text-primary);
        }

        .upload-sub-text {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .uploaded-file-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .file-icon {
          color: var(--success);
          animation: bounce 1.5s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .file-title {
          font-weight: 700;
          font-size: 14px;
          color: var(--success);
        }

        .file-change-text {
          font-size: 12px;
          color: var(--text-tertiary);
          text-decoration: underline;
        }

        /* CTA buttons */
        .form-cta-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        .cancel-btn {
          height: 48px;
          padding: 0 28px;
        }

        .submit-btn {
          height: 48px;
          padding: 0 32px;
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .form-container-card {
            padding: 24px;
          }
          
          .form-grid-2 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .form-cta-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .cancel-btn, .submit-btn {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default ApplicationFlow;
