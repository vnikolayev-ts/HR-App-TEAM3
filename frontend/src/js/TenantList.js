import tenantData from "../data/tenants.json";
import React from "react";
import { Link } from 'react-router-dom';

import Navbar from './NavBar';

const TenantList = () => {
return (
  <div class={layout}>
    <Navbar/>

    <h2 class='pageTitle' >Liste der Kunden {tenant.name} </h2>

    <ul class='list' >
      {tenantData.tenants.map(tenant => ( 
        <li class='listItem' key={tenant.tenantId} >
            <div class="tenantdate" >

              <div class="tenid">{tenant.tenantId}</div>
              <div class='separator'>|</div>
              <div class="tenname">{tenant.name}</div>
              <div class='separator'>|</div>

            </div>



            <div class="tenant-action-list-item">
            <Link to={'/tenant/new'} > <button class="viewButton"  >New</button> </Link>
            </div>
        </li>          
      ))}  
    </ul>
  </div>
  );   
};

  

export default TenantList; 