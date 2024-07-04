import { getTenats } from "./ClientApi";


import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


import Navbar from './NavBar';

import Layout from './Layout';

const TenantList = () => {
  
  const [tenantData, setTenantData] = useState(null);
  const [layout, setLayout] = useState("simple");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getTenats(isDataFromLocal); //Datenaufruf getTenants
        const apiLayout = data.layout;

        setTenantData(data);
        setLayout(apiLayout);

      } catch (error) {
        console.error('Error fetching Tenant data:', error);
        //Ggf. zusätzl. Fehlerbeh., wie z.B. eine Fehlermeldung möglich.
        return <p>Loading... Error </p>; // Ladeanzeige 
      }
    };

    fetchData(); // Aufruf fetchData für getTenants

  }, [tenantData, layout] ); //Leeres Array als 2. Argument, damit useEffect nur 1 mal durchläuft.  

  if (!tenantData) {
    return <p>Loading...</p>; // Ladeanzeige
  }

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