import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreatePrescription = ({ id, patientid, prescriptionId, name, age, gender, appointmentType, time, status }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg border w-full relative  ">
            <div className="flex justify-between items-center  bg-gray-50 p-3">
                <h2 className="font-bold text-lg text-gray-800">{name}</h2>
                <div className="flex items-center">
                    {status === 'completed' ? (
                        <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full text-sm font-medium mr-2">
                            Completed
                        </span>
                    ) : (
                        <span className="bg-blue-100 text-customBlue px-2 py-1 rounded-full text-sm font-medium mr-2">
                            New
                        </span>
                    )}
                    <div className='bg-white p-1 rounded-lg'>
                        <FaEye
                            onClick={() => navigate(`/doctor/prescription-view/${patientid}`)}
                            className="text-gray-400 cursor-pointer text-xl" />
                    </div>
                </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2  p-3">
                <p className='flex justify-between'>
                    Appointment Type <span className="text-blue-500 font-semibold">{appointmentType}</span>
                </p>
                <p className='flex justify-between'>
                    Patient Age <span className="font-semibold">{age} Years</span>
                </p>
                <p className='flex justify-between'>
                    Patient Gender <span className="font-semibold">{gender}</span>
                </p>
                <p className='flex justify-between'>
                    Appointment Time <span className="font-semibold">{time}</span>
                </p>
            </div>
            <div className='p-3'>
                <button
                    className={`w-full py-2 rounded-lg font-medium ${status === 'completed' ? 'bg-gray-300 text-gray-500' : 'bg-customBlue text-white '
                        }`}
                    onClick={() => navigate(`/doctor/create-prescription/${id}`)}
                    disabled={status === 'completed'}
                >
                    {status === 'completed' ? 'Prescription Completed' : 'Create Prescription'}
                </button>
            </div>
        </div>
    );
};

export default CreatePrescription;
