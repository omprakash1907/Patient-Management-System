import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaSearch } from "react-icons/fa";
import api from "../../api/api"; // Import your API utility
import noRecordImage from "../../assets/images/nodoctor.png";

const MonitorBilling = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingData, setBillingData] = useState([]); // State for fetched data
  const navigate = useNavigate();

  // Fetch billing data from API
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBillingData(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchBillingData();
  }, []);

  console.log(billingData);

  // Filtered data based on search term
  const filteredBillingData = billingData.filter(
    (entry) =>
      `${entry.patient?.firstName} ${entry.patient?.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      entry.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phoneNumber?.includes(searchTerm)
  );

  const handleViewInvoice = (bill) => {
    navigate(`/admin/invoice/${bill._id}/${bill.patient?.firstName}`);
  };

  const statusStyles = {
    Paid: "bg-green-100 text-green-600 font-medium px-3 py-1 rounded-full",
    Unpaid: "bg-red-100 text-red-600 font-medium px-3 py-1 rounded-full",
  };

  return (
    <div className="p-6 bg-white rounded-lg  m-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 space-x-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <span>Monitor Billing</span>
        </h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Quick Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 focus:outline-none w-full"
            />
          </div>

          <div className="flex space-x-2">
            <button
              className="flex items-center text-sm border border-customBlue px-4 py-2 rounded-md text-customBlue font-medium"
              onClick={() =>
                navigate("/admin/select-template", {
                  state: { editMode: true },
                })
              }
            >
              <FaEdit className="mr-2" />
              Edit Design Invoice
            </button>
            <button
              className="flex items-center text-sm bg-customBlue text-white px-4 py-2 rounded-md font-medium"
              onClick={() =>
                navigate("/admin/create-bill")
              }
            >
              <FaPlus className="mr-2" />
              Create Bills
            </button>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className="overflow-x-auto custom-scroll">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-6 py-4 text-left">Bill Number</th>
              <th className="px-6 py-4 text-left">Patient Name</th>
              <th className="px-6 py-4 text-left">Disease Name</th>
              <th className="px-6 py-4 text-left">Phone Number</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          {filteredBillingData.length > 0 ? (
            <tbody>
              {filteredBillingData.map((entry, index) => (
                <tr key={index} className="border-b ">
                  <td className="px-6 py-4 text-blue-500 hover:underline cursor-pointer">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {entry.billNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {entry.patient
                      ? `${entry.patient.firstName} ${entry.patient.lastName}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{entry.diseaseName}</td>
                  <td className="px-6 py-4">{entry.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <span className={statusStyles[entry.status]}>
                      {entry.status || "Unpaid"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(entry.billDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {entry.billTime}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-customBlue bg-gray-100 p-2 rounded-lg"
                      onClick={() => handleViewInvoice(entry)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="8" className="text-center py-16">
                  <div className="flex flex-col items-center">
                    <img
                      src={noRecordImage}
                      alt="No Record Found"
                      className="w-96 mb-4"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default MonitorBilling;
