
import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center my-4">
      <button 
        className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button 
        className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;