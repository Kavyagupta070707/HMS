const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient_name: {
    type: String,
    required: true,
    trim: true
  },
  doctor_name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);