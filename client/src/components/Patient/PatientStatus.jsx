import React from "react";

const PatientStatus = () => {
  const statuses = [
    { hospital: "Shamuba Hospital", doctor: "Dr. Mathew Best", date: "2 Jan, 2022" },
    { hospital: "Chance Carder", doctor: "Dr. Naraman Health", date: "2 Jan, 2022" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg ">
      <h2 className="text-xl font-semibold mb-4">Patient Status</h2>
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((status, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h4 className="font-semibold">{status.hospital}</h4>
            <p className="text-gray-400">{status.date}</p>
            <p className="mt-2">{status.doctor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientStatus;
