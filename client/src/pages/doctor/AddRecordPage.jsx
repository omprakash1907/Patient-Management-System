import React, { useState } from "react";
import api from "../../api/api";

const AddRecordPage = ({ open, onClose, patientId, doctorId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadProgress(0); // Reset upload progress
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("patientId", patientId);
    formData.append("doctorId", doctorId);

    try {
      const response = await api.post("/patients/patient/records", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });

      console.log("Record added successfully:", response.data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        "Error uploading record:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error uploading record: " +
          (error.response
            ? error.response.data.message
            : "Failed to upload the record")
      );
    }
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg mx-4">
        <h2 className="text-lg font-semibold mb-4">Add Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Field */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg, .gif"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <path d="M21 15l-5-5L5 21"></path>
                </svg>
                <p className="text-blue-500">Upload a file</p>
                <p className="text-gray-400 text-sm">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Description Field */}
          <div className="relative mb-4">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="peer border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:border-blue-500"
              rows={3}
              required
              placeholder=" "
            />
            <label
              htmlFor="description"
              className="absolute left-4  px-1 bg-white text-sm font-medium  transition-all duration-200 transform   -top-2.5 "
            >
              Description
            </label>
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="text-sm">{uploadProgress}%</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md w-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-customBlue text-white rounded-md w-full"
              disabled={!file}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecordPage;
