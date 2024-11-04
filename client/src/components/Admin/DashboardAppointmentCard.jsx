import React from "react";

const DashboardAppointmentCard = ({
  patientName,
  doctorName,
  diseaseName,
  appointmentTime,
  appointmentType,
}) => {
  return (
    <div className="bg-white border rounded-xl border-gray-100 overflow-x-scroll custom-scroll   min-w-[300px] max-w-[300px]">
      <div className="flex justify-between items-center mb-2 p-2 bg-gray-100">
        <h3 className="text-md font-semibold text-black">{patientName}</h3>
        <span
          className={`px-2 py-0.5 text-sm rounded-full ${
            appointmentType === "Onsite"
              ? "bg-blue-100 text-blue-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {appointmentType}
        </span>
      </div>
      <div className="p-2">
        <p className="text-sm  mb-1">
          <span className="font-medium text-gray-500 block">Doctor Name</span> {doctorName}
        </p>
        <p className="text-sm  mb-1">
          <span className="font-medium text-gray-500 block">Disease Name</span> {diseaseName}
        </p>
        <p className="text-sm ">
          <span className="font-medium text-gray-500 block">Appointment Time</span>{" "}
          {appointmentTime}
        </p>
      </div>
    </div>
  );
};

export default DashboardAppointmentCard;
