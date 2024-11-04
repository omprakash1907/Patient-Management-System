import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import noBilling from "../../assets/images/nodoctor.png"; // Placeholder image when no bills are found
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

const BillingTable = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await api.get("/invoice");
        setBills(response.data.data); // Assuming data structure based on your API
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const statusStyles = {
    Paid: "bg-green-100 text-green-600",
    Unpaid: "bg-red-100 text-red-600",
  };

  const handleViewInvoice = (bill) => {
    navigate(`/admin/invoice/${bill._id}/${bill.patient?.firstName}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl  h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Billing & Payments</h2>
        <Link to="/admin/create-bill">
          <button className="px-4 py-2 bg-customBlue text-white text-sm font-medium rounded-lg ">
            Create Bills
          </button>
        </Link>
      </div>

      {/* Pending Bills Info */}
      <Link to="/admin/pending-invoice">
        <div className="mb-4  ">
          <strong>
            {" "}
            Pending Bills :
            {bills.filter((bill) => bill.status === "Unpaid").length}
          </strong>
        </div>
      </Link>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : bills.length > 0 ? (
        <div className="overflow-auto max-h-96">
          <table className="w-full bg-white rounded-lg overflow-hidden text-left border-collapse">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="p-3 text-sm font-semibold border-b">Bill No</th>
                <th className="p-3 text-sm font-semibold border-b">
                  Patient Name
                </th>
                <th className="p-3 text-sm font-semibold border-b">
                  Disease Name
                </th>
                <th className="p-3 text-sm font-semibold border-b">Status</th>
                <th className="p-3 text-sm font-semibold border-b">Action</th>
              </tr>
            </thead>
            <tbody className=" over0">
              {bills.map((bill, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-400">
                      {bill.billNumber}
                    </span>
                  </td>
                  <td className="p-3">
                    {bill.patient
                      ? `${bill.patient.firstName} ${bill.patient.lastName}`
                      : "N/A"}
                  </td>
                  <td className="p-3">{bill.diseaseName}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        statusStyles[bill.status]
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleViewInvoice(bill)}
                      className="text-customBlue bg-gray-100 p-1 rounded-lg "
                      disabled={!bill.patient} // Disable the button if patient is null
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={noBilling} alt="No Billing Data" className="w-48 mb-4" />
          <p className="text-gray-500">No Bills Found</p>
        </div>
      )}
    </div>
  );
};

export default BillingTable;
