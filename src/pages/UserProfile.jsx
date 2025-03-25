import React, { useState, useEffect } from "react";
import profile from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "./features/auth/auth";

const UserProfile = () => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/profile/student/');
        setCandidate(data);
      } catch (error) {
        setError('Failed to fetch profile data.');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  }

  if (!candidate) {
    return <div className="flex justify-center items-center min-h-screen">No profile data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col dark:text-white">
      {/* Main Content */}
      <main className="container mx-auto p-6 flex-1">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 border-b pb-6">
            <img
              src={candidate.image || profile} // Fallback to default profile image
              alt="Candidate Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-100 dark:border-gray-700"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {candidate.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{candidate.email}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {candidate.location}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {candidate.job_search_status === "Active" ? "Open for opportunities" : "Not actively seeking opportunities"}
              </p>
            </div>
          </div>

          {/* Links & Resume Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Links & Resume</h3>
            <div className="flex flex-col space-y-2">
              {candidate.links?.github && (
                <a
                  href={candidate.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  GitHub
                </a>
              )}
              {candidate.links?.portfolio && (
                <a
                  href={candidate.links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  Portfolio
                </a>
              )}
              {candidate.links?.resume && (
                <a
                  href={candidate.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  Resume (PDF)
                </a>
              )}
              {candidate.links?.linkedin && (
                <a
                  href={candidate.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Education</h3>
            {candidate.education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-xl font-semibold dark:text-gray-100">
                  {edu.institution}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{edu.degree}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{edu.duration}</p>
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Experience</h3>
            {candidate.experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-xl font-semibold dark:text-gray-100">{exp.company}</h4>
                <p className="text-gray-700 dark:text-gray-300">{exp.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{exp.duration}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Projects</h3>
            {candidate.projects.map((project, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-xl font-semibold dark:text-gray-100">{project.title}</h4>
                <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-gray-700 dark:text-blue-300 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Certifications</h3>
            <ul className="list-disc list-inside">
              {candidate.certifications.map((cert, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300">
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 dark:bg-gray-700 dark:text-blue-300 text-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Years of Experience and Job Search Status */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  Years of Coding Experience
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{candidate.years_of_experience || "Not specified"}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  Job Search Status
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{candidate.job_search_status || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/user/edit-profile")}
            >
              Edit Profile
            </button>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => navigate("/user/internships")}
            >
              View Matching Jobs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;