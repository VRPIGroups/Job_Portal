// frontend/src/components/Skeletons.jsx
import React from 'react';

export const Skeleton = ({ width = '100%', height = '16px', borderRadius = 'var(--radius-xs)', style }) => {
  return (
    <div
      className="shimmer-wrapper"
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
};

export const JobCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <Skeleton width="48px" height="48px" borderRadius="var(--radius-sm)" />
        <div className="skeleton-titles">
          <Skeleton width="120px" height="18px" />
          <Skeleton width="80px" height="14px" style={{ marginTop: '8px' }} />
        </div>
      </div>
      <div className="skeleton-body">
        <Skeleton width="90%" height="16px" style={{ marginTop: '16px' }} />
        <div className="skeleton-meta">
          <Skeleton width="70px" height="24px" borderRadius="var(--radius-full)" />
          <Skeleton width="70px" height="24px" borderRadius="var(--radius-full)" />
          <Skeleton width="70px" height="24px" borderRadius="var(--radius-full)" />
        </div>
      </div>
      <div className="skeleton-footer">
        <Skeleton width="90px" height="38px" borderRadius="var(--radius-sm)" />
        <Skeleton width="90px" height="38px" borderRadius="var(--radius-sm)" />
      </div>

      <style>{`
        .skeleton-card {
          padding: 20px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skeleton-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .skeleton-titles {
          flex-grow: 1;
        }

        .skeleton-meta {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .skeleton-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px dashed var(--border-color);
        }
      `}</style>
    </div>
  );
};

export const JobDetailsSkeleton = () => {
  return (
    <div className="skeleton-details">
      <div className="skeleton-details-header">
        <Skeleton width="80px" height="80px" borderRadius="var(--radius-md)" />
        <div className="skeleton-details-titles">
          <Skeleton width="280px" height="28px" />
          <Skeleton width="180px" height="18px" style={{ marginTop: '12px' }} />
        </div>
      </div>
      
      <div className="skeleton-details-grid">
        <div className="skeleton-details-main">
          <Skeleton width="100%" height="150px" style={{ marginBottom: '24px' }} />
          <Skeleton width="100%" height="100px" style={{ marginBottom: '24px' }} />
          <Skeleton width="100%" height="120px" />
        </div>
        <div className="skeleton-details-sidebar">
          <div className="skeleton-sidebar-card">
            <Skeleton width="120px" height="20px" style={{ marginBottom: '16px' }} />
            <Skeleton width="100%" height="16px" style={{ marginBottom: '12px' }} />
            <Skeleton width="100%" height="16px" style={{ marginBottom: '12px' }} />
            <Skeleton width="100%" height="16px" style={{ marginBottom: '12px' }} />
            <Skeleton width="100%" height="40px" borderRadius="var(--radius-sm)" style={{ marginTop: '24px' }} />
          </div>
        </div>
      </div>

      <style>{`
        .skeleton-details {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .skeleton-details-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .skeleton-details-titles {
          flex-grow: 1;
        }

        .skeleton-details-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .skeleton-sidebar-card {
          padding: 24px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        @media (max-width: 768px) {
          .skeleton-details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export const DashboardTableSkeleton = () => {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        <Skeleton width="150px" height="24px" />
        <Skeleton width="80px" height="36px" borderRadius="var(--radius-sm)" />
      </div>
      <div className="skeleton-table-rows">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-table-row">
            <Skeleton width="200px" height="18px" />
            <Skeleton width="120px" height="16px" />
            <Skeleton width="90px" height="24px" borderRadius="var(--radius-full)" />
            <Skeleton width="60px" height="16px" />
          </div>
        ))}
      </div>

      <style>{`
        .skeleton-table {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
        }

        .skeleton-table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .skeleton-table-rows {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skeleton-table-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid var(--border-color);
        }
      `}</style>
    </div>
  );
};
