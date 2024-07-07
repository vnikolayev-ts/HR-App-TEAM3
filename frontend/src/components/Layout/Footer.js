

import React, { useState } from 'react';
import { getCurrentYear } from '../Utils/Utils'; 
import { getLogUser } from '../../api/ClientApi';



const Footer =()  => {
   /* const loggedInUser = localStorage.getItem('loggedInUser');
    const isAdmin = localStorage.getItem('loggedInUserIsAdmin');
    const userTypeString = isAdmin === "false" ?  "user" : "admin";

*/
const loggedInUser = getLogUser();
const userTypeString = loggedInUser.admin === "false" ?  "user" : "admin";


  return (


    <div id="footer">
        
        <div className='copyrightInfo'> &copy; {getCurrentYear()} - copyright by Techstarte Team 3</div>  
        <div className='logInfo'> {loggedInUser && (<span>Angemeldet als: {loggedInUser.username} ({userTypeString}) </span> )}  </div>
    
    </div>
  );
};



export default Footer;

