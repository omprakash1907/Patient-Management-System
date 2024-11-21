import React, { useEffect, useState } from "react";

const SummaryCard = ({ icon: Icon, title, colorClass, darkColorClass, fetchData }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setValue(result);
      } catch (error) {
        console.error(`Error fetching data for ${title}:`, error);
      }
    };

    getData();
  }, [fetchData, title]);

  return (
    <div className="relative bg-white p-4 rounded-xl overflow-hidden flex items-center">
      {/* Left Clip Path Element */}
      <div
        className={`${darkColorClass} absolute left-0 h-14 w-2 rounded-tr-lg rounded-br-lg z-10`}
      ></div>

      {/* Icon */}
      <div className={`${colorClass} p-2 rounded-full mr-4 relative z-10`}>
        <Icon className="text-2xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col text-left relative z-10">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
