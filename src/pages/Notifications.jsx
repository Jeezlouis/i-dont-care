import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { apiRequest } from "./features/auth/auth";

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from the backend API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/notifications/');
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNotifications();
  }, []);

  // Handle marking a notification as read
  const handleMarkAsRead = async () => {
    if (!selectedNotification) return;
    try {
      await apiRequest('patch', `http://127.0.0.1:8000/notifications/${selectedNotification.id}/`, { status: "read" });
      const updatedNotifications = notifications.map((n) =>
        n.id === selectedNotification.id ? { ...n, status: "read" } : n
      );
      setNotifications(updatedNotifications);
      setSelectedNotification({ ...selectedNotification, status: "read" });
      alert("Notification marked as read!");
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Handle deleting a notification
  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;
    try {
      await apiRequest('delete', `http://127.0.0.1:8000/notifications/${selectedNotification.id}/`);
      const updatedNotifications = notifications.filter((n) => n.id !== selectedNotification.id);
      setNotifications(updatedNotifications);
      setSelectedNotification(null);
      alert("Notification deleted!");
    } catch (error) {
      console.error("Error deleting notification:", error);
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
    return <div className="text-center py-20">Loading notifications...</div>;
  }

  return (
    <div className="m-10 bg-main-bg dark:bg-main-dark-bg">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Your Notifications</h1>

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
            dataSource={notifications}
            allowPaging={true}
            allowSorting={true}
            allowFiltering={true}
            rowSelected={(args) => setSelectedNotification(args.data)}
            height="400px"
          >
            <ColumnsDirective>
              <ColumnDirective field="title" headerText="Title" width="150" />
              <ColumnDirective field="date" headerText="Date" width="150" format="yMd" />
              <ColumnDirective field="message" headerText="Message" width="300" />
              <ColumnDirective field="status" headerText="Status" width="100" />
              <ColumnDirective field="icon" headerText="Icon" width="100" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group, Toolbar]} />
          </GridComponent>
        </div>

        {/* Notification Details */}
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-md lg:col-span-1">
          {selectedNotification ? (
            <>
              <h2 className="text-xl font-semibold mb-4">{selectedNotification.title}</h2>
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
    </div>
  );
};

export default Notifications;