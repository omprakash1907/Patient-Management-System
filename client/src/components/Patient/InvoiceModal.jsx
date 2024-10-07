import React from "react";
import { FaTimes } from "react-icons/fa";

const InvoiceModal = ({ bill, onClose, onPay, showPayButton }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center" style={{backgroundImage: "../"}}>
      <div className="bg-white p-6 rounded-md shadow-lg w-2/3">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-600">Invoice</h2>
          <button onClick={onClose} className="text-red-500">
            <FaTimes />
          </button>
        </div>

        {/* Hospital and Patient Details */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-500">Hospital</h3>
          <p className="text-gray-600">Dr. {bill.doctor}</p>
          <p className="text-gray-600">{bill.hospital}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>Name:</strong> Miracle Kenter</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Age:</strong> 36 Years</p>
            <p><strong>Address:</strong> B-105 Virat Bungalows, Jamnagar</p>
          </div>
          <div>
            <p><strong>Bill No:</strong> 1234</p>
            <p><strong>Bill Date:</strong> 20 June, 2020</p>
            <p><strong>Bill Time:</strong> 10:45 PM</p>
            <p><strong>Payment Type:</strong> Insurance</p>
          </div>
        </div>

        {/* Itemized List of Services */}
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-2">Description</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample items, replace with actual bill items if available */}
              <tr className="border-b border-gray-200">
                <td className="py-2">Neuromuscular blockers</td>
                <td>₹ 12,000.00</td>
                <td>2</td>
                <td>₹ 24,000.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">Neuromuscular blockers</td>
                <td>₹ 800.00</td>
                <td>2</td>
                <td>₹ 1,600.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">Methotrexate (HDMTX)</td>
                <td>₹ 1,000.00</td>
                <td>2</td>
                <td>₹ 2,000.00</td>
              </tr>
              <tr>
                <td className="py-2">Hydroxyurea for sickle cell</td>
                <td>₹ 20.00</td>
                <td>2</td>
                <td>₹ 40.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p><strong>Insurance Company:</strong> HDFC Life Insurance</p>
            <p><strong>Insurance Plan:</strong> Health Insurance</p>
            <p><strong>Claim Amount:</strong> ₹ 2,000.00</p>
            <p><strong>Claimed Amount:</strong> ₹ 2,500.00</p>
          </div>
          <div className="text-right">
            <p><strong>Amount:</strong> ₹ 25,840.00</p>
            <p><strong>Discount 5%:</strong> -₹ 1,292.00</p>
            <p><strong>Tax:</strong> ₹ 120.00</p>
            <p className="text-xl font-semibold"><strong>Total:</strong> ₹ 24,668.00</p>
          </div>
        </div>

        {/* Footer with Pay Now Button */}
        {showPayButton && (
          <div className="text-center">
            <button
              className="bg-customBlue text-white py-2 px-6 rounded"
              onClick={onPay}
            >
              Pay Now
            </button>
          </div>
        )}

        {/* Contact Info */}
        <div className="text-center mt-6">
          <p>Call: +90854 22354 | Email: hello@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
