import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const PatientsSummaryChart = () => {
  const [filter, setFilter] = useState("week");

  const patientSummaryData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "New Patient",
        data: [5, 10, 8, 15, 20, 13, 10],
        borderColor: "#FFA500", // Orange for New Patients
        backgroundColor: "#FFA500",
        fill: false,
        tension: 0.4, // Create smooth wave effect
        pointRadius: 3,
        pointBackgroundColor: "#FFA500",
      },
      {
        label: "Old Patient",
        data: [3, 8, 6, 12, 15, 10, 8],
        borderColor: "#3B82F6", // Blue for Old Patients
        backgroundColor: "#3B82F6",
        fill: false,
        tension: 0.4, // Create smooth wave effect
        pointRadius: 3,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl  w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Patients Summary</h3>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${filter === "week" ? "bg-customBlue text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setFilter("week")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded-md ${filter === "day" ? "bg-customBlue text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setFilter("day")}
          >
            Day
          </button>
        </div>
      </div>
      <Line data={patientSummaryData} options={options} />
    </div>
  );
};

export default PatientsSummaryChart;
