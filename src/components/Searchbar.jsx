import React, { useState } from 'react';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import { debounce } from 'lodash';

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const debouncedSearch = debounce((searchQuery, location) => {
    onSearch(searchQuery, location);
  }, 300); // 300ms delay

  return (
    <div className='flex justify-center'>
      <div className='flex items-center bg-gray-100 dark:bg-gray-700 rounded-full shadow-md'>
        {/* Search Input */}
        <div className='flex flex-grow space-x-2 items-center px-9 focus:outline-blue-200 '>
          <FaSearch className='text-gray-400 focus:outline-blue-200 dark:text-white' />
          <input
            type='text'
            placeholder='Find your perfect job'
            className='bg-transparent focus:outline-none dark:text-white p-3 px-6'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              debouncedSearch(e.target.value, location);
            }}
          />
        </div>

        {/* Divider */}
        <div className="w-1 bg-white h-full dark:bg-main-dark-bg"></div>

        {/* Location Input */}
        <div className='flex space-x-2 items-center px-9 focus:outline-blue-200 border-gray-400'>
          <FaLocationArrow className='text-gray-400 focus:outline-blue-200 dark:text-white' />
          <input
            type='text'
            placeholder='Location'
            className='bg-transparent focus:outline-none dark:text-white p-3 px-6'
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              debouncedSearch(searchQuery, e.target.value);
            }}
          />
        </div>

        {/* Search Button */}
        <button
          className='bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300'
          onClick={() => onSearch(searchQuery, location)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;