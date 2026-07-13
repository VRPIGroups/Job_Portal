// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import { Search, MapPin, Building, ArrowRight, Briefcase, Calendar, CheckCircle, ShieldAlert } from 'lucide-react';
import { JobCardSkeleton } from '../components/Skeletons';
import { api } from '../context/AuthContext';

const steps = [
  {
    title: "Applied for the job",
    description: "Submit your application along with your resume and cover letter to begin your journey with our team."
  },
  {
    title: "Reviewing",
    description: "Our recruitment team carefully reviews your qualifications, skills, and experience to see if they align with the role."
  },
  {
    title: "Shortlisted for the interview",
    description: "Candidates who match our requirements are shortlisted to move forward to the interview stage."
  },
  {
    title: "Technical round",
    description: "Demonstrate your technical expertise, problem-solving abilities, and domain knowledge with our technical team."
  },
  {
    title: "Managerial round",
    description: "Discuss your work ethic, project experience, and how you align with the leadership and engineering culture."
  },
  {
    title: "HR round",
    description: "Have a discussion about your salary expectations, company policies, career goals, and benefits."
  },
  {
    title: "Shortlisted candidate",
    description: "Final selection of candidates who have successfully completed all interviews and evaluation stages."
  },
  {
    title: "Offer letter",
    description: "Receive a formal employment offer with detailed compensation, benefits, and joining details to welcome you onboard."
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { updateFilters } = useJobs();

  // Local Featured Jobs states
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  // Fetch 6 featured jobs on load
  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      try {
        const res = await api.get('/jobs', {
          params: { page: 1, limit: 6, sort: 'latest' }
        });
        if (res.data.success) {
          setFeaturedJobs(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load featured jobs:', err.message);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);



  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({
      search,
      location: location ? [location] : []
    });
    navigate('/jobs');
  };

  const formatSalary = (min, max) => {
    const format = (num) => new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(num);
    return `₹${format(min)} - ₹${format(max)}`;
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return `${diffDays - 1} days ago`;
  };

  const getLogoUrl = (logo) => {
    if (logo) {
      return `http://localhost:5000/uploads/images/${logo}`;
    }
    return `https://ui-avatars.com/api/?name=Company&background=fff0e6&color=ff5100&bold=true`;
  };

  return (
    <main className="home-page-redesign animate-fade">
      {/* 1. HERO SECTION ("Join our Team") */}
      <section className="hero-section">
        <div className="hero-bg-wrapper">
          <div className="hero-bg" style={{ backgroundImage: "url('/hero_stairs.png')" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <div className="hero-grid">
            <div className="hero-spacer"></div> {/* Left spacer for stairs image layout */}
            <div className="hero-text-block animate-slide">
              <h1 className="hero-title">Join our Team</h1>
              <p className="hero-desc">
                Discover your next career milestone. We connect passionate job seekers with leading companies to build collaborative teams and shape the future of technology.
              </p>
              <div className="hero-buttons-row">
                <Link to="/jobs" className="btn-explore-jobs">
                  Explore
                </Link>
                <Link to="/jobs" className="btn-outlined-jobs">
                  Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping Stats Capsule */}
        <div className="hero-stats-capsule-container">
          <div className="hero-stats-capsule">
            <div className="capsule-left">
              <span className="capsule-number">700+</span>
              <span className="capsule-label">Students</span>
            </div>
            <div className="capsule-divider"></div>
            <div className="capsule-right">
              <p className="capsule-text">
                successfully placed in leading tech firms, design studios, and corporations. Join a vibrant community of aspiring professionals launching their careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="about-us-section">
        <div className="container">
          <div className="section-title-tag">
            <span className="tag-orange-line"></span>
            <span className="tag-text">About Us</span>
          </div>

          <div className="about-grid reveal-on-scroll">
            <div className="about-image-wrapper">
              <img src="/about_us_team.png" alt="Collaborative Developers Team" className="about-team-img" />
            </div>
              <div className="about-content">
              <h3 className="about-tagline">
                <span className="orange-highlight">"VRPI Solutions"</span> is a tech-driven and forward-thinking job search platform, specializing in connecting talented professionals with cutting-edge industry opportunities. Our core focus emphasizes high-quality, user-friendly recruitment technology to simplify the job hunt and hiring process, fostering a culture of career growth, inclusivity, and professional excellence. By combining advanced search capabilities, verified employer listings, and seamless recruitment workflows, we aspire to propel career growth, generate value, and affect positive change within our professional community.
              </h3>
              <Link to="/jobs" className="btn-explore-jobs">
                Explore All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIRING PROCESS SECTION */}
      <section className="hiring-process-section">
        <div className="container">
          <div className="section-title-tag">
            <span className="tag-orange-line"></span>
            <span className="tag-text">Hiring Process</span>
          </div>

          <div className="process-header">
            <h2 className="process-main-title">Process to join our Team</h2>
            <p className="process-subtitle">
              Step-by-step process of our evaluation workflow to identify and onboard top-tier talent.
            </p>
          </div>

          {/* Slanted Alternate Steps Stack */}
          <div className="steps-stack">
            {steps.map((step, index) => {
              const stepNum = String(index + 1).padStart(2, '0');
              const isOdd = index % 2 === 0;
              return (
                <div key={stepNum} className={`step-row reveal-on-scroll ${isOdd ? 'odd-step' : 'even-step'}`} style={{ transitionDelay: `${index * 80}ms` }}>
                  <div className="step-number-outline">
                    <span>STEP</span>
                    <span className="step-num">{stepNum}</span>
                  </div>
                  <div className="step-content-box">
                    <div className="step-content-inner">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHAT DO WE OFFER SECTION */}
      <section className="offers-section">
        <div className="container">
          <div className="section-title-tag">
            <span className="tag-orange-line"></span>
            <span className="tag-text">What do we Offer</span>
          </div>

          <div className="offers-header-desc">
            <p className="offers-subtitle-text reveal-on-scroll">
              Explore tailored career pathways designed to support your development from day one, whether you are starting out or are an industry expert.
            </p>
          </div>

          <div className="offers-grid">
            {/* Card 1: Internship */}
            <Link to="/jobs?job_type=Internship" className="offer-card reveal-on-scroll" style={{ transitionDelay: '0ms' }}>
              <div>
                <h3 className="offer-card-title">Internship</h3>
                <p className="offer-card-desc">
                  Gain hands-on industry experience, work on real-world projects, and jumpstart your professional career with mentorship from industry leaders.
                </p>
              </div>
              <span className="btn-offer-apply">
                Apply
              </span>
            </Link>

            {/* Card 2: Entry Level */}
            <Link to="/jobs?experience=0-2+Years" className="offer-card reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div>
                <h3 className="offer-card-title">Entry Level</h3>
                <p className="offer-card-desc">
                  Build a strong foundation for your career with opportunities designed for fresh grads and early-stage professionals seeking growth.
                </p>
              </div>
              <span className="btn-offer-apply">
                Apply
              </span>
            </Link>

            {/* Card 3: Experienced Level */}
            <Link to="/jobs?experience=3-5+Years,5-8+Years,8%2B+Years" className="offer-card reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div>
                <h3 className="offer-card-title">Experienced Level</h3>
                <p className="offer-card-desc">
                  Take your expertise to the next level with challenging senior roles, leadership opportunities, and high-impact technology projects.
                </p>
              </div>
              <span className="btn-offer-apply">
                Apply
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC FEATURED JOBS CATALOG (Integrated Search Deck & Live Jobs List) */}
      <section className="featured-jobs-section-redesign">
        <div className="container">
          <div className="section-title-tag">
            <span className="tag-orange-line"></span>
            <span className="tag-text">Featured Positions</span>
          </div>

          <div className="catalog-header-layout">
            <div>
              <h2 className="catalog-main-title">Featured Career Paths</h2>
              <p className="catalog-subtitle">Connect directly with active hiring managers and apply instantly</p>
            </div>
            <Link to="/jobs" className="btn-view-all-jobs">
              Browse All Jobs <ArrowRight size={16} />
            </Link>
          </div>

          {/* Interactive Search Deck */}
          <form onSubmit={handleSearchSubmit} className="interactive-search-deck reveal-on-scroll">
            <div className="search-deck-input">
              <Search size={18} className="deck-icon" />
              <input
                type="text"
                placeholder="Job title, technical skills, or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="deck-line" />
            <div className="search-deck-input">
              <MapPin size={18} className="deck-icon" />
              <input
                type="text"
                placeholder="City, State, or 'Remote'"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-search-deck-submit">
              Search Openings
            </button>
          </form>

          {/* Live Jobs Catalog Grid */}
          <div className="jobs-catalog-grid">
            {loading ? (
              Array(6).fill(0).map((_, i) => <JobCardSkeleton key={i} />)
            ) : featuredJobs.length > 0 ? (
              featuredJobs.map((job, index) => (
                <article key={job.id} className="catalog-job-card reveal-on-scroll" style={{ transitionDelay: `${(index % 2) * 100}ms` }}>
                  <div className="catalog-card-header">
                    <img
                      src={getLogoUrl(job.company_logo)}
                      alt={`${job.company_name} logo`}
                      className="catalog-company-logo"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name)}&background=fff0e6&color=ff5100&bold=true`;
                      }}
                    />
                    <div className="catalog-company-info">
                      <h4 className="catalog-company-name">{job.company_name}</h4>
                      <h3 className="catalog-job-title">{job.title}</h3>
                    </div>
                  </div>

                  <div className="catalog-job-meta">
                    <span className="badge-type">{job.job_type}</span>
                    <span className="badge-meta">
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span className="badge-meta">
                      <Briefcase size={12} /> {job.experience}
                    </span>
                  </div>

                  <p className="catalog-job-desc">
                    {job.description ? job.description.substring(0, 120) + '...' : ''}
                  </p>

                  <div className="catalog-card-footer">
                    <div className="catalog-salary">
                      <span className="salary-lbl">Compensation</span>
                      <span className="salary-val">{formatSalary(job.salary_min, job.salary_max)}</span>
                    </div>

                    <div className="catalog-actions">
                      <span className="posted-time text-xs">
                        <Calendar size={12} /> {getRelativeTime(job.created_at)}
                      </span>
                      <Link to={`/jobs/${job.id}`} className="btn-catalog-apply">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-catalog-state">
                <p>No featured jobs match your criteria. Explore our full catalog!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. FRAUD ALERTS SECTION */}
      <section className="fraud-alerts-section">
        <div className="container">
          <div className="section-title-tag">
            <span className="tag-orange-line"></span>
            <span className="tag-text">Fraud Alerts</span>
          </div>

          <div className="fraud-grid reveal-on-scroll">
            <div className="fraud-image-wrapper">
              <img src="/farud.png" alt="Fraud magnifying security glass" className="fraud-img" />
            </div>
            <div className="fraud-content">
              <h3 className="fraud-main-headline">
                Keep your job search secure. Protect yourself against employment scams and fraudulent offers.
              </h3>
              <ul className="fraud-check-list">
                <li>
                  <CheckCircle size={16} className="bullet-check-icon" />
                  <span>VRPI Solutions never requests payment or training fees during any phase of the recruitment process.</span>
                </li>
                <li>
                  <CheckCircle size={16} className="bullet-check-icon" />
                  <span>Always verify that emails come from our official domain @vrepisolutions.com.</span>
                </li>
                <li>
                  <CheckCircle size={16} className="bullet-check-icon" />
                  <span>Do not share sensitive banking or personal identification details before receiving a verified offer.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-page-redesign {
          background-color: #ffffff;
          color: #333333;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        /* 1. Hero concrete stairs styling */
        .hero-section {
          position: relative;
          padding: 120px 0 160px 0;
          min-height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-bottom: 2px solid #000000;
        }

        .hero-bg-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: blur(3px);
          transform: scale(1.03);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.22);
          z-index: 1;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }

        .hero-text-block {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 50px 40px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
          text-align: left;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 20px;
          font-family: 'Outfit', sans-serif;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .hero-desc {
          font-size: 16px;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 32px;
        }

        .hero-buttons-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-explore-jobs {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #ff5100;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 36px;
          border-radius: 8px;
          transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 14px rgba(255, 81, 0, 0.3);
          text-decoration: none;
        }

        .btn-explore-jobs:hover {
          background-color: #cc4100;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 81, 0, 0.4);
        }

        .btn-outlined-jobs {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          color: #333333;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 36px;
          border-radius: 8px;
          transition: all var(--transition-fast);
          cursor: pointer;
          border: 2px solid #ff5100;
          text-decoration: none;
        }

        .btn-outlined-jobs:hover {
          background-color: rgba(255, 81, 0, 0.08);
          color: #ff5100;
          transform: translateY(-2px);
        }

        /* Floating Overlapping Stats Capsule */
        .hero-stats-capsule-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          width: 100%;
          max-width: var(--container-max);
          padding: 0 20px;
          z-index: 10;
        }

        .hero-stats-capsule {
          display: flex;
          align-items: center;
          background-color: #0a0a0a;
          color: #ffffff;
          padding: 24px 50px;
          border-radius: 80px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
          border: 3px solid #ff5100;
          text-align: left;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
        }

        .capsule-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 150px;
          line-height: 1;
        }

        .capsule-number {
          font-size: 56px;
          font-weight: 800;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -1px;
        }

        .capsule-label {
          font-size: 12px;
          font-weight: 800;
          color: #ff5100;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 6px;
          font-family: 'Inter', sans-serif;
        }

        .capsule-divider {
          width: 3px;
          height: 60px;
          background-color: #ff5100;
          margin: 0 40px;
          border-radius: 4px;
        }

        .capsule-right {
          flex-grow: 1;
        }

        .capsule-text {
          font-size: 14px;
          line-height: 1.65;
          color: #dddddd;
          margin: 0;
        }

        /* Section indicator tags styling */
        .section-title-tag {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .tag-orange-line {
          width: 6px;
          height: 24px;
          background-color: #ff5100;
          border-radius: 4px;
          display: inline-block;
        }

        .tag-text {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          font-family: 'Outfit', sans-serif;
        }

        /* 2. About Us Section */
        .about-us-section {
          padding: 160px 0 100px 0;
          background-color: #ffffff;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: stretch;
        }

        .about-image-wrapper {
          position: relative;
          height: 100%;
        }

        .about-team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
          border: 1px solid #eaeaea;
        }

        .about-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .about-tagline {
          font-size: 16px;
          line-height: 1.7;
          color: #333333;
          font-weight: 500;
          margin-bottom: 32px;
        }

        .orange-highlight {
          color: #ff5100;
          font-weight: 700;
        }

        /* 3. Hiring Process Section */
        .hiring-process-section {
          padding: 80px 0 100px 0;
          background-color: #ffffff;
        }

        .process-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 60px auto;
        }

        .process-main-title {
          font-size: 40px;
          font-weight: 800;
          color: #000000;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 16px;
        }

        .process-subtitle {
          font-size: 15px;
          color: #666666;
          line-height: 1.6;
        }

        /* Slanted step rows */
        .steps-stack {
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }

        .step-row {
          display: flex;
          align-items: center;
          gap: 40px;
          width: 100%;
        }

        .odd-step {
          flex-direction: row;
        }

        .even-step {
          flex-direction: row-reverse;
        }

        /* Hollow Outline text step labels */
        .step-number-outline {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.9;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 48px;
          color: transparent;
          -webkit-text-stroke: 2px #ff5100;
          min-width: 150px;
        }

        .step-number-outline .step-num {
          font-size: 72px;
          letter-spacing: -2px;
        }

        /* Slanted content peach background card */
        .step-content-box {
          flex-grow: 1;
          background-color: #ffebe0;
          padding: 32px 48px;
          border-radius: 8px;
          transform: skewX(-12deg);
          box-shadow: 0 4px 15px rgba(255, 81, 0, 0.05);
          border: 1px solid #ffd5be;
          text-align: left;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .step-row:hover .step-content-box {
          transform: skewX(-12deg) translateY(-5px);
          background-color: #ffd5be;
          box-shadow: 0 10px 25px rgba(255, 81, 0, 0.12);
        }

        .step-content-inner {
          transform: skewX(12deg);
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 12px;
          font-family: 'Outfit', sans-serif;
        }

        .step-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #444444;
          margin: 0;
        }

        /* 4. What do we Offer Section */
        .offers-section {
          padding: 80px 0 100px 0;
          background-color: #ffffff;
        }

        .offers-header-desc {
          text-align: center;
          margin-bottom: 48px;
        }

        .offers-subtitle-text {
          font-size: 15px;
          color: #666666;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .offer-card {
          background-color: #0e0e0e;
          color: #ffffff;
          padding: 40px 32px;
          border-radius: 12px;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          border: 1px solid #222222;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color var(--transition-fast), box-shadow 0.3s ease;
          text-decoration: none;
        }

        .offer-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: #ff5100;
          box-shadow: 0 12px 24px rgba(255, 81, 0, 0.15);
        }

        .offer-card-title {
          font-size: 22px;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .offer-card-desc {
          font-size: 14px;
          color: #b3b3b3;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .btn-offer-apply {
          background-color: #ff5100;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 24px;
          border-radius: 4px;
          text-align: center;
          display: inline-block;
          transition: background-color var(--transition-fast);
          cursor: pointer;
        }

        .btn-offer-apply:hover {
          background-color: #cc4100;
        }

        /* 5. Featured Positions Redesign Section */
        .featured-jobs-section-redesign {
          padding: 100px 0;
          background-color: #fcfcfc;
          border-top: 1px solid #eaeaea;
          border-bottom: 1px solid #eaeaea;
        }

        .catalog-header-layout {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          text-align: left;
        }

        .catalog-main-title {
          font-size: 36px;
          font-weight: 800;
          color: #000000;
          font-family: 'Outfit', sans-serif;
        }

        .catalog-subtitle {
          font-size: 15px;
          color: #666666;
          margin-top: 4px;
        }

        .btn-view-all-jobs {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ff5100;
          font-weight: 700;
          font-size: 15px;
        }

        .btn-view-all-jobs:hover {
          color: #cc4100;
        }

        /* Interactive search bar card */
        .interactive-search-deck {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #dddddd;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          margin-bottom: 48px;
          width: 100%;
        }

        .interactive-search-deck:hover {
          border-color: #ffd5be;
          box-shadow: 0 4px 20px rgba(255, 81, 0, 0.08);
        }

        .search-deck-input {
          display: flex;
          align-items: center;
          flex-grow: 1;
          padding: 0 16px;
          gap: 12px;
        }

        .deck-icon {
          color: #888888;
        }

        .search-deck-input input {
          width: 100%;
          border: none;
          outline: none;
          color: #000000;
          font-size: 15px;
          background: transparent;
        }

        .deck-line {
          width: 1px;
          height: 36px;
          background-color: #dddddd;
        }

        .btn-search-deck-submit {
          background-color: #ff5100;
          color: #ffffff;
          border: none;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-search-deck-submit:hover {
          background-color: #cc4100;
        }

        /* Jobs list grid */
        .jobs-catalog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .catalog-job-card {
          background-color: #ffffff;
          padding: 28px;
          border-radius: 8px;
          border: 1px solid #eaeaea;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color var(--transition-fast), box-shadow 0.3s ease;
        }

        .catalog-job-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: #ffd5be;
          box-shadow: 0 12px 28px rgba(255, 81, 0, 0.08);
        }

        .catalog-card-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .catalog-company-logo {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          background-color: #ffffff;
        }

        .catalog-company-info {
          flex-grow: 1;
        }

        .catalog-company-name {
          font-size: 12px;
          font-weight: 700;
          color: #ff5100;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .catalog-job-title {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          margin-top: 2px;
        }

        .catalog-job-meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .badge-type {
          background-color: #ffebe0;
          color: #ff5100;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
        }

        .badge-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #666666;
          font-weight: 500;
        }

        .catalog-job-desc {
          font-size: 13px;
          color: #666666;
          line-height: 1.5;
        }

        .catalog-card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px dashed #eaeaea;
        }

        .catalog-salary {
          display: flex;
          flex-direction: column;
        }

        .salary-lbl {
          font-size: 10px;
          font-weight: 700;
          color: #888888;
          text-transform: uppercase;
        }

        .salary-val {
          font-size: 14px;
          font-weight: 700;
          color: #2e7d32;
        }

        .catalog-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .posted-time {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #888888;
        }

        .btn-catalog-apply {
          background-color: #ff5100;
          color: #ffffff;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 4px;
          transition: background-color var(--transition-fast);
        }

        .btn-catalog-apply:hover {
          background-color: #cc4100;
        }

        .empty-catalog-state {
          grid-column: span 2;
          padding: 48px;
          text-align: center;
          border: 1px dashed #cccccc;
          border-radius: 8px;
          color: #666666;
        }

        /* 6. Fraud Alerts Section */
        .fraud-alerts-section {
          padding: 100px 0;
          background-color: #ffffff;
        }

        .fraud-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        .fraud-image-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fraud-img {
          width: 100%;
          max-width: 320px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid #eaeaea;
        }

        .fraud-content {
          text-align: left;
        }

        .fraud-main-headline {
          font-size: 26px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 24px;
          line-height: 1.3;
          font-family: 'Outfit', sans-serif;
        }

        .fraud-check-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .fraud-check-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: #444444;
          font-weight: 500;
        }

        .bullet-check-icon {
          color: #ff5100;
          flex-shrink: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-spacer {
            display: none;
          }
          .hero-stats-capsule {
            flex-direction: column;
            border-radius: 20px;
            padding: 24px;
            gap: 16px;
          }
          .capsule-divider {
            width: 100%;
            height: 1px;
            margin: 8px 0;
          }
          .hero-stats-capsule-container {
            position: relative;
            transform: none;
            left: 0;
            padding: 20px;
            margin-top: 40px;
          }
          .hero-section {
            padding-bottom: 40px;
          }
          .about-grid, .fraud-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .offers-grid {
            grid-template-columns: 1fr;
          }
          .jobs-catalog-grid {
            grid-template-columns: 1fr;
          }
          .empty-catalog-state {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 38px;
          }
          .process-main-title {
            font-size: 30px;
          }
          .step-row {
            flex-direction: column !important;
            gap: 20px;
          }
          .step-content-box {
            transform: none;
            width: 100%;
          }
          .step-content-inner {
            transform: none;
          }
          .step-number-outline {
            min-width: unset;
          }
          .interactive-search-deck {
            flex-direction: column;
            gap: 12px;
            padding: 16px;
          }
          .deck-line {
            display: none;
          }
          .search-deck-input {
            width: 100%;
            padding: 0;
          }
          .btn-search-deck-submit {
            width: 100%;
          }
          .catalog-header-layout {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .btn-view-all-jobs {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;
