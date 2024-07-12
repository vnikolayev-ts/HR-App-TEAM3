
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Login/auth';


const lUser = localStorage.getItem('loginUser');
const loginUser = JSON.parse(lUser);
var isAdmin = false;
var isSuperAdmin = false;



const Navbar =()  => {

  if (loginUser){

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

  
 
  //console.log("admin:" + isAdmin);
return (


<nav className="navBar">
    <Link className="navigation" to="/dashboard" >Home</Link>
    <Link className="navigation" to="/employee" >Employee</Link>
    <Link className="navigation" to={`/user-profile/${loginUser.userId}`}>Profile</Link>
    {isAdmin === true && (
      <div className="dropdown">
        <Link className="navigation" onClick={toggleDropdown}>Setup<span className="arrow">▼</span>  </Link>
        {dropdownOpen && (
          <div className="dropdownContent">
            <label>Admin</label> <hr/>
            <Link to="/user">User</Link>
              { isSuperAdmin === true && (
                <>
                <label>Superadmin</label> <hr/>
                 <Link to="/tenant">Tenats</Link>
                </>
                )
             }
          </div>
         )
        }
      </div>   
    )
  }
  <button className="logout" onClick={handleLogout}>Logout</button>


</nav>
  );
};



export default Navbar;

