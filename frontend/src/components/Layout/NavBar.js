

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Login/auth';


const lUser = localStorage.getItem('loginUser');
const loginUser = JSON.parse(lUser);
const isAdmin = true;

const Navbar =()  => {


   
   const [dropdownOpen, setDropdownOpen] = useState(false);


   const navigate = useNavigate();


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  

  const handleLogout = () => {
    
    logout();
    navigate('/');
  };

  
 
  console.log("admin:" + isAdmin);
  return (


    <nav className="navBar">
        
        <Link to="/dashboard" >Home</Link>
        <Link to="/employee" >Employee</Link>
      

      <div className="dropdown">
        <button onClick={toggleDropdown}>Configuration <span className="arrow">▼</span>  </button>
        {dropdownOpen && (
          <div className="dropdownContent">
            
             {  isAdmin === true && (
                <>
                 <Link to="/user">User</Link>
                 <Link to="/tenant">Tenats</Link>
                </>

                )}
           <Link to={`/user-profile/${loginUser.userId}`}>Profile</Link>
     
            <button class="logout" onClick={handleLogout}>Logout</button>

           

          </div>
    
        )}
         
      </div>

      


      
    </nav>
  );
};



export default Navbar;

