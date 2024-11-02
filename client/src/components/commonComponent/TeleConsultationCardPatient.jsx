import { FaTrashAlt, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// TeleConsultationCardPatient component
const TeleConsultationCardPatient = ({ patient, activeTab, openCancelModal }) => {
  const navigate = useNavigate();

  const handleJoinCall = () => {
    const appointmentId = patient.id;
    navigate(`/patient/patientMeetingConference/${appointmentId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 bg-slate-100 px-4 py-2 rounded-t-lg border-b border-gray-300">
        {patient.patientName}
      </h3>
      <div className="p-4">
        <div className="py-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Appointment Type:</span>
            <span className="text-yellow-600 font-semibold">{patient.appointmentType}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Hospital Name:</span>
            <span className="font-semibold">{patient.hospitalName}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Appointment Date:</span>
            <span className="font-semibold">
              {new Date(patient.appointmentDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Appointment Time:</span>
            <span className="font-semibold">{patient.appointmentTime}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Patient Issue:</span>
            <span className="font-semibold">{patient.patientIssue}</span>
          </div>
        </div>

        {activeTab === 0 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => openCancelModal(patient)}
              className="flex items-center px-3 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition duration-200 font-semibold"
            >
              <FaTrashAlt className="mr-1" />
              Cancel
            </button>
            <button
              onClick={handleJoinCall}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 font-semibold"
            >
              <FaPhoneAlt className="mr-1" />
              Join Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeleConsultationCardPatient;
