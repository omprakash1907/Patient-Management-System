import React from "react";

const TestReports = () => {
  const reports = [
    {
      doctor: "Dr. Marcus Philips",
      date: "2 Jan, 2022",
      disease: "Viral Infection",
      test: "Pathology Test",
    },
    {
      doctor: "Dr. Zaire Saris",
      date: "2 Jan, 2022",
      disease: "Allergies",
      test: "Pathology Test",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Test Reports</h2>
        <a href="#" className="text-customBlue">View All Reports</a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {reports.map((report, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h4 className="font-semibold">{report.doctor}</h4>
            <p className="text-gray-400">{report.date}</p>
            <p className="mt-2">{report.disease}</p>
            <p className="mt-2 text-green-600">{report.test}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestReports;
