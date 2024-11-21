import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CashPaymentModal = ({ open, handleClose, handlePayment, totalAmount, paidAmount }) => {
  const [amount, setAmount] = useState('');
  const [isPayEnabled, setIsPayEnabled] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(totalAmount - paidAmount);

  useEffect(() => {
    setRemainingAmount(totalAmount - paidAmount);
  }, [totalAmount, paidAmount]);

  // Validate payment amount and enable/disable Pay button
  const handleAmountChange = (e) => {
    const enteredAmount = parseFloat(e.target.value);
    setAmount(enteredAmount);
    setIsPayEnabled(enteredAmount > 0 && enteredAmount <= remainingAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPayEnabled) {
      handlePayment(amount); // Call the handlePayment function with the entered amount
      handleClose(); // Close the modal after successful payment
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: "Something went wrong!",
        confirmButtonText: "Try Again",
      });
    }
    Swal.fire({
      icon: "success",
      title: "Payment successfully!!",
      text: "Your operation was successful.",
      confirmButtonText: "OK",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Cash Payment</h2>
        <p className="text-sm text-gray-600 mb-2">Total Amount: ₹{totalAmount}</p>
        <p className="text-sm text-gray-600 mb-2">Paid Amount: ₹{paidAmount}</p>
        <p className="text-sm text-gray-600 mb-4">Remaining Amount: ₹{remainingAmount}</p>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-8">
            <input
              type="number"
              placeholder="₹ 00000"
              value={amount}
              onChange={handleAmountChange}
              className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">
              Enter Amount
            </label>
          </div>
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 border rounded-lg text-gray-500 w-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isPayEnabled}
              className={`px-4 py-2 rounded-lg w-full ${
                isPayEnabled
                  ? "bg-customBlue text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashPaymentModal;
