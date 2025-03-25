import React, { useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../components/Loader';
import { BsStars, BsArrowLeft } from "react-icons/bs";
import { useStateContext } from '../../../context/ContextProvider';
import { JobCard, Searchbar, JobDetails, SearchedJobs } from '../../../components';

// Fetch jobs for unauthenticated users
const fetchJobs = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/public/jobs/", {
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; // Ensure response is an array
    } else {
      console.error("Unexpected API response format:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching jobs:", error.response?.data || error.message);
    return [];
  }
};

const JobList = () => {
  const { loading, setLoading, setJobs, selectedJob, setSelectedJob, jobs, activeTab, setActiveTab, showDetails, setShowDetails } = useStateContext();

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      try {
        const data = await fetchJobs();
        setJobs(data);
        if (data.length > 0) setSelectedJob(data[0]); // Set the first job as default
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const handleSearch = (searchQuery, location) => {
    const filteredData = jobs.filter((job) => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );

    setJobs(filteredData);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen dark:bg-main-dark-bg"><Loader /></div>;
  }

  return (
    <div className="bg-main-bg dark:bg-main-dark-bg">
      <div className="code-section dark:main-dark-bg">
        <Searchbar onSearch={handleSearch} />
      </div>

      <div className="flex justify-center mt-4 border-b border-gray-300 dark:border-gray-700">
        {["for-you", "search"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg font-medium hover:border-b-4 mx-2 hover:border-gray-400 transition duration-300
              ${activeTab === tab ? "border-b-4 border-blue-600 dark:border-blue-400" : "text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "for-you" && <BsStars className="inline-block mr-2" />}
            {tab.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="flex px-10 mt-4 gap-6">
        {activeTab === "for-you" && (
          <div className="w-full flex flex-col md:flex-row">
            <div className={`w-full md:w-[35%] pr-4 ${showDetails ? 'hidden md:block' : ''}`}>
              {jobs.map((job) => (
                <div key={job.id} className="cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <JobCard
                    className={`rounded-2xl ${selectedJob === job ? 'border-2 border-gray-600 dark:border-gray-400' : ''}`}
                    id={job.id}
                    title={job.title || 'Software Engineer'}
                    companyName={job.company || 'Tech Corp'}
                    location={job.location || 'Remote'}
                    duration={job.duration || '6 months'}
                    qualifications={job.qualifications || "Bachelor's Degree"}
                    type={job.type || 'Permanent'}
                    skills={job.skills?.join(', ') || "React, Node.js"}
                    days={job.days || '18d'}
                  />
                </div>
              ))}
            </div>

            <div className={`w-full md:w-[65%] h-screen sticky top-0 pl-4 dark:bg-main-dark-bg ${showDetails ? '' : 'hidden md:block'}`}>
              {showDetails && (
                <button onClick={() => setShowDetails(false)} className="mb-4 px-4 flex text-black rounded-lg text-center text-xl hover:underline capitalize transition duration-300 md:hidden">
                  <BsArrowLeft className='mr-2 mt-1' /> Back to for you
                </button>
              )}
              {selectedJob ? (
                <JobDetails {...selectedJob} />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-300">No job selected</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "search" && <SearchedJobs />}
      </div>
    </div>
  );
};

export default JobList;
