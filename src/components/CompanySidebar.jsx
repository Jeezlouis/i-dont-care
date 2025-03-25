import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { apiRequest } from '../pages/features/auth/auth'; // Adjust path based on your structure

const activeLink = 'flex items-center capitalize gap-5 pl-4 pt-3 pb-2.5 rounded-lg dark:hover:bg-main-dark-bg text-blue-500 text-md m-2 w-full text-left px-4 py-2 rounded hover:bg-gray-100';
const normalLink = 'flex items-center capitalize gap-5 pl-4 pt-3 pb-2.5 rounded-lg dark:hover:bg-main-dark-bg text-md text-gray-700 dark:text-gray-200 dark:hover:text-light hover-bg-light-gray m-2 w-full text-left rounded hover:bg-gray-100';

const links = [
  { path: 'company/dashboard', name: 'Dashboard' },
  { path: 'company/post-job', name: 'Post Job' },
  { path: 'company/company-profile', name: 'Company Profile' },
  { path: 'company/interns', name: 'Interns for your company' },
  { path: 'company/interviews', name: 'Interviews' },
  { path: 'company/manage-company', name: 'Manage Jobs' },
  { path: 'company/analytics-and-reports', name: 'Analytics and Reports' },
  { path: 'company/applicants', name: 'Students Applications' },
  { path: 'company/notifications', name: 'Notifications' },
];

const CompanySidebar = () => {
  const { setAuth } = useStateContext(); // Use setAuth for full context update
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await apiRequest('post', '/auth/logout/', {}, false);
      console.log('Logout API response:', response);

      // Clear cookies on the client side
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');

      // Update authentication state in context
      setAuth({
        isAuthenticated: false,
        user: null,
      });

      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to logout. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <nav className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 dark:bg-secondary-dark-bg">
      {links.map((item, index) => (
        <NavLink
          key={index}
          to={`/${item.path}`}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          {item.name}
        </NavLink>
      ))}
      <button
        onClick={handleLogout}
        className="flex items-center capitalize gap-5 pl-4 pt-3 pb-2.5 rounded-lg dark:hover:bg-main-dark-bg text-md text-gray-700 dark:text-gray-200 dark:hover:text-light hover-bg-light-gray m-2 w-full text-left hover:bg-gray-100"
      >
        Logout
      </button>
    </nav>
  );
};

export default CompanySidebar;