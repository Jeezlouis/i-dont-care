import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RichTextEditorComponent, Inject, Toolbar, Image, Link, HtmlEditor, QuickToolbar } from "@syncfusion/ej2-react-richtexteditor";
import { apiRequest } from "./features/auth/auth";
import { toast, ToastContainer } from "react-toastify";

const EditCompanyProfile = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    location: "",
    industry: "",
    website: "",
    about: "",
    logo: "",
    founded: "",
    size: "",
    tech_consultants: "",
    work_culture: {
      dress_code: "",
      mentorship: "",
      unions: "",
    },
    job_opportunities: {
      stability: "",
      innovation: "",
      global_presence: "",
    },
    social_media: {
      linkedin: "",
      twitter: "",
      github: "",
    },
    intern_preferences: {
      skills: [],
      industry_interest: [],
      location_preference: [],
      years_of_experience: "",
      cv_updated: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch company profile data from the backend
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/profile/company/');
        setCompanyData(data);
      } catch (error) {
        console.error("Error fetching company profile:", error);
        setError("Failed to load company profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  // Handle social media changes
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      social_media: { ...companyData.social_media, [name]: value },
    });
  };

  // Handle work culture changes
  const handleWorkCultureChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      work_culture: { ...companyData.work_culture, [name]: value },
    });
  };

  // Handle job opportunities changes
  const handleJobOpportunitiesChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      job_opportunities: { ...companyData.job_opportunities, [name]: value },
    });
  };

  // Handle intern preferences changes
  const handleInternPreferencesChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      intern_preferences: { ...companyData.intern_preferences, [name]: value },
    });
  };

  // Handle skills input (comma-separated)
  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setCompanyData({
      ...companyData,
      intern_preferences: { ...companyData.intern_preferences, skills },
    });
  };

  // Handle industry interest input (comma-separated)
  const handleIndustryInterestChange = (e) => {
    const industry_interest = e.target.value.split(",").map((industry) => industry.trim());
    setCompanyData({
      ...companyData,
      intern_preferences: { ...companyData.intern_preferences, industry_interest },
    });
  };

  // Handle location preference input (comma-separated)
  const handleLocationPreferenceChange = (e) => {
    const location_preference = e.target.value.split(",").map((location) => location.trim());
    setCompanyData({
      ...companyData,
      intern_preferences: { ...companyData.intern_preferences, location_preference },
    });
  };

  // Handle CV updated toggle
  const handleCVUpdatedChange = (e) => {
    const cv_updated = e.target.checked;
    setCompanyData({
      ...companyData,
      intern_preferences: { ...companyData.intern_preferences, cv_updated },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiRequest('put', '/profile/company/', companyData);
      toast.success("Profile updated successfully!");
      navigate("/company/profile");
    } catch (error) {
      console.error("Error updating company profile:", error);
      toast.error("Failed to update profile.");
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading company profile...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 main-bg dark:bg-main-dark-bg flex flex-col dark:text-white">
      <main className="container mx-auto p-6 flex-1">
        <div className="max-w-4xl mx-auto bg-white dark:bg-secondary-dark-bg shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Edit Company Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={companyData.email}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={companyData.location}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={companyData.industry}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Founded
                </label>
                <input
                  type="text"
                  name="founded"
                  value={companyData.founded}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Company Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={companyData.size}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Tech Consultants
                </label>
                <input
                  type="text"
                  name="tech_consultants"
                  value={companyData.tech_consultants}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Logo URL
                </label>
                <input
                  type="url"
                  name="logo"
                  value={companyData.logo}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the URL of your company logo"
                />
              </div>
            </div>

            {/* About Section */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                About Us
              </label>
              <RichTextEditorComponent
                value={companyData.about}
                change={(e) => setCompanyData({ ...companyData, about: e.value })}
                className="richtext-editor"
              >
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
              </RichTextEditorComponent>
            </div>

            {/* Work Culture Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Work Culture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Dress Code
                  </label>
                  <input
                    type="text"
                    name="dress_code"
                    value={companyData.work_culture.dress_code}
                    onChange={handleWorkCultureChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Mentorship
                  </label>
                  <input
                    type="text"
                    name="mentorship"
                    value={companyData.work_culture.mentorship}
                    onChange={handleWorkCultureChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Unions
                  </label>
                  <input
                    type="text"
                    name="unions"
                    value={companyData.work_culture.unions}
                    onChange={handleWorkCultureChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Job Opportunities Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Job Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Stability
                  </label>
                  <input
                    type="text"
                    name="stability"
                    value={companyData.job_opportunities.stability}
                    onChange={handleJobOpportunitiesChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Innovation
                  </label>
                  <input
                    type="text"
                    name="innovation"
                    value={companyData.job_opportunities.innovation}
                    onChange={handleJobOpportunitiesChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Global Presence
                  </label>
                  <input
                    type="text"
                    name="global_presence"
                    value={companyData.job_opportunities.global_presence}
                    onChange={handleJobOpportunitiesChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Intern Preferences Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Intern Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={companyData.intern_preferences.skills.join(", ")}
                    onChange={handleSkillsChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Industry Interest (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="industry_interest"
                    value={companyData.intern_preferences.industry_interest.join(", ")}
                    onChange={handleIndustryInterestChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Location Preference (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="location_preference"
                    value={companyData.intern_preferences.location_preference.join(", ")}
                    onChange={handleLocationPreferenceChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Years of Experience
                  </label>
                  <select
                    name="years_of_experience"
                    value={companyData.intern_preferences.years_of_experience}
                    onChange={handleInternPreferencesChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  >
                    <option value="0-2 years">0-2 years</option>
                    <option value="2-4 years">2-4 years</option>
                    <option value="4+ years">4+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    CV Updated
                  </label>
                  <input
                    type="checkbox"
                    name="cv_updated"
                    checked={companyData.intern_preferences.cv_updated}
                    onChange={handleCVUpdatedChange}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={companyData.social_media.linkedin}
                    onChange={handleSocialMediaChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    Twitter
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={companyData.social_media.twitter}
                    onChange={handleSocialMediaChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={companyData.social_media.github}
                    onChange={handleSocialMediaChange}
                    className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditCompanyProfile;