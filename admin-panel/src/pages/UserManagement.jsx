// admin-panel/src/pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Search, Ban, CheckCircle, ShieldAlert, Shield, Users, RefreshCw } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset current page on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, role]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const fetchUsers = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/admin/users', {
        params: { search: search || undefined, role: role !== 'all' ? role : undefined }
      });
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to retrieve user accounts directory.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 400); // debounce searches

    return () => clearTimeout(timer);
  }, [search, role]);

  const handleToggleStatus = async (user) => {
    if (user.role === 'admin') {
      showToast('Administrator accounts cannot be blocked.', 'warning');
      return;
    }

    try {
      const response = await api.patch(`/admin/users/${user.id}/status`);
      if (response.data.success) {
        showToast(response.data.message, 'success');
        // Update user locally
        setUsers(users.map(u => u.id === user.id ? { ...u, is_blocked: !u.is_blocked } : u));
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update user security status.', 'error');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchUsers(true);
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Page Header */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper">
            <Users size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>User Directory Auditing</h2>
            <p>Audit system users, inspect permissions levels, and restrict/block access to accounts violating platform policies.</p>
          </div>
        </div>
        <button 
          className="btn btn-secondary btn-refresh" 
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin-animation' : ''} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {users.length} records
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
            <span className="status-filter-label">ROLE FILTER:</span>
            <select 
              id="role-select" 
              className="filter-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="candidate">Candidates Only</option>
              <option value="admin">Administrators Only</option>
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
      ) : users.length === 0 ? (
        <div className="empty-state glass-card">
          <ShieldAlert size={48} className="warning-icon" />
          <h3>No User Accounts Found</h3>
          <p>No registers match your search or filter configuration. Check spelling or clear search filters.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Profile & Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Security Role</th>
                <th>Account Status</th>
                <th>Registration Date</th>
                <th>Auditing Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id} className={user.is_blocked ? 'row-blocked' : ''}>
                  <td>
                    <div className="user-profile-cell">
                      {user.profile_image ? (
                        <img 
                          src={`http://localhost:5000/uploads/images/${user.profile_image}`} 
                          alt="" 
                          className="user-avatar-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="user-avatar-placeholder">
                        {user.first_name ? user.first_name[0].toUpperCase() : ''}
                        {user.last_name ? user.last_name[0].toUpperCase() : ''}
                      </div>
                      <div className="user-name-wrapper">
                        <span className="user-fullname">{user.first_name} {user.last_name}</span>
                        {user.role === 'admin' && (
                          <span className="badge-shield-icon" title="Administrator account">
                            <Shield size={12} />
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="user-email-text">{user.email}</span>
                  </td>
                  <td>
                    <span className="user-phone-text">{user.phone || '—'}</span>
                  </td>
                  <td>
                    <span className={`role-tag-pill ${user.role === 'admin' ? 'tag-admin' : 'tag-candidate'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.is_blocked ? (
                      <span className="status-pill pill-inactive">Blocked</span>
                    ) : (
                      <span className="status-pill pill-active">Active</span>
                    )}
                  </td>
                  <td>
                    <span className="date-registered-text">
                      {new Date(user.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      {user.role === 'admin' ? (
                        <span className="action-restricted-text">Restricted</span>
                      ) : (
                        <button
                          className={`btn-icon-action ${user.is_blocked ? 'btn-icon-unblock' : 'btn-icon-danger'}`}
                          title={user.is_blocked ? 'Activate Account' : 'Block Account'}
                          onClick={() => handleToggleStatus(user)}
                        >
                          {user.is_blocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination bar */}
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing {users.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, users.length)} of {users.length} records
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

      <style>{`
        .spin-animation { animation: spin 1s linear infinite; }
        .btn-refresh { height: 38px; }

        /* User-specific table cell styles */
        .user-profile-cell { display: flex; align-items: center; gap: 12px; }
        .user-avatar-img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border-color); }
        .user-avatar-placeholder { width: 34px; height: 34px; border-radius: 50%; background-color: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; text-transform: uppercase; border: 1px solid #dbeafe; }
        .user-name-wrapper { display: flex; align-items: center; gap: 6px; }
        .user-fullname { font-weight: 700; color: var(--text-primary); }
        .badge-shield-icon { color: var(--primary); display: inline-flex; }
        .role-tag-pill { display: inline-flex; padding: 3px 8px; border-radius: var(--radius-xs); font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .tag-admin { background-color: var(--primary-glow); color: var(--primary); border: 1px solid var(--primary); }
        .tag-candidate { background-color: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid var(--border-color); }
        .row-blocked { background-color: rgba(239, 68, 68, 0.02); }
        .row-blocked td { color: var(--text-tertiary); }
        .btn-icon-unblock:hover { color: var(--success) !important; border-color: var(--success-glow) !important; background-color: var(--success-glow) !important; }
        .action-restricted-text { font-size: 12px; color: var(--text-tertiary); font-style: italic; font-weight: 500; }
      `}</style>
    
    </div>
  );
};

export default UserManagement;
