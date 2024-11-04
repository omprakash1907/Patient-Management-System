import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import logo from "../../assets/images/logo.png";
import mask from "../../assets/images/invoice-mask.png";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const Invoice = () => {
  const { billId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Monitor Billing", path: "/admin/monitor-billing" },
      { label: "Invoice", path: "/admin/invoice/:billId/:patientName" },
    ]);
  }, []);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await api.get(`/invoice/${billId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInvoiceData(response.data.invoice);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    fetchInvoiceData();
  }, [billId]);

  if (!invoiceData) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" bg-white  rounded-2xl max-w-3xl mx-auto my-10  relative overflow-hidden">
      <div className="p-6">
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
        <div className="flex justify-between mb-3">
          <div className="w-2/3">
            <h2 className="font-semibold text-lg text-gray-700">
              Dr. {invoiceData.doctor.firstName} {invoiceData.doctor.lastName}
            </h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              mattis turpis nulla, finibus sodales est porta eu.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">
              Bill No: {invoiceData.billNumber}
            </p>
            <p className="text-gray-500">
              Bill Date: {new Date(invoiceData.billDate).toLocaleDateString()}
            </p>
            <p className="text-gray-500">Bill Time: {invoiceData.billTime}</p>
          </div>
        </div>

        {/* Doctor and Patient Details */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name : </strong> {invoiceData.patient.firstName}{" "}
              {invoiceData.patient.lastName}
            </p>
            <p>
              <strong>Disease Name : </strong> {invoiceData.diseaseName}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Gender : </strong> {invoiceData.gender}
            </p>
            <p>
              <strong>Phone Number : </strong> {invoiceData.phoneNumber}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Age : </strong> {invoiceData.age} Years
            </p>
            <p>
              <strong>Payment Type : </strong>{" "}
              <span className="text-blue-500">{invoiceData.paymentType}</span>
            </p>
          </div>
          <div className="mt-2">
            <p>
              <strong>Address : </strong> {invoiceData.address}
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <table className="w-full bg-white rounded-lg mb-6 overflow-hidden">
          <thead className="bg-customBlue text-white text-left rounded-t-lg">
            <tr>
              <th className="px-4 py-2 ">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">{invoiceData.description}</td>
              <td className="px-4 py-2">₹ {invoiceData.amount}</td>
              <td className="px-4 py-2">1</td>
              <td className="px-2 py-2">₹ {invoiceData.amount}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary with Conditional Insurance Section */}
        <div className="flex  justify-between">
          {invoiceData.insuranceDetails &&
          invoiceData.insuranceDetails.insuranceCompany ? (
            <>
              <div className="mb-4 text-left">
                <p>
                  <strong>Insurance Company : </strong>{" "}
                  {invoiceData.insuranceDetails.insuranceCompany}
                </p>
                <p>
                  <strong>Insurance Plan : </strong>{" "}
                  {invoiceData.insuranceDetails.insurancePlan}
                </p>
                <p>
                  <strong>Claim Amount : </strong> ₹{" "}
                  {invoiceData.insuranceDetails.claimAmount}
                </p>
                <p>
                  <strong>Claimed Amount : </strong> ₹{" "}
                  {invoiceData.insuranceDetails.claimedAmount}
                </p>
              </div>
            </>
          ) : null}
          <div>
            <p>
              <strong>Amount : </strong> ₹ {invoiceData.amount}
            </p>
            <p>
              <strong>Discount 5% : </strong> ₹ {invoiceData.discount}
            </p>
            <p>
              <strong>Tax : </strong> ₹ {invoiceData.tax}
            </p>
            <p className=" font-semibold text-customBlue">
              <strong>Total Amount : </strong> ₹ {invoiceData.totalAmount}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className=" text-center text-sm bg-customBlue p-2 rounded-b-lg text-white flex justify-between">
        <p>Call: +90854 22354</p>
        <p>Email: Hello@Gmail.com</p>
      </div>
    </div>
  );
};

export default Invoice;
