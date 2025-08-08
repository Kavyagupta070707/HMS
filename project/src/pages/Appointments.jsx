import React, { useState, useEffect } from 'react';
import { appointmentAPI } from '../services/api';
import AppointmentModal from '../components/AppointmentModal';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll();
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setShowModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentAPI.delete(id);
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error deleting appointment');
      }
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      await appointmentAPI.update(id, { status: 'Completed' });
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Error updating appointment');
    }
  };

  const handleSaveAppointment = async (appointmentData) => {
    try {
      if (selectedAppointment) {
        await appointmentAPI.update(selectedAppointment._id, appointmentData);
      } else {
        await appointmentAPI.create(appointmentData);
      }
      fetchAppointments();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Error saving appointment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Scheduled': 'status-scheduled',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return `status-badge ${badges[status] || ''}`;
  };

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Appointments</h1>
        </div>
        <div className="card">
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Appointments</h1>
        <button className="btn btn-primary" onClick={handleAddAppointment}>
          ➕ Schedule New Appointment
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No appointments found. Click "Schedule New Appointment" to get started.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td style={{ fontWeight: '600' }}>{appointment.patient_name}</td>
                  <td>{appointment.doctor_name}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <span className={getStatusBadge(appointment.status)}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {appointment.status === 'Scheduled' && (
                        <button
                          className="btn btn-success"
                          onClick={() => handleMarkComplete(appointment._id)}
                          style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                        >
                          ✅ Complete
                        </button>
                      )}
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEditAppointment(appointment)}
                        style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteAppointment(appointment._id)}
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
        <AppointmentModal
          appointment={selectedAppointment}
          onSave={handleSaveAppointment}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Appointments;