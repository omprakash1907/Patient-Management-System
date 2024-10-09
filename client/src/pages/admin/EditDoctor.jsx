import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditDoctor = () => {
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState({
    name: '',
    qualification: '',
    // Other fields
  });

  useEffect(() => {
    // Fetch doctor data by id and setDoctorData
  }, [id]);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update doctor
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Doctor Detail</h2>
      <form onSubmit={handleSubmit}>
        {/* Fields similar to AddDoctor */}
      </form>
    </div>
  );
};

export default EditDoctor;
