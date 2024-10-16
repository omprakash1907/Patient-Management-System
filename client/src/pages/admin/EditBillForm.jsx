import { useState } from "react";

const EditBillForm = ({ bill, closeForm }) => {
    const [formValues, setFormValues] = useState({ ...bill });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSave = () => {
      console.log("Saving Bill", formValues);
      closeForm();
    };
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md m-6">
        <h2 className="text-xl font-semibold mb-4">Edit Bill</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Render form inputs as per the provided layout */}
          <input type="text" name="patientName" value={formValues.patientName || ''} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder="Patient Name" />
          <input type="text" name="phoneNumber" value={formValues.phoneNumber || ''} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder="Phone Number" />
          {/* Add remaining fields here */}
        </div>
        <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
      </div>
    );
  };

  export default EditBillForm;
