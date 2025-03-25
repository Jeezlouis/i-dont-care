import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject as ScheduleInject,
} from "@syncfusion/ej2-react-schedule";
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
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "./features/auth/auth";

const StudentInterviews = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch interviews data from the backend
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/interviews/');
        setInterviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInterviews();
  }, []);

  // Sample data for calendar events
  const scheduleData = interviews.map((interview) => ({
    Id: interview.id,
    Subject: `Interview for ${interview.position}`,
    StartTime: new Date(interview.date),
    EndTime: new Date(new Date(interview.date).getTime() + 60 * 60 * 1000), // 1 hour duration
    IsAllDay: false,
  }));

  // Handle interview selection
  const handleInterviewSelect = (args) => {
    setSelectedInterview(args.data);
  };

  // Handle interview actions
  const handleAcceptInterview = async () => {
    if (!selectedInterview) return;
    try {
      await apiRequest('patch', `http://127.0.0.1:8000/interviews/${selectedInterview.id}/`, { status: "Confirmed" });
      toast.success(`Interview confirmed: ${selectedInterview.interviewer}`);
      setSelectedInterview({ ...selectedInterview, status: "Confirmed" });
      const data = await apiRequest('get', 'http://127.0.0.1:8000/interviews/');
      setInterviews(data);
    } catch (error) {
      console.error("Error confirming interview:", error);
      toast.error("Failed to confirm interview.");
    }
  };

  const handleDeclineInterview = async () => {
    if (!selectedInterview) return;
    try {
      await apiRequest('patch', `http://127.0.0.1:8000/interviews/${selectedInterview.id}/`, { status: "Declined" });
      toast.error(`Interview declined: ${selectedInterview.interviewer}`);
      setSelectedInterview(null);
      const data = await apiRequest('get', 'http://127.0.0.1:8000/interviews/');
      setInterviews(data);
    } catch (error) {
      console.error("Error declining interview:", error);
      toast.error("Failed to decline interview.");
    }
  };

  const handleRescheduleInterview = () => {
    setShowDialog(true);
  };

  // Dialog buttons
  const dialogButtons = [
    {
      buttonModel: { content: "Reschedule", cssClass: "e-primary" },
      click: async () => {
        try {
          const newDate = document.querySelector(".e-datepicker").ej2_instances[0].value;
          const newTime = document.querySelector(".e-dropdownlist").ej2_instances[0].value;
          await apiRequest('patch', `http://127.0.0.1:8000/interviews/${selectedInterview.id}/`, { date: newDate, time: newTime });
          toast.success(`Interview rescheduled with ${selectedInterview.interviewer}`);
          setShowDialog(false);
          const data = await apiRequest('get', 'http://127.0.0.1:8000/interviews/');
          setInterviews(data);
        } catch (error) {
          console.error("Error rescheduling interview:", error);
          toast.error("Failed to reschedule interview.");
        }
      },
    },
    { buttonModel: { content: "Cancel" }, click: () => setShowDialog(false) },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="m-10 bg-gray-100 main-bg dark:bg-main-dark-bg min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">My Interviews</h1>

      {/* Interview Schedule */}
      <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Interview Schedule</h2>
        <ScheduleComponent
          height="500px"
          selectedDate={new Date(2023, 9, 15)}
          eventSettings={{ dataSource: scheduleData }}
        >
          <ScheduleInject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>

      {/* Interview List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md lg:col-span-2">
          <div className="mb-4">
            <DropDownListComponent
              dataSource={["All", "Scheduled", "Pending Confirmation", "Completed"]}
              placeholder="Filter by Status"
              className="w-full"
            />
          </div>
          <GridComponent
            dataSource={interviews}
            allowPaging={true}
            allowSorting={true}
            allowFiltering={true}
            rowSelected={handleInterviewSelect}
            height="400px"
          >
            <ColumnsDirective>
              <ColumnDirective field="interviewer" headerText="Interviewer" width="200" />
              <ColumnDirective field="position" headerText="Position" width="200" />
              <ColumnDirective field="date" headerText="Date" width="120" format="yMd" />
              <ColumnDirective field="time" headerText="Time" width="100" />
              <ColumnDirective field="status" headerText="Status" width="180" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Toolbar]} />
          </GridComponent>
        </div>

        {/* Interview Details */}
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md lg:col-span-1">
          {selectedInterview ? (
            <>
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">{selectedInterview.interviewer}</h2>
              <div className="space-y-4 dark:text-light-gray">
                <p><strong>Position:</strong> {selectedInterview.position}</p>
                <p><strong>Date:</strong> {selectedInterview.date}</p>
                <p><strong>Time:</strong> {selectedInterview.time}</p>
                <p><strong>Status:</strong> {selectedInterview.status}</p>
              </div>
              <div className="mt-6 space-y-4">
                <ButtonComponent cssClass="e-primary w-full" onClick={handleAcceptInterview}>Confirm Interview</ButtonComponent>
                <ButtonComponent cssClass="e-outline w-full" onClick={handleRescheduleInterview}>Reschedule</ButtonComponent>
                <ButtonComponent cssClass="e-danger w-full" onClick={handleDeclineInterview}>Decline</ButtonComponent>
              </div>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-300 text-center py-20">Select an interview to view details.</p>
          )}
        </div>
      </div>

      <DialogComponent header="Reschedule Interview" visible={showDialog} buttons={dialogButtons} close={() => setShowDialog(false)}>
        <DatePickerComponent placeholder="Select Date" className="w-full mb-4" />
        <DropDownListComponent dataSource={["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]} placeholder="Select Time" className="w-full" />
      </DialogComponent>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StudentInterviews;