import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "./auth";
import Cookies from "js-cookie";
import { useStateContext } from "../../../context/ContextProvider";

const SignUp = () => {
  const navigate = useNavigate();
  const { setAuth } = useStateContext();
  const [userType, setUserType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

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
      username: e.target.email.value.trim().toLowerCase(),
      email: e.target.email.value.trim().toLowerCase(),
      password: e.target.password.value,
      confirm_password: e.target.confirmPassword.value,
      role: userType,
      ...(userType === "student" && {
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        university: e.target.university.value,
        course_of_study: e.target.course.value,
      }),
      ...(userType === "company" && {
        company_name: e.target.companyName.value,
        industry: e.target.industry.value,
      }),
    };

    // Basic client-side validation
    if (!formData.email || !formData.password || !formData.confirm_password) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (userType === "student" && (!formData.first_name || !formData.last_name)) {
      toast.error("First name and last name are required for students.");
      setIsSubmitting(false);
      return;
    }

    if (userType === "company" && !formData.company_name) {
      toast.error("Company name is required for companies.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting registration form with data:", formData);
      const response = await apiRequest("post", "/auth/register/", formData);
      console.log("Registration API response:", response);

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

        toast.success("Sign up successful!");

        // Redirect based on role
        const role = response.user.role;
        if (role === "student") {
          navigate("/student/edit-profile");
        } else if (role === "company") {
          navigate("/company/edit-profile");
        } else {
          console.warn("Unexpected role:", role);
          navigate("/dashboard");
        }
      } else {
        throw new Error("No access token received from server.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(" ") || 
                          "Registration failed. Please check your details and try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Sign Up
        </h1>

        <AnimatePresence mode="wait">
          {!userType ? (
            <motion.div
              key="userTypeSelection"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType("student")}
                className="bg-white p-8 rounded-lg border-2 border-blue-200 hover:border-blue-500 cursor-pointer transition-all flex flex-col items-center justify-center text-center"
              >
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Student</h2>
                <p className="text-gray-600">
                  Sign up as a student to find internships and kickstart your career.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType("company")}
                className="bg-white p-8 rounded-lg border-2 border-blue-200 hover:border-blue-500 cursor-pointer transition-all flex flex-col items-center justify-center text-center"
              >
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Company</h2>
                <p className="text-gray-600">
                  Sign up as a company to post internships and find talented candidates.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="registrationForm"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {userType === "student" ? "Student Sign Up" : "Company Sign Up"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {userType === "student" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Enter your first name"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Enter your last name"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

                {userType === "company" && (
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required
                      placeholder="Enter your company name"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your work email"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      minLength="8"
                      placeholder="Enter your password"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minLength="8"
                      placeholder="Confirm your password"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {userType === "student" ? (
                  <>
                    <div>
                      <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                        University
                      </label>
                      <input
                        type="text"
                        id="university"
                        name="university"
                        required
                        placeholder="Enter your university"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                        Course of Study
                      </label>
                      <input
                        type="text"
                        id="course"
                        name="course"
                        required
                        placeholder="Enter your course of study"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                        Industry
                      </label>
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        required
                        placeholder="Enter your industry"
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="/terms" className="text-blue-500 underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-md transition-colors ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>

                <div className="flex flex-col space-y-4 mt-6">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg shadow-md hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    <FcGoogle className="text-xl" />
                    Sign up with Google
                  </button>

                  <button
                    type="button"
                    onClick={handleGitHubAuth}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all disabled:opacity-50"
                  >
                    <AiFillGithub className="text-xl" />
                    Sign up with GitHub
                  </button>
                </div>
              </form>

              <p className="text-center text-gray-600">
                Not {userType}?{" "}
                <button
                  onClick={() => setUserType(null)}
                  className="text-blue-500 underline hover:text-blue-600"
                  disabled={isSubmitting}
                >
                  Go Back
                </button>
              </p>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 underline hover:text-blue-600">
                  Log in
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;