import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCards from "../components/JobCard"; // Existing JobCards component
import JobDetails from "../components/JobDetails"; // Existing JobDetails component
import logo from "../assets/companylogo.svg";
import Searchbar from "../components/Searchbar"; // Import the Searchbar component
import Loader from '../components/Loader';
import { apiRequest } from "./features/auth/auth";

// Custom Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border-none rounded-full disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border-none rounded-full ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border-none rounded-full disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    jobType: "",
    industry: "",
    location: "",
    salary: "",
    skills: "",
  });
  const jobsPerPage = 20;

  // Fetch recommended internships from the backend
  useEffect(() => {
    const fetchRecommendedInternships = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('post', '/job-filter/', {
          skills: filters.skills,
          location: filters.location,
          industry: filters.industry,
        });
        setInternships(data);
      } catch (err) {
        console.error("Error fetching recommended internships:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendedInternships();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter internships based on search term and filters
  const filteredInternships = internships
    .filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job) => (filters.jobType ? job.type === filters.jobType : true))
    .filter((job) => (filters.industry ? job.industry.toLowerCase().includes(filters.industry.toLowerCase()) : true))
    .filter((job) => (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true))
    .filter((job) => (filters.skills ? job.skills.toLowerCase().includes(filters.skills.toLowerCase()) : true));

  const totalPages = Math.ceil(filteredInternships.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredInternships.slice(indexOfFirstJob, indexOfLastJob);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setShowDetails(true);
  };

  const closeJobDetails = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 bg-gray-50 main-bg dark:bg-main-dark-bg min-h-screen relative dark:text-white">
      {/* Search Bar Section */}
      <div className="mb-8">
        <Searchbar
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Internships For You
      </h1>
      <div className="flex">
        {/* Filters Section */}
        <div className="w-1/4 pr-6">
          <div className="bg-gray-100 dark:bg-secondary-dark-bg p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Filters</h2>

            {/* Job Type */}
            <div className="mb-6">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">Job Type</label>
              <select name="jobType" value={filters.jobType} onChange={handleFilterChange} className="w-full p-2 border dark:bg-transparent dark:text-white rounded-full">
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Industry */}
            <div className="mb-6">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">Industry</label>
              <input type="text" name="industry" value={filters.industry} onChange={handleFilterChange} className="w-full p-2 border dark:bg-transparent dark:text-white rounded-full" />
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">Location</label>
              <input type="text" name="location" value={filters.location} onChange={handleFilterChange} className="w-full p-2 border dark:bg-transparent dark:text-white rounded-full" />
            </div>

            {/* Salary Range */}
            <div className="mb-6">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">Salary Range</label>
              <input type="text" name="salary" value={filters.salary} onChange={handleFilterChange} className="w-full p-2 border dark:bg-transparent dark:text-white rounded-full" />
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">Required Skills</label>
              <input type="text" name="skills" value={filters.skills} onChange={handleFilterChange} className="w-full p-2 border dark:bg-transparent dark:text-white rounded-full" />
            </div>

            {/* Clear Filters */}
            <button onClick={() => setFilters({ jobType: "", industry: "", location: "", salary: "", skills: "" })} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-8 rounded-full w-full">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="w-3/4 overflow-y-auto h-screen px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen dark:bg-secondary-dark-bg"><Loader /></div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="relative cursor-pointer rounded-lg transition-transform duration-200 hover:-translate-y-1"
                    onClick={() => handleCardClick(job)}
                  >
                    <JobCards 
                      job={job}
                      id={job.id}
                      logo={job.logo || logo}
                      title={job.title || "Software Engineer"}
                      companyName={job.company || "Tech Corp"}
                      location={job.location || "Remote"}
                      duration={job.duration || "6 months"}
                      qualifications={job.qualifications || "Bachelor's Degree"}
                      type={job.type || "Permanent"}
                      skills={job.skills?.join(", ") || "React, Node.js"}
                      days={job.days || "18d"}
                    />
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={onPageChange} 
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end transition-opacity duration-300 z-50 ${
          selectedJob ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeJobDetails}
      >
        {selectedJob && (
          <div
            className={`bg-white dark:bg-secondary-dark-bg shadow-xl w-full max-w-2xl h-full overflow-y-auto p-6 transform transition-transform duration-300 ${
              showDetails ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-800 dark:text-gray-200 focus:outline-none hover:text-gray-600 dark:hover:text-gray-400"
              onClick={closeJobDetails}
            >
              ×
            </button>
            <JobDetails 
              job={selectedJob}
              id={selectedJob.id || 2}
              title={selectedJob.title || "Frontend Developer"}
              companyName={selectedJob.company || "CodeCraft Solutions"}
              location={selectedJob.location || "New York, NY"}
              duration={selectedJob.duration || "6 months"}
              qualifications={selectedJob.qualifications || "Bachelor's degree in CS"}
              type={selectedJob.type || "Part-time"}
              skills={selectedJob.skills || "React, JavaScript, HTML, CSS"}
              salary={selectedJob.salary || "$2500/month"}
              description={selectedJob.description || "We are seeking a Frontend Developer..."}
              logo={selectedJob.logo || logo}
              industry={selectedJob.industry || "Web Development"}
              revenue={selectedJob.revenue || "$10M"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;