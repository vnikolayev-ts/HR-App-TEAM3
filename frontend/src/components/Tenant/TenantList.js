
import React from "react";
import { Link } from 'react-router-dom';

import Layout from '../Layout/Layout';


import { useEffect, useState } from 'react';

import {  getTenants } from "../../api/ClientApi";

import { setPageTitle} from '../Utils/Utils'; 



const TenantList = () => {
  const [tenantData, setTenatData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const isDataFromLocal = true;
      const data = await getTenants(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
      setTenatData(data);
     const title ="Tenant List ";
     setPageTitle(title);
  

    } catch (error) {
      console.error('Error fetching HR data:', error);
      // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
      return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
    }
  };

  fetchData(); // Aufruf der fetchData Funktion, die daten aufruft

}, [tenantData]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

if (!tenantData) {
  return <p>Loading...</p>; // Anzeige während des Ladens der Daten
}



    return (
        <Layout>
            <Link to={'/tenant-create'} > <button class="createButton"  >Create Tenant</button> </Link>
          <div>
            {tenantData.tenants.map((tenant) => (
            <div key={(tenant.tenantId)}>
                <div>{tenant.name}</div>
                <div>{tenant.tenantId}</div>
                <div class="action-list-item">
                  <Link to={`/tenant/${tenant.tenantId}`} > <button class="viewButton"  >Details</button> </Link>
              </div>
            </div>        
            ))}
          </div>
          <div class="tenant-action-list-item">
          </div>
      </Layout>
  );   
};

  

export default TenantList; 