import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/auth/forgot-password/", { email });
      toast.success("Reset instructions sent successfully!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send reset instructions.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6 md:p-10">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Forgot Password</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email address, and we'll send you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-md">
            Send Reset Instructions
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ForgotPassword;
