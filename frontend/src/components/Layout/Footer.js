

import React, { useState } from 'react';
import { getCurrentYear } from '../Utils/Utils'; 
import { getLogUser } from '../../api/ClientApi';



const Footer =()  => {
   /* const loggedInUser = localStorage.getItem('loggedInUser');
    const isAdmin = localStorage.getItem('loggedInUserIsAdmin');
    const userTypeString = isAdmin === "false" ?  "user" : "admin";

*/
const loggedInUser = getLogUser();



  return (


    <div id="footer">
        
        <div className='copyrightInfo'> &copy; {getCurrentYear()} - copyright by Techstarter Team 3</div>  
        <div className='logInfo'> {loggedInUser && (<span>Angemeldet als: {loggedInUser.username} ({getLogUser().admin === 0 ?  "user" : "admin"}) </span> )}  </div>
    
    </div>
  );
};



export default Footer;

