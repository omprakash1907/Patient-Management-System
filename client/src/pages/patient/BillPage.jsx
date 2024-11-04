import React, { useEffect, useState } from "react";
import PaymentTypeModal from "../../components/Patient/PaymentTypeModal";
import InvoiceModal from "../../components/Patient/InvoiceModal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";
import noRecordImage from "../../assets/images/norecord.png";
import api from "../../api/api";

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeTab, setActiveTab] = useState("unpaid");
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([{ label: "Bills", path: "/patient/bills" }]);
  }, []);

  useEffect(() => {
    const fetchUserBills = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/invoice", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBills(response.data.data || []);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchUserBills();
  }, []);

  const handleViewInvoice = async (bill) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token not found in localStorage");
        return;
      }
      
      console.log("Authorization token found:", token);

      console.log(bill._id)
      
      const response = await api.get(`/invoice/${bill._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setSelectedBill(response.data.invoice);
      setShowInvoice(true);
      console.log("Invoice data set:", response.data.invoice);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
  };
  

  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setShowPaymentType(true);
  };

  const filteredBills = bills.filter((bill) =>
    activeTab === "paid" ? bill.status === "Paid" : bill.status === "Unpaid"
  );

  return (
    <div className="m-6 p-6 bg-white rounded-lg h-full">
      <div className="mb-4 flex space-x-6 border-b">
        <button
          onClick={() => setActiveTab("unpaid")}
          className={`text-lg font-semibold px-3 ${
            activeTab === "unpaid" ? "text-customBlue border-b-2 border-customBlue" : "text-gray-500"
          }`}
        >
          Unpaid Bills
        </button>
        <button
          onClick={() => setActiveTab("paid")}
          className={`text-lg font-semibold px-3 ${
            activeTab === "paid" ? "text-customBlue border-b-4 border-customBlue" : "text-gray-500"
          }`}
        >
          Paid Bills
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">{activeTab === "unpaid" ? "Unpaid Bills" : "Paid Bills"}</h2>

      {filteredBills.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={noRecordImage} alt="No records found" className="w-64 mb-4" />
          <p className="text-gray-500 text-lg">No records found</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredBills.map((bill) => (
            <div key={bill._id} className="border border-gray-100 rounded-xl bg-white flex flex-col">
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-t-md">
                <p className="font-semibold">
                  {bill.doctor ? `Dr. ${bill.doctor.firstName} ${bill.doctor.lastName}` : "Doctor information unavailable"}
                </p>
                <button onClick={() => handleViewInvoice(bill)} className="text-lg p-1 rounded-lg bg-white text-customBlue">
                  <FaEye />
                </button>
              </div>
              <div className="text-sm p-2">
                <p className="flex justify-between py-1">
                  <span className="font-medium text-gray-500">Hospital Name</span> {bill.hospital ? bill.hospital.name : "Hospital information unavailable"}
                </p>
                <p className="flex justify-between py-1">
                  <span className="font-medium text-gray-500">Bill Created Date</span> {bill.billDate ? new Date(bill.billDate).toLocaleDateString() : "N/A"}
                </p>
                <p className="flex justify-between py-1">
                  <span className="font-medium text-gray-500">Bill Created Time</span> {bill.billTime || "N/A"}
                </p>
                <p className="text-red-500 font-semibold flex justify-between py-1">
                  <span className="font-medium text-gray-500">Total Bill Amount</span> ₹{bill.totalAmount ? bill.totalAmount.toLocaleString() : "N/A"}
                </p>
              </div>
              <div className="flex justify-end p-2">
                {bill.status === "Unpaid" && (
                  <button className="bg-customBlue text-white py-2 px-4 rounded-lg font-semibold w-full" onClick={() => handlePayNow(bill)}>
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showInvoice && selectedBill && (
        <InvoiceModal
          bill={selectedBill}
          onClose={() => {
            setShowInvoice(false);
            console.log("InvoiceModal closed");
          }}
          onPay={() => {
            setShowInvoice(false);
            setShowPaymentType(true);
          }}
          showPayButton={selectedBill.status === "Unpaid"}
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
