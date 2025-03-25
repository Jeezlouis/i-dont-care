import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCards from "../components/JobCard";
import Loader from "../components/Loader";
import JobDetails from "../components/JobDetails"; // Import the JobDetails component
import { BsArrowLeft } from "react-icons/bs"; // Import the back arrow icon
import { apiRequest } from "./features/auth/auth";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null); // State to track the selected job
  const [showDetails, setShowDetails] = useState(false); // State to toggle job details view

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/saved-jobs/');
        setSavedJobs(data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSavedJobs();
  }, []);

  const handleCardClick = (job) => {
    setSelectedJob(job); // Set the selected job
    setShowDetails(true); // Show the job details section
  };

  const handleBackClick = () => {
    setShowDetails(false); // Hide the job details section
  };

  const handleUnsaveJob = async (jobId) => {
    try {
      await apiRequest('delete', `http://127.0.0.1:8000/saved-jobs/${jobId}/`);
      const updatedSavedJobs = savedJobs.filter((job) => job.id !== jobId);
      setSavedJobs(updatedSavedJobs);
      if (selectedJob && selectedJob.id === jobId) {
        setSelectedJob(null);
        setShowDetails(false);
      }
      alert("Job unsaved successfully!");
    } catch (error) {
      console.error("Error unsaving job:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 main-bg dark:bg-main-dark-bg min-h-screen relative dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Saved Jobs
      </h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen dark:bg-secondary-dark-bg">
          <Loader />
        </div>
      ) : savedJobs.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Job List (Left) - Scrolls with the page */}
          <div className={`w-full md:w-[35%] pr-4 ${showDetails ? "hidden md:block" : ""}`}>
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="cursor-pointer"
                onClick={() => handleCardClick(job)}
              >
                <JobCards
                  className={`rounded-2xl ${selectedJob === job ? "border-2 border-gray-600 dark:border-gray-400" : ""}`}
                  id={job.id}
                  logo={job.logo || "https://via.placeholder.com/150"}
                  title={job.title || "Software Engineer"}
                  companyName={job.company || "Tech Corp"}
                  location={job.location || "Remote"}
                  duration={job.duration || "6 months"}
                  qualifications={job.qualifications || "Bachelor's Degree"}
                  type={job.type || "Permanent"}
                  skills={job.skills?.join(", ") || "React, Node.js"}
                  days={job.days || "Recently Saved"}
                  onUnsave={() => handleUnsaveJob(job.id)} // Add unsave functionality
                />
              </div>
            ))}
          </div>

          {/* Job Details (Right) - Fixed Position */}
          <div className={`w-full md:w-[65%] h-screen sticky top-0 pl-4 dark:bg-main-dark-bg ${showDetails ? "" : "hidden md:block"}`}>
            {showDetails && (
              <button
                onClick={handleBackClick}
                className={`mb-4 px-4 flex text-black rounded-lg text-center text-xl hover:underline capitalize transition duration-300 ${showDetails ? "md:hidden" : ""}`}
              >
                <BsArrowLeft className="mr-2 mt-1" />
                Back to Saved Jobs
              </button>
            )}
            {selectedJob ? (
              <JobDetails
                id={selectedJob.id}
                logo={selectedJob.logo}
                title={selectedJob.title}
                companyName={selectedJob.company}
                description={selectedJob.description}
                location={selectedJob.location}
                duration={selectedJob.duration}
                qualifications={selectedJob.qualifications}
                type={selectedJob.type}
                skills={selectedJob.skills?.join(", ")}
                salary={selectedJob.salary}
                size={selectedJob.size}
                companyType={selectedJob.company_type}
                sector={selectedJob.sector}
                founded={selectedJob.founded}
                industry={selectedJob.industry}
                revenue={selectedJob.revenue}
                benefits={selectedJob.benefits}
                deadline={selectedJob.deadline}
                hiringProcess={selectedJob.hiring_process}
                redirectToCompanyPage={selectedJob.redirect_to_company_page}
                applicationUrl={selectedJob.application_url}
                onUnsave={() => handleUnsaveJob(selectedJob.id)} // Add unsave functionality
              />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-300">No job selected</div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center py-20">
          No saved jobs yet.
        </p>
      )}
    </div>
  );
};

export default SavedJobs;