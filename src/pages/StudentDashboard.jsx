import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  ColumnSeries,
  Legend,
  Tooltip,
  Category,
} from "@syncfusion/ej2-react-charts";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  AccumulationLegend,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject as GridInject,
  Page,
  Selection, 
  Sort, 
  Filter, 
  Edit, 
  Toolbar
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../context/ContextProvider";
import { apiRequest } from "./features/auth/auth";

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalApplications: 0,
    internshipsSaved: 0,
    upcomingInterviews: 0,
    unreadNotifications: 0,
    applicationTrends: [],
    internshipMatches: [],
    skillDistribution: [],
    recommendedInternships: [],
    recentApplications: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInternships, setFilteredInternships] = useState([]);
  const { gridRef } = useStateContext();

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/dashboard/');
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);

  // Search and filter functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = dashboardData.recommendedInternships.filter(
      (internship) =>
        internship.title.toLowerCase().includes(query) ||
        internship.company.toLowerCase().includes(query) ||
        internship.location.toLowerCase().includes(query)
    );
    setFilteredInternships(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Templates for grid action cells
  const applyTemplate = () => (
    <button className="e-btn cap" style={{ minWidth: "80px", borderRadius: '50px' }}>
      Apply Now
    </button>
  );

  const recentTemplate = () => (
    <div className="flex space-x-2">
      <button className="e-btn cap" style={{ minWidth: "80px", borderRadius: '50px' }}>
        View Details
      </button>
      <button className="e-btn capi" style={{ minWidth: "80px", borderRadius: '50px' }}>
        Withdraw
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-main-bg dark:bg-main-dark-bg flex">
      {/* Main Content */}
      <div className="flex-1">
        <div className="pb-6">
          <h2 className="text-2xl font-bold dark:text-gray-100">Dashboard</h2>
        </div>

        {/* Main Content */}
        <main className="container mx-auto p-6 space-y-8">
          {/* Welcome Section */}
          <section className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">Welcome back, {dashboardData.studentName}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Link to="/student/applications">
                <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold">{dashboardData.totalApplications}</p>
                </div>
              </Link>
              <Link to="/student/saved-jobs">
                <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-600">Internships Saved</p>
                  <p className="text-2xl font-bold">{dashboardData.internshipsSaved}</p>
                </div>
              </Link>
              <Link to="/student/interviews">
                <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-600">Upcoming Interviews</p>
                  <p className="text-2xl font-bold">{dashboardData.upcomingInterviews}</p>
                </div>
              </Link>
              <Link to="/student/notifications">
                <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-600">Unread Notifications</p>
                  <p className="text-2xl font-bold">{dashboardData.unreadNotifications}</p>
                </div>
              </Link>
            </div>
            {/* Application Trends Chart */}
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Application Trends</h2>
              <ChartComponent
                id="line-chart"
                primaryXAxis={{ valueType: "Category" }}
                tooltip={{ enable: true }}
              >
                <Inject services={[LineSeries, Legend, Tooltip, Category]} />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={dashboardData.applicationTrends}
                    xName="x"
                    yName="y"
                    type="Line"
                    marker={{ visible: true }}
                  />
                </SeriesCollectionDirective>
              </ChartComponent>
            </div>
          </section>

          {/* Internship Matches & Skill Distribution */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Internship Matches by Industry</h2>
              <ChartComponent
                id="column-chart"
                primaryXAxis={{ valueType: "Category" }}
                tooltip={{ enable: true }}
              >
                <Inject services={[ColumnSeries, Legend, Tooltip, Category]} />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={dashboardData.internshipMatches}
                    xName="x"
                    yName="y"
                    type="Column"
                  />
                </SeriesCollectionDirective>
              </ChartComponent>
            </div>
            <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Skill Distribution</h2>
              <AccumulationChartComponent
                id="pie-chart"
                legendSettings={{ visible: true }}
                tooltip={{ enable: true }}
              >
                <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip]} />
                <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective
                    dataSource={dashboardData.skillDistribution}
                    xName="x"
                    yName="y"
                    type="Pie"
                  />
                </AccumulationSeriesCollectionDirective>
              </AccumulationChartComponent>
            </div>
          </section>

          {/* Internship Search & Recommendations */}
          <section className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Internship Recommendations</h2>
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <GridComponent
              ref={gridRef}
              id="recommendations-grid"
              dataSource={searchQuery ? filteredInternships : dashboardData.recommendedInternships}
              allowPaging={true}
              allowSorting
              toolbar={['Delete']}
              editSettings={{ allowDeleting: true, allowEditing: true }}
              width='auto'
            >
              <ColumnsDirective>
                <ColumnDirective field="title" headerText="Title" width="150" textAlign="Left" />
                <ColumnDirective field="company" headerText="Company" width="120" />
                <ColumnDirective field="location" headerText="Location" width="120" />
                <ColumnDirective field="duration" headerText="Duration" width="100" />
                <ColumnDirective field="industry" headerText="Industry" width="100" />
                <ColumnDirective field="match" headerText="Match (%)" width="80" textAlign="Right" />
                <ColumnDirective headerText="Actions" width="120" textAlign="Center" template={applyTemplate} />
              </ColumnsDirective>
              <GridInject services={[Selection, Sort, Filter, Page, Edit, Toolbar]} />
            </GridComponent>
          </section>

          {/* Recent Applications */}
          <section className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Recent Applications</h2>
            <GridComponent
              ref={gridRef}
              id="applications-grid"
              dataSource={dashboardData.recentApplications}
              allowPaging={true}
              pageSettings={{ pageSize: 5 }}
            >
              <ColumnsDirective>
                <ColumnDirective field="title" headerText="Title" width="150" textAlign="Left" />
                <ColumnDirective field="company" headerText="Company" width="120" />
                <ColumnDirective field="status" headerText="Status" width="120" />
                <ColumnDirective field="position" headerText="Position" width="120" />
                <ColumnDirective field="dateApplied" headerText="Date Applied" width="120" />
                <ColumnDirective headerText="Actions" width="150" textAlign="Center" template={recentTemplate} />
              </ColumnsDirective>
              <GridInject services={[Selection, Sort, Filter, Page, Edit, Toolbar]} />
            </GridComponent>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;