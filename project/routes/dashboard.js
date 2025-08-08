const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// GET dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [patientsCount, doctorsCount, appointmentsCount] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments()
    ]);

    res.json({
      patients: patientsCount,
      doctors: doctorsCount,
      appointments: appointmentsCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;