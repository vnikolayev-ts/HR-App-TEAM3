

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from './auth';
import '../style/navbar.css';




const Navbar =()  => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const isAdmin = localStorage.getItem('loggedInUserIsAdmin');
 


  const [dropdownOpen, setDropdownOpen] = useState(false);
  //const [isAdmin, setIsAdmin] = useState(localStorage.getItem('loggedInUserIsAdmin'));

 

  const userTypeString = isAdmin === "false" ?  "user" : "admin";

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('loggedInUser', null);
    localStorage.setItem('loggedInUserIsAdmin', null);
    logout();
    navigate('/');
  };


 

  return (


    <nav class="navBar">
        
        <Link to="/dashboard" >Home</Link>
        <Link to="/employee" >Employee</Link>
        <div class="logInfo"> {loggedInUser && (<span>Angemeldet als: {loggedInUser} ({userTypeString}) </span> )}  </div>

      <div className="dropdown">
        <button onClick={toggleDropdown}>Configuration <span className="arrow">▼</span>  </button>
        {dropdownOpen && (
          <div className="dropdownContent">

             { isAdmin === "true" && (
                <>
                 <Link to="/user">User</Link>
                 <Link to="/tenat">Tenats</Link>
                </>

                )}
           
            <Link to="/profile">Profile</Link>
            <button class="logout" onClick={handleLogout}>Logout</button>

           

          </div>
    
        )}
         
      </div>

      


      
    </nav>
  );
};



export default Navbar;

