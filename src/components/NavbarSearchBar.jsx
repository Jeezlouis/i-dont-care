import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { IoMdSearch } from 'react-icons/io';


const SearchBar = () => {
    const { setSearchOpen, searchOpen, setSidebarOpen} = useStateContext();
    const handleSearchClick = () => {
      setSearchOpen(!searchOpen);
      if (!searchOpen && window.innerWidth < 768) {
        setSidebarOpen(true);
      }
    };
  return (
            <div className="hidden md:flex items-center space-x-4">
              <div
                className={`flex bg-white dark:bg-gray-700 rounded-full shadow-md transition-all duration-1000 ease-in-out ${searchOpen ? 'w-full py-1' : 'w-12'}`}
                style={{
                  overflow: 'hidden',
                  transition: 'width 0.5s ease-in-out, padding 0.1s ease-in-out',
                }}
              >
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className={`transition-opacity duration-300 ease-in-out ${searchOpen ? 'opacity-100' : 'opacity-0'} dark:bg-gray-700 dark:text-white`}
                  style={{
                    width: searchOpen ? 'auto' : '0',
                    padding: searchOpen ? '4px' : '0',
                    transition: 'opacity 0.3s ease-in-out, width 1s ease-in-out, padding 0.1s ease-in-out',
                  }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className={`transition-opacity duration-300 ease-in-out ${searchOpen ? 'opacity-100' : 'opacity-0'} dark:bg-gray-700 dark:text-white`}
                  style={{
                    width: searchOpen ? 'auto' : '0',
                    padding: searchOpen ? '4px' : '0',
                    transition: 'opacity 0.3s ease-in-out, width 0.5s ease-in-out, padding 0.1s ease-in-out',
                  }}
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-full" onClick={handleSearchClick}>
                  <IoMdSearch />
                </button>
              </div>
            </div>
  )
}

export default SearchBar