import React, { useState, useEffect } from "react";
import { RichTextEditorComponent, Inject, Toolbar, Image, Link, HtmlEditor, QuickToolbar } from "@syncfusion/ej2-react-richtexteditor";
import profile from '../assets/profile.svg';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "./features/auth/auth";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: profile,
    location: "",
    availability: "",
    githubUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
    resume: "",
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    years_of_experience: "", // Added
    job_search_status: "Active", // Added with default value
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/profile/student/');
        setUserData({ ...userData, ...data }); // Merge fetched data with defaults
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setUserData({ ...userData, [field]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('put', '/profile/student/', userData);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 main-bg dark:bg-main-dark-bg flex flex-col dark:text-white">
      <main className="container mx-auto p-6 flex-1">
        <div className="max-w-4xl mx-auto bg-white dark:bg-secondary-dark-bg shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Image */}
            <div className="flex items-center space-x-6">
              <img
                src={userData.avatar}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full border p-1"
              />
              <div>
                <label htmlFor="avatar-upload" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location and Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="availability" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Availability
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={userData.availability}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* GitHub and Portfolio URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="githubUrl" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={userData.githubUrl}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="portfolioUrl" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={userData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* LinkedIn URL and Resume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="linkedinUrl" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={userData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="resume" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Resume (PDF)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Education</h3>
              {userData.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`institution-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                        Institution
                      </label>
                      <input
                        type="text"
                        id={`institution-${idx}`}
                        name="institution"
                        value={edu.institution}
                        onChange={(e) => {
                          const updatedEducation = [...userData.education];
                          updatedEducation[idx].institution = e.target.value;
                          setUserData({ ...userData, education: updatedEducation });
                        }}
                        className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`degree-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                        Degree
                      </label>
                      <input
                        type="text"
                        id={`degree-${idx}`}
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const updatedEducation = [...userData.education];
                          updatedEducation[idx].degree = e.target.value;
                          setUserData({ ...userData, education: updatedEducation });
                        }}
                        className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setUserData({
                    ...userData,
                    education: [...userData.education, { institution: "", degree: "", duration: "" }],
                  });
                }}
              >
                + Add Education
              </button>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Experience</h3>
              {userData.experience.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`company-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                        Company
                      </label>
                      <input
                        type="text"
                        id={`company-${idx}`}
                        name="company"
                        value={exp.company}
                        onChange={(e) => {
                          const updatedExperience = [...userData.experience];
                          updatedExperience[idx].company = e.target.value;
                          setUserData({ ...userData, experience: updatedExperience });
                        }}
                        className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`title-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                        Title
                      </label>
                      <input
                        type="text"
                        id={`title-${idx}`}
                        name="title"
                        value={exp.title}
                        onChange={(e) => {
                          const updatedExperience = [...userData.experience];
                          updatedExperience[idx].title = e.target.value;
                          setUserData({ ...userData, experience: updatedExperience });
                        }}
                        className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor={`description-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                      Description
                    </label>
                    <RichTextEditorComponent
                      id={`description-${idx}`}
                      value={exp.description}
                      change={(e) => {
                        const updatedExperience = [...userData.experience];
                        updatedExperience[idx].description = e.value;
                        setUserData({ ...userData, experience: updatedExperience });
                      }}
                    >
                      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                    </RichTextEditorComponent>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setUserData({
                    ...userData,
                    experience: [...userData.experience, { company: "", title: "", description: "" }],
                  });
                }}
              >
                + Add Experience
              </button>
            </div>

            {/* Projects */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Projects</h3>
              {userData.projects.map((project, idx) => (
                <div key={idx} className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`project-name-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                        Project Name
                      </label>
                      <input
                        type="text"
                        id={`project-name-${idx}`}
                        name="name"
                        value={project.name}
                        onChange={(e) => {
                          const updatedProjects = [...userData.projects];
                          updatedProjects[idx].name = e.target.value;
                          setUserData({ ...userData, projects: updatedProjects });
                        }}
                        className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={`project-link-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                        Project Link
                      </label>
                      <input
                        type="url"
                        id={`project-link-${idx}`}
                        name="link"
                        value={project.link}
                        onChange={(e) => {
                          const updatedProjects = [...userData.projects];
                          updatedProjects[idx].link = e.target.value;
                          setUserData({ ...userData, projects: updatedProjects });
                        }}
                        className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor={`tech-stack-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      id={`tech-stack-${idx}`}
                      name="techStack"
                      value={project.techStack}
                      onChange={(e) => {
                        const updatedProjects = [...userData.projects];
                        updatedProjects[idx].techStack = e.target.value;
                        setUserData({ ...userData, projects: updatedProjects });
                      }}
                      className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor={`project-description-${idx}`} className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                      Description
                    </label>
                    <RichTextEditorComponent
                      id={`project-description-${idx}`}
                      value={project.description}
                      change={(e) => {
                        const updatedProjects = [...userData.projects];
                        updatedProjects[idx].description = e.value;
                        setUserData({ ...userData, projects: updatedProjects });
                      }}
                    >
                      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                    </RichTextEditorComponent>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setUserData({
                    ...userData,
                    projects: [...userData.projects, { name: "", link: "", techStack: "", description: "" }],
                  });
                }}
              >
                + Add Project
              </button>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Certifications</h3>
              <label htmlFor="certifications" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                Certifications (comma-separated)
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={userData.certifications.join(", ")}
                onChange={(e) => handleArrayChange(e, "certifications")}
                className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.certifications.map((cert, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-main-dark-bg dark:text-blue-300 text-blue-600 text-sm rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Years of Coding Experience and Job Search Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="years_of_experience" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Years of Coding Experience
                </label>
                <input
                  type="text"
                  id="years_of_experience"
                  name="years_of_experience"
                  value={userData.years_of_experience}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2-4 years"
                />
              </div>
              <div>
                <label htmlFor="job_search_status" className="block text-gray-700 font-semibold mb-2 dark:text-gray-100">
                  Job Search Status
                </label>
                <select
                  id="job_search_status"
                  name="job_search_status"
                  value={userData.job_search_status}
                  onChange={handleChange}
                  className="w-full p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Passive">Passive</option>
                </select>
              </div>
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditProfile;