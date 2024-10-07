import React, { useState } from "react";

const PaymentMethodModal = ({ bill, onClose }) => {
  const [selectedCard, setSelectedCard] = useState("MasterCard");
  const [cardDetails, setCardDetails] = useState({ holder: "", number: "", expiry: "", cvv: "" });

  const handlePay = () => {
    // Logic to process payment can be added here
    alert("Payment Successful");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="space-y-2">
          <button className={`w-full py-2 px-4 rounded ${selectedCard === "MasterCard" ? "bg-blue-100" : ""}`} onClick={() => setSelectedCard("MasterCard")}>MasterCard</button>
          <button className={`w-full py-2 px-4 rounded ${selectedCard === "Visa" ? "bg-blue-100" : ""}`} onClick={() => setSelectedCard("Visa")}>Visa</button>
        </div>
        <input type="text" placeholder="Card Holder Name" className="w-full p-2 rounded mt-2" onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value })} />
        <input type="text" placeholder="Card Number" className="w-full p-2 rounded mt-2" onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
        <input type="text" placeholder="Expiry Date" className="w-full p-2 rounded mt-2" onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
        <input type="text" placeholder="CVV" className="w-full p-2 rounded mt-2" onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
          <button onClick={handlePay} className="px-4 py-2 rounded bg-customBlue text-white">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
