import React from "react";
import { FaUserGraduate, FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaCode } from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider"; // Ensure you have a context provider for saved interns

const InternCard = ({ id, name, university, location, skills, startDate, duration, logo, rating }) => {
  const { savedInterns, setSavedInterns } = useStateContext();

  const handleSaveIntern = (internId) => {
    setSavedInterns((prev) => ({
      ...prev,
      [internId]: !prev[internId],
    }));
  };

  return (
    <div className="border border-gray-300 dark:border-[#20232A] rounded-xl p-6 shadow-md bg-white dark:bg-secondary-dark-bg transition hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Intern Logo" className="w-16 h-16 rounded-lg object-cover" />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{name}</h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center">
            <FaUniversity className="mr-2" /> {university}
          </p>
          <p className="text-gray-600 dark:text-gray-400 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> {location}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <p className="flex items-center text-gray-700 dark:text-gray-300">
          <FaCode className="mr-2" /> Skills: {skills}
        </p>
        <p className="flex items-center text-gray-700 dark:text-gray-300">
          <FaCalendarAlt className="mr-2" /> Start Date: {startDate}
        </p>
        <p className="flex items-center text-gray-700 dark:text-gray-300">
          <FaUserGraduate className="mr-2" /> Duration: {duration}
        </p>
        <p className="flex items-center text-gray-700 dark:text-gray-300">
          Rating: {rating}
        </p>
      </div>
    </div>
  );
};

export default InternCard;