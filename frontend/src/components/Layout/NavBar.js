// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Login/auth';

const lUser = localStorage.getItem('loginUser');
const loginUser = JSON.parse(lUser);
var isAdmin = false;
var isSuperAdmin = false;

const Navbar = () => {
  if (loginUser) {
    if (loginUser.admin === 1) isAdmin = true;
    if (loginUser.superadmin === 1) isSuperAdmin = true;
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navBar">
      <Link className="navigation" to="/dashboard">Home</Link>
      <Link className="navigation" to="/employee">Employee</Link>
      <Link className="navigation" to={`/user-profile/${loginUser.userId}`}>Profile</Link>
      {isAdmin && (
        <div className="dropdown">
          <Link className="navigation" onClick={toggleDropdown}>Setup<span className="arrow">▼</span></Link>
          {dropdownOpen && (
            <div className="dropdownContent">
              <label className="navi1"></label>
              <Link className="navi" to="/user">User</Link>
              {isSuperAdmin && (
                <>
                  <label className="navi1"></label>
                  <Link className="navi" to="/tenant">Tenants</Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
      <button className="logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
