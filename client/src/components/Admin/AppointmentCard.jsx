import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AppointmentCard = () => {
  const [filter, setFilter] = useState("year");

  // Dummy data for charts
  const appointmentData = {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Other Appointment",
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: "rgba(14, 171, 235, 0.5)", // Light Blue with transparency
        borderRadius: 10,
      },
      {
        label: "Online Consultation",
        data: [5, 15, 25, 35, 45, 55],
        backgroundColor: "#0EABEB", // Dark Blue
        borderRadius: 10,
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
        ticks: {
          stepSize: 10,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Appointment</h3>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 rounded-md ${
              filter === "year" ? "bg-customBlue text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFilter("year")}
          >
            Year
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              filter === "month" ? "bg-customBlue text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFilter("month")}
          >
            Month
          </button>
        </div>
      </div>
      <Bar data={appointmentData} options={options} />
    </div>
  );
};

export default AppointmentCard;
