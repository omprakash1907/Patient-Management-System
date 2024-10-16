import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaSearch, FaCashRegister } from "react-icons/fa";
import api from "../../api/api";
import CashPaymentModal from "../../components/Admin/CashPaymentModal";
import EditBillForm from "./EditBillForm";

const PaymentProcess = () => {
  const [billingData, setBillingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [isCashModalOpen, setCashModalOpen] = useState(false);

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

  // Filter data based on search term
  const filteredBillingData = billingData.filter((entry) =>
    entry.patient?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleOpenCashModal = (bill) => {
    setSelectedBill(bill);
    setCashModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg m-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 space-x-4">
        <h2 className="text-xl font-semibold">Billing Details</h2>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Billing Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-50">
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
          <tbody>
            {filteredBillingData.length > 0 ? (
              filteredBillingData.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-blue-500">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {entry.billNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {entry.patient?.firstName} {entry.patient?.lastName}
                  </td>
                  <td className="px-6 py-4">{entry.diseaseName}</td>
                  <td className="px-6 py-4">{entry.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        entry.status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {entry.status}
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
                  <td className="px-6 py-4 space-x-2 flex items-center">
                    <button
                      onClick={() => handleOpenCashModal(entry)}
                      className="text-green-500 bg-gray-100 p-2 rounded-lg"
                    >
                      <FaCashRegister />
                    </button>
                    <button
                      onClick={() => handleEditBill(entry)}
                      className="text-customBlue bg-gray-100 p-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button className="text-gray-400 bg-gray-100 p-2 rounded-lg">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No billing records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isCashModalOpen && (
        <CashPaymentModal
          bill={selectedBill}
          closeModal={() => setCashModalOpen(false)}
        />
      )}
      {selectedBill && (
        <EditBillForm
          bill={selectedBill}
          closeForm={() => setSelectedBill(null)}
        />
      )}
    </div>
  );
};

export default PaymentProcess;
