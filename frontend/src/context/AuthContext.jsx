// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';

const AuthContext = createContext();

// Create globally configured Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to decode base64 JWT payload
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // On startup: Check stored tokens
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (accessToken) {
        const decoded = decodeToken(accessToken);
        const isExpired = decoded ? decoded.exp * 1000 < Date.now() : true;
        
        if (!isExpired) {
          // Token is valid! Set authorization header
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          // Get user details
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
          }
        } else if (refreshToken) {
          // Access token is expired, try to refresh it
          try {
            const res = await axios.post('http://localhost:5000/api/auth/refresh-token', { refreshToken });
            if (res.data.success) {
              const { accessToken: newAccessToken, refreshToken: newRefreshToken, user: loggedUser } = res.data;
              
              localStorage.setItem('accessToken', newAccessToken);
              if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
              }
              
              api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              if (loggedUser) {
                localStorage.setItem('user', JSON.stringify(loggedUser));
                setUser(loggedUser);
              } else {
                const newDecoded = decodeToken(newAccessToken);
                setUser({ id: newDecoded.id, email: newDecoded.email, role: newDecoded.role });
              }
            } else {
              throw new Error('Refresh failed');
            }
          } catch (err) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
          }
        } else {
          // Token expired, and no refresh token
          localStorage.removeItem('accessToken');
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Axios Interceptors for Token Expiration & Silently Refreshing
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const decoded = decodeToken(accessToken);
          // If token expires in less than 10 seconds, refresh proactively
          if (decoded && decoded.exp * 1000 - Date.now() < 10000) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              try {
                const res = await axios.post('http://localhost:5000/api/auth/refresh-token', { refreshToken });
                if (res.data.success) {
                  const { accessToken: newAccessToken, refreshToken: newRefreshToken, user: loggedUser } = res.data;
                  localStorage.setItem('accessToken', newAccessToken);
                  if (newRefreshToken) {
                    localStorage.setItem('refreshToken', newRefreshToken);
                  }
                  if (loggedUser) {
                    localStorage.setItem('user', JSON.stringify(loggedUser));
                  }
                  api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                }
              } catch (err) {
                console.error('Proactive token refresh failed:', err.message);
              }
            }
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 403 (Expired or Invalid Access Token), and we haven't retried yet
        if (
          error.response &&
          error.response.status === 403 &&
          (error.response.data.code === 'TOKEN_EXPIRED' || error.response.data.code === 'TOKEN_INVALID') &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            // Request new tokens
            const res = await axios.post('http://localhost:5000/api/auth/refresh-token', { refreshToken });
            
            if (res.data.success) {
              const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
              
              localStorage.setItem('accessToken', newAccessToken);
              if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
              }
              
              // Update authorization header
              api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              
              // Retry the original query
              return api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh token has expired or is invalid! Log user out
            console.error('Silent Refresh Failed:', refreshError.message);
            logout(false); // logout without message
            showToast('Your session has expired. Please log in again.', 'warning');
          }
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [showToast]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user: loggedUser, accessToken, refreshToken } = response.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setUser(loggedUser);
        
        showToast(response.data.message || 'Logged in successfully!', 'success');
        return { success: true, user: loggedUser };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please verify credentials.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        showToast('🎉 Account registered successfully! Please log in.', 'success');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const logout = (triggerToast = true) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    if (triggerToast) {
      showToast('Logged out successfully.', 'info');
    }
  };

  const updateProfileState = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfileState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
