import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { apiRequest } from "./auth";
import { useStateContext } from "../../../context/ContextProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth, auth } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isProduction = false;

  console.log("Login render - current authState:", auth);

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:8000/auth/google/login/";
  };

  const handleGitHubAuth = () => {
    window.location.href = "http://localhost:8000/auth/github/login/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      email: e.target.email.value.trim().toLowerCase(),
      password: e.target.password.value,
    };

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting login with:", formData);
      const response = await apiRequest("post", "/auth/login/", formData, false);
      console.log("Login response:", response);

      if (response.access && response.user) {
        const cookieOptions = {
          secure: false,
          sameSite: 'Lax',
          path: '/',
          expires: 7 // 7 days
          // Remove domain completely for localhost
        };
        
        Cookies.set('access_token', response.access, cookieOptions);
        Cookies.set('refresh_token', response.refresh, cookieOptions);
            await new Promise(resolve => setTimeout(resolve, 100));
        const newAuthState = {
          isAuthenticated: true,
          user: {
            id: response.user.id,
            email: response.user.email,
            role: response.user.role,
          },
          role: response.user.role,
          loading: false,
        };
        console.log("Setting authState:", newAuthState);
        setAuth(newAuthState);

        toast.success(response.message || "Login successful!");

        const role = response.user.role;
        if (role === "student") {
          console.log("Redirecting to /student/edit-profile");
          navigate("/student/edit-profile");
        } else if (role === "company") {
          console.log("Redirecting to /company/edit-profile");
          navigate("/company/edit-profile");
        } else {
          console.log("Redirecting to /dashboard");
          navigate("/dashboard");
        }
      } else {
        throw new Error("No access token or user data received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-h-screen p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg w-full max-w-4xl p-6 md:p-10 flex flex-col md:flex-row">
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-lg w-full md:w-1/2 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h2>
          <p className="text-lg font-medium text-center mb-6">
            Login to access your Internship Recruitment Platform account.
          </p>
          <Link
            to="/sign-up"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition-all"
          >
            Create New Account
          </Link>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-600 dark:text-gray-100"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength="8"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-600 dark:text-gray-100"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  name="remember"
                  className="mr-2 rounded border-gray-300 focus:ring focus:ring-blue-300"
                  disabled={isSubmitting}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-md transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="flex flex-col space-y-4 mt-6">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg shadow-md hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                <FcGoogle className="text-xl" />
                Login with Google
              </button>

              <button
                type="button"
                onClick={handleGitHubAuth}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all disabled:opacity-50"
              >
                <AiFillGithub className="text-xl" />
                Login with GitHub
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;