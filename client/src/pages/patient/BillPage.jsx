import React, { useEffect, useState } from "react";
import PaymentTypeModal from "../../components/Patient/PaymentTypeModal";
import InvoiceModal from "../../components/Patient/InvoiceModal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";

const BillPage = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeTab, setActiveTab] = useState("unpaid"); // To toggle between paid and unpaid tabs
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Bills", path: "/patient/bills" },
    ]);
  }, [updateBreadcrumb]);

  const bills = [
    {
      id: 1,
      doctor: "Dr. Nolan George",
      hospital: "Shamuba Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      amount: 24668,
      isPaid: false,
    },
    {
      id: 2,
      doctor: "Dr. Nolan George",
      hospital: "Shamuba Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      amount: 2520,
      isPaid: true,
    },
    // Add more bills as needed
  ];

  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setShowPaymentType(true);
  };

  const handleViewInvoice = (bill) => {
    setSelectedBill(bill);
    setShowInvoice(true);
  };

  const filteredBills = bills.filter((bill) => bill.isPaid === (activeTab === "paid"));

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("unpaid")}
          className={`text-lg font-semibold ${activeTab === "unpaid" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
        >
          Unpaid Bills
        </button>
        <button
          onClick={() => setActiveTab("paid")}
          className={`text-lg font-semibold ${activeTab === "paid" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
        >
          Paid Bills
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredBills.map((bill) => (
          <div key={bill.id} className="p-4 border rounded-md bg-white shadow-sm flex flex-col">
            <p className="font-semibold">{bill.doctor}</p>
            <p>Hospital: {bill.hospital}</p>
            <p>Date: {bill.date}</p>
            <p>Time: {bill.time}</p>
            <p>Total: ₹{bill.amount.toLocaleString()}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleViewInvoice(bill)}
                className="bg-gray-100 p-2 rounded text-gray-600"
              >
                <FaEye />
              </button>
              {!bill.isPaid && (
                <button
                  className="bg-customBlue text-white py-2 px-4 rounded"
                  onClick={() => handlePayNow(bill)}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showInvoice && selectedBill && (
        <InvoiceModal
          bill={selectedBill}
          onClose={() => setShowInvoice(false)}
          onPay={() => {
            setShowInvoice(false);
            setShowPaymentType(true);
          }}
          showPayButton={!selectedBill.isPaid}
        />
      )}

      {showPaymentType && selectedBill && (
        <PaymentTypeModal
          bill={selectedBill}
          onClose={() => setShowPaymentType(false)}
        />
      )}
    </div>
  );
};

export default BillPage;
