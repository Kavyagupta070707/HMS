import React, { useState, useEffect } from 'react';

const PatientModal = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    disease: '',
    admit_date: ''
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        age: patient.age || '',
        gender: patient.gender || '',
        phone: patient.phone || '',
        address: patient.address || '',
        disease: patient.disease || '',
        admit_date: patient.admit_date ? new Date(patient.admit_date).toISOString().split('T')[0] : ''
      });
    }
  }, [patient]);

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
    if (!formData.name || !formData.age || !formData.gender || !formData.phone || 
        !formData.address || !formData.disease || !formData.admit_date) {
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
            {patient ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              min="0"
              max="150"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Disease *</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Admit Date *</label>
            <input
              type="date"
              name="admit_date"
              value={formData.admit_date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {patient ? 'Update Patient' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;