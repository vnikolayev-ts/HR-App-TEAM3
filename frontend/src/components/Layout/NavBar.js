// Navbar.js
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout as performLogout } from '../Login/auth';
import ThemeToggler from './ThemeToggler';

const lUser = localStorage.getItem('loginUser');
const loginUser = JSON.parse(lUser);
var isAdmin = false;
var isSuperAdmin = false;



const Navbar = ({  toggleTheme }) => {

  const resetTheme = () => {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };
  

  if (loginUser){
    if (loginUser.admin === 1) isAdmin = true;
    if (loginUser.superadmin === 1) isSuperAdmin = true;
  }
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    performLogout();
    resetTheme(); // Reset theme to light
    navigate('/');
  };

  return (
    <nav className="navBar">
     
      <Link className="navigation" to="/dashboard" >Home</Link>
      <Link className="navigation" to="/employee" >Employee</Link>
      <Link className="navigation" to={`/user-profile/${loginUser.userId}`}>Profile</Link>
      {isAdmin && (
        <div className="dropdown">
          <Link className="navigation" onClick={toggleDropdown}>Setup<span className="arrow">▼</span></Link>
          {dropdownOpen && (
            <div className="dropdownContent">
          
              <Link className="navi" to="/user">User</Link>
              {isSuperAdmin && (
                <>
                  
                  <Link className="navi" to="/tenant">Tenats</Link>
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
