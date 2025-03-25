import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./Styles/App.css";
import {
  Home, Applications, Contact, Companies, Company, CompanyDashboard, EmployerProfile, EditProfile, Internships,
  NotFound, Notifications, PostJob, UserProfile, ForgotPassword, SignUp, StudentDashboard, Login,
  JobList, CompanyLayout, StudentLayout, Terms, EditCompanyProfile,
  Interns, Analytics_and_Reports, Interviews, Manage_company, Students_applications,
  CompanyNotifications, StudentInterviews, SavedJobs, ResetPassword,
} from "./pages";
import { Navbar } from "./components";
import { useStateContext } from "./context/ContextProvider";
import Cookies from "js-cookie";

const AdminRoutes = () => (
  <CompanyLayout>
    <Outlet />
  </CompanyLayout>
);

const UserRoutes = () => (
  <StudentLayout>
    <Outlet />
  </StudentLayout>
);

const ProtectedRoute = ({ requiredRole, children }) => {
  const { auth } = useStateContext();
  const token = Cookies.get("access_token");

  if (auth.loading) return <div>Loading...</div>;
  if (!auth.isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && auth.user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const OAuthCallback = ({ provider }) => {
  const navigate = useNavigate();
  const { setAuth } = useStateContext();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const role = searchParams.get("role");
    console.log(`OAuthCallback (${provider}) - role from query:`, role);
    if (role) {
      setAuth({ isAuthenticated: true, role, user: { role }, loading: false });
      navigate(role === "student" ? "/student/edit-profile" : "/company/edit-profile");
    } else {
      navigate("/login");
    }
  }, [navigate, provider, setAuth, searchParams]);

  return <div>Loading...</div>;
};

const App = () => {
  const { authState, currentMode } = useStateContext();
  console.log("App render - authState:", authState);

  const shouldHideNavbar = (pathname) =>
    ["/login", "/sign-up", "/forgot-password", "/reset-password"].includes(pathname) ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/company");


  return (
    <div className={currentMode === "dark" ? "dark" : ""}>
      <Router>
        <NavbarWrapper shouldHideNavbar={shouldHideNavbar}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/google-callback" element={<OAuthCallback provider="google" />} />
            <Route path="/github-callback" element={<OAuthCallback provider="github" />} />

            {/* Student Routes */}
            <Route path="/student" element={<UserRoutes />}>
              <Route path="dashboard" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute requiredRole="student"><UserProfile /></ProtectedRoute>} />
              <Route path="applications" element={<ProtectedRoute requiredRole="student"><Applications /></ProtectedRoute>} />
              <Route path="edit-profile" element={<ProtectedRoute requiredRole="student"><EditProfile /></ProtectedRoute>} />
              <Route path="companies" element={<ProtectedRoute requiredRole="student"><Company /></ProtectedRoute>} />
              <Route path="internships" element={<ProtectedRoute requiredRole="student"><Internships /></ProtectedRoute>} />
              <Route path="interviews" element={<ProtectedRoute requiredRole="student"><StudentInterviews /></ProtectedRoute>} />
              <Route path="notifications" element={<ProtectedRoute requiredRole="student"><Notifications /></ProtectedRoute>} />
              <Route path="saved-jobs" element={<ProtectedRoute requiredRole="student"><SavedJobs /></ProtectedRoute>} />
            </Route>

            {/* Company Routes */}
            <Route path="/company" element={<AdminRoutes />}>
              <Route path="dashboard" element={<ProtectedRoute requiredRole="company"><CompanyDashboard /></ProtectedRoute>} />
              <Route path="post-job" element={<ProtectedRoute requiredRole="company"><PostJob /></ProtectedRoute>} />
              <Route path="company-profile" element={<ProtectedRoute requiredRole="company"><EmployerProfile /></ProtectedRoute>} />
              <Route path="edit-profile" element={<ProtectedRoute requiredRole="company"><EditCompanyProfile /></ProtectedRoute>} />
              <Route path="interns" element={<ProtectedRoute requiredRole="company"><Interns /></ProtectedRoute>} />
              <Route path="analytics-and-reports" element={<ProtectedRoute requiredRole="company"><Analytics_and_Reports /></ProtectedRoute>} />
              <Route path="interviews" element={<ProtectedRoute requiredRole="company"><Interviews /></ProtectedRoute>} />
              <Route path="manage-company" element={<ProtectedRoute requiredRole="company"><Manage_company /></ProtectedRoute>} />
              <Route path="applicants" element={<ProtectedRoute requiredRole="company"><Students_applications /></ProtectedRoute>} />
              <Route path="notifications" element={<ProtectedRoute requiredRole="company"><CompanyNotifications /></ProtectedRoute>} />
            </Route>

            {/* Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NavbarWrapper>
      </Router>
    </div>
  );
};

const NavbarWrapper = ({ shouldHideNavbar, children }) => {
  const location = useLocation();
  return (
    <>
      {!shouldHideNavbar(location.pathname) && (
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full">
          <Navbar />
        </div>
      )}
      {children}
    </>
  );
};

export default App;