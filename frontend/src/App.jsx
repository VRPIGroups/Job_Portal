// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { JobsProvider } from './context/JobsContext';

// Core Framework Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import ProtectedRoute from './components/ProtectedRoute';

// Portal Page Modules
import Home from './pages/Home';
import JobListing from './pages/JobListing';
import JobDetails from './pages/JobDetails';
import ApplicationFlow from './pages/ApplicationFlow';
import Success from './pages/Success';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import InterviewDetails from './pages/InterviewDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';

const ScrollRevealInitializer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Stop tracking once visible
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const observeNewElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.reveal-visible)');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial check for currently rendered elements
    observeNewElements();

    // Monitor DOM mutations to catch dynamically loaded items (e.g. from async API calls)
    const mutationObserver = new MutationObserver((mutations) => {
      let hasAdditions = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasAdditions = true;
          break;
        }
      }
      if (hasAdditions) {
        observeNewElements();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider>
          <JobsProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollRevealInitializer />
              <div className="site-wrapper">
                <Navigation />
                <Breadcrumbs />
                
                {/* Router Boundaries */}
                <div className="main-content-layout">
                  <Routes>
                    {/* Public Pathways */}
                    <Route path="/" element={<Home />} />
                    <Route path="/jobs" element={<JobListing />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                    
                    {/* Guest Auth Portals */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    
                    {/* Protected Seeker Portals */}
                    <Route
                      path="/jobs/:id/apply"
                      element={
                        <ProtectedRoute allowedRoles={['candidate']}>
                          <ApplicationFlow />
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route
                      path="/success"
                      element={
                        <ProtectedRoute allowedRoles={['candidate']}>
                          <Success />
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['candidate', 'admin']}>
                          <CandidateDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/recruiter-dashboard"
                      element={
                        <ProtectedRoute allowedRoles={['recruiter']}>
                          <RecruiterDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/interviews/:id"
                      element={
                        <ProtectedRoute allowedRoles={['candidate', 'recruiter', 'admin']}>
                          <InterviewDetails />
                        </ProtectedRoute>
                      }
                    />

                    {/* Generic Fallback redirect */}
                    <Route path="*" element={<Home />} />
                  </Routes>
                </div>

                <Footer />
              </div>

              <style>{`
                .site-wrapper {
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
                }

                .main-content-layout {
                  flex-grow: 1;
                }
              `}</style>
            </BrowserRouter>
          </JobsProvider>
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
