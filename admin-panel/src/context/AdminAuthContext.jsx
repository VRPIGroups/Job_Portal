// admin-panel/src/context/AdminAuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';

const AdminAuthContext = createContext();

// Create globally configured Axios instance for Admin requests
export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to decode JWT payload
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // On startup: Check stored tokens
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('admin_accessToken');
      const refreshToken = localStorage.getItem('admin_refreshToken');
      
      if (accessToken) {
        const decoded = decodeToken(accessToken);
        const isExpired = decoded ? decoded.exp * 1000 < Date.now() : true;
        
        if (!isExpired && decoded.role === 'admin') {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const storedAdmin = localStorage.getItem('admin_user');
          if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
          } else {
            setAdmin({ id: decoded.id, email: decoded.email, role: decoded.role });
          }
        } else if (refreshToken) {
          // Access token is expired, try to refresh it
          try {
            const res = await axios.post('http://localhost:5000/api/auth/refresh-token', { refreshToken });
            if (res.data.success) {
              const { accessToken: newAccessToken, refreshToken: newRefreshToken, user: loggedUser } = res.data;
              
              localStorage.setItem('admin_accessToken', newAccessToken);
              localStorage.setItem('admin_refreshToken', newRefreshToken);
              
              api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              if (loggedUser) {
                localStorage.setItem('admin_user', JSON.stringify(loggedUser));
                setAdmin(loggedUser);
              } else {
                const newDecoded = decodeToken(newAccessToken);
                setAdmin({ id: newDecoded.id, email: newDecoded.email, role: newDecoded.role });
              }
            } else {
              throw new Error('Refresh failed');
            }
          } catch (err) {
            localStorage.removeItem('admin_accessToken');
            localStorage.removeItem('admin_refreshToken');
            localStorage.removeItem('admin_user');
            delete api.defaults.headers.common['Authorization'];
            setAdmin(null);
          }
        } else {
          // Token expired or not admin, and no refresh token
          localStorage.removeItem('admin_accessToken');
          delete api.defaults.headers.common['Authorization'];
          setAdmin(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Axios Interceptors for Token Expiration & Silently Refreshing Admin credentials
  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.code === 'TOKEN_EXPIRED' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('admin_refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const res = await axios.post('http://localhost:5000/api/auth/refresh-token', { refreshToken });
            
            if (res.data.success) {
              const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
              
              localStorage.setItem('admin_accessToken', newAccessToken);
              localStorage.setItem('admin_refreshToken', newRefreshToken);
              
              api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              
              return api(originalRequest);
            }
          } catch (refreshError) {
            logout(false);
            showToast('Admin session expired. Please log in again.', 'warning');
          }
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [showToast]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user: loggedUser, accessToken, refreshToken } = response.data;
        
        // Strict Admin Role verification
        if (loggedUser.role !== 'admin') {
          showToast('Access Denied. Administrator credentials required.', 'error');
          return { success: false, error: 'Forbidden' };
        }

        localStorage.setItem('admin_accessToken', accessToken);
        localStorage.setItem('admin_refreshToken', refreshToken);
        localStorage.setItem('admin_user', JSON.stringify(loggedUser));
        
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setAdmin(loggedUser);
        
        showToast('🛡️ Welcome to Admin Portal', 'success');
        return { success: true, user: loggedUser };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Verify credentials.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const logout = (triggerToast = true) => {
    localStorage.removeItem('admin_accessToken');
    localStorage.removeItem('admin_refreshToken');
    localStorage.removeItem('admin_user');
    delete api.defaults.headers.common['Authorization'];
    setAdmin(null);
    if (triggerToast) {
      showToast('Logged out of Admin Portal successfully.', 'info');
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: !!admin,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
