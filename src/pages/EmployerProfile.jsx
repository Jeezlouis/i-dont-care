import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaGlobe, FaLinkedin, FaUsers, FaCalendarAlt, FaStar, FaSuitcase, FaHandshake } from "react-icons/fa"; // Icons for visual appeal
import { apiRequest } from "./features/auth/auth";

const EmployerProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch company profile data from the backend
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const data = await apiRequest('get', '/profile/company/');
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company profile:", error);
        setError("Failed to load company profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="text-center py-20">Loading company profile...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!company) {
    return <div className="text-center py-20">No company profile found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-main-dark-bg flex flex-col">
      {/* Main Content */}
      <main className="container mx-auto p-6 flex-1 dark:text-white">
        <div className="max-w-4xl mx-auto bg-white dark:bg-secondary-dark-bg shadow-lg rounded-lg p-6">
          {/* Header Section */}
          <div className="flex items-center space-x-6 border-b pb-6">
            <img
              src={company.logo || "https://via.placeholder.com/150"}
              alt="Company Logo"
              className="w-24 h-24 rounded-full border p-1"
            />
            <div>
              <h1 className="text-3xl font-bold dark:text-gray-100">{company.name}</h1>
              <p className="text-gray-600 dark:text-gray-50">{company.industry} | {company.location}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">About</h3>
            <p className="text-gray-700 dark:text-gray-50">{company.about}</p>
          </div>

          {/* Mission Statement Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-50">{company.mission}</p>
          </div>

          {/* Company Details Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-600 dark:text-gray-50" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Founded</h4>
                  <p className="text-gray-700 dark:text-gray-50">{company.founded}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaUsers className="text-gray-600 dark:text-gray-50" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Company Size</h4>
                  <p className="text-gray-700 dark:text-gray-50">{company.size}</p>
                  <p className="text-gray-700 dark:text-gray-50">Tech Consultants: {company.tech_consultants}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Work Culture Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Work Culture</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-50">
              {Object.entries(company.work_culture).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Opportunities Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Job Opportunities & Growth</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-50">
              {Object.entries(company.job_opportunities).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          {/* Ratings Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Company Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(company.ratings).map(([key, value]) => (
                <div key={key}>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h4>
                  <div className="flex space-x-1">
                    {renderStars(value)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-50 flex items-center space-x-2">
                <FaEnvelope className="text-gray-600 dark:text-gray-50" />
                <span><strong>Email:</strong> {company.email}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-50 flex items-center space-x-2">
                <FaGlobe className="text-gray-600 dark:text-gray-50" />
                <span><strong>Website:</strong> <a href={company.website} className="text-blue-600 hover:underline">{company.website}</a></span>
              </p>
              <p className="text-gray-700 dark:text-gray-50 flex items-center space-x-2">
                <FaLinkedin className="text-gray-600 dark:text-gray-50" />
                <span><strong>LinkedIn:</strong> <a href={company.social_media?.linkedin} className="text-blue-600 hover:underline">{company.social_media?.linkedin}</a></span>
              </p>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/admin/edit-profile")}
            >
              Edit Profile
            </button>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => navigate("/admin/interns")}
            >
              View Matching Interns
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerProfile;