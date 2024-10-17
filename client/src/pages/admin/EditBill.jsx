import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

const EditBill = () => {
  const { id } = useParams(); // Get bill ID from route parameters
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    patientId: "",      // Store patient ID separately
    doctorId: "",       // Store doctor ID separately
    patientName: "",
    phoneNumber: "",
    gender: "Male",
    age: "",
    doctorName: "",
    diseaseName: "",
    description: "",
    paymentType: "Cash",
    billDate: "",
    billTime: "",
    billNumber: "",
    tax: "",
    amount: "",
    discount: "",
    totalAmount: "",
    address: "",
  });

  useEffect(() => {
    // Fetch bill details and populate the form
    const fetchBillDetails = async () => {
      try {
        const response = await api.get(`/invoice/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const bill = response.data.invoice;
        setFormValues({
          patientId: bill.patient._id,   // Set patient ID
          doctorId: bill.doctor._id,     // Set doctor ID
          patientName: `${bill.patient.firstName} ${bill.patient.lastName}`,
          phoneNumber: bill.phoneNumber || "",
          gender: bill.gender || "Male",
          age: bill.age || "",
          doctorName: `${bill.doctor.firstName} ${bill.doctor.lastName}`,
          diseaseName: bill.diseaseName || "",
          description: bill.description || "",
          paymentType: bill.paymentType || "Cash",
          billDate: bill.billDate?.split("T")[0] || "",
          billTime: bill.billTime || "",
          billNumber: bill.billNumber || "",
          tax: bill.tax || "",
          amount: bill.amount || "",
          discount: bill.discount || "",
          totalAmount: bill.totalAmount || "",
          address: bill.address || "",
        });
      } catch (error) {
        console.error("Error fetching bill details:", error);
      }
    };
  
    fetchBillDetails();
  }, [id]); // Re-fetch if id changes
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    // Append patient and doctor IDs
    formData.append("patient", formValues.patientId);
    formData.append("doctor", formValues.doctorId);
  
    try {
      await api.patch(`/invoice/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Bill updated successfully!");
      navigate("/admin/payment-process");
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Error updating bill. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Bills</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Render form inputs using the InputField and SelectField components */}
        <InputField
          id="patientName"
          label="Patient Name"
          value={formValues.patientName}
          onChange={handleInputChange}
          disabled
        />
        <InputField
          id="phoneNumber"
          label="Phone Number"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
        />
        <SelectField
          id="gender"
          label="Gender"
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
          value={formValues.gender}
          onChange={handleInputChange}
        />
        <InputField
          id="age"
          label="Age"
          value={formValues.age}
          onChange={handleInputChange}
        />
        <InputField
          id="doctorName"
          label="Doctor Name"
          value={formValues.doctorName}
          onChange={handleInputChange}
          disabled
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
        <InputField
          id="billDate"
          label="Bill Date"
          type="date"
          value={formValues.billDate}
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
          disabled
        />
        <InputField
          id="tax"
          label="Tax"
          value={formValues.tax}
          onChange={handleInputChange}
        />
        <InputField
          id="amount"
          label="Amount"
          value={formValues.amount}
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
        <InputField
          id="address"
          label="Address"
          value={formValues.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-customBlue font-medium text-white px-8 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
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
  disabled = false,
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

export default EditBill;
