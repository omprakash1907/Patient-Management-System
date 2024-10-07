import React, { useState } from "react";
import PaymentMethodModal from "./PaymentMethodModal";

const PaymentTypeModal = ({ bill, onClose }) => {
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentType, setPaymentType] = useState(null);

  const handlePaymentTypeSelection = (type) => {
    setPaymentType(type);
    if (type === "Online") setShowPaymentMethod(true);
    else onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-lg font-semibold mb-4">Select Payment Type</h2>
        <div className="space-y-2">
          <button
            className={`w-full py-2 px-4 rounded ${paymentType === "Online" ? "bg-blue-100" : ""}`}
            onClick={() => handlePaymentTypeSelection("Online")}
          >
            Online
          </button>
          <button
            className={`w-full py-2 px-4 rounded ${paymentType === "Cash" ? "bg-blue-100" : ""}`}
            onClick={() => handlePaymentTypeSelection("Cash")}
          >
            Cash
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
          {paymentType && <button onClick={() => handlePaymentTypeSelection(paymentType)} className="px-4 py-2 rounded bg-customBlue text-white">Pay Now</button>}
        </div>
      </div>
      {showPaymentMethod && <PaymentMethodModal bill={bill} onClose={onClose} />}
    </div>
  );
};

export default PaymentTypeModal;
