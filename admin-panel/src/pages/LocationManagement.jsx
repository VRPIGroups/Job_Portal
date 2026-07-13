// admin-panel/src/pages/LocationManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Plus, Search, Edit2, Trash2, X, RefreshCw, MapPin } from 'lucide-react';

const LocationManagement = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredLocations = locations.filter(loc => 
    loc.city.toLowerCase().includes(search.toLowerCase()) || 
    loc.state.toLowerCase().includes(search.toLowerCase())
  );

  // Reset current page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    state: '',
    city: ''
  });

  const fetchLocations = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/admin/locations');
      if (response.data.success) {
        setLocations(response.data.data);
      }
    } catch (err) {
      showToast('Failed to retrieve locations list.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpenCreateModal = () => {
    setModalType('create');
    setFormData({ state: '', city: '' });
    setShowModal(true);
  };

  const handleOpenEditModal = (loc) => {
    setModalType('edit');
    setSelectedLocation(loc);
    setFormData({
      state: loc.state || '',
      city: loc.city || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.state || !formData.city) {
      showToast('State and City are required.', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      let response;
      if (modalType === 'create') {
        response = await api.post('/admin/locations', formData);
        if (response.data.success) {
          showToast('Job location created successfully.', 'success');
          setShowModal(false);
          fetchLocations(true);
        }
      } else {
        response = await api.put(`/admin/locations/${selectedLocation.id}`, formData);
        if (response.data.success) {
          showToast('Job location updated successfully.', 'success');
          setShowModal(false);
          fetchLocations(true);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save location details.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLocation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this location? Jobs referencing this location will have their location reference cleared.')) {
      return;
    }

    try {
      const response = await api.delete(`/admin/locations/${id}`);
      if (response.data.success) {
        showToast('Location deleted successfully.', 'success');
        setLocations(locations.filter(l => l.id !== id));
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete location.', 'error');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLocations(true);
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Header Panel */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: '#fff1f2', color: '#f43f5e' }}>
            <MapPin size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Geographic Locations Directory</h2>
            <p>Define state and city directories for filtering job listings geographically.</p>
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
            <span>Add Location</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {filteredLocations.length} records
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
      ) : filteredLocations.length === 0 ? (
        <div className="empty-state glass-card">
          <MapPin size={48} className="warning-icon" />
          <h3>No Locations Found</h3>
          <p>No locations match your search query. Click "Add Location" to register one.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>City Area</th>
                <th>State Region</th>
                <th>Registered On</th>
                <th>Control Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((loc) => (
                <tr key={loc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      <MapPin size={18} style={{ color: 'var(--primary)' }} />
                      <span>{loc.city}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{loc.state}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '13.5px' }}>
                      {loc.created_at ? new Date(loc.created_at).toLocaleDateString() : '—'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      <button 
                        className="btn-icon-action" 
                        title="Edit Location"
                        onClick={() => handleOpenEditModal(loc)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="btn-icon-action btn-icon-danger" 
                        title="Delete Location"
                        onClick={() => handleDeleteLocation(loc.id)}
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
              Showing {filteredLocations.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredLocations.length)} of {filteredLocations.length} records
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
              <h3>{modalType === 'create' ? '📍 Add Geographic Location' : '✏️ Edit Geographic Location'}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-scrollable">
              <div className="modal-form-grid">
                
                {/* City Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="loc-city">City Name *</label>
                  <input
                    id="loc-city"
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="e.g. Pune"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* State Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="loc-state">State / Region *</label>
                  <input
                    id="loc-state"
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="e.g. Maharashtra"
                    value={formData.state}
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
                      <span>Saving Location Details...</span>
                    </>
                  ) : (
                    <span>Save Location</span>
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
        .location-name-cell { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text-primary); }
      `}</style>


    </div>
  );
};

export default LocationManagement;
