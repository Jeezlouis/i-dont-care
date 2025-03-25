import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Copyright, CompanySidebar } from '../../components';

const CompanyLayout = ( company ) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen dark:bg-main-dark-bg bg-gray-100 flex-col relative">
      {/* Header occupies the top with fixed styling */}
      <Header toggleSidebar={toggleSidebar} fixedHeader={true} />

      {/* Sidebar as fixed element overlapping footer */}
      <aside 
        className={`fixed sidebar isolate top-16 left-0 h-full w-64 bg-white dark:bg-main-dark-bg shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <CompanySidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 pt-20">
        {/* On desktop, add left margin to prevent content from being hidden */}
        <main className="flex-1 p-6 ml-0 md:ml-64 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-[#33373E] py-4 dark:bg-main-dark-bg dark:text-gray-50 text-center text-sm text-gray-600">
        <Copyright
        company="Unintern"
        />
      </footer>
    </div>
  );
};

export default CompanyLayout;