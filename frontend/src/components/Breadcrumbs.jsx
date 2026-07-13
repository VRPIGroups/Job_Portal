// frontend/src/components/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on Home landing page
  if (pathnames.length === 0) return null;

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    // Handle number IDs or UUIDs
    if (!isNaN(s)) return 'Details';
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
  };

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs-nav">
      <div className="container breadcrumbs-container">
        <ol className="breadcrumbs-list">
          <li className="breadcrumbs-item">
            <Link to="/" className="breadcrumbs-link breadcrumbs-home">
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>
          
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return (
              <li key={to} className="breadcrumbs-item">
                <ChevronRight size={14} className="breadcrumbs-separator" />
                {last ? (
                  <span className="breadcrumbs-current" aria-current="page">
                    {capitalize(value)}
                  </span>
                ) : (
                  <Link to={to} className="breadcrumbs-link">
                    {capitalize(value)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        .breadcrumbs-nav {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .breadcrumbs-container {
          display: flex;
          align-items: center;
        }

        .breadcrumbs-list {
          display: flex;
          align-items: center;
          list-style: none;
          flex-wrap: wrap;
          gap: 6px;
        }

        .breadcrumbs-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .breadcrumbs-link {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-tertiary);
          transition: color var(--transition-fast);
        }

        .breadcrumbs-link:hover {
          color: var(--primary);
        }

        .breadcrumbs-home {
          color: var(--text-secondary);
        }

        .breadcrumbs-separator {
          color: var(--text-tertiary);
        }

        .breadcrumbs-current {
          color: var(--text-primary);
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;
