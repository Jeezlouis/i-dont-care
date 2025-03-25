import React from 'react';


const Copyright = ({ company }) => {
    const year = new Date().getFullYear();
    return (
      <p>
        © {year} {company || 'Your Company Name'}. All rights reserved.
      </p>
    );
  };
  
  export default Copyright;
  