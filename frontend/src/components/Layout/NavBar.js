

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Login/auth';


const lUser = localStorage.getItem('loginUser');
const loginUser = JSON.parse(lUser);
var isAdmin = false;



const Navbar =()  => {

  if (loginUser){

    if (loginUser.admin === true) isAdmin = true;
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

  
 
  //console.log("admin:" + isAdmin);
  return (


    <nav className="navBar">
        
        <Link to="/dashboard" >Home</Link>
        <Link to="/employee" >Employee</Link>
      

      <div className="dropdown">
        <button clasName="configButton" onClick={toggleDropdown}>Configuration <span className="arrow">▼</span>  </button>
        {dropdownOpen && (
          <div className="dropdownContent">
            
             {  JSON.parse(lUser).admin === true && (
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

