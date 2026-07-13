// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { api } from '../context/AuthContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    businessNumber: '',
    companyAddress: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, companyName, email, businessNumber, companyAddress, message } = formData;

    if (!name || !companyName || !email || !businessNumber || !companyAddress || !message) {
      showToast('Please fill out all the fields.', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post('/contact', formData);
      if (response.data.success) {
        showToast('🎉 Thank you! Your collaboration request has been submitted successfully.', 'success');
        setFormData({
          name: '',
          companyName: '',
          email: '',
          businessNumber: '',
          companyAddress: '',
          message: ''
        });
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || 'Failed to submit collaboration request. Please try again.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper animate-fade">
      {/* 1. Welcoming Banner */}
      <div className="contact-hero-banner">
        <h2 className="banner-title-outline">We welcomes you to our</h2>
        <h1 className="banner-title-solid">Company</h1>
      </div>

      {/* 2. Collaboration Form Section */}
      <div className="collaboration-form-section">
        <div className="collaboration-card reveal-on-scroll">
          {/* Left Column: Form */}
          <div className="collaboration-form-col">
            <div className="form-header-row">
              <h3 className="form-main-title">Looking for Collaboration</h3>
              <a href="#updates" className="form-register-link" onClick={(e) => { e.preventDefault(); showToast('🔔 Subscribed to new updates!', 'info'); }}>
                Register Here for New Updates
              </a>
            </div>

            <form onSubmit={handleSubmit} className="collaboration-form">
              {/* Name Input */}
              <div className="collab-input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company Name Input */}
              <div className="collab-input-group">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company Mail-ID Input */}
              <div className="collab-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Company Mail-ID"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Business Number Input */}
              <div className="collab-input-group">
                <input
                  type="tel"
                  name="businessNumber"
                  placeholder="Business Number"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company Address Input */}
              <div className="collab-input-group">
                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Company Address"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message Input */}
              <div className="collab-input-group">
                <textarea
                  name="message"
                  placeholder="Applying For"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="collab-submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>

          {/* Right Column: Handshake Graphic */}
          <div className="collaboration-image-col">
            <img
              src="/collaboration_handshake.png"
              alt="Business Collaboration Handshake"
              className="collaboration-handshake-img"
            />
          </div>
        </div>
      </div>

      <style>{`
        .contact-page-wrapper {
          width: 100%;
          min-height: calc(100vh - 80px);
          background-color: var(--bg-primary);
        }

        /* 1. Welcoming Hero Banner */
        .contact-hero-banner {
          background-color: #385d82; /* Muted blue-grey matching screenshot */
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .banner-title-outline {
          font-family: 'Outfit', sans-serif;
          font-size: 38px;
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.85);
          letter-spacing: 0.5px;
          margin-bottom: 5px;
          text-transform: none;
        }

        .banner-title-solid {
          font-family: 'Outfit', sans-serif;
          font-size: 70px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        /* 2. Collaboration Form Section */
        .collaboration-form-section {
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-tertiary);
        }

        .collaboration-card {
          width: 100%;
          max-width: 1000px;
          background-color: #1e242c; /* Dark gray charcoal background */
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          display: flex;
        }

        /* Form Column */
        .collaboration-form-col {
          width: 58%;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .form-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .form-main-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .form-register-link {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13px;
          font-weight: 600;
          color: #ff5100;
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .form-register-link:hover {
          color: #ff854d;
        }

        .collaboration-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* Input styling */
        .collab-input-group {
          position: relative;
          width: 100%;
        }

        .collab-input-group input,
        .collab-input-group select,
        .collab-input-group textarea {
          width: 100%;
          padding: 12px 18px;
          background-color: #ffffff;
          border: none;
          outline: none;
          border-radius: 8px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 14.5px;
          color: #333333;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .collab-input-group input,
        .collab-input-group select {
          height: 48px;
        }

        .collab-input-group textarea {
          min-height: 120px;
          resize: vertical;
          padding-top: 14px;
        }

        .collab-input-group input::placeholder,
        .collab-input-group textarea::placeholder {
          color: #888888;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .collab-input-group input:focus,
        .collab-input-group select:focus,
        .collab-input-group textarea:focus {
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.15);
        }

        /* Submit Button */
        .collab-submit-btn {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 16.5px;
          font-weight: 600;
          color: #ffffff;
          background-color: #ff5100;
          border: none;
          border-radius: 10px;
          height: 48px;
          width: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.3);
          margin-top: 10px;
        }

        .collab-submit-btn:hover {
          background-color: #e04800;
        }

        .collab-submit-btn:active {
          transform: scale(0.98);
        }

        .collab-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Image Column */
        .collaboration-image-col {
          width: 42%;
          position: relative;
          display: flex;
          align-items: stretch;
        }

        .collaboration-handshake-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Responsive Layouts */
        @media (max-width: 992px) {
          .collaboration-hero-banner {
            padding: 40px 20px;
          }

          .banner-title-outline {
            font-size: 28px;
          }

          .banner-title-solid {
            font-size: 52px;
          }

          .collaboration-form-section {
            padding: 30px 20px;
          }

          .collaboration-card {
            flex-direction: column-reverse;
          }

          .collaboration-form-col {
            width: 100%;
            padding: 30px 20px;
          }

          .collaboration-image-col {
            width: 100%;
            height: 300px;
          }
        }

        @media (max-width: 576px) {
          .form-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .collab-submit-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
