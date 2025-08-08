import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
        </div>
        <div className="card">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div className="stat-number">{stats.patients}</div>
          <div className="stat-label">Total Patients</div>
        </div>
        
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <div className="stat-number">{stats.doctors}</div>
          <div className="stat-label">Total Doctors</div>
        </div>
        
        <div className="stat-card" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
          <div className="stat-number">{stats.appointments}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{marginBottom: '1rem', color: '#374151'}}>Welcome to Hospital Management System</h3>
        <p style={{color: '#6b7280', lineHeight: '1.8'}}>
          This system helps you manage patients, doctors, and appointments efficiently. 
          Use the navigation menu to access different sections of the system.
        </p>
        
        <div style={{marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
          <div style={{padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '2px solid #e5e7eb'}}>
            <h4 style={{marginBottom: '0.5rem', color: '#2563eb'}}>👤 Patient Management</h4>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Add, view, edit, and manage patient records with complete medical information.</p>
          </div>
          
          <div style={{padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '2px solid #e5e7eb'}}>
            <h4 style={{marginBottom: '0.5rem', color: '#059669'}}>👨‍⚕️ Doctor Management</h4>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Manage doctor profiles, specializations, and availability status.</p>
          </div>
          
          <div style={{padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '2px solid #e5e7eb'}}>
            <h4 style={{marginBottom: '0.5rem', color: '#dc2626'}}>📅 Appointment Scheduling</h4>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Schedule, manage, and track patient appointments with doctors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;