import React, { useState } from "react";
import axios from "axios";
import { RichTextEditorComponent, Inject, Toolbar, Image, Link, HtmlEditor } from "@syncfusion/ej2-react-richtexteditor";

const commonSkills = [
  "React", "Angular", "Vue", "Node.js", "Python", "Django", "Flask", "Java", "Spring Boot", "C#", "ASP.NET", "Ruby on Rails", "Go", "Swift", "Kotlin", "Flutter", "SQL", "NoSQL", "GraphQL", "Docker"
];
import { apiRequest } from "./features/auth/auth";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    qualifications: "",
    type: "",
    skills: [], // Store skills as an array
    salary: "",
    size: "",
    companyType: "",
    sector: "",
    founded: "",
    industry: "",
    revenue: "",
    benefits: "",
    deadline: "",
    hiringProcess: "",
    redirectToCompanyPage: false,
    applicationUrl: "",
  });

  const [inputSkill, setInputSkill] = useState(""); // For custom skill input
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [error, setError] = useState(""); // Error message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData({
      ...jobData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillSelect = (skill) => {
    // Add skill to the list if it's not already selected
    if (!jobData.skills.includes(skill)) {
      setJobData({ ...jobData, skills: [...jobData.skills, skill] });
    }
  };

  const handleRemoveSkill = (skill) => {
    // Remove skill from the list
    setJobData({ ...jobData, skills: jobData.skills.filter((s) => s !== skill) });
  };

  const handleInputSkill = (e) => {
    setInputSkill(e.target.value);
  };

  const handleAddSkill = () => {
    if (inputSkill.trim() && !jobData.skills.includes(inputSkill.trim())) {
      setJobData({ ...jobData, skills: [...jobData.skills, inputSkill.trim()] });
      setInputSkill(""); // Clear input field
    }
  };

  const handleRTEChange = (e) => {
    setJobData({ ...jobData, description: e.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiRequest('post', 'http://127.0.0.1:8000/jobs/', jobData);
      alert("Job posted successfully!");
      setJobData({
        title: "", description: "", location: "", duration: "", qualifications: "", type: "",
        skills: [], salary: "", size: "", companyType: "", sector: "", founded: "", industry: "",
        revenue: "", benefits: "", deadline: "", hiringProcess: "", redirectToCompanyPage: false,
        applicationUrl: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 main-bg dark:bg-main-dark-bg p-6 dark:text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Post a New Job</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-secondary-dark-bg p-8 rounded-lg shadow-lg">
        {/* Job Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 dark:text-white font-semibold mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job title"
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 dark:text-white font-semibold mb-2">
            Job Description
          </label>
          <RichTextEditorComponent
            id="description"
            value={jobData.description}
            change={handleRTEChange}
            className="richtext-editor"
          >
            <Inject services={[Toolbar, Image, Link, HtmlEditor]} />
          </RichTextEditorComponent>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label htmlFor="location" className="block text-gray-700 dark:text-white font-semibold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job location"
            required
          />
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label htmlFor="duration" className="block text-gray-700 dark:text-white font-semibold mb-2">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={jobData.duration}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job duration (e.g., 3 months)"
            required
          />
        </div>

        {/* Qualifications */}
        <div className="mb-6">
          <label htmlFor="qualifications" className="block text-gray-700 dark:text-white font-semibold mb-2">
            Qualifications
          </label>
          <input
            type="text"
            id="qualifications"
            name="qualifications"
            value={jobData.qualifications}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter required qualifications"
            required
          />
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <label htmlFor="type" className="block text-gray-700 dark:text-white font-semibold mb-2">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            value={jobData.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select job type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-white font-semibold mb-2">Select Required Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {commonSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  jobData.skills.includes(skill)
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 dark:bg-gray-700 dark:text-blue-300 text-blue-600"
                }`}
                onClick={() => handleSkillSelect(skill)}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Selected Skills */}
          <div className="flex flex-wrap gap-2 mb-2">
            {jobData.skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-gray-700 dark:text-blue-300 text-blue-600 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add Custom Skill */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputSkill}
              onChange={handleInputSkill}
              className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a custom skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Salary */}
        <div className="mb-6">
          <label htmlFor="salary" className="block text-gray-700 dark:text-white font-semibold mb-2">Salary</label>
          <input type="text" id="salary" name="salary" value={jobData.salary} onChange={handleChange} className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g., $10,000 - $30,000" required />
        </div>

        {/* Industry */}
        <div className="mb-6">
          <label htmlFor="industry" className="block text-gray-700 dark:text-white font-semibold mb-2">Industry</label>
          <input type="text" id="industry" name="industry" value={jobData.industry} onChange={handleChange} className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g., Software Development, Banking, etc." required />
        </div>

        {/* Deadline */}
        <div className="mb-6">
          <label htmlFor="deadline" className="block text-gray-700 dark:text-white font-semibold mb-2">Application Deadline</label>
          <input type="date" id="deadline" name="deadline" value={jobData.deadline} onChange={handleChange} className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        {/* Hiring Process */}
        <div className="mb-6">
          <label htmlFor="hiringProcess" className="block text-gray-700 dark:text-white font-semibold mb-2">Hiring Process</label>
          <input type="text" id="hiringProcess" name="hiringProcess" value={jobData.hiringProcess} onChange={handleChange} className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g., 3 rounds of interviews" required />
        </div>

        {/* Redirect to Company Page */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-white font-semibold mb-2">
            <input
              type="checkbox"
              name="redirectToCompanyPage"
              checked={jobData.redirectToCompanyPage}
              onChange={handleChange}
              className="mr-2"
            />
            Redirect applicants to company's page
          </label>
        </div>

        {/* Application URL (Conditional) */}
        {jobData.redirectToCompanyPage && (
          <div className="mb-6">
            <label htmlFor="applicationUrl" className="block text-gray-700 dark:text-white font-semibold mb-2">
              Application URL
            </label>
            <input
              type="url"
              id="applicationUrl"
              name="applicationUrl"
              value={jobData.applicationUrl}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter application URL"
              required
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 text-red-500 text-center">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Posting Job..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;