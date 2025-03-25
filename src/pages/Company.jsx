import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCard from "../components/CompanyCard"; // Ensure this component exists
import CompanyDetails from "../components/CompanyDetails"; // Ensure this component exists
import Searchbar from "../components/Searchbar"; // Ensure this component exists
import logo from "../assets/companylogo.svg";
import { Loader } from "../components"; // Ensure this component exists
import { FaStar } from "react-icons/fa";
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

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    size: "", 
    industry: "", 
    location: "", 
    type: "", 
    revenue: "", 
    rating: ""
  });
  const companiesPerPage = 12; // Adjust based on UI preference

  // Fetch companies data from the backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await apiRequest('get', '/companies/');
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies by search term and filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = filters.size ? company.size === filters.size : true;
    const matchesIndustry = filters.industry ? company.industry === filters.industry : true;
    const matchesLocation = filters.location ? company.location === filters.location : true;
    return matchesSearch && matchesSize && matchesIndustry && matchesLocation;
  });

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const handleCardClick = (company) => {
    setSelectedCompany(company);
    setShowDetails(true);
  };

  const closeCompanyDetails = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedCompany(null), 300);
  };

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
    setCurrentPage(1); // Reset to first page when rating filter changes
  };

  return (
    <div className="p-6 bg-main-bg min-h-screen dark:bg-main-dark-bg relative">
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
        Find Your Dream Company
      </h1>

      <div className="p-6 bg-main-bg min-h-screen dark:bg-main-dark-bg relative flex">
        {/* Sticky Filters Section */}
        <div className="w-1/4 pr-6">
          <div className="sticky top-6 bg-light-gray dark:bg-secondary-dark-bg p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Filters
            </h2>

            {/* Company Size */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Company Size
              </label>
              <select
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg bg-white dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any size</option>
                <option value="1-50">1 - 50</option>
                <option value="51-200">51 - 200</option>
                <option value="201-500">201 - 500</option>
                <option value="501-1000">501 - 1000</option>
                <option value="1001-5000">1001 - 5000</option>
                <option value="5001-10000">5001 - 10000</option>
                <option value="10000+">10000+</option>
              </select>
            </div>

            {/* Industry */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
                placeholder="E.g. healthcare, internet, education"
                className="w-full p-2 border rounded-lg bg-white dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Select a location"
                className="w-full p-2 border rounded-lg bg-white dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company Type */}
            {/* <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Company Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg bg-white dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="nonprofit">Non-Profit</option>
                <option value="startup">Startup</option>
              </select>
            </div> */}

            {/* Revenue Range */}
            {/* <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Revenue Range
              </label>
              <select
                name="revenue"
                value={filters.revenue}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg bg-white dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Revenue</option>
                <option value="1M-10M">$1M - $10M</option>
                <option value="10M-100M">$10M - $100M</option>
                <option value="100M-1B">$100M - $1B</option>
                <option value="1B+">$1B+</option>
              </select>
            </div> */}

            {/* Employee Ratings */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-gray-200 mb-2">
                Company Rating
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
                  setFilters({ size: "", industry: "", location: "", type: "", revenue: "", rating: "" })
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Company Cards Grid */}
        <div className="w-3/4 overflow-y-auto h-screen px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen dark:bg-main-dark-bg">
              <Loader />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6">
                {currentCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="relative cursor-pointer rounded-lg transition-transform duration-200 hover:-translate-y-1"
                    onClick={() => handleCardClick(company)}
                  >
                    <CompanyCard
                      company={company}
                      id={company.id}
                      logo={company.logo || logo}
                      name={company.name || "Unknown Company"}
                      location={company.location || "Not Specified"}
                      industry={company.industry || "N/A"}
                      revenue={company.revenue || "$N/A"}
                      rating={company.rating}
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

      {/* Company Details Modal */}
      {selectedCompany && (
        <div
          className={`fixed inset-0 bg-half-transparent flex justify-end transition-opacity duration-300 z-50 ${
            showDetails ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeCompanyDetails}
        >
          <div
            className={`w-full max-w-2xl h-full overflow-y-auto p-6 transform transition-transform duration-300 ${
              showDetails ? "translate-x-0" : "translate-x-full"
            } bg-main-bg dark:bg-main-dark-bg`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-800 dark:text-gray-200 focus:outline-none hover:text-gray-600 dark:hover:text-gray-400"
              onClick={closeCompanyDetails}
            >
              ×
            </button>
            <CompanyDetails
              company={{
                id: selectedCompany.id,
                name: selectedCompany.name,
                title: selectedCompany.title || "A global leader in technology, consulting, and research",
                founded: selectedCompany.founded || "1911",
                industry: selectedCompany.industry,
                size: selectedCompany.size || "Over 297,900 (as of 2022)",
                tech_consultants: selectedCompany.tech_consultants || "Approximately 160,000",
                work_culture: {
                  dress_code: selectedCompany.work_culture?.dress_code || "Relaxed dress code since the 1990s under CEO Louis V. Gerstner Jr.",
                  mentorship: selectedCompany.work_culture?.mentorship || "Open-door policy and strong mentorship culture",
                  unions: selectedCompany.work_culture?.unions || "Some IBM workers outside the U.S. are represented by labor unions, but IBM traditionally resists labor union organizing",
                },
                job_opportunities: {
                  stability: selectedCompany.job_opportunities?.stability || "Offers stability and career growth",
                  innovation: selectedCompany.job_opportunities?.innovation || "Opportunities to work on cutting-edge innovation",
                  global_presence: selectedCompany.job_opportunities?.global_presence || "Strong presence in global markets",
                },
                ratings: {
                  stability: selectedCompany.ratings?.stability || 4,
                  innovation: selectedCompany.ratings?.innovation || 5,
                  culture: selectedCompany.ratings?.culture || 3,
                  overall: selectedCompany.ratings?.overall || 4,
                },
                about: selectedCompany.about || `
                  <p><strong>${selectedCompany.name}</strong> is a global leader in technology, consulting, and research. Founded in ${selectedCompany.founded || "1911"}, ${selectedCompany.name} has been at the forefront of innovation for over a century.</p>
                  <p>${selectedCompany.name} is known for its contributions to computing, including the development of the first programmable computer, the IBM 701, and the creation of the FORTRAN programming language. Today, ${selectedCompany.name} focuses on cloud computing, artificial intelligence, and quantum computing.</p>
                  <p>With over ${selectedCompany.size || "297,900"} employees worldwide, ${selectedCompany.name} operates in more than 170 countries and continues to drive technological advancements.</p>
                `,
                intern_preferences: {
                  skills: selectedCompany.intern_preferences?.skills || ["React", "Python", "Data Analysis"],
                  industry_interest: selectedCompany.intern_preferences?.industry_interest || ["Technology", "Finance", "Healthcare"],
                  location_preference: selectedCompany.intern_preferences?.location_preference || ["Remote", "San Francisco, CA"],
                  years_of_experience: selectedCompany.intern_preferences?.years_of_experience || "0-2 years",
                  cv_updated: selectedCompany.intern_preferences?.cv_updated || true,
                },
                logo: selectedCompany.logo || logo,
                website: selectedCompany.website,
                revenue: selectedCompany.revenue,
                location: selectedCompany.location,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;