import React, { useEffect } from 'react';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { useStateContext } from '../context/ContextProvider';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { JobCard, JobDetails, Loader } from '.'
import axios from 'axios';

const fetchJobs = async () => {
    const options = {
        method: 'GET',
        url: 'https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api',
        headers: {
            'x-rapidapi-key': 'e6d9012bc3msh9084b8662391d80p19945ajsn1beda3e72129',
            'x-rapidapi-host': 'arbeitnow-free-job-board.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const SearchedJobs = () => {
    const { loading, setLoading, setJobs, selectedJob, setSelectedJob, jobs, showDetails, setShowDetails, filterOpener, setFilterOpener,
        ratingOpener, setRatingOpener, dateOpener, setDateOpener, stipendOpener, setStipendOpener,
        locationOpener, setLocationOpener, experienceOpener, setExperienceOpener,
    } = useStateContext();

    useEffect(() => {
        const getJobs = async () => {
            if (jobs.length > 0) return; // Avoid re-fetching if jobs are already loaded
            setLoading(true);
            try {
                const data = await fetchJobs();
                if (Array.isArray(data)) {
                    setJobs(data);
                    if (!selectedJob) setSelectedJob(data[0]); // Set first job only if not already set
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
    
        getJobs();
    }, [jobs, selectedJob]); // Add dependencies to avoid unnecessary re-fetches

    const closeAllDropdowns = () => {
        setFilterOpener(false);
        setRatingOpener(false);
        setDateOpener(false);
        setStipendOpener(false);
        setLocationOpener(false);
        setExperienceOpener(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                closeAllDropdowns();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen dark:bg-main-dark-bg"><Loader /></div>;
    }

    const handleCardClick = (job) => {
        setSelectedJob(job);
        setShowDetails(true);
    };

    const handleBackClick = () => {
        setShowDetails(false);
    };

    const toggleFilter = () => {
        closeAllDropdowns();
        setFilterOpener(!filterOpener);
    };

    const toggleRating = () => {
        closeAllDropdowns();
        setRatingOpener(!ratingOpener);
    };

    const toggleDate = () => {
        closeAllDropdowns();
        setDateOpener(!dateOpener);
    };

    const toggleStipend = () => {
        closeAllDropdowns();
        setStipendOpener(!stipendOpener);
    };

    const toggleLocation = () => {
        closeAllDropdowns();
        setLocationOpener(!locationOpener);
    };

    const toggleExperience = () => {
        closeAllDropdowns();
        setExperienceOpener(!experienceOpener);
    };

    const filters_design = 'px-6 py-2 cursor-pointer relative text-md font-medium capitalize rounded-3xl mx-2 bg-gray-200 hover:bg-gray-300 transition focus:outline-blue-200 duration-300 border-b-2 focus:border-blue-400';

    return (
        <div>
            <div className="flex mt-4 gap-6">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-1 p-4">
                    {/* General Filter */}
                    <a className={`${filters_design} flex items-center`} onClick={toggleFilter}>
                        Filter <PiSlidersHorizontalBold className="ml-2 text-lg" />
                    </a>

                    {/* Remote Jobs */}
                    <a className={`${filters_design} flex items-center`}>Remote Only</a>

                    {/* Smart Apply */}
                    <a className={`${filters_design} flex items-center`}>Smart Apply</a>

                    {/* Company Rating */}
                    <div className="relative dropdown">
                        <a className={`${filters_design} flex items-center justify-between min-w-[150px]`} onClick={toggleRating}>
                            Company Rating {ratingOpener ? <IoIosArrowUp className="ml-2 text-lg" /> : <IoIosArrowDown className="ml-2 text-lg" />}
                        </a>
                        {ratingOpener && (
                            <div className="absolute z-10 w-48 bg-white shadow-lg mt-2 rounded-md">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-md font-bold">Company Rating</h3>
                                    <button className="text-gray-600 text-xl" onClick={toggleRating}>
                                        <MdOutlineCancel />
                                    </button>
                                </div>
                                {["★ ★ ★ ★", "★ ★ ★", "★ ★", "★"].map((rating, index) => (
                                    <div key={index} className="py-3 px-4 hover:bg-gray-200 cursor-pointer">{rating}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date Posted */}
                    <div className="relative dropdown">
                        <a className={`${filters_design} flex items-center justify-between min-w-[150px]`} onClick={toggleDate}>
                            Date Posted {dateOpener ? <IoIosArrowUp className="ml-2 text-lg" /> : <IoIosArrowDown className="ml-2 text-lg" />}
                        </a>
                        {dateOpener && (
                            <div className="absolute z-10 w-48 bg-white shadow-lg mt-2 rounded-md">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-md font-bold">Date Posted</h3>
                                    <button className="text-gray-600 text-xl" onClick={toggleDate}>
                                        <MdOutlineCancel />
                                    </button>
                                </div>
                                {["Any Time", "Last Day", "Last 3 Days", "Last Week", "Last 2 Weeks", "Last Month"].map((date, index) => (
                                    <div key={index} className="py-3 px-4 hover:bg-gray-200 cursor-pointer">{date}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Location Filter */}
                    <div className="relative dropdown">
                        <a className={`${filters_design} flex items-center justify-between min-w-[150px]`} onClick={toggleLocation}>
                            Location {locationOpener ? <IoIosArrowUp className="ml-2 text-lg" /> : <IoIosArrowDown className="ml-2 text-lg" />}
                        </a>
                        {locationOpener && (
                            <div className="absolute z-10 w-48 bg-white shadow-lg mt-2 rounded-md">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-md font-bold">Location</h3>
                                    <button className="text-gray-600 text-xl" onClick={toggleLocation}>
                                        <MdOutlineCancel />
                                    </button>
                                </div>
                                {["On-Site", "Remote", "Hybrid"].map((location, index) => (
                                    <div key={index} className="py-3 px-4 hover:bg-gray-200 cursor-pointer">{location}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stipend Filter */}
                    <div className="relative dropdown">
                        <a className={`${filters_design} flex items-center justify-between min-w-[150px]`} onClick={toggleStipend}>
                            Stipend {stipendOpener ? <IoIosArrowUp className="ml-2 text-lg" /> : <IoIosArrowDown className="ml-2 text-lg" />}
                        </a>
                        {stipendOpener && (
                            <div className="absolute z-10 w-48 bg-white shadow-lg mt-2 rounded-md">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-md font-bold">Stipend</h3>
                                    <button className="text-gray-600 text-xl" onClick={toggleStipend}>
                                        <MdOutlineCancel />
                                    </button>
                                </div>
                                {["Paid", "Unpaid"].map((stipend, index) => (
                                    <div key={index} className="py-3 px-4 hover:bg-gray-200 cursor-pointer">{stipend}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Experience Level */}
                    <div className="relative dropdown">
                        <a className={`${filters_design} flex items-center justify-between min-w-[180px]`} onClick={toggleExperience}>
                            Experience Level {experienceOpener ? <IoIosArrowUp className="ml-2 text-lg" /> : <IoIosArrowDown className="ml-2 text-lg" />}
                        </a>
                        {experienceOpener && (
                            <div className="absolute z-10 w-48 bg-white shadow-lg mt-2 rounded-md">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-md font-bold">Experience Level</h3>
                                    <button className="text-gray-600 text-xl" onClick={toggleExperience}>
                                        <MdOutlineCancel />
                                    </button>
                                </div>
                                {["Entry Level", "Mid Level", "Senior Level"].map((exp, index) => (
                                    <div key={index} className="py-3 px-4 hover:bg-gray-200 cursor-pointer">{exp}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                {/* Job List (Left) - Scrolls with the page */}
                <div className={`w-full md:w-[35%] pr-4 ${showDetails ? 'hidden md:block' : ''}`}>
                    {jobs.map((job, index) => (
                        <div key={index} className="cursor-pointer" onClick={() => handleCardClick(job)}>
                            <JobCard
                                className={`rounded-2xl ${selectedJob === job ? 'border-2 border-gray-600 dark:border-gray-400' : ''}`}
                                key={job.id}
                                id={job.id}
                                title={job.title || 'Software Engineer'}
                                companyName={job.company || 'Tech Corp'}
                                location={job.location || 'Remote'}
                                duration={job.duration || '6 months'}
                                skills={job.skills?.join(', ') || "React, Node.js"}
                                days={job.days || '18d'}
                            />
                        </div>
                    ))}
                </div>

                {/* Job Details (Right) - Fixed Position */}
                <div className={`w-full md:w-[65%] h-screen sticky top-0 pl-4 dark:bg-main-dark-bg ${showDetails ? '' : 'hidden md:block'}`}>
                    {showDetails && (
                        <button onClick={handleBackClick} className={`mb-4 px-4 flex text-black rounded-lg text-center text-xl hover:underline capitalize transition duration-300 ${showDetails ? 'md:hidden' : ''}`}>
                            <BsArrowLeft className='mr-2 mt-1' />
                            Back to for you
                        </button>
                    )}
                    {selectedJob ? (
                        <JobDetails
                            logo={selectedJob.logo}
                            title={selectedJob.title}
                            companyName={selectedJob.company}
                            description={selectedJob.description}
                            location={selectedJob.location}
                            duration={selectedJob.duration}
                            qualifications={selectedJob.qualifications}
                            type={selectedJob.type}
                            skills={selectedJob.skills?.join(', ')}
                            salary={selectedJob.salary}
                            size={selectedJob.size}
                            companyType={selectedJob.company_type}
                            sector={selectedJob.sector}
                            founded={selectedJob.founded}
                            industry={selectedJob.industry}
                            revenue={selectedJob.revenue}
                        />
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-300">No job selected</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchedJobs;