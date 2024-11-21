import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import AppointmentCard from "../../components/Admin/AppointmentCard";
import PatientsSummaryChart from "../../components/Admin/PatientsSummaryChart";
import PatientsAgeChart from "../../components/Admin/PatientsAgeChart";

// Import the "no data found" images
import NoPatientImage from "../../assets/images/patient-count.png";
import NoDoctorImage from "../../assets/images/doctor-count.png";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import api from "../../api/api";
import SummaryCard from "../../components/Admin/SummaryCard";

const ReportingAndAnalytics = () => {
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Reporting and Analytics", path: "/admin/report-analysis" },
    ]);
  }, []);
  // Data arrays for patients and doctors count
  // Initialize state for doctor specialty count
  const [doctorSpecialtyCount, setDoctorSpecialtyCount] = useState([]);
  const [patientsCountData, setPatientsCountData] = useState([]); // Changed patientsCountData to state

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const response = await api.get("/users/patients");
        const patients = response.data;

        // Process patient count by department
        const departmentCountMap = patients.reduce((acc, patient) => {
          const department = patient.department || "General";
          if (!acc[department]) {
            acc[department] = 0;
          }
          acc[department] += 1;
          return acc;
        }, {});

        // Convert the map to an array for rendering
        const departmentCountArray = Object.keys(departmentCountMap).map(
          (department) => ({
            department,
            count: departmentCountMap[department],
          })
        );

        setPatientsCountData(departmentCountArray);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchDoctorsData = async () => {
      try {
        const response = await api.get("/users/doctors");
        const doctors = response.data;

        // Process and count doctors by specialty
        const specialtyCountMap = doctors.reduce((acc, doctor) => {
          const specialty = doctor.doctorDetails?.specialtyType || "General";
          if (!acc[specialty]) {
            acc[specialty] = 0;
          }
          acc[specialty] += 1;
          return acc;
        }, {});

        // Convert the map to an array for rendering
        const specialtyCountArray = Object.keys(specialtyCountMap).map(
          (specialty) => ({
            name: specialty,
            count: specialtyCountMap[specialty],
          })
        );

        setDoctorSpecialtyCount(specialtyCountArray);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchPatientsData();
    fetchDoctorsData();
  }, []);

  // Data Fetching Functions
  const fetchTotalPatients = async () => {
    const response = await api.get("/users/patients");
    return response.data.length;
  };

  const fetchRepeatPatients = async () => {
    const appointmentResponse = await api.get("/appointments");
    const appointments = appointmentResponse.data.data;

    const patientAppointments = {};
    appointments.forEach(({ patientName }) => {
      if (!patientAppointments[patientName]) {
        patientAppointments[patientName] = 1;
      } else {
        patientAppointments[patientName]++;
      }
    });

    return Object.values(patientAppointments).filter((count) => count > 1)
      .length;
  };

  const fetchAdmittedPatients = async () => {
    const appointmentResponse = await api.get("/appointments");
    const appointments = appointmentResponse.data.data;

    return appointments.filter(
      ({ appointmentType }) => appointmentType === "Onsite"
    ).length;
  };

  const fetchTotalClaims = async () => {
    const invoiceResponse = await api.get("/invoice");
    const invoices = invoiceResponse.data.data;

    return invoices.filter(
      (invoice) =>
        invoice.insuranceDetails && invoice.insuranceDetails.claimAmount
    ).length;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <SummaryCard
          icon={FaUserFriends}
          title="Total Patients"
          colorClass="text-blue-600 bg-blue-50"
          darkColorClass="text-blue-600 bg-blue-500"
          fetchData={fetchTotalPatients}
        />
        <SummaryCard
          icon={FaUserFriends}
          title="Repeat Patient"
          colorClass="text-purple-600 bg-purple-50"
          darkColorClass="text-purple-600 bg-purple-500"
          fetchData={fetchRepeatPatients}
        />
        <SummaryCard
          icon={FaUserFriends}
          title="Admitted Patient"
          colorClass="text-green-600 bg-green-50"
          darkColorClass="text-green-600 bg-green-500"
          fetchData={fetchAdmittedPatients}
        />
        <SummaryCard
          icon={FaUserFriends}
          title="Total Claim"
          colorClass="text-pink-600 bg-pink-50"
          darkColorClass="text-pink-600 bg-pink-500"
          fetchData={fetchTotalClaims}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Appointments Bar Chart */}
        <AppointmentCard />{" "}
        {/* Replaced old Bar chart with AppointmentCard component */}
        <PatientsSummaryChart />
      </div>

      {/* Department and Age Distribution Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Patients Count by Department */}
        <div className="bg-white p-6 rounded-xl text-center">
          <h3 className="text-lg font-bold mb-4">Patients Count Department</h3>
          {patientsCountData.length === 0 ? (
            <div>
              <img
                src={NoPatientImage}
                alt="No Patient Found"
                className="mx-auto"
              />
            </div>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100 rounded-xl">
                  <th className="p-2 rounded-tl-xl">Department Name</th>
                  <th className="p-2 rounded-tr-xl text-center">
                    Patient Count
                  </th>
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
          {doctorSpecialtyCount.length === 0 ? (
            <div>
              <img
                src={NoDoctorImage}
                alt="No Doctor Found"
                className="mx-auto"
              />
            </div>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100 rounded-xl">
                  <th className="p-2 rounded-tl-xl">Specialty</th>
                  <th className="p-2 rounded-tr-xl text-center">
                    Doctor Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {doctorSpecialtyCount.map((item, index) => (
                  <tr className="border-b" key={index}>
                    <td className="p-2">{item.name}</td>
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
