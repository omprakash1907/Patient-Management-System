import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api"; // Import your configured axios instance

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (token) {
          const decodedToken = jwtDecode(token); // Decode the token to extract the patient ID
          const patientId = decodedToken.id; // Assuming the ID is stored as 'id' in the token

          // Make the API call to fetch patient details using the extracted ID
          const response = await api.get(`/users/patients/${patientId}`);
          setPatient(response.data); // Store the patient data in state
          setLoading(false);
        } else {
          setError("No token found");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch patient details");
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg ">
      {/* Heading and Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patient Details</h2>
        <Link
          to={`/patient/edit-patient-profile`}
          className="flex items-center px-4 py-2 bg-customBlue font-medium text-white rounded-lg"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="flex justify-between items-start">
        {/* Patient Image */}
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Patient"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Patient Information */}
        <div className="flex-grow ml-6">
          <div className="grid grid-cols-7 gap-x-12 gap-y-4">
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Name</p> {patient.firstName} {patient.lastName}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Number</p> {patient.phoneNumber}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Email</p> {patient.email}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Gender</p> {patient.gender}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">DOB</p> {new Date(patient.dateOfBirth).toLocaleDateString()}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Age</p> {patient.age} Years
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Blood Group</p> {patient.bloodGroup}
            </div>

            <div className="font-semibold leading-5">
              <p className="text-gray-400">Height (cm)</p> {patient.height}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Weight (Kg)</p> {patient.weight}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Country</p> {patient.country}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">State</p> {patient.state}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">City</p> {patient.city}
            </div>
            <div className="col-span-2 font-semibold leading-5">
              <p className="text-gray-400">Address</p> {patient.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
