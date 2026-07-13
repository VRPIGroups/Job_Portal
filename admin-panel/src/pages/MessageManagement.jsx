// admin-panel/src/pages/MessageManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { Search, Trash2, Mail, ExternalLink, Calendar, Building, MapPin, Phone, RefreshCw, X, ShieldAlert } from 'lucide-react';

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
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
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const fetchMessages = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const response = await api.get('/admin/messages', {
        params: { search: search || undefined }
      });
      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to retrieve collaboration messages.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMessages();
    }, 400); // debounce search

    return () => clearTimeout(timer);
  }, [search]);

  const handleDeleteMessage = async (id, e) => {
    e.stopPropagation(); // Prevent opening detail modal
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await api.delete(`/admin/messages/${id}`);
      if (response.data.success) {
        showToast(response.data.message, 'success');
        setMessages(messages.filter(m => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete the message.', 'error');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMessages(true);
  };

  return (
    <div className="admin-page-container animate-fade">
      
      {/* Page Header */}
      <div className="management-header">
        <div className="header-info-container">
          <div className="header-icon-wrapper" style={{ backgroundColor: '#fff7ed', color: '#f97316' }}>
            <Mail size={22} className="header-briefcase-icon" />
          </div>
          <div className="header-info">
            <h2>Collaboration Messages</h2>
            <p>Inspect incoming contact requests and business collaboration queries submitted via the frontend portal.</p>
          </div>
        </div>
        <button 
          className="btn btn-secondary btn-refresh" 
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin-animation' : ''} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-search-card">
        <div className="records-badge">
          {messages.length} records
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

      {/* Messages Directory Table */}
      {loading ? (
        <div className="directory-skeleton">
          <div className="table-responsive-wrapper">
            <div className="skeleton-header shimmer-wrapper"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-row shimmer-wrapper"></div>
            ))}
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className="empty-state glass-card">
          <ShieldAlert size={48} className="warning-icon" />
          <h3>No Collaboration Messages</h3>
          <p>No contact inquiries match your search query or have been received yet.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper glass-card animate-slide">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>Company</th>
                <th>Email ID</th>
                <th>Contact Number</th>
                <th>Submission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((msg) => (
                <tr 
                  key={msg.id} 
                  className="clickable-row"
                  onClick={() => setSelectedMessage(msg)}
                  title="Click to view full message details"
                >
                  <td>
                    <span className="sender-name-text">{msg.name}</span>
                  </td>
                  <td>
                    <div className="company-cell-info">
                      <Building size={14} className="company-icon" />
                      <span>{msg.company_name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="sender-email-text">{msg.email}</span>
                  </td>
                  <td>
                    <span className="sender-phone-text">{msg.business_number}</span>
                  </td>
                  <td>
                    <span className="submission-date-text">
                      {new Date(msg.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </td>
                  <td>
                    <div className="btn-actions-row">
                      <button
                        className="btn-icon-action"
                        title="View Details"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(msg);
                        }}
                      >
                        <ExternalLink size={16} />
                      </button>
                      <button
                        className="btn-icon-action btn-icon-danger"
                        title="Delete Message"
                        onClick={(e) => handleDeleteMessage(msg.id, e)}
                      >
                        <Trash2 size={16} />
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
              Showing {messages.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, messages.length)} of {messages.length} records
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

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="modal-overlay animate-fade" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content glass-card animate-slide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Collaboration Query Details</h3>
              <button className="modal-close-btn" onClick={() => setSelectedMessage(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="details-section">
                <div className="info-grid">
                  <div className="info-block">
                    <span className="block-label">Sender Name</span>
                    <span className="block-val">{selectedMessage.name}</span>
                  </div>
                  <div className="info-block">
                    <span className="block-label">Company Name</span>
                    <span className="block-val flex-val"><Building size={16} /> {selectedMessage.company_name}</span>
                  </div>
                  <div className="info-block">
                    <span className="block-label">Company Email ID</span>
                    <span className="block-val flex-val">
                      <Mail size={16} /> 
                      <a href={`mailto:${selectedMessage.email}`} className="email-mailto-link">
                        {selectedMessage.email}
                      </a>
                    </span>
                  </div>
                  <div className="info-block">
                    <span className="block-label">Business Number</span>
                    <span className="block-val flex-val"><Phone size={16} /> {selectedMessage.business_number}</span>
                  </div>
                  <div className="info-block full-width-info">
                    <span className="block-label">Company Address</span>
                    <span className="block-val flex-val"><MapPin size={16} /> {selectedMessage.company_address}</span>
                  </div>
                  <div className="info-block full-width-info">
                    <span className="block-label">Submission Timestamp</span>
                    <span className="block-val flex-val">
                      <Calendar size={16} />
                      {new Date(selectedMessage.created_at).toLocaleString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="message-content-box">
                  <span className="block-label">Message Details</span>
                  <div className="message-body-text">{selectedMessage.message}</div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedMessage(null)}>
                Close Window
              </button>
              <button 
                className="btn btn-primary btn-danger-action"
                onClick={(e) => handleDeleteMessage(selectedMessage.id, e)}
              >
                <Trash2 size={16} />
                <span>Delete Message</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spin-animation { animation: spin 1s linear infinite; }
        .btn-refresh { height: 38px; }

        /* Message-specific row styles */
        .clickable-row { cursor: pointer; transition: background-color var(--transition-fast); }
        .clickable-row:hover td { background-color: rgba(255, 81, 0, 0.02) !important; }
        .company-cell-info { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .company-icon { color: var(--primary); }
        .sender-name-text { font-weight: 700; color: var(--text-primary); }
        .btn-icon-view:hover { color: var(--primary) !important; border-color: var(--primary-glow) !important; background-color: var(--primary-glow) !important; }

        /* Message detail modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.65); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-bottom: 24px; }
        .info-block { display: flex; flex-direction: column; gap: 6px; }
        .full-width-info { grid-column: span 2; }
        .block-label { font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; }
        .block-val { font-size: 14.5px; font-weight: 600; color: var(--text-primary); }
        .flex-val { display: flex; align-items: center; gap: 8px; }
        .flex-val svg { color: var(--primary); flex-shrink: 0; }
        .email-mailto-link { color: var(--primary); text-decoration: underline; }
        .email-mailto-link:hover { color: var(--primary-hover); }
        .message-content-box { border-top: 1px solid var(--border-color); padding-top: 20px; display: flex; flex-direction: column; gap: 10px; }
        .message-body-text { background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 16px; font-size: 14px; line-height: 1.6; color: var(--text-secondary); white-space: pre-wrap; font-family: inherit; }
        .btn-danger-action { background-color: var(--danger) !important; border-color: var(--danger) !important; color: #fff !important; }
        .btn-danger-action:hover { background-color: #dc2626 !important; }
      `}</style>




    
    </div>
  );
};

export default MessageManagement;
