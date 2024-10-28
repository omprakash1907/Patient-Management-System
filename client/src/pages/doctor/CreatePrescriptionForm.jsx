import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldArray, Formik, Form } from 'formik';
import * as Yup from 'yup';
import api from '../../api/api';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CreatePrescriptionForm = () => {
    const { id } = useParams(); // Get the appointment ID from route params
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        appointmentId: id,
        patientName: '',
        patientAge: '',
        patientGender: '',
        medicines: [{ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '' }],
        additionalNote: '',
    });
    const [prescriptionData, setPrescriptionData] = useState(null);

    const doseOptions = ['1-1-1', '1-1-0', '1-0-1', '1-0-0', '0-1-1', '0-0-1'];
    const whenToTakeOptions = ['Before Food', 'After Food', 'With Food'];

    // Fetch the appointment details
    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const response = await api.get(`/appointments/${id}`);
                const appointment = response.data.data;

                // Set initial values based on fetched appointment data
                setInitialValues({
                    appointmentId: id,
                    patientName: appointment.patientName,
                    patientAge: appointment.patientAge,
                    patientGender: appointment.patientGender,
                    medicines: [{ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '' }],
                    additionalNote: '',
                });
            } catch (error) {
                console.error('Error fetching appointment details:', error);
            }
        };

        fetchAppointmentDetails();
    }, [id]);

    // Fetch prescription data by ID for displaying the right section
    useEffect(() => {
        const fetchPrescriptionData = async () => {
            try {
                const response = await api.get(`/prescription/${id}`);
                setPrescriptionData(response.data.data);
            } catch (error) {
                console.error('Error fetching prescription data:', error);
            }
        };
        fetchPrescriptionData();
    }, [id]);

    const validationSchema = Yup.object().shape({
        medicines: Yup.array().of(
            Yup.object().shape({
                medicineName: Yup.string().required('Required'),
                strength: Yup.string().required('Required'),
                dose: Yup.string().required('Required'),
                duration: Yup.string().required('Required'),
                whenToTake: Yup.string().required('Required'),
            })
        ),
        additionalNote: Yup.string(),
    });

    const handleSubmit = async (values) => {
        try {
            const payload = {
                appointmentId: values.appointmentId,
                medicines: values.medicines.map((med) => ({
                    name: med.medicineName,
                    strength: med.strength,
                    dose: med.dose,
                    duration: med.duration,
                    whenToTake: med.whenToTake,
                })),
                additionalNote: values.additionalNote,
            };
    
            await api.post('/prescription', payload);
            await api.patch(`/appointments/${values.appointmentId}`, {
                status: 'Completed',
            });
    
            // Show success alert with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Prescription Created',
                text: 'Prescription created successfully and appointment marked as Completed',
                confirmButtonText: 'OK'
            }).then(() => {
                // Navigate after alert is closed
                navigate(`/doctor/manage-prescription`);
            });
        } catch (error) {
            console.error('Error creating prescription or updating appointment status:', error);
    
            // Show error alert with SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error creating the prescription. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };
    

    return (
        <div className="flex gap-8 p-6 bg-gray-50 ">
            {/* Prescription Form Section */}
            <div className="flex-1 bg-white p-8 rounded-lg w-2/3">
                <Formik
                    enableReinitialize // Allows initialValues to be updated when setInitialValues changes
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur }) => (
                        <Form className="flex flex-col gap-6">
                            <h2 className="text-2xl font-bold mb-4">Create Prescription</h2>

                            {/* Patient Info */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="patientName"
                                        value={values.patientName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="peer w-full px-3 py-2 border rounded bg-gray-50 text-gray-800"
                                        disabled
                                    />
                                    <label className="absolute left-3 -top-2 text-sm bg-white px-1 text-gray-500 peer-focus:text-blue-500">
                                        Patient Name
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="patientAge"
                                        value={values.patientAge}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="peer w-full px-3 py-2 border rounded bg-gray-50 text-gray-800"
                                        disabled
                                    />
                                    <label className="absolute left-3 -top-2 text-sm bg-white px-1 text-gray-500 peer-focus:text-blue-500">
                                        Age
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="patientGender"
                                        value={values.patientGender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="peer w-full px-3 py-2 border rounded bg-gray-50 text-gray-800"
                                        disabled
                                    />
                                    <label className="absolute left-3 -top-2 text-sm bg-white px-1 text-gray-500 peer-focus:text-blue-500">
                                        Gender
                                    </label>
                                </div>
                            </div>

                            {/* Medicines Table */}
                            <h2 className="text-xl font-semibold mb-4">Drug Prescription</h2>
                            <FieldArray name="medicines">
                                {({ push, remove }) => (
                                    <>
                                        <div className="grid grid-cols-6 gap-4 mb-2 text-gray-700 font-semibold bg-gray-100 p-2">
                                            <span>Medicine Name</span>
                                            <span>Strength</span>
                                            <span>Dose</span>
                                            <span>Duration</span>
                                            <span>When to Take</span>
                                            <span></span>
                                        </div>
                                        {values.medicines.map((medicine, index) => (
                                            <div key={index} className="grid grid-cols-6 gap-4 mb-4">
                                                <input
                                                    type="text"
                                                    name={`medicines[${index}].medicineName`}
                                                    placeholder="Enter Medicine"
                                                    value={medicine.medicineName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="px-3 py-2 border rounded-lg"
                                                />
                                                <input
                                                    type="text"
                                                    name={`medicines[${index}].strength`}
                                                    placeholder="Strength"
                                                    value={medicine.strength}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="px-3 py-2 border rounded-lg"
                                                />
                                                <select
                                                    name={`medicines[${index}].dose`}
                                                    value={medicine.dose}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="px-3 py-2 border rounded-lg"
                                                >
                                                    <option value="" label="Dose" />
                                                    {doseOptions.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="text"
                                                    name={`medicines[${index}].duration`}
                                                    placeholder="Duration"
                                                    value={medicine.duration}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="px-3 py-2 border rounded-lg"
                                                />
                                                <select
                                                    name={`medicines[${index}].whenToTake`}
                                                    value={medicine.whenToTake}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="px-3 py-2 border rounded-lg"
                                                >
                                                    <option value="" label="When To Take" />
                                                    {whenToTakeOptions.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-red-500 hover:text-red-700 flex justify-center items-center"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '' })}
                                            className="mt-2 px-4 py-2 bg-customBlue text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Add Medicine
                                        </button>
                                    </>
                                )}
                            </FieldArray>

                            {/* Additional Note */}
                            <div className="relative mt-6">
                                <textarea
                                    name="additionalNote"
                                    value={values.additionalNote}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows="4"
                                    className="peer w-full px-3 py-2 border rounded bg-gray-50 text-gray-800"
                                ></textarea>
                                <label className="absolute left-3 -top-2 text-sm bg-white px-1 text-gray-500 peer-focus:text-blue-500">
                                    Additional Note
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-6 px-4 py-2 bg-customBlue text-white rounded-lg "
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Prescription Summary Section */}
            <div className="bg-white p-8 rounded-lg w-1/3">
                {prescriptionData ? (
                    <>
                        <h2 className="text-2xl font-bold mb-6">Prescription Summary</h2>
                        {/* Summary code continues as before */}
                    </>
                ) : (
                    <p>Loading prescription details...</p>
                )}
            </div>
        </div>
    );
};

export default CreatePrescriptionForm;
