// admin-panel/src/pages/InterviewDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import { 
  ArrowLeft, Calendar, Clock, Video, MapPin, Check, X, AlertCircle, 
  FileText, Download, User, Mail, Phone, Star, Edit, Trash2, Send, 
  ChevronRight, Award, Plus, Info, ExternalLink, RefreshCw, Bookmark
} from 'lucide-react';

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  // Action state loaders
  const [actionLoading, setActionLoading] = useState(false);
  const [noteText, setNoteText] = useState('');
  
  // Reschedule & Edit Modal toggles
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    interview_date: '',
    interview_time: '',
    duration: '60 minutes',
    timezone: 'IST (UTC+5:30)',
    interview_type: 'Online',
    meeting_platform: 'Google Meet',
    meeting_link: '',
    meeting_id: '',
    meeting_passcode: '',
    venue: '',
    building_name: '',
    floor_number: '',
    room_number: '',
    contact_person: '',
    google_maps_link: '',
    interviewer_name: '',
    interviewer_email: '',
    interview_round: '',
    additional_instructions: ''
  });

  // Feedback Form States
  const [feedbackFormData, setFeedbackFormData] = useState({
    interviewer_name: '',
    feedback_text: '',
    rating: 5,
    technical_rating: 5,
    communication_rating: 5,
    problem_solving_rating: 5,
    leadership_rating: 5,
    teamwork_rating: 5,
    strengths: '',
    weaknesses: '',
    recruiter_remarks: '',
    recommendation: 'Pass'
  });

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/ats/interviews/${id}`);
      if (res.data.success) {
        setData(res.data.data);
        
        // Setup forms
        const intr = res.data.data.interview;
        setEditFormData({
          interview_date: intr.interview_date || '',
          interview_time: intr.interview_time || '',
          duration: intr.duration || '60 minutes',
          timezone: intr.timezone || 'IST (UTC+5:30)',
          interview_type: intr.interview_type || 'Online',
          meeting_platform: intr.meeting_platform || 'Google Meet',
          meeting_link: intr.meeting_link || '',
          meeting_id: intr.meeting_id || '',
          meeting_passcode: intr.meeting_passcode || '',
          venue: intr.venue || '',
          building_name: intr.building_name || '',
          floor_number: intr.floor_number || '',
          room_number: intr.room_number || '',
          contact_person: intr.contact_person || '',
          google_maps_link: intr.google_maps_link || '',
          interviewer_name: intr.interviewer_name || '',
          interviewer_email: intr.interviewer_email || '',
          interview_round: intr.interview_round || '',
          additional_instructions: intr.additional_instructions || ''
        });

        setFeedbackFormData({
          interviewer_name: intr.interviewer_name || '',
          feedback_text: '',
          rating: 5,
          technical_rating: 5,
          communication_rating: 5,
          problem_solving_rating: 5,
          leadership_rating: 5,
          teamwork_rating: 5,
          strengths: '',
          weaknesses: '',
          recruiter_remarks: '',
          recommendation: 'Pass'
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load interview metadata details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="admin-page-container" style={{ padding: '30px' }}>
        <div className="skeleton-card shimmer-wrapper" style={{ height: '350px', borderRadius: '8px', marginBottom: '20px' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page-container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <AlertCircle size={40} style={{ color: 'var(--danger)', marginBottom: '14px' }} />
        <h3>Access Error</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/ats')}>Return to ATS Console</button>
      </div>
    );
  }

  const { interview, feedbacks, notes, timeline, scoreData, resumeData } = data;

  // Actions Callbacks
  const handleMarkAttendance = async (statusVal) => {
    setActionLoading(true);
    try {
      const res = await api.post(`/ats/interviews/${interview.id}/attendance`, { attendance_status: statusVal });
      if (res.data.success) {
        showToast(`Attendance updated to: ${statusVal}`, 'success');
        fetchDetails();
      }
    } catch (err) {
      showToast('Failed to update attendance status.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendReminder = async () => {
    setActionLoading(true);
    try {
      const res = await api.post(`/ats/interviews/${interview.id}/send-reminder`);
      if (res.data.success) {
        showToast('Email reminder sent successfully.', 'success');
      }
    } catch (err) {
      showToast('Failed to send reminder email.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelInterview = async () => {
    if (!window.confirm('Are you sure you want to cancel this interview? This automatically notifies the candidate.')) return;
    setActionLoading(true);
    try {
      const res = await api.post(`/ats/interviews/${interview.id}/cancel`);
      if (res.data.success) {
        showToast('Interview cancelled.', 'success');
        fetchDetails();
      }
    } catch (err) {
      showToast('Failed to cancel session.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await api.put(`/ats/interviews/${interview.id}`, editFormData);
      if (res.data.success) {
        showToast('Interview schedule updated successfully.', 'success');
        setShowEditModal(false);
        fetchDetails();
      }
    } catch (err) {
      showToast('Failed to update schedule details.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePostNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setActionLoading(true);
    try {
      const res = await api.post(`/applications/${interview.application_id}/notes`, { note_text: noteText.trim() });
      if (res.data.success) {
        showToast('Private candidate evaluation note saved.', 'success');
        setNoteText('');
        fetchDetails();
      }
    } catch (err) {
      showToast('Failed to add note.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await api.post(`/ats/interviews/${interview.id}/feedback`, feedbackFormData);
      if (res.data.success) {
        showToast('Evaluation feedback logged and status updated.', 'success');
        fetchDetails();
      }
    } catch (err) {
      showToast('Failed to submit evaluation feedback.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="admin-page-container animate-fade" style={{ padding: '30px', maxWidth: '1400px' }}>
      
      {/* Back button link */}
      <button 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: 'none', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', fontWeight: 800, marginBottom: '20px' }}
        onClick={() => navigate('/ats')}
      >
        <ArrowLeft size={16} />
        <span>Return to ATS Management Console</span>
      </button>

      {/* Header bar widget */}
      <div className="management-header" style={{ marginBottom: '24px' }}>
        <div className="header-info-container">
          <div className="header-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0 }}>Evaluation Portal: {interview.interview_round}</h2>
              <span className={`status-pill pill-${interview.status}`} style={{ fontSize: '11px', padding: '4px 10px' }}>
                {interview.status}
              </span>
            </div>
            <p>Evaluating Candidate <strong>{interview.candidate_first_name} {interview.candidate_last_name}</strong> for <strong>{interview.job_title}</strong></p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left main section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Candidate Dossier */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px' }}>Applicant Profile Dossier</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '13px' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>CANDIDATE FULL NAME:</strong>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>{interview.candidate_first_name} {interview.candidate_last_name}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>EMAIL ADDRESS:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{interview.candidate_email}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>CONTACT PHONE:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{interview.candidate_phone || 'N/A'}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>SUBMITTED RESUME DOCUMENT:</strong>
                {interview.candidate_resume_file ? (
                  <a href={`http://localhost:5000/uploads/resumes/${interview.candidate_resume_file}`} target="_blank" rel="noreferrer" className="btn-resume-link" style={{ display: 'inline-flex', padding: '3px 8px', fontSize: '11px', marginTop: '2px' }}>
                    <FileText size={12} />
                    <span>Download PDF Resume</span>
                  </a>
                ) : <span style={{ color: 'var(--danger)' }}>No resume uploaded</span>}
              </div>
            </div>
          </div>

          {/* Interview details and platform details */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px' }}>Session Specifications</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '13px', marginBottom: '20px' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>DATE:</strong>
                <span>{interview.interview_date}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>TIME:</strong>
                <span>{interview.interview_time} ({interview.duration || '60 mins'})</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>TIME ZONE:</strong>
                <span>{interview.timezone || 'IST (UTC+5:30)'}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>ROUND:</strong>
                <span>{interview.interview_round}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>MODE:</strong>
                <span>{interview.interview_type}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>ATTENDANCE STATE:</strong>
                <span className={`status-pill pill-${interview.attendance_status}`} style={{ fontSize: '11px', padding: '2px 8px' }}>{interview.attendance_status}</span>
              </div>
            </div>

            {interview.interview_type === 'Online' ? (
              <div style={{ background: 'var(--bg-tertiary)', padding: '14px', borderRadius: '6px', fontSize: '13px', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>Google Meet / Video Call Links:</strong>
                <div>Link: <a href={interview.meeting_link} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{interview.meeting_link}</a></div>
                {interview.meeting_id && <div style={{ marginTop: '4px' }}>Meeting ID: <strong>{interview.meeting_id}</strong></div>}
                {interview.meeting_passcode && <div style={{ marginTop: '2px' }}>Passcode: <strong>{interview.meeting_passcode}</strong></div>}
              </div>
            ) : (
              <div style={{ background: 'var(--bg-tertiary)', padding: '14px', borderRadius: '6px', fontSize: '13px', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>Office Location Venue:</strong>
                <div>Address: <strong>{interview.venue}</strong></div>
                <div>Building/Floor: <strong>{interview.building_name || 'N/A'}, Floor {interview.floor_number || 'N/A'}, Room {interview.room_number || 'N/A'}</strong></div>
                {interview.contact_person && <div>Venue Contact: <strong>{interview.contact_person}</strong></div>}
              </div>
            )}
          </div>

          {/* Feedback Form / Display */}
          {interview.status === 'Completed' ? (
            <div className="glass-card border-left-success" style={{ padding: '24px', borderLeft: '4px solid var(--success)' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--success)', fontWeight: 800, marginBottom: '16px' }}>Feedback Submitted</h3>
              
              {feedbacks.map((f, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div>Technical: <strong>{f.technical_rating}/5</strong></div>
                    <div>Communication: <strong>{f.communication_rating}/5</strong></div>
                    <div>Problem Solving: <strong>{f.problem_solving_rating}/5</strong></div>
                    <div>Overall Rating: <strong>{f.rating}/5</strong></div>
                  </div>
                  <div>Recommendation Result: <strong style={{ color: 'var(--primary)' }}>{f.recommendation}</strong></div>
                  {f.strengths && <div>Candidate Strengths: <span style={{ color: 'var(--text-secondary)' }}>{f.strengths}</span></div>}
                  {f.weaknesses && <div>Candidate Weaknesses: <span style={{ color: 'var(--text-secondary)' }}>{f.weaknesses}</span></div>}
                  <div style={{ fontStyle: 'italic', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '4px' }}>Remarks: "{f.feedback_text}"</div>
                </div>
              ))}
            </div>
          ) : (
            interview.status === 'Scheduled' && (
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px' }}>Interview Feedback & Recommendation</h3>
                
                <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '10px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Technical Knowledge</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{feedbackFormData.technical_rating} / 5</span>
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="form-control"
                        style={{ width: '100%', height: '8px', padding: '0', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        value={feedbackFormData.technical_rating}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, technical_rating: parseInt(e.target.value) })}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Communication</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{feedbackFormData.communication_rating} / 5</span>
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="form-control"
                        style={{ width: '100%', height: '8px', padding: '0', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        value={feedbackFormData.communication_rating}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, communication_rating: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Problem Solving</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{feedbackFormData.problem_solving_rating} / 5</span>
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="form-control"
                        style={{ width: '100%', height: '8px', padding: '0', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        value={feedbackFormData.problem_solving_rating}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, problem_solving_rating: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Leadership</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{feedbackFormData.leadership_rating} / 5</span>
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="form-control"
                        style={{ width: '100%', height: '8px', padding: '0', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        value={feedbackFormData.leadership_rating}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, leadership_rating: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Teamwork</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{feedbackFormData.teamwork_rating} / 5</span>
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="form-control"
                        style={{ width: '100%', height: '8px', padding: '0', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        value={feedbackFormData.teamwork_rating}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, teamwork_rating: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span>Overall Rating</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{feedbackFormData.rating} / 5</span>
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="form-control"
                        style={{ width: '100%', height: '8px', padding: '0', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        value={feedbackFormData.rating}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, rating: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Strengths</label>
                      <input 
                        type="text" 
                        placeholder="Candidate strengths"
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={feedbackFormData.strengths}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, strengths: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Weaknesses</label>
                      <input 
                        type="text" 
                        placeholder="Candidate weaknesses"
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={feedbackFormData.weaknesses}
                        onChange={(e) => setFeedbackFormData({ ...feedbackFormData, weaknesses: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Recruitment Recommendation</label>
                    <select
                      className="form-control"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                      value={feedbackFormData.recommendation}
                      onChange={(e) => setFeedbackFormData({ ...feedbackFormData, recommendation: e.target.value })}
                    >
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="Hold">Hold</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Recruiter Remarks / Detailed Feedback</label>
                    <textarea 
                      className="form-control"
                      rows={4}
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                      placeholder="Type details about the technical and behavioral assessment..."
                      value={feedbackFormData.feedback_text}
                      onChange={(e) => setFeedbackFormData({ ...feedbackFormData, feedback_text: e.target.value, recruiter_remarks: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Submit Performance Evaluation</button>
                </form>
              </div>
            )
          )}

          {/* Timeline and Trail */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px' }}>Status Audit Trail</h3>
            
            <div className="timeline-trail" style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '2px solid var(--border-color)', paddingLeft: '16px', marginLeft: '6px' }}>
              {timeline.map((hist, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-23px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--bg-primary)' }}></span>
                  <div style={{ fontSize: '13px' }}>
                    <strong>{hist.status}</strong>
                    <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)' }}>{hist.remarks}</p>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-tertiary)' }}>{new Date(hist.created_at).toLocaleString()} {hist.changed_by_first ? `by ${hist.changed_by_first}` : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right sidebar panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Recruiter Actions Panel */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>Recruiter Panel Control</h3>
            
            {interview.status === 'Scheduled' && (
              <>
                <button className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => setShowEditModal(true)}>
                  <Edit size={14} />
                  <span>Edit / Reschedule</span>
                </button>
                
                <button className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleSendReminder}>
                  <Send size={14} />
                  <span>Send Email Reminder</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button className="btn btn-secondary" style={{ fontSize: '12px' }} onClick={() => handleMarkAttendance('Present')}>Mark Present</button>
                  <button className="btn btn-secondary" style={{ fontSize: '12px' }} onClick={() => handleMarkAttendance('Absent')}>Mark Absent</button>
                </div>

                <button className="btn btn-danger" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleCancelInterview}>
                  <Trash2 size={14} />
                  <span>Cancel Interview</span>
                </button>
              </>
            )}
            
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
              Session state changes automatically trigger student email updates.
            </div>
          </div>

          {/* AI Score panel */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>AI Resume Matcher</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-tertiary)', padding: '14px', borderRadius: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800 }}>Match Score:</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>{scoreData?.match_score || '—'}%</span>
            </div>
            
            {scoreData?.ats_recommendation && (
              <div style={{ fontSize: '12px', background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '4px' }}>
                Recommendation: <strong>{scoreData.ats_recommendation}</strong>
              </div>
            )}

            {resumeData?.skills && (
              <div>
                <strong style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>Extracted Skills Matrix</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {resumeData.skills.split(',').map((sk, i) => (
                    <span key={i} style={{ fontSize: '10px', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>{sk.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Private Notes Panel */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px' }}>Private Remarks Log</h3>
            
            <form onSubmit={handlePostNote} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <textarea 
                className="form-control"
                placeholder="Log internal note about candidates..."
                rows={3}
                style={{ width: '100%', padding: '8px', fontSize: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-end', fontSize: '11px' }}>Add Private Note</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
              {notes.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No private notes logged.</div>
              ) : (
                notes.map(n => (
                  <div key={n.id} style={{ background: 'var(--bg-tertiary)', padding: '8px 10px', borderRadius: '4px', fontSize: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '10px', color: 'var(--text-tertiary)' }}>
                      <span>{n.recruiter_first} {n.recruiter_last}</span>
                      <span>{new Date(n.created_at).toLocaleDateString()}</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>{n.note_text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Edit schedule modal */}
      {showEditModal && (
        <div className="modal-backdrop animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '650px', width: '100%', margin: '0 20px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontWeight: 800 }}>Edit Session Details</h3>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => setShowEditModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateDetails} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: 800 }}>Date *</label>
                  <input 
                    type="date"
                    className="form-control"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={editFormData.interview_date}
                    onChange={(e) => setEditFormData({ ...editFormData, interview_date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: 800 }}>Time *</label>
                  <input 
                    type="time"
                    className="form-control"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={editFormData.interview_time}
                    onChange={(e) => setEditFormData({ ...editFormData, interview_time: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: 800 }}>Duration</label>
                  <input 
                    type="text"
                    className="form-control"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={editFormData.duration}
                    onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: 800 }}>Mode</label>
                  <select 
                    className="form-control"
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    value={editFormData.interview_type}
                    onChange={(e) => setEditFormData({ ...editFormData, interview_type: e.target.value })}
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              {editFormData.interview_type === 'Online' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 800 }}>Platform</label>
                    <input 
                      type="text" 
                      className="form-control"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                      value={editFormData.meeting_platform}
                      onChange={(e) => setEditFormData({ ...editFormData, meeting_platform: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 800 }}>Meeting URL Link *</label>
                    <input 
                      type="url" 
                      className="form-control"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                      value={editFormData.meeting_link}
                      onChange={(e) => setEditFormData({ ...editFormData, meeting_link: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800 }}>Meeting ID</label>
                      <input 
                        type="text" 
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={editFormData.meeting_id}
                        onChange={(e) => setEditFormData({ ...editFormData, meeting_id: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800 }}>Meeting Passcode</label>
                      <input 
                        type="text" 
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={editFormData.meeting_passcode}
                        onChange={(e) => setEditFormData({ ...editFormData, meeting_passcode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 800 }}>Venue Location Address *</label>
                    <input 
                      type="text" 
                      className="form-control"
                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                      value={editFormData.venue}
                      onChange={(e) => setEditFormData({ ...editFormData, venue: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800 }}>Building</label>
                      <input 
                        type="text" 
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={editFormData.building_name}
                        onChange={(e) => setEditFormData({ ...editFormData, building_name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800 }}>Floor</label>
                      <input 
                        type="text" 
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={editFormData.floor_number}
                        onChange={(e) => setEditFormData({ ...editFormData, floor_number: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800 }}>Room Number</label>
                      <input 
                        type="text" 
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={editFormData.room_number}
                        onChange={(e) => setEditFormData({ ...editFormData, room_number: e.target.value })}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800 }}>Contact Person</label>
                      <input 
                        type="text" 
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={editFormData.contact_person}
                        onChange={(e) => setEditFormData({ ...editFormData, contact_person: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 800 }}>Google Maps Link</label>
                      <input 
                        type="url" 
                        className="form-control"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        value={editFormData.google_maps_link}
                        onChange={(e) => setEditFormData({ ...editFormData, google_maps_link: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={actionLoading}>Update Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default InterviewDetails;
