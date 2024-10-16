import { useState } from "react";

const CashPaymentModal = ({ bill, closeModal }) => {
    const [paymentAmount, setPaymentAmount] = useState("");
  
    const handlePayment = () => {
      console.log("Processing payment of:", paymentAmount);
      closeModal();
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4">Cash Payment</h2>
          <input
            type="number"
            placeholder="Enter Amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="border p-2 rounded-lg w-full mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button onClick={closeModal} className="px-4 py-2 border rounded-md text-gray-500">Cancel</button>
            <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 text-white rounded-md">Pay</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CashPaymentModal;