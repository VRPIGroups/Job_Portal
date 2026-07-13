// admin-panel/src/pages/SkillManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Plus, Search, Edit2, Trash2, X, RefreshCw, Award } from 'lucide-react';

const SkillManagement = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  // Reset current page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSkills.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: ''
  });

  const fetchSkills = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/admin/skills');
      if (response.data.success) {
        setSkills(response.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve skills lists.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenCreateModal = () => {
    setModalType('create');
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleOpenEditModal = (skill) => {
    setModalType('edit');
    setSelectedSkill(skill);
    setFormData({ name: skill.name || '' });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Skill Name is required.', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      let response;
      if (modalType === 'create') {
        response = await api.post('/admin/skills', formData);
        if (response.data.success) {
          showToast('Technical skill created successfully.', 'success');
          setShowModal(false);
          fetchSkills(true);
        }
      } else {
        response = await api.put(`/admin/skills/${selectedSkill.id}`, formData);
        if (response.data.success) {
          showToast('Technical skill updated successfully.', 'success');
          setShowModal(false);
          fetchSkills(true);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save skill details.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this technical skill? Jobs requiring this skill will have this requirement detached.')) {
      return;
    }

    try {
      const response = await api.delete(`/admin/skills/${id}`);
      if (response.data.success) {
        showToast('Skill deleted successfully.', 'success');
        setSkills(skills.filter(s => s.id !== id));
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete skill.', 'error');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchSkills(true);
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Header Panel */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: '#f4ebfb', color: '#a855f7' }}>
            <Award size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Technical Skills Registry</h2>
            <p>Configure technical keywords and framework credentials seekers select on their profiles.</p>
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
            <span>Add Skill Tag</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {filteredSkills.length} records
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
      ) : filteredSkills.length === 0 ? (
        <div className="empty-state glass-card">
          <Award size={48} className="warning-icon" />
          <h3>No Skills Found</h3>
          <p>No technical skills match your search parameters. Click "Add Skill Tag" to register one.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Skill Name Keyword</th>
                <th>Registered On</th>
                <th>Control Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((skill) => (
                <tr key={skill.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      <Award size={18} style={{ color: 'var(--accent)' }} />
                      <span>{skill.name}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '13.5px' }}>
                      {skill.created_at ? new Date(skill.created_at).toLocaleDateString() : '—'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      <button 
                        className="btn-icon-action" 
                        title="Edit Keyword"
                        onClick={() => handleOpenEditModal(skill)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="btn-icon-action btn-icon-danger" 
                        title="Delete Skill"
                        onClick={() => handleDeleteSkill(skill.id)}
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
              Showing {filteredSkills.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredSkills.length)} of {filteredSkills.length} records
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

      {/* Creation/Editing Modal */}
      {showModal && (
        <div className="modal-backdrop animate-fade">
          <div className="modal-content glass-card animate-slide-up">
            <div className="modal-header">
              <h3>{modalType === 'create' ? '🏆 Add Skill Keyword' : '✏️ Edit Skill Keyword'}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-scrollable">
              <div className="modal-form-grid">
                
                {/* Skill Name */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" htmlFor="skill-name">Skill Keyword Title *</label>
                  <input
                    id="skill-name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Next.js"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
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
                      <span>Saving Skill Tag...</span>
                    </>
                  ) : (
                    <span>Save Skill Tag</span>
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
        .skill-name-cell { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text-primary); }
      `}</style>
    </div>
  );
};

export default SkillManagement;
