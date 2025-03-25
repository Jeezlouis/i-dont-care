import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Group,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "./features/auth/auth";

const Applicants = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [interviewDate, setInterviewDate] = useState(null);
  const [applicantsData, setApplicantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statusOptions = [
    "All",
    "Pending",
    "Interview Scheduled",
    "Rejected",
    "Offer Sent",
  ];

  // Fetch applicants from the backend API
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/applicants/');
        setApplicantsData(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error("Failed to fetch applicants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchApplicants();
  }, []);

  // Handle applicant selection
  const handleApplicantSelect = (args) => {
    setSelectedApplicant(args.data[0]); // Select the first applicant in the selection
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilter = (args) => {
    setSelectedStatus(args.value);
  };

  // Filter applicants based on search query and status
  const filteredApplicants = applicantsData.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.skills.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || applicant.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle scheduling an interview
  const handleScheduleInterview = async () => {
    if (!selectedApplicant || !interviewDate) return;
    try {
      await apiRequest('patch', `http://127.0.0.1:8000/applicants/${selectedApplicant.id}/`, { status: "Interview Scheduled", interviewDate });
      const updatedData = applicantsData.map((applicant) =>
        applicant.id === selectedApplicant.id ? { ...applicant, status: "Interview Scheduled", interviewDate } : applicant
      );
      setApplicantsData(updatedData);
      setShowDialog(false);
      setInterviewDate(null);
      toast.success("Interview scheduled successfully");
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error("Failed to schedule interview. Please try again later.");
    }
  };

  // Handle rejecting an application
  const handleRejectApplication = async () => {
    if (!selectedApplicant) return;
    try {
      await apiRequest('patch', `http://127.0.0.1:8000/applicants/${selectedApplicant.id}/`, { status: "Rejected" });
      const updatedData = applicantsData.map((applicant) =>
        applicant.id === selectedApplicant.id ? { ...applicant, status: "Rejected" } : applicant
      );
      setApplicantsData(updatedData);
      setSelectedApplicant(null);
      toast.success("Application rejected successfully");
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Failed to reject application. Please try again later.");
    }
  };

  // Dialog buttons
  const dialogButtons = [
    {
      buttonModel: {
        content: "Schedule",
        cssClass: "e-primary",
      },
      click: handleScheduleInterview,
    },
    {
      buttonModel: {
        content: "Cancel",
      },
      click: () => {
        setShowDialog(false);
        setInterviewDate(null);
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-secondary-dark-bg">
        Loading...
      </div>
    );
  }

  return (
    <div className="m-10 bg-main-bg dark:bg-main-dark-bg min-h-screen dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Applicant Management</h1>

      {/* Search and Status Filter */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or skills..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-lg flex-grow dark:bg-secondary-dark-bg dark:text-white"
        />
        <DropDownListComponent
          dataSource={statusOptions}
          placeholder="Filter by Status"
          value={selectedStatus}
          change={handleStatusFilter}
          className="w-48 dark:bg-secondary-dark-bg dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applicant List */}
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md lg:col-span-2">
          <GridComponent
            dataSource={filteredApplicants}
            allowPaging={true}
            allowSorting={true}
            allowFiltering={true}
            rowSelected={handleApplicantSelect}
            height="400px"
          >
            <ColumnsDirective>
              <ColumnDirective field="name" headerText="Name" width="150" />
              <ColumnDirective field="status" headerText="Status" width="150" />
              <ColumnDirective
                field="applicationDate"
                headerText="Applied On"
                width="150"
                format="yMd"
              />
              <ColumnDirective
                field="interviewDate"
                headerText="Interview Date"
                width="150"
                format="yMd"
              />
              <ColumnDirective field="skills" headerText="Skills" width="200" />
              <ColumnDirective field="email" headerText="Email" width="200" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Toolbar]} />
          </GridComponent>
        </div>

        {/* Applicant Details */}
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md lg:col-span-1">
          {selectedApplicant ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {selectedApplicant.name}
              </h2>
              <div className="space-y-4">
                <p><strong>Status:</strong> {selectedApplicant.status}</p>
                <p><strong>Applied On:</strong> {selectedApplicant.applicationDate}</p>
                {selectedApplicant.interviewDate && (
                  <p><strong>Interview Date:</strong> {selectedApplicant.interviewDate}</p>
                )}
                <p><strong>Skills:</strong> {selectedApplicant.skills}</p>
                <p><strong>Email:</strong> {selectedApplicant.email}</p>
              </div>
              <div className="mt-6 space-y-4">
                <ButtonComponent
                  cssClass="e-primary w-full"
                  onClick={() => setShowDialog(true)}
                  disabled={selectedApplicant.status === "Rejected"}
                >
                  Schedule Interview
                </ButtonComponent>
                <ButtonComponent
                  cssClass="e-danger w-full"
                  onClick={handleRejectApplication}
                  disabled={selectedApplicant.status === "Rejected"}
                >
                  Reject Application
                </ButtonComponent>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-20">
              Select an applicant to manage
            </p>
          )}
        </div>
      </div>

      {/* Schedule Interview Dialog */}
      <DialogComponent
        header="Schedule Interview"
        visible={showDialog}
        buttons={dialogButtons}
        closeOnEscape={true}
        showCloseIcon={true}
        close={() => setShowDialog(false)}
      >
        <div className="p-4">
          <p className="mb-4">Select interview date for {selectedApplicant?.name}:</p>
          <DatePickerComponent
            placeholder="Select Date"
            className="w-full"
            min={new Date()}
            value={interviewDate}
            change={(args) => setInterviewDate(args.value)}
          />
        </div>
      </DialogComponent>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Applicants;