// frontend/src/context/JobsContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { api, useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  
  // Pagination State
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  });

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    job_type: [],
    salary_min: '',
    salary_max: '',
    location: [],
    experience: [],
    skills: [],
    sort: 'latest'
  });

  const { showToast } = useToast();
  const { user } = useAuth();
  const [savedJobIds, setSavedJobIds] = useState([]);

  // Fetch saved job IDs helper
  const fetchSavedJobIds = useCallback(async () => {
    try {
      const res = await api.get('/saved-jobs?limit=100');
      if (res.data.success) {
        setSavedJobIds(res.data.data.map(item => Number(item.id)));
      }
    } catch (err) {
      console.error('Failed to load saved jobs IDs:', err.message);
    }
  }, []);

  // Save/Unsave job action
  const toggleSaveJob = async (jobId, navigate, location) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      showToast('Please log in to save jobs.', 'warning');
      navigate('/login', { state: { from: location } });
      return;
    }

    const numericJobId = Number(jobId);
    const isSaved = savedJobIds.includes(numericJobId);

    // Optimistic UI update
    setSavedJobIds(prev =>
      isSaved ? prev.filter(id => id !== numericJobId) : [...prev, numericJobId]
    );

    try {
      if (isSaved) {
        const res = await api.delete(`/saved-jobs/${numericJobId}`);
        if (res.data.success) {
          showToast('Job removed from saved list successfully.', 'success');
        }
      } else {
        const res = await api.post('/saved-jobs', { job_id: numericJobId });
        if (res.data.success) {
          showToast('Job saved successfully.', 'success');
        }
      }
    } catch (err) {
      // Revert optimistic update
      setSavedJobIds(prev =>
        isSaved ? [...prev, numericJobId] : prev.filter(id => id !== numericJobId)
      );
      showToast(err.response?.data?.message || 'Error updating bookmark status.', 'error');
    }
  };

  // Automatically load saved jobs on candidate session change
  useEffect(() => {
    if (user && user.role === 'candidate') {
      fetchSavedJobIds();
    } else {
      setSavedJobIds([]);
    }
  }, [user?.id, fetchSavedJobIds]);

  // Load Skills repository (for multi-select dropdowns)
  const fetchSkills = useCallback(async () => {
    try {
      const res = await api.get('/jobs/skills');
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load skills list:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Main fetch jobs function
  const fetchJobs = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      // Build query string params
      const params = {
        page: pageNumber,
        limit: pagination.limit,
        sort: filters.sort
      };

      if (filters.search) params.search = filters.search;
      if (filters.job_type.length > 0) params.job_type = filters.job_type.join(',');
      if (filters.location.length > 0) params.location = filters.location.join(',');
      if (filters.experience.length > 0) params.experience = filters.experience.join(',');
      if (filters.skills.length > 0) params.skills = filters.skills.join(',');
      if (filters.salary_min) params.salary_min = filters.salary_min;
      if (filters.salary_max) params.salary_max = filters.salary_max;

      const res = await api.get('/jobs', { params });
      
      if (res.data.success) {
        setJobs(res.data.data);
        setPagination({
          total: res.data.pagination.total,
          page: res.data.pagination.page,
          limit: res.data.pagination.limit,
          totalPages: res.data.pagination.totalPages
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error loading job catalog.';
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.limit, showToast]);

  // Reset all filters helper
  const resetFilters = () => {
    setFilters({
      search: '',
      job_type: [],
      salary_min: '',
      salary_max: '',
      location: [],
      experience: [],
      skills: [],
      sort: 'latest'
    });
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        skills,
        loading,
        pagination,
        filters,
        fetchJobs,
        updateFilters,
        resetFilters,
        savedJobIds,
        fetchSavedJobIds,
        toggleSaveJob
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
