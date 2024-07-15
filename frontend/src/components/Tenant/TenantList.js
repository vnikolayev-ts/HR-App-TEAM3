
import React from "react";
import { Link } from 'react-router-dom';

import Layout from '../Layout/Layout';


import { useEffect, useState } from 'react';
import { getTenants } from "../../api/ClientApi";
import { getLogUser } from '../../api/ClientApi';



const TenantList = () => {
  const [tenantData, setTenatData] = useState(null);

  const [title, setTitle] = useState("Tenant List");


  const loggedInUser = getLogUser();
  let isAdmin = false;
  let isSuperAdmin = false;

  if (loggedInUser.admin === 1) isAdmin = true;
  if (loggedInUser.superadmin === 1) isSuperAdmin = true;



useEffect(() => {
  const fetchData = async () => {
    try {
     
      const data = await getTenants();
     // let itemList  =Array(data[0]);
      setTenatData(data);

  

    } catch (error) {
      console.error('Error fetching HR data:', error);
      // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
      return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
    }
  };

  fetchData(); // Aufruf der fetchData Funktion, die daten aufruft

}, []); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

if (!tenantData) {
  return <p>Loading...</p>; // Anzeige während des Ladens der Daten
}



    return (
        <Layout pTitle={title}>
            <Link to={'/tenant-create'} > <button className="createButton"  >Create</button> </Link>
            <ul className="list" >
            {tenantData.map((tenant) => (
               <Link to={`/tenant/${tenant.tenantId}`} key={tenant.tenantId} className="listItemLink"> 
            <li className="listItem" key={(tenant.tenantId)}> 
              <div className="tName">{tenant.name}</div> 
              <div>{tenant.tenantId}</div>
            <button className="viewButton"  >Details</button> 
            </li> 
            </Link>       
            ))}
</ul>
      </Layout>
  );   
};

  

export default TenantList; 