import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../../api/api";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PatientsAgeChart = () => {
  const [patientsAgeData, setPatientsAgeData] = useState({
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
        data: [0, 0, 0, 0, 0, 0],
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
  });
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/users/patients");
        const patients = response.data;

        const ageGroups = [
          { name: "0-2 Years", minAge: 0, maxAge: 2 },
          { name: "3-12 Years", minAge: 3, maxAge: 12 },
          { name: "13-19 Years", minAge: 13, maxAge: 19 },
          { name: "20-39 Years", minAge: 20, maxAge: 39 },
          { name: "40-59 Years", minAge: 40, maxAge: 59 },
          { name: "60 And Above", minAge: 60, maxAge: Infinity },
        ];

        const ageData = Array(ageGroups.length).fill(0);
        patients.forEach((patient) => {
          const age = patient.age;
          ageGroups.forEach((group, index) => {
            if (age >= group.minAge && age <= group.maxAge) {
              ageData[index] += 1;
            }
          });
        });

        const total = patients.length;
        setTotalPatients(total);

        setPatientsAgeData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: ageData.map((value) => ((value / total) * 100).toFixed(1)), // Convert to percentages
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

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
                      backgroundColor:
                        patientsAgeData.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  {label}
                </div>
                <span>
                  {patientsAgeData.datasets[0].data[index]}%{/* Percentage */}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientsAgeChart;
