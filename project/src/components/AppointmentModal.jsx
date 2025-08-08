import React, { useState, useEffect } from 'react';

const AppointmentModal = ({ appointment, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    patient_name: '',
    doctor_name: '',
    date: '',
    time: '',
    status: 'Scheduled'
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        patient_name: appointment.patient_name || '',
        doctor_name: appointment.doctor_name || '',
        date: appointment.date ? new Date(appointment.date).toISOString().split('T')[0] : '',
        time: appointment.time || '',
        status: appointment.status || 'Scheduled'
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.patient_name || !formData.doctor_name || !formData.date || 
        !formData.time || !formData.status) {
      alert('Please fill in all fields');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {appointment ? 'Edit Appointment' : 'Schedule New Appointment'}
          </h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Patient Name *</label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Doctor Name *</label>
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {appointment ? 'Update Appointment' : 'Schedule Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;