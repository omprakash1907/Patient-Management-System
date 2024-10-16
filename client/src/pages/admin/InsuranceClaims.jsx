import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaSearch } from "react-icons/fa";
import api from "../../api/api";

const InsuranceClaims = () => {
  const navigate = useNavigate();
  const [insuranceClaimsData, setInsuranceClaimsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch insurance claims data from API
  useEffect(() => {
    const fetchInsuranceClaims = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInsuranceClaimsData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching insurance claims:", error);
      }
    };
    fetchInsuranceClaims();
  }, []);

  // Filter data based on search term and check if insurance details are present
  const filteredData = insuranceClaimsData.filter((claim) => {
    const lowercasedTerm = searchTerm.toLowerCase();

    // Check for insurance details presence
    const hasInsurance =
      claim.insuranceDetails && claim.insuranceDetails.insuranceCompany;

    // Proceed to filter only if insurance details are present
    return (
      hasInsurance &&
      ((claim.billNumber?.toString() || "").includes(lowercasedTerm) ||
        `${claim.doctor?.firstName || ""} ${claim.doctor?.lastName || ""}`
          .toLowerCase()
          .includes(lowercasedTerm) ||
        `${claim.patient?.firstName || ""} ${claim.patient?.lastName || ""}`
          .toLowerCase()
          .includes(lowercasedTerm) ||
        (claim.diseaseName?.toLowerCase() || "").includes(lowercasedTerm) ||
        (
          claim.insuranceDetails?.insuranceCompany?.toLowerCase() || ""
        ).includes(lowercasedTerm) ||
        (claim.insuranceDetails?.insurancePlan?.toLowerCase() || "").includes(
          lowercasedTerm
        ))
    );
  });

  const handleViewDetails = (billId) => {
    console.log(billId);
    navigate(`/admin/invoice/${billId}/${billId.doctor?.firstName}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 space-x-4">
        <h2 className="text-xl font-semibold">Insurance Claims</h2>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Insurance Claims Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Bill Number</th>
              <th className="px-6 py-4 text-left">Doctor Name</th>
              <th className="px-6 py-4 text-left">Patient Name</th>
              <th className="px-6 py-4 text-left">Disease Name</th>
              <th className="px-6 py-4 text-left">Insurance Company</th>
              <th className="px-6 py-4 text-left">Insurance Plan</th>
              <th className="px-6 py-4 text-left">Bill Date</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((claim, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-blue-500 cursor-pointer">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {claim.billNumber || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {`${claim.doctor?.firstName || ""} ${
                      claim.doctor?.lastName || ""
                    }`.trim() || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {`${claim.patient?.firstName || ""} ${
                      claim.patient?.lastName || ""
                    }`.trim() || "N/A"}
                  </td>
                  <td className="px-6 py-4">{claim.diseaseName || "N/A"}</td>
                  <td className="px-6 py-4">
                    {claim.insuranceDetails?.insuranceCompany || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-blue-600">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {claim.insuranceDetails?.insurancePlan || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {claim.billDate
                      ? new Date(claim.billDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-customBlue bg-gray-100 p-2 rounded-lg"
                      onClick={() => handleViewDetails(claim._id)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No insurance claims found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceClaims;
