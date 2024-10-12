import React, { useState } from 'react';

const AddFieldModal = ({ open, handleClose, handleAddField }) => {
  const [fieldType, setFieldType] = useState('Dropdown');
  const [selectionType, setSelectionType] = useState('Single');
  const [dropdownOptions, setDropdownOptions] = useState(['']);
  const [textFieldLabel, setTextFieldLabel] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...dropdownOptions];
    newOptions[index] = value;
    setDropdownOptions(newOptions);
  };

  const addOptionField = () => {
    setDropdownOptions([...dropdownOptions, '']);
  };

  const handleAdd = () => {
    handleAddField({
      type: fieldType,
      options: dropdownOptions.filter(Boolean),
      label: textFieldLabel,
    });
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Field</h2>

        {/* Field Type Radio Group */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Field Type</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Dropdown"
                checked={fieldType === 'Dropdown'}
                onChange={(e) => setFieldType(e.target.value)}
                className="form-radio text-blue-500"
              />
              <span>Dropdown</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Text Field"
                checked={fieldType === 'Text Field'}
                onChange={(e) => setFieldType(e.target.value)}
                className="form-radio text-blue-500"
              />
              <span>Text Field</span>
            </label>
          </div>
        </div>

        {/* Dropdown Options */}
        {fieldType === 'Dropdown' && (
          <>
            <label className="block font-semibold mb-2">Selection Type</label>
            <select
              value={selectionType}
              onChange={(e) => setSelectionType(e.target.value)}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            >
              <option value="Single">Single</option>
              <option value="Multiple">Multiple</option>
            </select>

            {dropdownOptions.map((option, index) => (
              <input
                key={index}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full mb-2 border border-gray-300 rounded px-3 py-2"
                placeholder={`Value ${index + 1}`}
              />
            ))}
            <button
              onClick={addOptionField}
              className="text-blue-500 hover:text-blue-700 text-sm mt-2"
            >
              + Add Option
            </button>
          </>
        )}

        {/* Text Field Label */}
        {fieldType === 'Text Field' && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Text Field Label</label>
            <input
              type="text"
              value={textFieldLabel}
              onChange={(e) => setTextFieldLabel(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
