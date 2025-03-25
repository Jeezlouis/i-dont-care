import React from "react";
import { FaStar } from "react-icons/fa";

const InternDetails = ({
  id,
  name,
  university,
  location,
  skills,
  startDate,
  duration,
  logo,
  rating,
  bio,
  email,
  phone,
  education = [],
  experience = [],
  projects = [],
  certifications = [],
  links = {},
}) => {
  // Function to render star ratings
  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <FaStar
  //         key={i}
  //         className={i <= rating ? "text-yellow-400" : "text-gray-300"}
  //       />
  //     );
  //   }
  //   return stars;
  // };
  const skillsArray = typeof skills === "string" ? skills.split(",").map(skill => skill.trim()) : Array.isArray(skills) ? skills : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col dark:text-white">
      {/* Main Content */}
      <main className="container mx-auto p-6 flex-1">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          {/* Header Section */}
          <div className="flex items-center space-x-6 border-b pb-6">
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-32 h-32 rounded-full border-4 border-blue-100 dark:border-gray-700"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{university}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {location}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Open for opportunities
              </p>
            </div>
          </div>

          {/* Links & Resume Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Links & Resume</h3>
            <div className="flex flex-col space-y-2">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  GitHub
                </a>
              )}
              {links.portfolio && (
                <a
                  href={links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  Portfolio
                </a>
              )}
              {links.resume && (
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  Upload Resume (PDF)
                </a>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Education</h3>
            {education.map((edu, idx) => (
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
            {experience.map((exp, idx) => (
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
            {projects.map((project, idx) => (
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
              {certifications.map((cert, idx) => (
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
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 dark:bg-gray-700 dark:text-blue-300 text-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Contact Information</h3>
            <div className="text-gray-700 dark:text-gray-300">
              <p>Email: <a href={`mailto:${email}`} className="underline">{email}</a></p>
              <p>Phone: <a href={`tel:${phone}`} className="underline">{phone}</a></p>
            </div>
          </div>

          {/* Rating Section */}
          {/* <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">Rating</h3>
            <div className="flex space-x-1">{renderStars(rating)}</div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default InternDetails;