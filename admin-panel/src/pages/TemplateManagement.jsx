// admin-panel/src/pages/TemplateManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Search, Edit2, X, RefreshCw, Mail } from 'lucide-react';

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTemplates = templates.filter(tpl => 
    tpl.name.toLowerCase().includes(search.toLowerCase()) || 
    tpl.subject.toLowerCase().includes(search.toLowerCase())
  );

  // Reset current page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTemplates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    subject: '',
    body: ''
  });

  const fetchTemplates = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/admin/templates');
      if (response.data.success) {
        setTemplates(response.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve email templates list.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleOpenEditModal = (tpl) => {
    setSelectedTemplate(tpl);
    setFormData({
      subject: tpl.subject || '',
      body: tpl.body || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.body) {
      showToast('Subject and HTML Body details are required.', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.put(`/admin/templates/${selectedTemplate.id}`, formData);
      if (response.data.success) {
        showToast('Email template modified successfully.', 'success');
        setShowModal(false);
        fetchTemplates(true);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update template records.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTemplates(true);
  };

  const formatTemplateName = (name) => {
    return name
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Header Panel */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
            <Mail size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Notification Email Templates</h2>
            <p>Modify subject lines and HTML notification bodies dispatched to seekers or recruiters.</p>
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
        </div>
      </div>

      {/* Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {filteredTemplates.length} records
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

      {/* Table view */}
      {loading ? (
        <div className="directory-skeleton">
          <div className="table-responsive-wrapper">
            <div className="skeleton-header shimmer-wrapper"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-row shimmer-wrapper"></div>
            ))}
          </div>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="empty-state glass-card">
          <Mail size={48} className="warning-icon" />
          <h3>No Templates Found</h3>
          <p>No email templates match your search filter criteria.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Template Identifier</th>
                <th>Subject Line Header</th>
                <th>Registered Date</th>
                <th>Control Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((tpl) => (
                <tr key={tpl.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      <Mail size={18} style={{ color: 'var(--primary)' }} />
                      <span>{formatTemplateName(tpl.name)}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13.5px' }}>{tpl.subject}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '13.5px' }}>
                      {tpl.created_at ? new Date(tpl.created_at).toLocaleDateString() : '—'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      <button 
                        className="btn-icon-action" 
                        title="Edit Template"
                        onClick={() => handleOpenEditModal(tpl)}
                      >
                        <Edit2 size={15} />
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
              Showing {filteredTemplates.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredTemplates.length)} of {filteredTemplates.length} records
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

      {/* Editing Modal */}
      {showModal && (
        <div className="modal-backdrop animate-fade">
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '750px' }}>
            <div className="modal-header">
              <h3>✏️ Edit Email Template: {formatTemplateName(selectedTemplate.name)}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-scrollable">
              <div className="modal-form-grid" style={{ gridTemplateColumns: '1fr' }}>
                
                {/* Subject */}
                <div className="form-group">
                  <label className="form-label" htmlFor="tpl-subject">Email Subject *</label>
                  <input
                    id="tpl-subject"
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject line"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* HTML Body */}
                <div className="form-group full-width-field">
                  <label className="form-label" htmlFor="tpl-body">HTML Body Content *</label>
                  <textarea
                    id="tpl-body"
                    name="body"
                    className="form-control form-textarea"
                    placeholder="HTML body contents..."
                    value={formData.body}
                    onChange={handleInputChange}
                    rows={12}
                    style={{ fontFamily: 'monospace', fontSize: '13px' }}
                    required
                  />
                  <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    Note: Supported template variables include: <strong>{`{{name}}`}</strong>, <strong>{`{{link}}`}</strong>, <strong>{`{{job_title}}`}</strong>, <strong>{`{{company_name}}`}</strong>.
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
                      <span>Saving Template...</span>
                    </>
                  ) : (
                    <span>Save Template</span>
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
        .template-type-badge { display: inline-flex; padding: 3px 10px; border-radius: var(--radius-xs); font-size: 11px; font-weight: 700; text-transform: uppercase; background-color: var(--primary-glow); color: var(--primary); }
      `}</style>
    </div>
  );
};

export default TemplateManagement;
