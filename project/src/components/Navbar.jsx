import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🏥 Hospital Management</h2>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/" className={isActive('/') ? 'nav-link active' : 'nav-link'}>
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/patients" className={isActive('/patients') ? 'nav-link active' : 'nav-link'}>
            👤 Patients
          </Link>
        </li>
        <li>
          <Link to="/doctors" className={isActive('/doctors') ? 'nav-link active' : 'nav-link'}>
            👨‍⚕️ Doctors
          </Link>
        </li>
        <li>
          <Link to="/appointments" className={isActive('/appointments') ? 'nav-link active' : 'nav-link'}>
            📅 Appointments
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;