

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Login/auth';





const Navbar =()  => {
   
    const isAdmin = localStorage.getItem('loggedInUserIsAdmin');
 


  const [dropdownOpen, setDropdownOpen] = useState(false);
  //const [isAdmin, setIsAdmin] = useState(localStorage.getItem('loggedInUserIsAdmin'));

 



  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
   
    logout();
    navigate('/');
  };


 
  console.log("admin:" + isAdmin);
  return (


    <nav class="navBar">
        
        <Link to="/dashboard" >Home</Link>
        <Link to="/employee" >Employee</Link>
      

      <div className="dropdown">
        <button onClick={toggleDropdown}>Configuration <span className="arrow">▼</span>  </button>
        {dropdownOpen && (
          <div className="dropdownContent">
            
             { isAdmin === "true" && (
                <>
                 <Link to="/user">User</Link>
                 <Link to="/tenant">Tenats</Link>
                </>

                )}
           
            <Link to="/user-profile">Profile</Link>
            <button class="logout" onClick={handleLogout}>Logout</button>

           

          </div>
    
        )}
         
      </div>

      


      
    </nav>
  );
};



export default Navbar;

