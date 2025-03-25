import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center bg-main-dark-bg justify-center min-h-screen">
      <div className="spinner">
        <div className="inner"></div>
      </div>
    </div> 
  );
};

export default Spinner;