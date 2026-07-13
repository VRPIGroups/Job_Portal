// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="spinner"></div>
        <p>Loading session...</p>
        <style>{`
          .protected-route-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            gap: 16px;
            color: var(--text-secondary);
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but save the original target location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If authenticated but role isn't allowed, redirect home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
