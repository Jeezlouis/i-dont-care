import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { BsStars, BsArrowLeft } from "react-icons/bs";
import { useStateContext } from '../context/ContextProvider';
import { CompanyCard, Searchbar, CompanyDetails } from '../components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import companyLogo from '../assets/companyy.png';
import log from '../assets/companylogo.svg';

const fetchCompanies = async () => {
  try {
    const response = await axios.get("/companies/");
    return response.data; // Ensure this is an array
  } catch (error) {
    throw error;
  }
};

const Companies = () => {
  const { loading, setLoading, setCompanies, selectedCompany, setSelectedCompany, Companies, showDetails, setShowDetails, showFilters, setShowFilters } = useStateContext();
  const [filters, setFilters] = useState({ industry: '', location: '', size: '', type: '', revenue: '', rating: '' });
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCompanies = async () => {
      setLoading(true);
      try {
        const data = await fetchCompanies();
        if (Array.isArray(data)) {
          setCompanies(data); // Update the context with fetched data
          setSelectedCompany(data[0]); // Set first company as default
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setOpenDropdown(null); // Close dropdown after selection
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  const filterOptions = {
    industry: ["All Industries", "Technology", "Healthcare", "Finance"],
    location: ["All Locations", "San Francisco", "New York", "London"],
    size: ["All Sizes", "Small", "Medium", "Large"],
    type: ["All Types", "Startup", "Enterprise", "Corporation"],
    revenue: ["All Revenue", "$1M - $10M", "$10M - $100M", "$100M+"],
    rating: ["All Ratings", "★ ★ ★ ★", "★ ★ ★", "★ ★", "★"]
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen dark:bg-main-dark-bg"><Loader /></div>;
  }

  const handleCardClick = (company) => {
    setSelectedCompany(company);
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  const handleSearch = (searchQuery, location) => {
    // Filter jobs or companies based on searchQuery and location
    const filteredData = Companies.filter((company) => {
      const matchesQuery = company.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = company.location.toLowerCase().includes(location.toLowerCase());
      return matchesQuery && matchesLocation;
    });

    // Update the state with filtered data
    setCompanies(filteredData);
  };

  return (
    <div className="bg-main-bg dark:bg-main-dark-bg">
      {/* Landing Section for Internship Students */}
      <div className="flex pb-40 pt-36 bg-main-bg dark:bg-main-dark-bg py-12 px-4 sm:px-6 lg:px-8">
        <div className='flex justify-center items-center w-[50%]'>
          <div className="mx-auto ml-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Find Your Dream Company
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Explore top companies offering internships in various industries. Gain valuable experience and kickstart your career!
            </p>
            <div className="flex justify-center space-x-4 mt-12">
              <button className="bg-blue-500 text-white px-6 py-2 border hover:border-blue-500 rounded-lg hover:bg-white hover:text-blue-500 transition duration-300"
                onClick={() => navigate('/jobs')}
              >
                Browse Internships
              </button>
              <button className="bg-transparent border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className='w-[50%]'>
          <img
            src={companyLogo}
            alt="Companies"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Searchbar Section */}
      <div className="bg-main-bg dark:bg-main-dark-bg">
        <Searchbar onSearch={handleSearch} />
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4 p-4">
        {/* Filter Button */}
        <div className="flex pl-8 justify-start">
          <a
            className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-3xl cursor-pointer transition duration-300"
            onClick={toggleFilter}
          >
            Filter <PiSlidersHorizontalBold className="ml-2 text-lg" />
          </a>
        </div>

        {/* Filters Dropdown */}
        <div
          className={`flex pl-8 flex-wrap gap-2 transition-all duration-500 ease-in-out ${
            showFilters ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }`}
        >
          {Object.keys(filterOptions).map((key) => (
            <div key={key} className="relative dropdown">
              <button
                className="px-6 py-2 cursor-pointer relative text-md font-medium capitalize rounded-3xl bg-gray-200 hover:bg-gray-300 transition focus:outline-blue-200 duration-300 border-b-2 focus:border-blue-400 flex items-center justify-between min-w-[150px]"
                onClick={() => toggleDropdown(key)}
              >
                {filters[key] || key}{" "}
                {openDropdown === key ? (
                  <IoIosArrowUp className="ml-2 text-lg" />
                ) : (
                  <IoIosArrowDown className="ml-2 text-lg" />
                )}
              </button>
              <div
                className={`absolute z-10 w-48 bg-white shadow-lg mt-2 rounded-md transition-all duration-300 ease-in-out ${
                  openDropdown === key ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-2"
                }`}
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-md font-bold capitalize">{key}</h3>
                  <button
                    className="text-gray-600 text-xl"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <MdOutlineCancel />
                  </button>
                </div>
                {filterOptions[key].map((option, index) => (
                  <div
                    key={index}
                    className="py-3 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleFilterChange(key, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab-Specific Content (Companies + Details) */}
      <div className="flex px-10 mt-4 gap-6">
        <div className="w-full flex flex-col md:flex-row">
          {/* Company List (Left) - Scrolls with the page */}
          <div className={`w-full md:w-[35%] pr-4 ${showDetails ? 'hidden md:block' : ''}`}>
            {Companies && Companies.map((company, index) => (
              <div
                key={index}
                className="cursor-pointer mb-2"
                onClick={() => handleCardClick(company)}
              >
                <CompanyCard
                  className={`rounded-2xl ${selectedCompany === company ? 'border-2 border-gray-600 dark:border-gray-400' : ''}`}
                  key={company.id}
                  id={company.id}
                  logo={company.logo || log}
                  name={company.name || 'Tech Corp'}
                  industry={company.industry || 'Technology'}
                  size={company.size || 'Large'}
                  rating={company.rating || '★ ★ ★ ★'}
                  reviews={company.reviews || '1,234 reviews'}
                />
              </div>
            ))}
          </div>

          {/* Company Details (Right) - Fixed Position */}
          <div className={`w-full md:w-[65%] h-screen sticky top-0 pl-4 dark:bg-main-dark-bg ${showDetails ? '' : 'hidden md:block'}`}>
            {showDetails && (
              <button
                onClick={handleBackClick}
                className={`mb-4 px-4 flex text-black rounded-lg text-center text-xl hover:underline capitalize transition duration-300 ${showDetails ? 'md:hidden' : ''}`}
              >
                <BsArrowLeft className='mr-2 mt-1' />
                Back to for you
              </button>
            )}
            {selectedCompany ? (
              <CompanyDetails
                logo={selectedCompany.logo}
                name={selectedCompany.name}
                industry={selectedCompany.industry}
                description={selectedCompany.description}
                location={selectedCompany.location}
                size={selectedCompany.size}
                rating={selectedCompany.rating}
                reviews={selectedCompany.reviews}
                website={selectedCompany.website}
                founded={selectedCompany.founded}
                revenue={selectedCompany.revenue}
              />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-300">No company selected</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;