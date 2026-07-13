// admin-panel/src/pages/CompanyManagement.jsx
import React, { useState, useEffect, useRef } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Plus, Search, Edit2, Trash2, X, Upload, Globe, MapPin, Building2, RefreshCw } from 'lucide-react';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset current page on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    location: '',
    description: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const fetchCompanies = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/companies', {
        params: { search: search || undefined }
      });
      // Backend returns companies directly or inside .data. Let's see what is inside the backend controller
      // Wait, let's handle if response.data.success is true and returns response.data.data
      if (response.data.success) {
        setCompanies(response.data.data);
      } else {
        setCompanies(response.data);
      }
    } catch (err) {
      showToast('Failed to retrieve companies.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 450); // debounce search
    return () => clearTimeout(timer);
  }, [search]);

  const handleOpenCreateModal = () => {
    setModalType('create');
    setFormData({
      name: '',
      industry: '',
      website: '',
      location: '',
      description: ''
    });
    setLogoFile(null);
    setLogoPreview(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (company) => {
    setModalType('edit');
    setSelectedCompany(company);
    setFormData({
      name: company.name || '',
      industry: company.industry || '',
      website: company.website || '',
      location: company.location || '',
      description: company.description || ''
    });
    setLogoFile(null);
    setLogoPreview(company.logo ? `http://localhost:5000/uploads/images/${company.logo}` : null);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Logo must be less than 2MB.', 'warning');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Company Name is required.', 'warning');
      return;
    }

    setIsSaving(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('industry', formData.industry);
    data.append('website', formData.website);
    data.append('location', formData.location);
    data.append('description', formData.description);
    if (logoFile) {
      data.append('logo', logoFile);
    }

    try {
      let response;
      if (modalType === 'create') {
        response = await api.post('/companies', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.success) {
          showToast('Company registered successfully.', 'success');
          setShowModal(false);
          fetchCompanies(true);
        }
      } else {
        response = await api.put(`/companies/${selectedCompany.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.success) {
          showToast('Company details updated.', 'success');
          setShowModal(false);
          fetchCompanies(true);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save company information.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this company? All associated job listings will be deleted as well.')) {
      return;
    }

    try {
      const response = await api.delete(`/companies/${id}`);
      if (response.data.success) {
        showToast('Company deleted successfully.', 'success');
        setCompanies(companies.filter(c => c.id !== id));
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete company.', 'error');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchCompanies(true);
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Management Title Header */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: '#fdf2f8', color: '#db2777' }}>
            <Building2 size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Partner Companies Directory</h2>
            <p>Register new corporate partners, upload branding, edit corporate bios, and manage hiring company profiles.</p>
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
            <span>Register Company</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {companies.length} records
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
        </div>
      </div>

      {/* Database Directory Table */}
      {loading ? (
        <div className="directory-skeleton">
          <div className="table-responsive-wrapper">
            <div className="skeleton-header shimmer-wrapper"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-row shimmer-wrapper"></div>
            ))}
          </div>
        </div>
      ) : companies.length === 0 ? (
        <div className="empty-state glass-card">
          <Building2 size={48} className="warning-icon" />
          <h3>No Companies Registered</h3>
          <p>No partner companies matched your database query. Click "Register Company" above to add one.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Company Name & Logo</th>
                <th>Industry Segment</th>
                <th>Website URL</th>
                <th>Global Location</th>
                <th>Company Bio Description</th>
                <th>Control Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((company) => (
                <tr key={company.id}>
                  <td>
                    <div className="company-logo-cell">
                      {company.logo ? (
                        <img 
                          src={`http://localhost:5000/uploads/images/${company.logo}`} 
                          alt="" 
                          className="company-logo-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="company-logo-placeholder">
                        {company.name ? company.name[0].toUpperCase() : 'C'}
                      </div>
                      <span className="company-name-span">{company.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="company-industry-span">{company.industry || '—'}</span>
                  </td>
                  <td>
                    {company.website ? (
                      <a 
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="company-link-web"
                      >
                        <Globe size={14} />
                        <span>Visit Site</span>
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    <div className="location-cell">
                      <MapPin size={14} />
                      <span>{company.location || '—'}</span>
                    </div>
                  </td>
                  <td>
                    <p className="company-desc-trunc" title={company.description}>
                      {company.description || 'No description provided.'}
                    </p>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      <button 
                        className="btn-icon-action" 
                        title="Edit Details"
                        onClick={() => handleOpenEditModal(company)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="btn-icon-action btn-icon-danger" 
                        title="Delete Partner"
                        onClick={() => handleDeleteCompany(company.id)}
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
              Showing {companies.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, companies.length)} of {companies.length} records
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
          <div className="modal-content glass-card animate-slide-up">
            <div className="modal-header">
              <h3>{modalType === 'create' ? '🏢 Register Partner Company' : '✏️ Edit Company Details'}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-scrollable">
              <div className="modal-form-grid">
                
                {/* Logo Image Upload Block */}
                <div className="form-group logo-upload-group">
                  <span className="form-label">Corporate Identity Logo</span>
                  <div className="logo-upload-container">
                    <div className="logo-upload-preview">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo Preview" />
                      ) : (
                        <Building2 size={32} className="logo-upload-icon-placeholder" />
                      )}
                    </div>
                    <div className="logo-upload-controls">
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <Upload size={14} />
                        <span>Select File</span>
                      </button>
                      <span className="upload-help-text">JPG, PNG, GIF. Max 2MB size.</span>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden-file-input" 
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="company-name">Company Name *</label>
                  <input
                    id="company-name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Acme Tech Corporation"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Industry Sector */}
                <div className="form-group">
                  <label className="form-label" htmlFor="company-industry">Industry Sector</label>
                  <input
                    id="company-industry"
                    type="text"
                    name="industry"
                    className="form-control"
                    placeholder="e.g. Software & SaaS Services"
                    value={formData.industry}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Corporate Website */}
                <div className="form-group">
                  <label className="form-label" htmlFor="company-website">Corporate Website URL</label>
                  <input
                    id="company-website"
                    type="text"
                    name="website"
                    className="form-control"
                    placeholder="e.g. https://www.acme.corp"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Main Location */}
                <div className="form-group">
                  <label className="form-label" htmlFor="company-location">Global Location</label>
                  <input
                    id="company-location"
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Corporate Bios/Description */}
                <div className="form-group full-width-field">
                  <label className="form-label" htmlFor="company-description">Corporate Bio & Summary</label>
                  <textarea
                    id="company-description"
                    name="description"
                    className="form-control form-textarea"
                    placeholder="Provide a comprehensive summary of the company culture, core services, and hiring expectations..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
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
                      <span>Saving Corporate Record...</span>
                    </>
                  ) : (
                    <span>Save Company Record</span>
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

        /* Company-specific table cell styles */
        .company-logo-cell { display: flex; align-items: center; gap: 12px; }
        .company-logo-img { width: 36px; height: 36px; border-radius: var(--radius-xs); object-fit: contain; background-color: #ffffff; padding: 3px; border: 1px solid var(--border-color); }
        .company-name-span { font-weight: 700; color: var(--text-primary); }
        .company-industry-span { font-weight: 600; color: var(--text-primary); }
        .company-link-web { display: inline-flex; align-items: center; gap: 6px; color: var(--primary); font-weight: 600; }
        .company-link-web:hover { text-decoration: underline; }
        .location-cell { display: flex; align-items: center; gap: 6px; color: var(--text-secondary); }
        .company-desc-trunc { max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; color: var(--text-tertiary); }

        /* Logo Upload Styles */
        .logo-upload-group { grid-column: span 2; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 8px; }
        .logo-upload-container { display: flex; align-items: center; gap: 20px; margin-top: 10px; }
        .logo-upload-preview { width: 72px; height: 72px; border-radius: var(--radius-sm); background-color: var(--bg-tertiary); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .logo-upload-preview img { width: 100%; height: 100%; object-fit: contain; background-color: #ffffff; padding: 4px; }
        .logo-upload-icon-placeholder { color: var(--text-tertiary); }
        .logo-upload-controls { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
        .upload-help-text { font-size: 11px; color: var(--text-tertiary); }
      `}</style>
    </div>
  );
};

export default CompanyManagement;
