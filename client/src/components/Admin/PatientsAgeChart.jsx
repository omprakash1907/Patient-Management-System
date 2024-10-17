import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PatientsAgeChart = () => {
  const patientsAgeData = {
    labels: [
      "0-2 Years",
      "3-12 Years",
      "13-19 Years",
      "20-39 Years",
      "40-59 Years",
      "60 And Above",
    ],
    datasets: [
      {
        data: [8, 12, 20, 18, 8, 34],
        backgroundColor: [
          "#FF6384", // Pink for 0-2 Years
          "#36A2EB", // Blue for 3-12 Years
          "#FFCE56", // Yellow for 13-19 Years
          "#4BC0C0", // Teal for 20-39 Years
          "#9966FF", // Purple for 40-59 Years
          "#FF9F40", // Orange for 60 and above
        ],
        borderRadius: 5, // Rounded radius for doughnut chart
        cutout: "60%", // Inner radius for doughnut chart
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the default legend that appears above the chart
      },
    },
    maintainAspectRatio: false, // Allows to control the chart's size
  };

  return (
    <div className="bg-white p-4 rounded-xl ">
      {/* Left side - Doughnut chart */}
      <h3 className="text-lg font-bold mb-4">Patients Age</h3>
      <div className="flex justify-between items-center bg-gray-50 rounded-xl">
        <div className="w-1/2"> {/* Increased the width for the doughnut chart */}
          <Doughnut
            data={patientsAgeData}
            options={options}
            style={{ maxHeight: "300px", maxWidth: "300px" }} // Make the pie chart bigger
          />
        </div>

        {/* Right side - Age ranges with percentages */}
        <div className="w-1/2 m-4">
          <ul className="space-y-2 bg-white p-4 rounded-xl">
            {patientsAgeData.labels.map((label, index) => (
              <li key={label} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2 "
                    style={{
                      backgroundColor: patientsAgeData.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  {label}
                </div>
                <span>{patientsAgeData.datasets[0].data[index]}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientsAgeChart;
