const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  availability: {
    type: String,
    required: true,
    enum: ['Available', 'Busy', 'On Leave']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);