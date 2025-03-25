import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onLinkClick }) => {
  return (
    <div className='bg-gray-50 dark:bg-main-dark-bg'>
      <div className="flex-row items-center space-x-4">
        <div className='flex-col rounded-full shadow-md transition-all duration-300 ease-in-out'>
          <input
            type="text"
            placeholder="Job title or keyword"
            className='focus:outline-gray-100 px-3 py-3.5 mt-2 w-full bg-gray-100 dark:bg-secondary-dark-bg dark:focus:outline-gray-800 rounded-full transition-opacity duration-300 ease-in-out'
          />
          <input
            type="text"
            placeholder="Location"
            className='focus:outline-gray-100 px-3 py-3.5 mt-3 w-full bg-gray-100 dark:bg-secondary-dark-bg dark:focus:outline-gray-800 rounded-full transition-opacity duration-300 ease-in-out'
          />
        </div>
      </div>
      <div className="flex items-center flex-col p-4 space-y-4">
        <Link
          to="/"
          className="text-gray-800 dark:text-white dark:hover:text-gray-500 py-2 text-lg hover:text-gray-400 transition duration-300"
          onClick={onLinkClick}
        >
          Home
        </Link>
        <Link
          to="/internships"
          className="text-gray-800 dark:text-white dark:hover:text-gray-500 py-2 text-lg hover:text-gray-400 transition duration-300"
          onClick={onLinkClick}
        >
          Internships
        </Link>
        <Link
          to="/companies"
          className="text-gray-800 dark:text-white dark:hover:text-gray-500 py-2 text-lg hover:text-gray-400 transition duration-300"
          onClick={onLinkClick}
        >
          Companies
        </Link>
        <Link
          to="/blog"
          className="text-gray-800 dark:text-white dark:hover:text-gray-500 py-2 text-lg hover:text-gray-400 transition duration-300"
          onClick={onLinkClick}
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className="text-gray-800 dark:text-white dark:hover:text-gray-500 py-2 text-lg hover:text-gray-400 transition duration-300"
          onClick={onLinkClick}
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;