import React, { useState, useEffect } from 'react';
import { doctorAPI } from '../services/api';
import DoctorModal from '../components/DoctorModal';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAll();
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setShowModal(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorAPI.delete(id);
        fetchDoctors();
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Error deleting doctor');
      }
    }
  };

  const handleSaveDoctor = async (doctorData) => {
    try {
      if (selectedDoctor) {
        await doctorAPI.update(selectedDoctor._id, doctorData);
      } else {
        await doctorAPI.create(doctorData);
      }
      fetchDoctors();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Error saving doctor');
    }
  };

  const getStatusBadge = (availability) => {
    const badges = {
      'Available': 'status-available',
      'Busy': 'status-busy',
      'On Leave': 'status-leave'
    };
    return `status-badge ${badges[availability] || ''}`;
  };

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Doctors</h1>
        </div>
        <div className="card">
          <p>Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Doctors</h1>
        <button className="btn btn-primary" onClick={handleAddDoctor}>
          ➕ Add New Doctor
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No doctors found. Click "Add New Doctor" to get started.
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td style={{ fontWeight: '600' }}>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.email}</td>
                  <td>
                    <span className={getStatusBadge(doctor.availability)}>
                      {doctor.availability}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEditDoctor(doctor)}
                        style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteDoctor(doctor._id)}
                        style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <DoctorModal
          doctor={selectedDoctor}
          onSave={handleSaveDoctor}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Doctors;