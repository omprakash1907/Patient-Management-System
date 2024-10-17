import { useState } from "react";

const CashPaymentModal = ({ bill, closeModal }) => {
  const [paymentAmount, setPaymentAmount] = useState("");

  const handlePayment = () => {
    console.log("Processing payment of:", paymentAmount);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Cash Payment</h2>
        <div className="relative mb-8">
          <input
            type="number"
            placeholder="$ 00000"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">
            Enter Amount
          </label>
        </div>
        <div className="flex justify-between space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded-lg text-gray-500 w-full"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-gray-50 hover:text-white hover:bg-customBlue  rounded-lg w-full"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashPaymentModal;
