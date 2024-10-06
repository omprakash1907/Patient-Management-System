import React from "react";
import { FaEye } from "react-icons/fa";

const PrescriptionList = () => {
  const prescriptions = [
    { hospital: "Apollo Hospitals", date: "2 Jan, 2022", disease: "Colds and Flu" },
    { hospital: "Medanta The Medicity", date: "2 Jan, 2022", disease: "Allergies" },
    { hospital: "Manipal Hospitals", date: "2 Jan, 2022", disease: "Diarrhea" },
    { hospital: "Narayana Health", date: "2 Jan, 2022", disease: "Colds and Flu" },
    { hospital: "Narayana Health", date: "2 Jan, 2022", disease: "Colds and Flu" },
    { hospital: "Narayana Health", date: "2 Jan, 2022", disease: "Colds and Flu" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Prescriptions</h2>
        <a href="#" className="text-blue-600 font-medium  hover:underline">View All Prescription</a>
      </div>
      <div className="overflow-x-auto custom-scroll">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Hospital Name</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Disease Name</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4 font-xs ">{prescription.hospital}</td>
                <td className="py-3 px-4 font-xs ">{prescription.date}</td>
                <td className="py-3 px-4 font-xs ">{prescription.disease}</td>
                <td className="py-3 px-4 font-xs flex justify-center">
                  <button className="text-customBlue flex items-center space-x-2 bg-gray-100 text-md p-1 rounded-md">
                    <FaEye /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionList;
