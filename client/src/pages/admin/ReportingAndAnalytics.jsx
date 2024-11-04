import React, { useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import AppointmentCard from "../../components/Admin/AppointmentCard";
import PatientsSummaryChart from "../../components/Admin/PatientsSummaryChart";
import PatientsAgeChart from "../../components/Admin/PatientsAgeChart";

// Import the "no data found" images
import NoPatientImage from '../../assets/images/patient-count.png';
import NoDoctorImage from '../../assets/images/doctor-count.png';
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const ReportingAndAnalytics = () => {
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Reporting and Analytics", path: "/admin/report-analysis" },
    ]);
  }, []);
  // Data arrays for patients and doctors count
  const patientsCountData = [
    // Uncomment this to test the empty data scenario
    // { department: "Cardiology", count: 105 },
    // { department: "Endocrinologist", count: 254 },
    // { department: "Gastroenterologist", count: 457 },
    // { department: "Anesthesiologist", count: 306 },
    // { department: "Pediatrician", count: 784 },
  ];

  const doctorsCountData = [
    // Uncomment this to test the empty data scenario
    // { department: "Cardiology", count: 8 },
    // { department: "Endocrinologist", count: 6 },
    // { department: "Gastroenterologist", count: 5 },
    // { department: "Anesthesiologist", count: 7 },
    // { department: "Pediatrician", count: 10 },
  ];

  const SummaryCard = ({
    icon: Icon,
    title,
    value,
    colorClass,
    darkColorClass,
  }) => {
    return (
      <div className="relative bg-white p-4 rounded-xl overflow-hidden flex items-center ">
        {/* Left Clip Path Element */}
        <div
          className={`${darkColorClass} absolute left-0 h-14 w-2 rounded-tr-lg rounded-br-lg z-10`}
        ></div>

        {/* Icon */}
        <div className={`${colorClass} p-2 rounded-full mr-4 relative z-10`}>
          <Icon className={`text-2xl`} />
        </div>

        {/* Content */}
        <div className="flex flex-col text-left relative z-10">
          <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <SummaryCard
          icon={FaUserFriends}
          title="Total Patients"
          value="1500"
          colorClass="text-blue-600 bg-blue-50"
          darkColorClass="text-blue-600 bg-blue-500"
        />
        <SummaryCard
          icon={FaUserFriends}
          title="Repeat Patient"
          value="500"
          colorClass="text-purple-600 bg-purple-50"
          darkColorClass="text-purple-600 bg-purple-500"
        />
        <SummaryCard
          icon={FaUserFriends}
          title="Admitted Patient"
          value="1000"
          colorClass="text-green-600 bg-green-50"
          darkColorClass="text-green-600 bg-green-500"
        />
        <SummaryCard
          icon={FaUserFriends}
          title="Total Claim"
          value="250"
          colorClass="text-pink-600 bg-pink-50"
          darkColorClass="text-pink-600 bg-pink-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Appointments Bar Chart */}
        <AppointmentCard /> {/* Replaced old Bar chart with AppointmentCard component */}
        <PatientsSummaryChart />
      </div>

      {/* Department and Age Distribution Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Patients Count by Department */}
        <div className="bg-white p-6 rounded-xl text-center">
          <h3 className="text-lg font-bold mb-4">Patients Count Department</h3>
          {patientsCountData.length === 0 ? (
            <div>
              <img src={NoPatientImage} alt="No Patient Found" className="mx-auto" />
            </div>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100 rounded-xl">
                  <th className="p-2 rounded-tl-xl">Department Name</th>
                  <th className="p-2 rounded-tr-xl text-center">Patient Count</th>
                </tr>
              </thead>
              <tbody>
                {patientsCountData.map((item, index) => (
                  <tr className="border-b" key={index}>
                    <td className="p-2">{item.department}</td>
                    <td className="p-2 text-center">
                      <div className="inline-flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-full">
                        <FaUserFriends className="mr-2" /> {item.count}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Doctor Count by Department */}
        <div className="bg-white p-6 rounded-xl text-center">
          <h3 className="text-lg font-bold mb-4">Doctor Count Department</h3>
          {doctorsCountData.length === 0 ? (
            <div>
              <img src={NoDoctorImage} alt="No Doctor Found" className="mx-auto" />
            </div>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100 rounded-xl">
                  <th className="p-2 rounded-tl-xl">Department Name</th>
                  <th className="p-2 rounded-tr-xl text-center">Doctor Count</th>
                </tr>
              </thead>
              <tbody>
                {doctorsCountData.map((item, index) => (
                  <tr className="border-b" key={index}>
                    <td className="p-2 ">{item.department}</td>
                    <td className="p-2 text-center">
                      <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-1 rounded-full">
                        <FaUserFriends className="mr-2" /> {item.count}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Patients Age Distribution Doughnut Chart */}
        <PatientsAgeChart />
      </div>
    </div>
  );
};

export default ReportingAndAnalytics;
