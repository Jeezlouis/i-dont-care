import React from "react";
import { FaBuilding, FaIndustry, FaUserTie, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaUsers, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Button } from "."; // Ensure you have a reusable button component
import { useStateContext } from "../context/ContextProvider";

const CompanyCard = ({ id, name, industry, location, size, revenue, rating, founded, type, logo }) => {
  const { savedCompanies, setSavedCompanies } = useStateContext();

  const handleSaveCompany = (companyId) => {
    setSavedCompanies((prev) => ({
      ...prev,
      [companyId]: !prev[companyId],
    }));
  };

  return (
    <div className="border border-gray-300 dark:border-[#20232A] rounded-xl p-6 shadow-md bg-white dark:bg-secondary-dark-bg transition hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Company Logo" className="w-16 h-16 rounded-lg object-cover" />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{name}</h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center"><FaIndustry className="mr-2" /> {industry}</p>
          <p className="text-gray-600 dark:text-gray-400 flex items-center"><FaMapMarkerAlt className="mr-2" /> {location}</p>
        </div>
        
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <p className="flex items-center text-gray-700 dark:text-gray-300"><FaUsers className="mr-2" /> Size: {size}</p>
        <p className="flex items-center text-gray-700 dark:text-gray-300"><FaMoneyBillWave className="mr-2" /> Revenue: {revenue}</p>
        <p className="flex items-center text-gray-700 dark:text-gray-300"><FaCalendarAlt className="mr-2" /> Founded: {founded}</p>
        <p className="flex items-center text-gray-700 dark:text-gray-300"><FaUserTie className="mr-2" /> Type: {type}</p>
      </div>
      
    </div>
  );
};

export default CompanyCard;
