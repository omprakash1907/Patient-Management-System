import { useEffect, useState } from "react";
import api from "../../api/api";
import AddFieldModal from "../../components/Admin/AddFieldModal";
import { FiUpload } from "react-icons/fi";

const CreateBill = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hospitalFields, setHospitalFields] = useState([]);
  const [patientFields, setPatientFields] = useState([]);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  const [hospitals, setHospitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formValues, setFormValues] = useState({
    hospitalId: "",
    hospitalName: "",
    hospitalAddress: "",
    otherText: "",
    billDate: "",
    billTime: "",
    billNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
    patientId: "",
    patientName: "",
    patientPhoneNumber: "",
    patientEmail: "",
    diseaseName: "",
    doctorName: "",
    description: "",
    amount: "",
    tax: "",
    doctorId: "",
    discount: "",
    totalAmount: "",
    paymentType: "Cash",
    gender: "Male",
    age: "",
    insuranceCompany: "",
    insurancePlan: "",
    claimAmount: "",
    claimedAmount: "",
    status: "Unpaid",
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get("/hospitals");
        setHospitals(response.data.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/users/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/users/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleHospitalSelect = (e) => {
    const selectedHospital = hospitals.find(
      (hospital) => hospital._id === e.target.value
    );
    setFormValues({
      ...formValues,
      hospitalId: selectedHospital._id,
      hospitalName: selectedHospital.name,
      hospitalAddress: selectedHospital.address,
    });
  };

  const handlePatientSelect = (e) => {
    const selectedPatient = patients.find(
      (patient) => patient._id === e.target.value
    );
    setFormValues({
      ...formValues,
      patientId: selectedPatient._id,
      patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
      patientPhoneNumber: selectedPatient.phoneNumber,
      patientEmail: selectedPatient.email,
      age: selectedPatient.age,
      gender: selectedPatient.gender,
      address: selectedPatient.address,
    });
  };

  const handleDoctorSelect = (e) => {
    const selectedDoctor = doctors.find(
      (doctor) => doctor._id === e.target.value
    );
    setFormValues({
      ...formValues,
      doctorId: selectedDoctor._id,
      doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hospital", formValues.hospitalId);
      formData.append("patient", formValues.patientId);
      formData.append("doctor", formValues.doctorId);

      Object.keys(formValues).forEach((key) => {
        if (key !== "hospitalId" && key !== "patientId" && key !== "doctorId") {
          formData.append(key, formValues[key]);
        }
      });
      if (selectedFile) {
        formData.append("logo", selectedFile);
      }

      const response = await api.post("/invoice", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Invoice created successfully!");

      setFormValues({
        hospitalId: "",
        patientId: "",
        doctorId: "",
        hospitalName: "",
        hospitalAddress: "",
        otherText: "",
        billDate: "",
        billTime: "",
        billNumber: "",
        phoneNumber: "",
        email: "",
        address: "",
        patientName: "",
        patientPhoneNumber: "",
        patientEmail: "",
        diseaseName: "",
        doctorName: "",
        description: "",
        amount: "",
        tax: "",
        discount: "",
        totalAmount: "",
        paymentType: "Cash",
        gender: "Male",
        age: "",
        insuranceCompany: "",
        insurancePlan: "",
        claimAmount: "",
        claimedAmount: "",
        status: "Unpaid",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Error creating invoice. Please try again.");
    }
  };

  const handleAddHospitalField = (field) => {
    setHospitalFields([...hospitalFields, field]);
  };

  const handleAddPatientField = (field) => {
    setPatientFields([...patientFields, field]);
  };

  const handleRemoveHospitalField = (index) => {
    setHospitalFields(hospitalFields.filter((_, i) => i !== index));
  };

  const handleRemovePatientField = (index) => {
    setPatientFields(patientFields.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Create Bill</h1>

      <h2 className="text-lg font-semibold mb-4">Hospital Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="mb-4">
                <label className="text-gray-700 text-sm font-medium">
                  Upload Signature
                </label>
                <div className=" flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-10 w-full mt-2">
                  <div className="flex align-middle justify-center">
                    <FiUpload className="text-gray-500 text-2xl" />
                  </div>
                  <div className=" text-center">
                    <label className="text-blue-500 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        name="signature"
                        onChange={(e) => {
                          // Handle file upload here
                        }}
                      />
                      Upload a file
                    </label>
                    <p className="text-xs text-gray-400">PNG Up To 5MB</p>
                  </div>
                </div>
              </div>
        <div>
          <label className="block font-semibold mb-2">Hospital</label>
          <select
            name="hospitalId"
            value={formValues.hospitalId}
            onChange={handleHospitalSelect}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital._id} value={hospital._id}>
                {hospital.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Other Text</label>
          <input
            type="text"
            name="otherText"
            value={formValues.otherText}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* More fields here... */}
      </div>

      {/* Add more sections as needed */}

      <AddFieldModal
        open={isHospitalModalOpen}
        handleClose={() => setIsHospitalModalOpen(false)}
        handleAddField={handleAddHospitalField}
      />
      <AddFieldModal
        open={isPatientModalOpen}
        handleClose={() => setIsPatientModalOpen(false)}
        handleAddField={handleAddPatientField}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold px-4 py-2 mt-6 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default CreateBill;
