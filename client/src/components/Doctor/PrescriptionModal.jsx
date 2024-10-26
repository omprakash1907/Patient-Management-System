import { AiOutlineClose } from 'react-icons/ai'; // Icon for close button
import signature from "../../assets/images/user.png";

const PrescriptionModal = ({ open, handleClose, prescriptionData }) => {
  if (!open) return null; // Return null if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Prescription</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-blue-600">Hospital</h2>
              <p>{prescriptionData.appointmentId.hospital}</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-600">
                {prescriptionData.doctor.firstName} {prescriptionData.doctor.lastName}
              </h3>
              <p>{prescriptionData.doctor.specialty}</p>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>Patient Name: {prescriptionData.patient.firstName} {prescriptionData.patient.lastName}</div>
            <div>Prescription Date: {new Date(prescriptionData.prescriptionDate).toLocaleDateString()}</div>
            <div>Gender: {prescriptionData.patient.gender}</div>
            <div>Age: {prescriptionData.patient.age}</div>
            <div>Address: {prescriptionData.patient.address}</div>
          </div>

          {/* Medicines Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 border">Medicine Name</th>
                  <th className="py-2 px-4 border">Strength</th>
                  <th className="py-2 px-4 border">Dose</th>
                  <th className="py-2 px-4 border">Duration</th>
                  <th className="py-2 px-4 border">When to Take</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionData.medicines.map((medicine, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 border">{medicine.name}</td>
                    <td className="py-2 px-4 border">{medicine.strength}</td>
                    <td className="py-2 px-4 border">{medicine.dose}</td>
                    <td className="py-2 px-4 border">{medicine.duration}</td>
                    <td className="py-2 px-4 border">{medicine.whenToTake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Note */}
          <div className="mt-4">
            <h3 className="font-bold">Additional Note:</h3>
            <p>{prescriptionData.additionalNote}</p>
          </div>

          {/* Signature Section */}
          <div className="mt-4 flex items-center justify-between">
            <div className="w-32 mt-4 border-t">
              <img src={signature} alt="Signature" />
            </div>
            <p>Doctor Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
