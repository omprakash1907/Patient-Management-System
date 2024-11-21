import { useEffect, useState } from "react";
import api from "../../api/api";
import AddFieldModal from "../../components/Admin/AddFieldModal";
import { FiUpload } from "react-icons/fi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { useNavigate } from "react-router-dom";

const CreateBill = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hospitalFields, setHospitalFields] = useState([]);
  const [patientFields, setPatientFields] = useState([]);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const { updateBreadcrumb } = useBreadcrumb();
  const navigate = useNavigate()

  useEffect(() => {
    updateBreadcrumb([
      { label: "Monitor Billing", path: "/admin/monitor-billing" },
      { label: "Create Bill", path: "/admin/create-bill" },
    ]);
  }, []);

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

  // Line 110 (after existing useEffect hooks)
useEffect(() => {
  const calculateTotalAmount = () => {
    const amount = parseFloat(formValues.amount) || 0;
    const tax = parseFloat(formValues.tax) || 0;
    const discount = parseFloat(formValues.discount) || 0;

    const total = amount + tax - discount;
    setFormValues((prev) => ({
      ...prev,
      totalAmount: total > 0 ? total.toFixed(2) : "0.00",
    }));
  };

  calculateTotalAmount();
}, [formValues.amount, formValues.tax, formValues.discount]);


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

      Swal.fire({
        icon: 'success',
        title: 'Invoice Created successfully!!',
        text: 'Your operation was successful.',
        confirmButtonText: 'OK',
      });
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
      navigate('/admin/monitor-billing')
    } catch (error) {
      console.error("Error creating invoice:", error);
      Swal.fire({
        icon: 'error',
        title: 'Invalide Field',
        text: 'Something went wrong!',
        confirmButtonText: 'Try Again',
      }); 
    }
  };

  const handleRemoveField = (type, index) => {
    if (type === "hospital") {
      const newFields = [...hospitalFields];
      newFields.splice(index, 1);
      setHospitalFields(newFields);
    } else if (type === "patient") {
      const newFields = [...patientFields];
      newFields.splice(index, 1);
      setPatientFields(newFields);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg m-6">
      <h1 className="text-2xl font-semibold mb-6">Create Bill</h1>
      <div className=" border rounded p-4">
        {/* Hospital Details */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Hospital Details</h2>
          <button
            type="button"
            onClick={() => setIsHospitalModalOpen(true)}
            className="flex justify-between items-center  bg-customBlue text-white p-2 rounded-lg font-medium text-sm mb-4"
          >
            <FaPlus className="bg-white text-customBlue rounded mr-2" /> Add New
            Field
          </button>
        </div>
        <div className="flex gap-4">
          <div className="mb-4 w-1/5">
            <label className="text-gray-700 text-sm font-medium">
              Upload Logo
            </label>
            <div className="flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-6 w-full mt-2">
              <div className="flex align-middle justify-center">
                <FiUpload className="text-gray-500 text-2xl" />
              </div>
              <div className="text-center">
                <label className="text-blue-500 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    name="logo"
                    onChange={handleFileChange}
                  />
                  {selectedFile ? selectedFile.name : "Upload a file"}
                </label>
                <p className="text-xs text-gray-400">PNG Up To 5MB</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full">
            <SelectField
              id="hospitalId"
              label="Hospital"
              options={hospitals.map(hospital => ({ value: hospital._id, label: hospital.name }))}
              value={formValues.hospitalId}
              onChange={handleHospitalSelect}
            />
            <InputField
              id="billDate"
              label="Bill Date"
              type="date"
              value={formValues.billDate}
              onChange={handleInputChange}
            />
            <InputField
              id="otherText"
              label="Other Text"
              value={formValues.otherText}
              onChange={handleInputChange}
            />
            <InputField
              id="billTime"
              label="Bill Time"
              value={formValues.billTime}
              onChange={handleInputChange}
            />
            <InputField
              id="billNumber"
              label="Bill Number"
              value={formValues.billNumber}
              onChange={handleInputChange}
            />
            <InputField
              id="phoneNumber"
              label="Phone Number"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <InputField
              id="hospitalAddress"
              label="Address"
              value={formValues.hospitalAddress}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </div>
        {/* Dynamic hospital fields */}
        {hospitalFields.map((field, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <InputField
              id={`hospitalField${index}`}
              label="Dynamic Field"
              value={field}
              onChange={e => {
                const newFields = [...hospitalFields];
                newFields[index] = e.target.value;
                setHospitalFields(newFields);
              }}
            />
            <AiOutlineMinusCircle
              className="text-red-500 cursor-pointer"
              onClick={() => handleRemoveField("hospital", index)}
            />
          </div>
        ))}

        {/* Patient Details */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mt-6 mb-4">Patient Details</h2>
          <button
            type="button"
            onClick={() => setIsPatientModalOpen(true)}
            className="flex justify-between items-center  bg-customBlue text-white p-2 rounded-lg font-medium text-sm mb-4"
          >
            <FaPlus className="bg-white text-customBlue rounded mr-2" /> Add New
            Field
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectField
            id="patientId"
            label="Patient"
            options={patients.map(patient => ({ value: patient._id, label: `${patient.firstName} ${patient.lastName}` }))}
            value={formValues.patientId}
            onChange={handlePatientSelect}
          />
          <SelectField
            id="doctorId"
            label="Doctor"
            options={doctors.map(doctor => ({ value: doctor._id, label: `${doctor.firstName} ${doctor.lastName}` }))}
            value={formValues.doctorId}
            onChange={handleDoctorSelect}
          />
          <InputField
            id="diseaseName"
            label="Disease Name"
            value={formValues.diseaseName}
            onChange={handleInputChange}
          />
          <InputField
            id="description"
            label="Description"
            value={formValues.description}
            onChange={handleInputChange}
          />
          <InputField
            id="amount"
            label="Amount"
            value={formValues.amount}
            onChange={handleInputChange}
          />
          <InputField
            id="tax"
            label="Tax"
            value={formValues.tax}
            onChange={handleInputChange}
          />
          <InputField
            id="discount"
            label="Discount"
            value={formValues.discount}
            onChange={handleInputChange}
          />
          <InputField
            id="totalAmount"
            label="Total Amount"
            value={formValues.totalAmount}
            onChange={handleInputChange}
          />
          <SelectField
            id="paymentType"
            label="Payment Type"
            options={[
              { value: "Cash", label: "Cash" },
              { value: "Online", label: "Online" },
              { value: "Insurance", label: "Insurance" },
            ]}
            value={formValues.paymentType}
            onChange={handleInputChange}
          />
        </div>

        {/* Insurance details - only displayed when paymentType is "Insurance" */}
        {formValues.paymentType === "Insurance" && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              id="insuranceCompany"
              label="Insurance Company"
              value={formValues.insuranceCompany}
              onChange={handleInputChange}
            />
            <InputField
              id="insurancePlan"
              label="Insurance Plan"
              value={formValues.insurancePlan}
              onChange={handleInputChange}
            />
            <InputField
              id="claimAmount"
              label="Claim Amount"
              value={formValues.claimAmount}
              onChange={handleInputChange}
            />
            <InputField
              id="claimedAmount"
              label="Claimed Amount"
              value={formValues.claimedAmount}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Modals for adding new fields */}
        <AddFieldModal
          open={isHospitalModalOpen}
          handleClose={() => setIsHospitalModalOpen(false)}
          handleAddField={(field) =>
            setHospitalFields([...hospitalFields, field])
          }
        />
        <AddFieldModal
          open={isPatientModalOpen}
          handleClose={() => setIsPatientModalOpen(false)}
          handleAddField={(field) =>
            setPatientFields([...patientFields, field])
          }
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-6 px-6 bg-customBlue text-white py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

// InputField component
const InputField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false
}) => (
  <div className="relative mb-4">
    <input
      type={type}
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
      placeholder={placeholder || `Enter ${label}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

// SelectField component
const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="relative mb-4">
    <select
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="">{`Select ${label}`}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

export default CreateBill;
