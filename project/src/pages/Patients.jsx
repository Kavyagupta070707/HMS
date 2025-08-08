import React, { useState, useEffect } from 'react';
import { patientAPI } from '../services/api';
import PatientModal from '../components/PatientModal';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await patientAPI.getAll();
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setLoading(false);
    }
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowModal(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientAPI.delete(id);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Error deleting patient');
      }
    }
  };

  const handleSavePatient = async (patientData) => {
    try {
      if (selectedPatient) {
        await patientAPI.update(selectedPatient._id, patientData);
      } else {
        await patientAPI.create(patientData);
      }
      fetchPatients();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving patient:', error);
      alert('Error saving patient');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Patients</h1>
        </div>
        <div className="card">
          <p>Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Patients</h1>
        <button className="btn btn-primary" onClick={handleAddPatient}>
          ➕ Add New Patient
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Disease</th>
              <th>Admit Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No patients found. Click "Add New Patient" to get started.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient._id}>
                  <td style={{ fontWeight: '600' }}>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.disease}</td>
                  <td>{formatDate(patient.admit_date)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEditPatient(patient)}
                        style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeletePatient(patient._id)}
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
        <PatientModal
          patient={selectedPatient}
          onSave={handleSavePatient}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Patients;