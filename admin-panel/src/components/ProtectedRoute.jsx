// admin-panel/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="admin-protected-route-loading">
        <div className="spinner"></div>
        <p>Verifying Admin session...</p>
        <style>{`
          .admin-protected-route-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            gap: 16px;
            color: var(--text-secondary);
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
