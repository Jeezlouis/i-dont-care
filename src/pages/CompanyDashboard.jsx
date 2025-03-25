import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  Sort,
  Filter,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { apiRequest } from "./features/auth/auth";

const CompanyDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiRequest('get', '/dashboard/');
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="text-center py-20">Failed to load dashboard data.</div>;
  }

  const {
    company_name,
    total_interns,
    active_postings,
    applications_received,
    pending_interviews,
    applications_trend,
    internship_matches,
    skill_distribution,
    recent_applications,
  } = dashboardData;

  // Filter recent applications based on search query
  const filteredApplications = recent_applications.filter(
    (app) =>
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.candidate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-main-bg dark:bg-main-dark-bg">
      {/* Main Content */}
      <div className="flex-1">
        <div className="pb-6">
          <h2 className="text-2xl font-bold dark:text-gray-200">Dashboard</h2>
        </div>

        <main className="container mx-auto p-6 space-y-8">
          {/* Metrics Section */}
          <section className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">Hello, {company_name}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Link to="/company/interns">
                <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition-shadow">
                  <p className="text-gray-600">Total Interns</p>
                  <p className="text-2xl font-bold text-green-600">{total_interns}</p>
                </div>
              </Link>
              <Link to="/company/manage-lobs">
                <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition-shadow">
                  <p className="text-gray-600">Active Postings</p>
                  <p className="text-2xl font-bold text-green-600">{active_postings}</p>
                </div>
              </Link>
              <Link to="/company/applicants">
                <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition-shadow">
                  <p className="text-gray-600">Applications Received</p>
                  <p className="text-2xl font-bold text-green-600">{applications_received}</p>
                </div>
              </Link>
              <Link to="/company/interviews">
                <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition-shadow">
                  <p className="text-gray-600">Pending Interviews</p>
                  <p className="text-2xl font-bold text-green-600">{pending_interviews}</p>
                </div>
              </Link>
            </div>

            {/* Applications Trend Chart */}
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Applications Trend</h2>
              <ChartComponent
                id="line-chart"
                primaryXAxis={{ valueType: "Category" }}
                tooltip={{ enable: true }}
              >
                <Inject services={[LineSeries, Legend, Tooltip, Category]} />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={applications_trend}
                    xName="month"
                    yName="applications"
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
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Internship Matches by Industry</h2>
              <ChartComponent
                id="column-chart"
                primaryXAxis={{ valueType: "Category" }}
                tooltip={{ enable: true }}
              >
                <Inject services={[ColumnSeries, Legend, Tooltip, Category]} />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={internship_matches}
                    xName="industry"
                    yName="matches"
                    type="Column"
                  />
                </SeriesCollectionDirective>
              </ChartComponent>
            </div>
            <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Skill Distribution</h2>
              <AccumulationChartComponent
                id="pie-chart"
                legendSettings={{ visible: true }}
                tooltip={{ enable: true }}
              >
                <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip]} />
                <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective
                    dataSource={skill_distribution}
                    xName="skill"
                    yName="percentage"
                    type="Pie"
                  />
                </AccumulationSeriesCollectionDirective>
              </AccumulationChartComponent>
            </div>
          </section>

          {/* Recent Applications Section */}
          <section className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Recent Applications</h2>
            <GridComponent
              id="recent-applications-grid"
              dataSource={searchQuery ? filteredApplications : recent_applications}
              allowPaging={true}
              pageSettings={{ pageSize: 5 }}
              allowSorting={true}
              toolbar={["Search"]}
              width="auto"
              className="e-grid"
            >
              <ColumnsDirective>
                <ColumnDirective field="title" headerText="Title" width="150" textAlign="Left" />
                <ColumnDirective field="candidate" headerText="Candidate" width="150" />
                <ColumnDirective field="status" headerText="Status" width="120" />
                <ColumnDirective field="date_applied" headerText="Date Applied" width="150" />
                <ColumnDirective
                  headerText="Actions"
                  width="150"
                  textAlign="Center"
                  template={() => (
                    <div className="flex justify-center space-x-2">
                      <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Details
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Reject
                      </button>
                    </div>
                  )}
                />
              </ColumnsDirective>
              <GridInject services={[Page, Sort, Filter, Toolbar]} />
            </GridComponent>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;