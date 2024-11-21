import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaSearch, FaCashRegister } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import api from "../../api/api";
import CashPaymentModal from "../../components/Admin/CashPaymentModal";
import { useNavigate } from "react-router-dom";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const PaymentProcess = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [billingData, setBillingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Billing and Payments", path: "/admin/monitor-billing" },
      { label: "Payment Process", path: "/admin/payment-process" },
    ]);
  }, []);
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
    navigate(`/admin/payment-process/edit-bill/${bill._id}`);
  };

  const handleOpenPaymentModal = (bill) => {
    setSelectedBill(bill);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedBill(null);
  };

  const handlePayment = async (amount) => {
    const totalAmount = selectedBill.totalAmount;
    const newRemainingAmount =
      totalAmount - (selectedBill.paidAmount || 0) - amount;

    if (newRemainingAmount <= 0) {
      // Full payment
      try {
        const response = await api.patch(`/invoice/${selectedBill._id}`, {
          status: "Paid",
          paidAmount: totalAmount, // Fully paid, update the amount in the database
          remainingAmount: 0,
          patient: selectedBill.patient._id,
          doctor: selectedBill.doctor._id,
        });
        console.log("Invoice marked as paid:", response.data);

        setBillingData((prevData) =>
          prevData.map((bill) =>
            bill._id === selectedBill._id
              ? {
                  ...bill,
                  status: "Paid",
                  paidAmount: totalAmount,
                  remainingAmount: 0,
                }
              : bill
          )
        );
      } catch (error) {
        console.error("Error updating invoice status:", error);
      }
    } else {
      try {
        const response = await api.patch(`/invoice/${selectedBill._id}`, {
          paidAmount: (selectedBill.paidAmount || 0) + amount,
          remainingAmount: newRemainingAmount,
          status: newRemainingAmount <= 0 ? "Paid" : "Unpaid",
          patient: selectedBill.patient._id,
          doctor: selectedBill.doctor._id,
        });
        console.log("Payment updated:", response.data);

        setBillingData((prevData) =>
          prevData.map((bill) =>
            bill._id === selectedBill._id
              ? {
                  ...bill,
                  paidAmount: (selectedBill.paidAmount || 0) + amount,
                  remainingAmount: newRemainingAmount,
                  status: newRemainingAmount <= 0 ? "Paid" : "Unpaid",
                }
              : bill
          )
        );
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    }
    handleClosePaymentModal();
  };

  const handleViewDetails = (billId) => {
    console.log(billId);
    navigate(`/admin/invoice/${billId}/${billId.doctor?.firstName}`);
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
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
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
                <tr key={index} className="border-b ">
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
                      onClick={() => handleEditBill(entry)}
                      className="text-customBlue bg-gray-100 p-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleViewDetails(entry._id)}
                      className="text-gray-400 bg-gray-100 p-2 rounded-lg"
                    >
                      <FaEye />
                    </button>
                    <button
                     onClick={() => handleOpenPaymentModal(entry)}
                      className="text-green-500 bg-gray-100 p-2 rounded-lg"
                    >
                      <RiMoneyDollarCircleLine  />
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

      {selectedBill && (
        <CashPaymentModal
          open={isPaymentModalOpen}
          handleClose={handleClosePaymentModal}
          handlePayment={handlePayment}
          totalAmount={selectedBill.totalAmount}
          paidAmount={selectedBill.paidAmount || 0}
        />
      )}
    </div>
  );
};

export default PaymentProcess;
