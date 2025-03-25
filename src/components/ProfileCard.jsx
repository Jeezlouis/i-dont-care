import React from "react";

const ProfileCard = () => {
  // Dummy user data; replace with dynamic data as needed.
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Student",
    image: "/path/to/profile.jpg",
    stats: {
      applications: 12,
      saved: 5,
    },
  };

  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.image}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user.role}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-around border-t pt-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{user.stats.applications}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Applications</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{user.stats.saved}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Saved Internships</p>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Edit Profile
        </button>
        <button className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
          Settings
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;