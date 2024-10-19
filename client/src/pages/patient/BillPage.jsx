import React, { useEffect, useState } from "react";
import PaymentTypeModal from "../../components/Patient/PaymentTypeModal";
import InvoiceModal from "../../components/Patient/InvoiceModal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";
import api from "../../api/api"; // Assuming you have an API setup

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeTab, setActiveTab] = useState("unpaid"); // To toggle between paid and unpaid tabs
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([{ label: "Bills", path: "/patient/bills" }]);
  }, []);

  useEffect(() => {
    const fetchUserBills = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/invoice/user/invoice", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userBills = response.data.data || [];
        setBills(userBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchUserBills();
  }, []);

  // Fetch specific invoice details when user clicks "View Invoice"
  const handleViewInvoice = async (bill) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/invoice/${bill._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedBill(response.data.invoice); // Set selected bill with fetched data
      setShowInvoice(true);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
  };

  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setShowPaymentType(true);
  };

  // Filter bills based on the activeTab state ('unpaid' or 'paid')
  const filteredBills = bills.filter((bill) =>
    activeTab === "paid" ? bill.status === "Paid" : bill.status === "Unpaid"
  );

  return (
    <div className="m-6 p-6 bg-white rounded-lg h-full">
      <div className="mb-4 flex space-x-6">
        <button
          onClick={() => setActiveTab("unpaid")}
          className={`text-lg font-semibold px-3 ${activeTab === "unpaid"
              ? "text-customBlue border-b-4 border-customBlue"
              : "text-gray-500"
            }`}
        >
          Unpaid Bills
        </button>
        <button
          onClick={() => setActiveTab("paid")}
          className={`text-lg font-semibold px-3 ${activeTab === "paid"
              ? "text-customBlue border-b-4 border-customBlue"
              : "text-gray-500"
            }`}
        >
          Paid Bills
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredBills.map((bill) => (
          <div key={bill._id} className="p-4 border rounded-lg bg-white flex flex-col">
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-t-md">
              <p className="font-semibold">
                Dr. {bill.doctor.firstName} {bill.doctor.lastName}
              </p>
              <button
                onClick={() => handleViewInvoice(bill)}
                className="text-lg p-1 rounded-lg bg-white text-customBlue"
              >
                <FaEye />
              </button>
            </div>

            <div className="text-sm">
              <p className="flex justify-between py-1">
                <span className="font-medium text-gray-500">Hospital Name</span> {bill.hospital.name}
              </p>
              <p className="flex justify-between py-1">
                <span className="font-medium text-gray-500">Bill Created Date</span>{" "}
                {new Date(bill.billDate).toLocaleDateString()}
              </p>
              <p className="flex justify-between py-1">
                <span className="font-medium text-gray-500">Bill Created Time</span> {bill.billTime}
              </p>
              <p className="text-red-500 font-semibold flex justify-between py-1">
                <span className="font-medium text-gray-500">Total Bill Amount</span> ₹
                {bill.totalAmount.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end mt-2">
              {bill.status === "Unpaid" && (
                <button
                  className="bg-customBlue text-white py-2 px-4 rounded-lg font-semibold w-full"
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
          onClose={() => setShowInvoice(false)} // This is the function that will close the modal
          onPay={() => {
            setShowInvoice(false);
            setShowPaymentType(true);
          }}
          showPayButton={selectedBill.status === "Unpaid"}
        />
      )}

      {showPaymentType && selectedBill && (
        <PaymentTypeModal bill={selectedBill} onClose={() => setShowPaymentType(false)} />
      )}
    </div>
  );
};

export default BillPage;
