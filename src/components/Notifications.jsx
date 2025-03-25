import React, { useState } from "react";
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const Notifications = ({ userType }) => {
  const [notifications, setNotifications] = useState(
    userType === "student"
      ? [
          { id: 1, message: "New internship matches available.", type: "info" },
          { id: 2, message: "Your application status was updated.", type: "success" },
          { id: 3, message: "Upcoming interview scheduled tomorrow.", type: "warning" },
        ]
      : [
          { id: 1, message: "New application received from John Doe.", type: "info" },
          { id: 2, message: "Message from Jane Smith regarding the internship.", type: "info" },
          { id: 3, message: "Interview with Alice Johnson is scheduled for tomorrow.", type: "warning" },
        ]
  );

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "warning":
        return <FaExclamationCircle className="text-yellow-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <FaBell className="mr-2" /> Notifications
      </h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600 text-center">No new notifications.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {getIcon(notification.type)}
                <span className="text-gray-800">{notification.message}</span>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="text-sm text-red-500 hover:text-red-600 hover:underline"
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;