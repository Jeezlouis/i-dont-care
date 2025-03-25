import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import InternCard from "../components/InternCard";
import InternDetails from "../components/InternDetails"; // Ensure this component exists
import Searchbar from "../components/Searchbar"; // Ensure this component exists
import { FaStar } from "react-icons/fa";
import { Loader } from "../components"; // Ensure this component exists
import logo from "../assets/profile.svg";
import { apiRequest } from "./features/auth/auth";

// Custom Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-full disabled:opacity-50"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded-full ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-full disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const Interns = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    university: "",
    location: "",
    skills: "",
    duration: "",
    rating: "",
  });
  const [selectedIntern, setSelectedIntern] = useState(null); // State for selected intern
  const [showDetails, setShowDetails] = useState(false); // State to control details visibility
  const internsPerPage = 10;

  // Fetch interns from the backend API
  useEffect(() => {
    const fetchRecommendedInterns = async () => {
      setLoading(true);
      try {
        const data = await apiRequest('post', '/student-filter/', {
          required_skills: filters.skills,
          location: filters.location,
          industry: filters.university, // Map university to industry if applicable
        });
        setInterns(data);
      } catch (err) {
        console.error("Error fetching recommended interns:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendedInterns();
  }, [filters]);

  // Filter interns by search term and filters
  const filteredInterns = interns.filter((intern) => {
    const matchesSearch = intern.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = filters.university ? intern.university === filters.university : true;
    const matchesLocation = filters.location ? intern.location === filters.location : true;
    const matchesSkills = filters.skills ? intern.skills.includes(filters.skills) : true;
    const matchesDuration = filters.duration ? intern.duration === filters.duration : true;
    const matchesRating = filters.rating ? intern.rating >= filters.rating : true;
    return matchesSearch && matchesUniversity && matchesLocation && matchesSkills && matchesDuration && matchesRating;
  });

  const totalPages = Math.ceil(filteredInterns.length / internsPerPage);
  const indexOfLastIntern = currentPage * internsPerPage;
  const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
  const currentInterns = filteredInterns.slice(indexOfFirstIntern, indexOfLastIntern);

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, rating });
    setCurrentPage(1); // Reset to first page when rating changes
  };

  // Handle clicking on an intern card
  const handleCardClick = (intern) => {
    setSelectedIntern(intern);
    setShowDetails(true);
  };

  // Close the intern details section
  const closeInternDetails = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedIntern(null), 300); // Delay resetting selected intern for smooth animation
  };

  return (
    <div className="p-6 bg-gray-50 main-bg dark:bg-main-dark-bg min-h-screen relative dark:text-white">
      {/* Search Bar */}
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
        Find Your Next Intern
      </h1>

      <div className="p-6 bg-gray-50 main-bg dark:bg-main-dark-bg min-h-screen relative flex">
        {/* Sticky Filters Section */}
        <div className="w-1/4 pr-6">
          <div className="sticky top-6 bg-gray-100 dark:bg-secondary-dark-bg p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Filters
            </h2>

            {/* University */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                University
              </label>
              <input
                type="text"
                name="university"
                value={filters.university}
                onChange={handleFilterChange}
                placeholder="E.g. Stanford, MIT"
                className="w-full p-2 border rounded-lg bg-white dark:bg-transparent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="E.g. San Francisco, CA"
                className="w-full p-2 border rounded-lg bg-white dark:bg-transparent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={filters.skills}
                onChange={handleFilterChange}
                placeholder="E.g. React, Python"
                className="w-full p-2 border rounded-lg bg-white dark:bg-transparent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Duration
              </label>
              <select
                name="duration"
                value={filters.duration}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg bg-white dark:bg-transparent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Duration</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
              </select>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`text-2xl ${
                      star <= filters.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() =>
                  setFilters({ university: "", location: "", skills: "", duration: "", rating: "" })
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Intern Cards Grid */}
        <div className="w-3/4 overflow-y-auto h-screen px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen dark:bg-secondary-dark-bg">
              <Loader />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6">
                {currentInterns.map((intern) => (
                  <div
                    key={intern.id}
                    className="relative cursor-pointer rounded-lg transition-transform duration-200 hover:-translate-y-1"
                    onClick={() => handleCardClick(intern)}
                  >
                    <InternCard
                      id={intern.id}
                      name={intern.name}
                      university={intern.university}
                      location={intern.location}
                      skills={intern.skills}
                      startDate={intern.startDate}
                      duration={intern.duration}
                      logo={intern.logo || logo}
                      rating={intern.rating}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
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

      {/* Intern Details Section */}
      {selectedIntern && (
        <div
          className={`fixed inset-0 bg-half-transparent flex justify-end transition-opacity duration-300 z-50 ${
            showDetails ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeInternDetails}
        >
          <div
            className={`w-full max-w-2xl h-full overflow-y-auto p-6 transform transition-transform duration-300 ${
              showDetails ? "translate-x-0" : "translate-x-full"
            } bg-white dark:bg-gray-800`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-800 dark:text-gray-200 focus:outline-none hover:text-gray-600"
              onClick={closeInternDetails}
            >
              ×
            </button>
            <InternDetails {...selectedIntern} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Interns;