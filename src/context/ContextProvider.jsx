import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest, checkAuth } from '../pages/features/auth/auth';
// Create Context
const StateContext = createContext();

// Context Provider Component
export const ContextProvider = ({ children }) => {
  // State declarations
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [savedJobs, setSavedJobs] = useState({});
  // const [savedCompanies, setSavedCompanies] = useState({});
  const [filterOpener, setFilterOpener] = useState(true);
  const [dateOpener, setDateOpener] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [ratingOpener, setRatingOpener] = useState(true);
  const [stipendOpener, setStipendOpener] = useState(true);
  const [locationOpener, setLocationOpener] = useState(true);
  const [experienceOpener, setExperienceOpener] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('for-you');

  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  // Dark mode state and toggle
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  const toggleMode = () => {
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    setCurrentMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentMode === 'dark');
  }, [currentMode]);

  // Check authentication status on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authData = await checkAuth();
        setAuth({
          user: authData.user,
          isAuthenticated: authData.isAuthenticated,
          loading: false
        });
      } catch (error) {
        setAuth({
          user: null,
          isAuthenticated: false,
          loading: false
        });
      }
    };
    verifyAuth();
  }, []);

  // Fetch jobs from Django backend
  const fetchJobs = async (page) => {
    try {
      const data = await apiRequest('get', '/jobs/', { params: { page } });
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  };

  // Fetch companies from Django backend
  const fetchCompanies = async () => {
    try {
      const data = await apiRequest('get', '/companies/');
      return data;
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  };

  // Save a job to the backend
  const saveJob = async (jobId) => {
    try {
      await apiRequest('post', '/saved-jobs/', { job_id: jobId });
      setSavedJobs((prev) => ({ ...prev, [jobId]: true }));
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };



  // Fetch jobs and companies on page load or page change
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const jobsData = await fetchJobs(currentPage);
        const companiesData = await fetchCompanies();
        setJobs(jobsData);
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

      getData();
  }, [currentPage, isAuthenticated]);

  // Context value
  const contextValue = {
    auth,
    setAuth,
    searchOpen,
    setSearchOpen,
    sidebarOpen,
    setSidebarOpen,
    loading,
    setLoading,
    currentMode,
    setCurrentMode,
    toggleMode,
    jobs,
    setJobs,
    companies,
    setCompanies,
    currentPage,
    setCurrentPage,
    selectedJob,
    setSelectedJob,
    selectedCompany,
    setSelectedCompany,
    activeTab,
    setActiveTab,
    stipendOpener,
    setStipendOpener,
    showMore,
    setShowMore,
    isClicked,
    setIsClicked,
    isReport,
    setIsReport,
    showDetails,
    setShowDetails,
    isHidden,
    setIsHidden,
    savedJobs,
    setSavedJobs,
    // savedCompanies,
    // setSavedCompanies,
    dateOpener,
    setDateOpener,
    ratingOpener,
    setRatingOpener,
    filterOpener,
    setFilterOpener,
    locationOpener,
    setLocationOpener,
    experienceOpener,
    setExperienceOpener,
    showFilters,
    setShowFilters,
    fetchJobs,
    fetchCompanies,
    saveJob,
    // saveCompany,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);