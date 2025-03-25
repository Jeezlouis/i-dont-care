import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/auth/reset-password/", {
        uid: uidb64,
        token,
        new_password: newPassword,
      });
      toast.success("Password reset successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password.");
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6 md:p-10">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-md">
            Reset Password
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ResetPassword;