import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
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
import { FiMoreVertical } from "react-icons/fi"; // Import the icon
import { apiRequest } from "./features/auth/auth";

// Updated ThreeDotDropdown component with smooth transition and desired options
const ThreeDotDropdown = ({ rowData }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.stopPropagation();
    };

    if (dropdownRef.current) {
      dropdownRef.current.addEventListener("click", handleDropdownClick);
    }

    return () => {
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener("click", handleDropdownClick);
      }
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="focus:outline-none transition-colors duration-200 hover:text-gray-700"
      >
        <FiMoreVertical className="text-xl" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition transform duration-300 ease-in-out z-50">
          <div
            className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => {
              console.log(`View Details for ${rowData.id}`);
              setOpen(false);
            }}
          >
            View Details
          </div>
          <div
            className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white transition-colors"
            onClick={() => {
              console.log(`Withdraw ${rowData.id}`);
              setOpen(false);
            }}
          >
            Withdraw
          </div>
        </div>
      )}
    </div>
  );
};

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [applicationsData, setApplicationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef(null);

  // Fetch applications data from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await apiRequest('get', '/applications/');
        setApplicationsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Filter applications based on search query
  const filteredApplications = applicationsData.filter((app) =>
    app.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status template to style status values
  const statusTemplate = (props) => {
    let textColor = "",
      bgColor = "",
      borderColor = "";
    const status = props.status.toLowerCase();
    if (status === "accepted") {
      textColor = "text-green-600";
      bgColor = "bg-green-100";
      borderColor = "border-green-600";
    } else if (status === "rejected") {
      textColor = "text-red-600";
      bgColor = "bg-red-100";
      borderColor = "border-red-600";
    } else if (status === "under_review") {
      textColor = "text-yellow-600";
      bgColor = "bg-yellow-100";
      borderColor = "border-yellow-600";
    } else if (status === "applied") {
      textColor = "text-blue-600";
      bgColor = "bg-blue-100";
      borderColor = "border-blue-600";
    }

    return (
      <div
        className={`inline-block px-3 py-1 border ${borderColor} ${bgColor} ${textColor} rounded-full text-sm font-semibold`}
      >
        {props.status}
      </div>
    );
  };

  // Action template to render the ThreeDotDropdown
  const actionTemplate = (props) => <ThreeDotDropdown rowData={props} />;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex bg-main-bg dark:bg-main-dark-bg">
      {/* Main Content */}
      <div className="flex-1">
        <main className="container mx-auto p-6 space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Your Applications</h1>
            <input
              type="text"
              placeholder="Search by company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <GridComponent
              ref={gridRef}
              dataSource={filteredApplications}
              allowPaging={true}
              pageSettings={{ pageSize: 5 }}
              allowSorting={true}
              allowFiltering={true}
              width="auto"
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="dateApplied"
                  headerText="Date Applied"
                  width="150"
                />
                <ColumnDirective
                  field="company"
                  headerText="Company"
                  width="150"
                />
                <ColumnDirective
                  field="type"
                  headerText="Type"
                  width="120"
                />
                <ColumnDirective
                  field="position"
                  headerText="Position"
                  width="150"
                />
                <ColumnDirective
                  headerText="Status"
                  width="120"
                  template={statusTemplate}
                />
                <ColumnDirective
                  headerText="Action"
                  width="100"
                  textAlign="Center"
                  template={actionTemplate}
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

export default Applications;