// TeleConsultationCard.js
import { FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeleConsultationCard = ({ patient }) => {
  const navigate = useNavigate();
  const handleJoinCall = () => {
    const appointmentId = patient.id;
    navigate(`/doctor/doctorMeetingConference/${appointmentId}`);
  };

  return (
    <div className=" overflow-hidden bg-white rounded-xl  border border-gray-100">
      <div>
        <h3 className="text-lg font-semibold bg-gray-100 text-gray-800 px-3 py-2">
          {patient.patientName}
        </h3>
        <div className="px-3 py-2">
          <p className="text-gray-700 flex justify-between items-center">
            <span className="text-gray-400 font-medium">Patient Issue </span>
            {patient.patientIssue}
          </p>
          <p className="text-gray-700 flex justify-between items-center">
            <span className="text-gray-400 font-medium">Disease Name </span>
            {patient.diseaseName}
          </p>
          <p className="text-gray-700 flex justify-between items-center">
            <span className="text-gray-400 font-medium">Appointment Date </span>
            {new Date(patient.appointmentDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700 flex justify-between items-center">
            <span className="text-gray-400 font-medium">Appointment Time</span>
            {patient.appointmentTime}
          </p>
        </div>
      </div>
      <div className="flex gap-4 p-3 ">
        <button
          onClick={handleJoinCall}
          className="flex items-center justify-center font-semibold px-4 py-2 bg-green-500 text-white w-full rounded-xl hover:bg-green-600 transition duration-200"
        >
          <FaPhoneAlt className="mr-2" />
          Join Call
        </button>
        <button className="flex items-center justify-center font-semibold px-4 py-2 bg-blue-500 text-white w-full  rounded-xl hover:bg-blue-600 transition duration-200">
          <FaCalendarAlt className="mr-2" />
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default TeleConsultationCard;
