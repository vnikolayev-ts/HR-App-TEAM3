import { getTenants } from "./ClientApi";

import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate} from 'react-router-dom';

import Navbar from '.NavBar';

const TenantDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [tenantData, setTenantData] = useState(null);
  const [layout, setLayout] = useState("simple");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getTenats(isDataFromLocal); // Async-Aufruf getTenants-API
        const apiLayout = data.layout;

        setTenantData(data);
        setLayout(apiLayout);

      } catch (error) {
        console.error('Error bei fetching TenantData:', error);
        // Ggf. zusätzl. Fehlerbehandlung einbauen, für z.B. eine Fehlermeldung anzuzeigen.
        return <p>Loading....Error </p>; // Anzeige beim Laden der Daten.
      }
    };

    fetchData(); // fetchData für Aufruf getTenants
   
  }, [tenantData, layout]); //Leeres Array als 2. Argument useEffect = Nur einmaliger Aufruf useEffect!

  if (!tenantData) {
    return <p>Loading....</p> // Lade-Anzeige
  }

  const tenantIndex = tenantData.tenants.findIndex(emp => emp.tenantId === id);
  const tenant = tenantData.tenants[tenantIndex];
  
  const handleBackClick = () => {
    navigate('/tenant');
  };

  const handleNextClick = () => {
    if (tenantIndex < tenantData.tenant.length -1) {
      const nextTenantId = tenantData.tenants[tenantIndex + 1].tenantId;
      navigate(`/tenant/${nextTenantId}`);
    }
  };

  const handlePreviousClick = () => {
    if (tenantIndex > 0) {
      const previousTenantId = tenantData.tenants[tenantIndex - 1].tenantId;
      navigate(`/tenant/${previousTenantId}`);  
    }
  };

  if (!tenant) {
    return <div>Tenant not found!</div>
  }


  return (
    <div class ={layout}>
        <Navbar />
        <div class='action header'>
        <button class='home' onClick={handleBackClick} >Home</button>
        <button class='zurueck' onClick={handlePreviousClick} disabled={tenantIndex === 0}></button>
        <button class='naechster' onClick={handleNextClick} disabled={tenantIndex === tenantData.tenants.length - 1}>Nächster</button>
        </div>
    
    
        <div className="tenant-details"></div>
        <h2 class='pageTitle'>Details for {tenant.name}</h2>

        <div class='Tenantdaten'>
        <p><strong>Company-ID:</strong>{tenant.tenantId}</p>
        <p><strong>Company-Name:</strong>{tenant.name}</p>
        </div>
    </div>

  );
}

export default TenantDetails;
