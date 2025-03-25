import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
  ColumnSeries,
  LineSeries,
  DataLabel,
} from '@syncfusion/ej2-react-charts';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Filter,
  Group,
  Toolbar,
  ExcelExport,
  PdfExport,
} from '@syncfusion/ej2-react-grids';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject as ScheduleInject } from '@syncfusion/ej2-react-schedule';
import { AccumulationChartComponent, AccumulationSeriesDirective, AccumulationSeriesCollectionDirective, PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { apiRequest } from './features/auth/auth';

const Analytics_and_Reports = () => {
  const [chartData, setChartData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch analytics data from the backend API
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/company/analytics/');
        setChartData(data.monthly_data);
        setGridData(data.recent_applications);
        setScheduleData(data.upcoming_interviews);
        setPieData(data.status_distribution);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Handle downloading the report
  const handleDownloadReport = async () => {
    try {
      const response = await apiRequest('get', '/company/analytics/download/', null, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'analytics_report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen dark:bg-secondary-dark-bg">Loading...</div>;
  }

  return (
    <div className="m-10 bg-main-bg dark:bg-main-dark-bg">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Analytics and Reports</h1>

      {/* Download Report Button */}
      <div className="mb-8">
        <button
          onClick={handleDownloadReport}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Download Report
        </button>
      </div>

      {/* Dropdown for filtering */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Filter by Month:</label>
        <DropDownListComponent
          dataSource={['January', 'February', 'March', 'April', 'May']}
          placeholder="Select a month"
        />
      </div>

      {/* Date Picker */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Select Date Range:</label>
        <DatePickerComponent placeholder="Start Date" />
        <DatePickerComponent placeholder="End Date" className="ml-4" />
      </div>

      {/* Stacked Column Chart */}
      <div className="mb-8 bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow">
        <ChartComponent
          id="applications-chart"
          primaryXAxis={{ valueType: 'Category', title: 'Month' }}
          primaryYAxis={{ title: 'Count' }}
          title="Monthly Applications, Interviews, and Hires"
          tooltip={{ enable: true }}
          palettes={['#36A2EB', '#FFCE56', '#4BC0C0']} // Custom colors for Applications, Interviews, Hires
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, StackingColumnSeries, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="applications"
              name="Applications"
              type="Column"
            />
            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="interviews"
              name="Interviews"
              type="Column"
            />
            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="hires"
              name="Hires"
              type="Column"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>

      {/* Pie Chart */}
      <div className="mb-8 bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow">
        <AccumulationChartComponent
          id="status-pie-chart"
          title="Application Status Distribution"
          legendSettings={{ visible: true }}
          tooltip={{ enable: true }}
        >
          <Inject services={[PieSeries, AccumulationLegend, AccumulationTooltip, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={pieData}
              xName="x"
              yName="y"
              type="Pie"
              pointColorMapping="color" // Map custom colors from data
              dataLabel={{ visible: true, name: 'x', position: 'Inside', font: { color: 'white' } }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>

      {/* Data Grid */}
      <div className="mb-8 bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow">
        <GridComponent
          dataSource={gridData}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          toolbar={['ExcelExport', 'PdfExport']}
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="ID" width="100" textAlign="Right" />
            <ColumnDirective field="name" headerText="Name" width="150" />
            <ColumnDirective field="status" headerText="Status" width="150" />
            <ColumnDirective field="date" headerText="Date" width="150" format="yMd" />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Toolbar, ExcelExport, PdfExport]} />
        </GridComponent>
      </div>

      {/* Schedule Component */}
      <div className="mb-8 bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow">
        <ScheduleComponent
          height="500px"
          selectedDate={new Date(2023, 9, 15)}
          eventSettings={{ dataSource: scheduleData }}
        >
          <ScheduleInject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </div>
  );
};

export default Analytics_and_Reports;