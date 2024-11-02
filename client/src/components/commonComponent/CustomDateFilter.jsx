import React, { useState } from 'react';

const CustomDateFilter = ({ open, onClose, onApply, onReset }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleApply = () => {
    if (fromDate || toDate) {
      onApply(fromDate, toDate);
    }
    onClose();
  };

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    onReset();
    onClose();
  };

  return (
    <div className={`${open ? 'fixed' : 'hidden'} inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Custom Date</h3>

        <label className="block text-sm font-medium text-gray-700">From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full p-2 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <label className="block text-sm font-medium text-gray-700">To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full p-2 mt-1 mb-4 border border-gray-300 rounded-md"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDateFilter;
