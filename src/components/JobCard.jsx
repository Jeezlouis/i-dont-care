import React from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useStateContext } from '../context/ContextProvider';
import profile from '../assets/companylogo.svg';

const JobCard = ({ logo, id, title, companyName, location, duration, skills, days }) => {
  const { savedJobs, setSavedJobs, isAuthenticated } = useStateContext(); // Add isAuthenticated

  // Function to handle save/unsave for a specific job
  const handleSavedJobs = (jobId) => {
    setSavedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId], // Toggle save state for the specific job
    }));
  };

  return (
    <div className='pb-2 rounded-xl border-b-2 hover:bg-gray-200 dark:hover:bg-transparent focus:border-gray-500 border-gray-300 dark:border-gray-700 mb-2'>
      <div className='flex flex-col w-full rounded-2xl p-4 dark:bg-secondary-dark-bg'>
        {/* Top Section: Logo, Title, Company Name, Location, and Bookmark Button */}
        <div className='flex justify-between items-start pb-4'>
          <div className='flex items-center'>
            <img src={logo || profile} alt='company logo' className='w-6 h-6 rounded-lg mr-2' />
            <div>
              <h2 className='uppercase font-bold text-gray-800 dark:text-gray-200'>{title}</h2>
              <div className='flex justify-between'>
                <p className='uppercase font-semibold text-sm text-gray-600 dark:text-gray-400'>{companyName}</p>
                <p className='uppercase font-semibold text-sm text-gray-600 dark:text-gray-400'>{location}</p>
              </div>
            </div>
          </div>
          {/* Bookmark Button (only for authenticated users) */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => handleSavedJobs(id)} // Pass the job ID to handleSavedJobs
              className="p-3 text-xl rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
            >
              {savedJobs[id] ? <FaBookmark /> : <FaRegBookmark />} {/* Toggle bookmark icon */}
            </button>
          )}
        </div>

        {/* Middle Section: Duration and Qualifications */}
        <div className='flex-col justify-between pb-4'>
          <p className='capitalize font-semibold rounded-lg px-2 py-1 text-sm text-gray-800 dark:text-gray-200'>{duration}</p>
        </div>

        {/* Bottom Section: Skills and Days */}
        <div className='flex justify-between'>
          <p className='capitalize bg-light-gray dark:bg-gray-600 font-semibold rounded-lg px-2 py-1 text-sm text-gray-800 dark:text-gray-200'>{skills}</p>
          <p className='capitalize font-semibold rounded-lg px-2 py-1 text-sm text-gray-800 dark:text-gray-200'>{days}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;