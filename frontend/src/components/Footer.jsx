// frontend/src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast('🎉 Thank you for subscribing to our career newsletter!', 'success');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Column 1: VR PI Brand Intro */}
        <div className="footer-col footer-brand-col">
          <Link to="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/vrpi_logo.png" alt="VRPI Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
          </Link>
          <div className="footer-slogan">
            <p className="slogan-primary">Value for investment...</p>
            <p className="slogan-secondary">value for you...</p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Company Details */}
        <div className="footer-col">
          <h3 className="footer-title">Company</h3>
          <div className="footer-contact-details">
            <div className="contact-item">
              <MapPin size={16} />
              <span>Marathahalli Innovation Hub, Bangalore, India</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 80 4912 4000</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>careers@vrpisolutions.com</span>
            </div>
          </div>
        </div>

        {/* Column 4: Socials & Newsletter */}
        <div className="footer-col footer-newsletter-col">
          <h3 className="footer-title">Join Us</h3>
          
          {/* Social icons styled in orange circles */}
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <Linkedin size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn">
              <Youtube size={18} />
            </a>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Newsletter subscription"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} VRPI Solutions. All rights reserved.
          </p>
          <p className="made-with-love">
            value for investment | value for you
          </p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #0c0c0c;
          border-top: 3px solid #ff5100;
          padding: 80px 0 0 0;
          color: #cccccc;
          margin-top: auto;
          text-align: left;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.5fr 1.5fr;
          gap: 48px;
          padding-bottom: 60px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* VR PI Logo inside footer */
        .footer-logo {
          display: inline-block;
        }

        .footer-logo .vr-pi-logo-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }

        .footer-logo .logo-main-row {
          display: flex;
          align-items: center;
        }

        .footer-logo .logo-vr {
          font-size: 34px;
          font-weight: 900;
          color: #ff5100;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -1.5px;
        }

        .footer-logo .logo-pi-box {
          font-size: 20px;
          font-weight: 900;
          color: #000000;
          background-color: #ffffff;
          padding: 3px 6px;
          margin-left: 5px;
          border-radius: 4px;
          font-family: 'Outfit', sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.5px;
        }

        .footer-logo .logo-sub {
          font-size: 9px;
          font-weight: 700;
          color: #ff5100;
          text-transform: uppercase;
          margin-top: 1px;
          letter-spacing: 0.5px;
          font-family: 'Inter', sans-serif;
        }

        .footer-slogan {
          text-align: left;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.3;
        }

        .slogan-primary {
          color: #ffffff;
          margin: 0;
        }

        .slogan-secondary {
          color: #ff5100;
          margin: 0;
          padding-left: 20px;
        }

        .footer-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 8px;
          font-family: 'Outfit', sans-serif;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background-color: #ff5100;
          border-radius: var(--radius-full);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          font-size: 14px;
          padding: 0;
          margin: 0;
        }

        .footer-links a {
          color: #cccccc;
          transition: color var(--transition-fast), padding-left var(--transition-fast);
        }

        .footer-links a:hover {
          color: #ff5100;
          padding-left: 4px;
        }

        .footer-contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-size: 13px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #cccccc;
          line-height: 1.4;
        }

        .contact-item svg {
          color: #ff5100;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-newsletter-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Orange Circle Social Buttons */
        .footer-socials {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-icon-btn {
          width: 38px;
          height: 38px;
          background-color: #1a1a1a;
          color: #ff5100;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast), color var(--transition-fast);
          border: 1px solid #333333;
        }

        .social-icon-btn:hover {
          background-color: #ff5100;
          color: #ffffff;
        }

        /* Newsletter subscribe styling */
        .newsletter-form {
          display: flex;
          position: relative;
          width: 100%;
          margin-top: 10px;
        }

        .newsletter-input {
          width: 100%;
          padding: 12px 48px 12px 16px;
          border-radius: 4px;
          background-color: #1a1a1a;
          border: 1px solid #333333;
          color: #ffffff;
          font-size: 13px;
          transition: border-color var(--transition-normal);
        }

        .newsletter-input:focus {
          border-color: #ff5100;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: #777777;
        }

        .newsletter-submit-btn {
          position: absolute;
          right: 4px;
          top: 4px;
          bottom: 4px;
          width: 36px;
          background-color: #ff5100;
          color: #ffffff;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          transition: background-color var(--transition-normal);
          cursor: pointer;
        }

        .newsletter-submit-btn:hover {
          background-color: #cc4100;
        }

        .footer-bottom {
          border-top: 1px solid #1a1a1a;
          padding: 24px 0;
          font-size: 12px;
          color: #777777;
          margin-top: 40px;
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .made-with-love {
          color: #ff5100;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.5px;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .footer-bottom-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
