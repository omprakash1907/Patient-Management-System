import React from "react";
import { FaTimes } from "react-icons/fa";
import mask from "../../assets/images/invoice-mask.png";
import logo from "../../assets/images/logo.png";   // Hospital logo

const InvoiceModal = ({ bill, onClose, onPay, showPayButton }) => {
  const items = bill?.items || []; // Ensure items are defined

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl max-w-3xl relative z-10 overflow-y-auto max-h-screen">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 cursor-pointer z-10"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo and Header */}
        <div>
          <img src={mask} alt="mask" className=" absolute top-0 left-0" />
          <div className="flex justify-between ">
            <div className="py-4">
              <img
                src={logo}
                alt="Hospital Logo"
                className="w-48 mx-auto mb-4"
              />
            </div>
            <h1 className="text-4xl font-semibold text-customBlue pr-8">
              Invoice
            </h1>
          </div>
        </div>

        {/* Hospital and Patient Details */}
        <div className="flex justify-between mb-3">
          <div className="w-2/3">
            <h2 className="font-semibold text-lg text-gray-700">
              Dr. {bill?.doctor?.firstName} {bill?.doctor?.lastName}
            </h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              mattis turpis nulla, finibus sodales est porta eu.
            </p>
          </div>
          <div>
            <div>
              <p>
                <strong>Bill No:</strong> {bill?.billNumber}
              </p>
              <p>
                <strong>Bill Date:</strong> {new Date(bill?.billDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Bill Time:</strong> {bill?.billTime}
              </p>
            </div>
          </div>
        </div>

        {/* Doctor and Patient Information */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name : </strong> {bill?.patient?.firstName} {bill?.patient?.lastName}
            </p>
            <p>
              <strong>Disease Name : </strong> {bill?.diseaseName}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Gender : </strong> {bill?.patient?.gender}
            </p>
            <p>
              <strong>Phone Number : </strong> {bill?.patient?.phoneNumber}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Age : </strong> {bill?.patient?.age} Years
            </p>
            <p>
              <strong>Payment Type : </strong>
              <span className="text-blue-500">{bill?.paymentType}</span>
            </p>
          </div>
          <div className="mt-2">
            <p>
              <strong>Address : </strong> {bill?.patient?.address}
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <table className="w-full bg-white rounded-lg mb-6 overflow-hidden">
          <thead className="bg-customBlue text-white text-left rounded-t-lg">
            <tr>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">₹ {item.amount}</td>
                  <td className="px-4 py-2">{item.qty}</td>
                  <td className="px-4 py-2">₹ {item.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Summary with Conditional Insurance Section */}
        <div className="flex justify-between">
          {bill?.insuranceDetails?.insuranceCompany ? (
            <div className="mb-4 text-left">
              <p>
                <strong>Insurance Company : </strong> {bill.insuranceDetails.insuranceCompany}
              </p>
              <p>
                <strong>Insurance Plan : </strong> {bill.insuranceDetails.insurancePlan}
              </p>
              <p>
                <strong>Claim Amount : </strong> ₹ {bill.insuranceDetails.claimAmount}
              </p>
              <p>
                <strong>Claimed Amount : </strong> ₹ {bill.insuranceDetails.claimedAmount}
              </p>
            </div>
          ) : null}
          <div>
            <p>
              <strong>Amount : </strong> ₹ {bill?.amount}
            </p>
            <p>
              <strong>Discount 5% : </strong> ₹ {bill?.discount}
            </p>
            <p>
              <strong>Tax : </strong> ₹ {bill?.tax}
            </p>
            <p className="font-semibold text-customBlue">
              <strong>Total Amount : </strong> ₹ {bill?.totalAmount}
            </p>
          </div>
        </div>

        {/* Pay Button */}
        {
          showPayButton && (
            <div className="text-center mt-4">
              <button className="bg-customBlue text-white py-2 px-6 rounded" onClick={onPay}>
                Pay Now
              </button>
            </div>
          )
        }

        {/* Footer */}
        <div className="text-center text-sm bg-customBlue p-2 rounded-b-lg text-white flex justify-between mt-4">
          <p>Call: +90854 22354</p>
          <p>Email: Hello@Gmail.com</p>
        </div>
      </div >
    </div >
  );
};

export default InvoiceModal;
