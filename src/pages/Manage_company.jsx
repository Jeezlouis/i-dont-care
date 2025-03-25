import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Sort,
  Filter,
  Page,
  Edit,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { FiEdit, FiTrash2, FiEye, FiPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for API calls
import { apiRequest } from "./features/auth/auth";

const Manage_company = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch jobs from the backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await apiRequest('get', '/jobs/');
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, []);

  // Handle edit action
  const handleEdit = (id) => {
    navigate(`/company/edit-job/${id}`); // Navigate to the edit job page
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await apiRequest('delete', `http://127.0.0.1:8000/jobs/${id}/`);
      setJobs(jobs.filter((job) => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again later.");
    }
  };

  // Handle view details action
  const handleViewDetails = (id) => {
    navigate(`/company/job-details/${id}`); // Navigate to the job details page
  };

  // Handle add new job action
  const handleAddJob = () => {
    navigate("/company/post-job"); // Navigate to the post job page
  };

  // Custom action buttons for the grid
  const actionTemplate = (props) => {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleViewDetails(props.id)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <FiEye className="text-blue-500" />
        </button>
        <button
          onClick={() => handleEdit(props.id)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <FiEdit className="text-green-500" />
        </button>
        <button
          onClick={() => handleDelete(props.id)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <FiTrash2 className="text-red-500" />
        </button>
      </div>
    );
  };

  // Custom template for job status
  const statusTemplate = (props) => {
    let textColor = "",
      bgColor = "",
      borderColor = "";
    const status = props.status.toLowerCase();
    if (status === "active") {
      textColor = "text-green-600";
      bgColor = "bg-green-100";
      borderColor = "border-green-600";
    } else if (status === "inactive") {
      textColor = "text-red-600";
      bgColor = "bg-red-100";
      borderColor = "border-red-600";
    }
    return (
      <div
        className={`inline-block px-3 py-1 border ${borderColor} ${bgColor} ${textColor} rounded-full text-sm font-semibold`}
      >
        {props.status}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-secondary-dark-bg">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 main-bg dark:bg-main-dark-bg min-h-screen dark:text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          List of All Posted Jobs
        </h1>
        <button
          onClick={handleAddJob}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <FiPlus /> Add New Job
        </button>
      </div>

      {/* Syncfusion Grid for Job Listings */}
      <div className="shadow-lg rounded bg-white dark:bg-secondary-dark-bg">
        <GridComponent
          dataSource={jobs}
          allowPaging={true}
          allowSorting={true}
          pageSettings={{ pageSize: 10 }}
          toolbar={["Search"]}
          editSettings={{ allowEditing: true, allowDeleting: true }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="ID"
              width="100"
              textAlign="Left"
              isPrimaryKey={true}
            />
            <ColumnDirective
              field="title"
              headerText="Job Title"
              width="150"
              textAlign="Left"
            />
            <ColumnDirective
              field="location"
              headerText="Location"
              width="150"
              textAlign="Left"
            />
            <ColumnDirective
              field="type"
              headerText="Job Type"
              width="120"
              textAlign="Left"
            />
            <ColumnDirective
              field="postedDate"
              headerText="Posted Date"
              width="120"
              textAlign="Left"
              format="yMd"
            />
            <ColumnDirective
              field="status"
              headerText="Status"
              width="100"
              textAlign="Left"
              template={statusTemplate}
            />
            <ColumnDirective
              headerText="Actions"
              width="150"
              textAlign="Center"
              template={actionTemplate}
            />
          </ColumnsDirective>
          <Inject services={[Selection, Sort, Filter, Page, Edit, Toolbar]} />
        </GridComponent>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Manage_company;