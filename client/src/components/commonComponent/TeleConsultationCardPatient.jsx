import { FaTrashAlt, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// TeleConsultationCardPatient component
const TeleConsultationCardPatient = ({
  patient,
  activeTab,
  openCancelModal,
}) => {
  const navigate = useNavigate();

  const handleJoinCall = () => {
    const appointmentId = patient.id;
    navigate(`/patient/patientMeetingConference/${appointmentId}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 bg-gray-100 px-2 py-2 rounded-t-lg border-b border-gray-100">
        {patient.patientName}
      </h3>
      <div className="px-4">
        <div className="py-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Appointment Type</span>
            <span className="text-yellow-600 font-semibold bg-yellow-50 rounded-full px-2">
              {patient.appointmentType}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium block">Hospital Name</span>
            <span className="font-semibold">{patient.hospitalName}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Appointment Date</span>
            <span className="font-semibold">
              {new Date(patient.appointmentDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Appointment Time</span>
            <span className="font-semibold">{patient.appointmentTime}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Patient Issue</span>
            <span className="font-semibold">{patient.patientIssue}</span>
          </div>
        </div>

        <div className="flex justify-between mb-2 gap-4">
          <button
            onClick={() => openCancelModal(patient)}
            className="flex items-center justify-center w-full px-3 py-2 border border-gray-200 text-gray-500 rounded-lg font-semibold"
          >
            <FaTrashAlt className="mr-1" />
            Cancel
          </button>
          <button
            onClick={handleJoinCall}
            className="flex items-center justify-center w-full px-3 py-2 bg-green-500 text-white rounded-lg  font-semibold"
          >
            <FaPhoneAlt className="mr-1" />
            Join Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeleConsultationCardPatient;
