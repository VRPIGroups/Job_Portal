// frontend/src/pages/InterviewDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  Calendar, Clock, Video, MapPin, Copy, CalendarCheck, HelpCircle, 
  ArrowLeft, FileText, Download, User, Mail, Phone, ChevronRight, 
  AlertCircle, CheckCircle, Info, ExternalLink, RefreshCw
} from 'lucide-react';

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/interviews/${id}`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load interview details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="skeleton-card shimmer-wrapper" style={{ height: '300px', borderRadius: '12px', marginBottom: '20px' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <div className="skeleton-card shimmer-wrapper" style={{ height: '400px', borderRadius: '12px' }}></div>
          <div className="skeleton-card shimmer-wrapper" style={{ height: '400px', borderRadius: '12px' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '450px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <AlertCircle size={48} style={{ color: 'var(--danger)' }} />
          <h3>Access Denied / Error</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const { interview, feedbacks, timeline } = data;

  // Helpers
  const handleConfirmAttendance = async () => {
    setActionLoading(true);
    try {
      const res = await api.post(`/interviews/${interview.id}/attendance`, { attendance_status: 'Confirmed' });
      if (res.data.success) {
        showToast('Attendance confirmed successfully.', 'success');
        fetchDetails();
      }
    } catch (err) {
      showToast('Failed to confirm attendance.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestReschedule = async () => {
    setActionLoading(true);
    try {
      const res = await api.post(`/interviews/${interview.id}/attendance`, { attendance_status: 'Reschedule Requested' });
      if (res.data.success) {
        showToast('Reschedule request submitted successfully.', 'success');
        fetchDetails();
      }
    } catch (err) {
      showToast('Failed to request reschedule.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (interview.meeting_link) {
      navigator.clipboard.writeText(interview.meeting_link);
      showToast('Meeting link copied to clipboard.', 'success');
    }
  };

  const handleDownloadDetails = () => {
    window.print();
  };

  // Google Calendar integration url generator
  const getGoogleCalendarUrl = () => {
    try {
      const title = encodeURIComponent(`${interview.interview_round} with ${interview.company_name}`);
      const cleanDate = interview.interview_date.replace(/-/g, '');
      const cleanTime = interview.interview_time.replace(/:/g, '');
      // Mock dates block
      const startDateTime = `${cleanDate}T${cleanTime}00`;
      const endDateTime = `${cleanDate}T${parseInt(cleanTime.slice(0, 2)) + 1}${cleanTime.slice(2, 4)}00`;
      const dates = `${startDateTime}/${endDateTime}`;
      const details = encodeURIComponent(`Job Title: ${interview.job_title}\nInterviewer: ${interview.interviewer_name}\nInstructions: ${interview.additional_instructions || 'N/A'}`);
      const location = encodeURIComponent(interview.interview_type === 'Online' ? (interview.meeting_link || 'Online') : (interview.venue || 'Office Venue'));

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    } catch (err) {
      return '#';
    }
  };

  const generateICSFile = () => {
    try {
      const cleanDate = interview.interview_date.replace(/-/g, '');
      const cleanTime = interview.interview_time.replace(/:/g, '');
      const icsMsg = 
        `BEGIN:VCALENDAR\n` +
        `VERSION:2.0\n` +
        `BEGIN:VEVENT\n` +
        `SUMMARY:${interview.interview_round} - ${interview.company_name}\n` +
        `DTSTART:${cleanDate}T${cleanTime}00\n` +
        `DURATION:PT1H\n` +
        `DESCRIPTION:Job: ${interview.job_title}\\nInterviewer: ${interview.interviewer_name}\n` +
        `LOCATION:${interview.interview_type === 'Online' ? (interview.meeting_link || 'Online') : (interview.venue || 'Office')}\n` +
        `END:VEVENT\n` +
        `END:VCALENDAR`;

      const blob = new Blob([icsMsg], { type: 'text/calendar;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `interview_schedule_${interview.id}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Outlook ICS file generated and downloaded.', 'success');
    } catch (err) {
      showToast('Failed to generate calendar file.', 'error');
    }
  };

  // Determine stage check indicators on timeline trail
  const timelineStages = [
    { label: 'Applied', checked: true },
    { label: 'Under Review', checked: timeline.some(t => t.status === 'Under Review') },
    { label: 'Shortlisted', checked: timeline.some(t => t.status === 'Shortlisted') },
    { label: 'Interview Scheduled', checked: true },
    { label: 'Interview Confirmed', checked: interview.attendance_status === 'Confirmed' || interview.status === 'Completed' },
    { label: 'Interview Completed', checked: interview.status === 'Completed' },
    { label: 'Selected / Rejected', checked: interview.application_status === 'Selected' || interview.application_status === 'Rejected' }
  ];

  return (
    <div className="container" style={{ padding: '30px 20px', maxWidth: '1200px' }}>
      
      {/* Back Button */}
      <button 
        className="btn-back" 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: 'none', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', fontWeight: 700, marginBottom: '20px' }}
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft size={16} />
        <span>Back to Candidate Dashboard</span>
      </button>

      {/* Header section card */}
      <div className="glass-card header-details-widget" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="logo-container" style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--primary)', border: '1px solid var(--border-color)', fontSize: '1.25rem' }}>
            {interview.company_name[0]}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>{interview.interview_round}</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Job Position: <strong>{interview.job_title}</strong> at <strong>{interview.company_name}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <span className={`status-pill pill-${interview.application_status.replace(/\s+/g, '')}`} style={{ fontSize: '12px', padding: '6px 14px' }}>
            {interview.application_status}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Session ID: #{interview.id}</span>
        </div>
      </div>

      <div className="grid-details-layout" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px' }}>
        
        {/* Left Primary Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main session outline card */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px', fontSize: '16px', fontWeight: 800 }}>Interview Specifications</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '13px' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>CANDIDATE NAME</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{interview.candidate_first_name} {interview.candidate_last_name}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>EVALUATION ROUND</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{interview.interview_round} ({interview.interview_type})</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>SCHEDULE DATE</strong>
                <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {interview.interview_date}
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>SESSION START TIME</strong>
                <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {interview.interview_time} ({interview.duration || '60 mins'})
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>TIME ZONE</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{interview.timezone || 'IST (UTC+5:30)'}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>ATTENDANCE STATE</strong>
                <span className={`status-pill pill-${interview.attendance_status}`} style={{ fontSize: '11px', padding: '2px 8px' }}>{interview.attendance_status}</span>
              </div>
            </div>
          </div>

          {/* Type specific cards (Online vs Offline) */}
          {interview.interview_type === 'Online' ? (
            <div className="glass-card border-left-orange" style={{ padding: '24px', borderLeft: '4px solid var(--primary)', backgroundColor: 'var(--bg-tertiary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Video style={{ color: 'var(--primary)' }} />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Online Video Interview Room</h3>
              </div>
              
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                This is an online video round scheduled on <strong>{interview.meeting_platform || 'Google Meet'}</strong>. Please click the button below to join the call at the scheduled time.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-primary)', padding: '14px', borderRadius: '6px', fontSize: '13px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                <div>Meeting ID: <strong>{interview.meeting_id || 'Link contains room identifier'}</strong></div>
                <div>Passcode: <strong>{interview.meeting_passcode || 'Not required'}</strong></div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <a href={interview.meeting_link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <span>Join Video Call</span>
                  <ExternalLink size={14} />
                </a>
                <button className="btn btn-secondary" onClick={handleCopyLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Copy size={14} />
                  <span>Copy Meeting Link</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card border-left-blue" style={{ padding: '24px', borderLeft: '4px solid #3182ce', backgroundColor: 'var(--bg-tertiary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <MapPin style={{ color: '#3182ce' }} />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Offline Face-to-Face Venue</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px', marginBottom: '16px' }}>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)' }}>CORPORATE HQ ADDRESS:</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{interview.venue || 'Office head office'}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)' }}>BUILDING / FLOOR:</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{interview.building_name || 'N/A'}, Floor {interview.floor_number || 'N/A'}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)' }}>INTERVIEW ROOM:</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>Room: {interview.room_number || 'TBD'}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)' }}>OFFICE CONTACT PERSON:</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{interview.contact_person || 'HR Desk receptionist'}</span>
                </div>
              </div>

              {interview.google_maps_link && (
                <a href={interview.google_maps_link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <MapPin size={14} />
                  <span>Google Maps Coordinates</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          )}

          {/* Instructions Box */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '16px', fontSize: '16px', fontWeight: 800 }}>Recruiter Instructions</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><CheckCircle size={14} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} /><span>Join or arrive at least 15 minutes before the scheduled time slots.</span></div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><CheckCircle size={14} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} /><span>Carry an updated physical copy of your resume.</span></div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><CheckCircle size={14} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} /><span>Keep a valid Government ID proof handy for check-in audits.</span></div>
              {interview.interview_type === 'Online' && (
                <>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><CheckCircle size={14} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} /><span>Ensure your camera and microphone accessories are functioning correctly.</span></div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><CheckCircle size={14} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} /><span>Verify that you have a stable network internet connection.</span></div>
                </>
              )}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><CheckCircle size={14} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} /><span>Dress in formal/business professional attire.</span></div>
            </div>

            {interview.additional_instructions && (
              <div style={{ marginTop: '20px', background: 'var(--bg-tertiary)', padding: '14px', borderRadius: '6px', fontSize: '13px', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Private Remarks from Coordinator:</strong>
                <p style={{ margin: 0, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>{interview.additional_instructions}</p>
              </div>
            )}
          </div>

          {/* Timeline flow chart */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px', fontSize: '16px', fontWeight: 800 }}>Evaluation Status Timeline</h3>
            
            <div className="timeline-horizontal-trail" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflowX: 'auto', padding: '10px 0' }}>
              {timelineStages.map((stage, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '90px', position: 'relative', zIndex: 2 }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: stage.checked ? 'var(--primary)' : 'var(--bg-tertiary)', 
                    color: stage.checked ? '#ffffff' : 'var(--text-tertiary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justify: 'center', 
                    fontSize: '11px',
                    fontWeight: 900,
                    border: '3px solid var(--bg-primary)',
                    boxShadow: stage.checked ? '0 0 8px var(--primary-glow)' : 'none'
                  }}>
                    {stage.checked ? '✓' : idx + 1}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, textAlign: 'center', color: stage.checked ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{stage.label}</span>
                </div>
              ))}
              {/* background connector line */}
              <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '2px', backgroundColor: 'var(--border-color)', zIndex: 1 }}></div>
            </div>
          </div>

          {/* Post Interview Feedback display */}
          {interview.status === 'Completed' && (
            <div className="glass-card border-left-success" style={{ padding: '24px', borderLeft: '4px solid var(--success)', backgroundColor: 'var(--bg-tertiary)' }}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: '15px', color: 'var(--success)', fontWeight: 800 }}>Evaluation Feedback Logs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div>Session Finished Date: <strong>{new Date(interview.updated_at).toLocaleDateString()}</strong></div>
                {feedbacks.length > 0 ? (
                  feedbacks.map((f, i) => (
                    <div key={i} style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '8px' }}>
                        <span>Round Result Recommendation: <span style={{ color: 'var(--primary)' }}>{f.recommendation}</span></span>
                        <span>Evaluation: {f.rating}/5</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px', fontSize: '12px' }}>
                        <div>Technical Core: <strong>{f.technical_rating || 'N/A'}/5</strong></div>
                        <div>Communication: <strong>{f.communication_rating || 'N/A'}/5</strong></div>
                        <div>Problem Solving: <strong>{f.problem_solving_rating || 'N/A'}/5</strong></div>
                      </div>
                      {f.strengths && <div style={{ marginBottom: '4px' }}>Strengths: <span style={{ color: 'var(--text-secondary)' }}>{f.strengths}</span></div>}
                      {f.weaknesses && <div style={{ marginBottom: '4px' }}>Weaknesses: <span style={{ color: 'var(--text-secondary)' }}>{f.weaknesses}</span></div>}
                      <p style={{ margin: '6px 0 0 0', fontStyle: 'italic', color: 'var(--text-secondary)' }}>Feedback Remarks: "{f.feedback_text}"</p>
                    </div>
                  ))
                ) : (
                  <div style={{ fontStyle: 'italic', color: 'var(--text-tertiary)' }}>No details posted yet. Your coordinator is reviewing notes.</div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Actions Bar card */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, margin: 0, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Candidate Actions</h3>
            
            {interview.attendance_status === 'Pending' && interview.status === 'Scheduled' && (
              <>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  disabled={actionLoading}
                  onClick={handleConfirmAttendance}
                >
                  <CalendarCheck size={16} />
                  <span>Confirm Attendance</span>
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  disabled={actionLoading}
                  onClick={handleRequestReschedule}
                >
                  <Clock size={16} />
                  <span>Request Reschedule</span>
                </button>
              </>
            )}

            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={handleDownloadDetails}
            >
              <Download size={16} />
              <span>Download Details (PDF)</span>
            </button>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <strong style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Add Session to Calendar</strong>
              <a 
                href={getGoogleCalendarUrl()} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary" 
                style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', fontSize: '12px' }}
              >
                <span>Google Calendar</span>
              </a>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px' }}
                onClick={generateICSFile}
              >
                <span>Outlook Calendar (ICS)</span>
              </button>
            </div>

            {interview.status === 'Scheduled' && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary" style={{ flexGrow: 1, fontSize: '12px' }} onClick={() => setShowRescheduleModal(true)}>
                  Request Reschedule
                </button>
                <button className="btn btn-secondary" style={{ flexGrow: 1, fontSize: '12px' }} onClick={() => setShowContactModal(true)}>
                  Contact HR
                </button>
              </div>
            )}
          </div>

          {/* Recruiter Details sidebar */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px', fontSize: '14px', fontWeight: 800 }}>HR Contact Dossier</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} style={{ color: 'var(--primary)' }} />
                <div>
                  <span style={{ display: 'block', fontWeight: 800 }}>{interview.recruiter_first_name} {interview.recruiter_last_name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Managing Coordinator</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--primary)' }} />
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Email Address</span>
                  <a href={`mailto:${interview.recruiter_email}`} style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 700 }}>{interview.recruiter_email || 'hr@company.com'}</a>
                </div>
              </div>

              {interview.recruiter_phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} style={{ color: 'var(--primary)' }} />
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Corporate Number</span>
                    <a href={`tel:${interview.recruiter_phone}`} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{interview.recruiter_phone}</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Required Documents sidebar checklist */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '14px', fontSize: '14px', fontWeight: 800 }}>Required Verification Documents</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span>1. Resume File</span>
                {interview.candidate_resume_file ? (
                  <a href={`http://localhost:5000/uploads/resumes/${interview.candidate_resume_file}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 800 }}>Download File</a>
                ) : <span style={{ color: 'var(--danger)' }}>Not uploaded</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span>2. Government ID Proof</span>
                <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Bring to venue</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span>3. Educational Certificates</span>
                <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Keep digital copies</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>4. Experience Letters</span>
                <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>If applicable</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Reschedule request dialog modal */}
      {showRescheduleModal && (
        <div className="modal-backdrop animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '450px', width: '100%', margin: '0 20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <h4 style={{ margin: 0, fontWeight: 800 }}>Request Reschedule</h4>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => setShowRescheduleModal(false)}><X size={16} /></button>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Please reach out directly to your assigned HR coordinator at <a href={`mailto:${interview.recruiter_email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{interview.recruiter_email}</a> to request a rescheduling of your interview slot. 
              Be sure to mention your <strong>Interview ID: #{interview.id}</strong> and specify your preferred alternative dates.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowRescheduleModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Contact HR dialog modal */}
      {showContactModal && (
        <div className="modal-backdrop animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content glass-card animate-slide-up" style={{ maxWidth: '450px', width: '100%', margin: '0 20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <h4 style={{ margin: 0, fontWeight: 800 }}>Contact Recruiting Team</h4>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => setShowContactModal(false)}><X size={16} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div>HR Coordinator: <strong>{interview.recruiter_first_name} {interview.recruiter_last_name}</strong></div>
              <div>Email: <a href={`mailto:${interview.recruiter_email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{interview.recruiter_email}</a></div>
              {interview.recruiter_phone && <div>Phone: <strong>{interview.recruiter_phone}</strong></div>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowContactModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InterviewDetails;
