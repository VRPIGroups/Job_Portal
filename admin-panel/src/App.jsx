// admin-panel/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobManagement from './pages/JobManagement';
import CompanyManagement from './pages/CompanyManagement';
import UserManagement from './pages/UserManagement';
import ApplicationManagement from './pages/ApplicationManagement';
import MessageManagement from './pages/MessageManagement';
import CategoryManagement from './pages/CategoryManagement';
import SkillManagement from './pages/SkillManagement';
import LocationManagement from './pages/LocationManagement';
import TemplateManagement from './pages/TemplateManagement';
import Settings from './pages/Settings';
import AtsManagement from './pages/AtsManagement';
import InterviewDetails from './pages/InterviewDetails';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <ThemeProvider>
          <AdminAuthProvider>
            <Routes>
              {/* Public Admin Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Workspace Console Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="jobs" element={<JobManagement />} />
                <Route path="companies" element={<CompanyManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="applications" element={<ApplicationManagement />} />
                <Route path="messages" element={<MessageManagement />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="skills" element={<SkillManagement />} />
                <Route path="locations" element={<LocationManagement />} />
                <Route path="templates" element={<TemplateManagement />} />
                <Route path="ats" element={<AtsManagement />} />
                <Route path="interviews/:id" element={<InterviewDetails />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Fallback Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AdminAuthProvider>
        </ThemeProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
