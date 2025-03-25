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
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "./features/auth/auth";

const CompanyNotifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from the backend API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await apiRequest('get', '/notifications/');
        setNotificationsData(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Handle notification selection
  const handleNotificationSelect = (args) => {
    setSelectedNotification(args.data[0]); // Select the first notification in the selection
  };

  // Handle marking a notification as read
  const handleMarkAsRead = async () => {
    if (!selectedNotification) return;
  try {
    await apiRequest('patch', `/notifications/${selectedNotification.id}/`, { status: "Read" });
    const updatedData = notificationsData.map((n) =>
      n.id === selectedNotification.id ? { ...n, status: "Read" } : n
    );
    setNotificationsData(updatedData);
    setSelectedNotification({ ...selectedNotification, status: "Read" });
    toast.success("Notification marked as read");
  } catch (error) {
    console.error("Error marking notification as read:", error);
    toast.error("Failed to mark notification as read.");
  }
};

  // Handle deleting a notification
  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;
  try {
    await apiRequest('delete', `/notifications/${selectedNotification.id}/`);
    const updatedData = notificationsData.filter((n) => n.id !== selectedNotification.id);
    setNotificationsData(updatedData);
    setSelectedNotification(null);
    toast.success("Notification deleted successfully");
  } catch (error) {
    console.error("Error deleting notification:", error);
    toast.error("Failed to delete notification.");
  }
};

  // Handle taking action (e.g., view application, reply to message)
  const handleTakeAction = () => {
    setShowDialog(true);
  };

  // Dialog buttons
  const dialogButtons = [
    {
      buttonModel: {
        content: "Confirm",
        cssClass: "e-primary",
      },
      click: () => {
        alert(`Action taken for: ${selectedNotification.message}`);
        setShowDialog(false);
      },
    },
    {
      buttonModel: {
        content: "Cancel",
      },
      click: () => setShowDialog(false),
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
    <div className="m-10 bg-main-bg dark:bg-main-dark-bg">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Company Notifications</h1>

      {/* Notifications List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md lg:col-span-2">
          <div className="mb-4">
            <DropDownListComponent
              dataSource={["All", "Unread", "Read"]}
              placeholder="Filter by Status"
              className="w-full"
            />
          </div>
          <GridComponent
            dataSource={notificationsData}
            allowPaging={true}
            allowSorting={true}
            allowFiltering={true}
            rowSelected={handleNotificationSelect}
            height="400px"
          >
            <ColumnsDirective>
              <ColumnDirective field="type" headerText="Type" width="150" />
              <ColumnDirective field="date" headerText="Date" width="150" format="yMd" />
              <ColumnDirective field="message" headerText="Message" width="300" />
              <ColumnDirective field="status" headerText="Status" width="100" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Toolbar]} />
          </GridComponent>
        </div>

        {/* Notification Details */}
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md lg:col-span-1">
          {selectedNotification ? (
            <>
              <h2 className="text-xl font-semibold mb-4">{selectedNotification.type}</h2>
              <div className="space-y-4">
                <p><strong>Date:</strong> {selectedNotification.date}</p>
                <p><strong>Message:</strong> {selectedNotification.message}</p>
                <p><strong>Status:</strong> {selectedNotification.status}</p>
              </div>
              <div className="mt-6 space-y-4">
                <ButtonComponent
                  cssClass="e-primary w-full"
                  onClick={handleTakeAction}
                >
                  Take Action
                </ButtonComponent>
                <ButtonComponent
                  cssClass="e-outline w-full"
                  onClick={handleMarkAsRead}
                >
                  Mark as Read
                </ButtonComponent>
                <ButtonComponent
                  cssClass="e-danger w-full"
                  onClick={handleDeleteNotification}
                >
                  Delete Notification
                </ButtonComponent>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-20">Select a notification to view details.</p>
          )}
        </div>
      </div>

      {/* Take Action Dialog */}
      <DialogComponent
        header="Take Action"
        visible={showDialog}
        buttons={dialogButtons}
        closeOnEscape={true}
        showCloseIcon={true}
        close={() => setShowDialog(false)}
      >
        <div className="p-4">
          <p className="mb-4">What action would you like to take for this notification?</p>
          <DropDownListComponent
            dataSource={["View Application", "Reply to Message", "Reschedule Interview"]}
            placeholder="Select Action"
            className="w-full"
          />
        </div>
      </DialogComponent>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CompanyNotifications;