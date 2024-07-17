// Navbar.js
import { useEffect, useState } from "react";
import { Link  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout as performLogout } from '../Login/auth';
import ThemeToggler from './ThemeToggler';



const Navbar = ({  toggleTheme }) => {

const [loginUser, setLoginUser] = useState(null);
const [isAdmin, setIsAdmin] = useState(false);
const [isSuperAdmin, setIsSuperAdmin] = useState(false);


  const resetTheme = () => {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
   
    if (storedUser) {
      setLoginUser(storedUser);
      setIsAdmin(storedUser.admin === 1);
      setIsSuperAdmin(storedUser.superadmin === 1);
    }
  }, []);
  


  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    performLogout();
    resetTheme(); // Theme zurücksetzen
    navigate('/');
  };

  return (
    <nav className="navBar">
     
      <Link className="navigation" to="/dashboard" >Home</Link>
      <Link className="navigation" to="/employee" >Employee</Link>
      {loginUser && (
        <Link className="navigation" to={`/user-profile/${loginUser.userId}`}>Profile</Link>
      )}
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
