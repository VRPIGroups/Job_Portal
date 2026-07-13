// admin-panel/src/pages/CategoryManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Plus, Search, Edit2, Trash2, X, RefreshCw, Layers } from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase()) || 
    (cat.description && cat.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Reset current page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const fetchCategories = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/admin/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve categories.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenCreateModal = () => {
    setModalType('create');
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  const handleOpenEditModal = (cat) => {
    setModalType('edit');
    setSelectedCategory(cat);
    setFormData({
      name: cat.name || '',
      description: cat.description || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Category Name is required.', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      let response;
      if (modalType === 'create') {
        response = await api.post('/admin/categories', formData);
        if (response.data.success) {
          showToast('Job category created successfully.', 'success');
          setShowModal(false);
          fetchCategories(true);
        }
      } else {
        response = await api.put(`/admin/categories/${selectedCategory.id}`, formData);
        if (response.data.success) {
          showToast('Job category updated successfully.', 'success');
          setShowModal(false);
          fetchCategories(true);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save category information.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? Jobs under this category will have their category reference cleared.')) {
      return;
    }

    try {
      const response = await api.delete(`/admin/categories/${id}`);
      if (response.data.success) {
        showToast('Category deleted successfully.', 'success');
        setCategories(categories.filter(c => c.id !== id));
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete category.', 'error');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchCategories(true);
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Header Panel */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: '#e6fbf0', color: '#16a34a' }}>
            <Layers size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Job Categories Configuration</h2>
            <p>Organize open job openings by department, discipline, or corporate sectors.</p>
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
            <span>Create Category</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {filteredCategories.length} records
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
      ) : filteredCategories.length === 0 ? (
        <div className="empty-state glass-card">
          <Layers size={48} className="warning-icon" />
          <h3>No Categories Found</h3>
          <p>No job categories match your search parameters. Click "Create Category" to register one.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Control Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      <Layers size={18} style={{ color: 'var(--primary)' }} />
                      <span>{cat.name}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{cat.description || '—'}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '13.5px' }}>{new Date(cat.created_at).toLocaleDateString()}</span>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      <button 
                        className="btn-icon-action" 
                        title="Edit Details"
                        onClick={() => handleOpenEditModal(cat)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="btn-icon-action btn-icon-danger" 
                        title="Delete Category"
                        onClick={() => handleDeleteCategory(cat.id)}
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
              Showing {filteredCategories.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} records
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
              <h3>{modalType === 'create' ? '📂 Create Job Category' : '✏️ Edit Job Category'}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-scrollable">
              <div className="modal-form-grid">
                
                {/* Category Name */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" htmlFor="cat-name">Category Title *</label>
                  <input
                    id="cat-name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Software Engineering"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="form-group full-width-field" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" htmlFor="cat-description">Summary Details</label>
                  <textarea
                    id="cat-description"
                    name="description"
                    className="form-control form-textarea"
                    placeholder="Provide department details, career branches covered, or general division notes..."
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
                      <span>Saving Category Details...</span>
                    </>
                  ) : (
                    <span>Save Category</span>
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
        .category-name-cell { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text-primary); }
      `}</style>
    </div>
  );
};

export default CategoryManagement;
