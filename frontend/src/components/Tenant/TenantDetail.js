import React, { useState, useEffect } from "react";
import { setPageTitle } from "../Utils/Utils";
import LabelValueComponent from './../Utils/LabelValueComponent';

import Layout from "../Layout/Layout";
import { getTenant } from "../../api/ClientApi";


import { Link, useNavigate, useParams } from "react-router-dom";

function TenantDetail() {
  // const isView = true;
  const { id } = useParams();
  const [name, setName] = useState("");
  const [tenant, setTenant] = useState(null);
  const [tenantId, setTenantId] = useState(null);

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/tenant");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
   
        const foundTenant = await getTenant(); // Aufruf der async Funktion getEmployees -API
      

        if (foundTenant) {
          setName(foundTenant.name);
          setTenantId(foundTenant.tenantId);
          setTenant(foundTenant);
        }

        const title = "Tenant Detail";
        setPageTitle(title);
      } catch (error) {
        console.error("Error fetching HR data:", error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  }, []); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!tenant) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }



  if (!tenant) {
    return <div>Tenant not found {id}</div>;
  }

  return (
    <Layout>
      <button onClick={handleBackClick} className="backButton">Back</button>


      <LabelValueComponent label={"Tenant-ID"} value={tenantId } />
      <LabelValueComponent label={"Name"} value={name } />
      <Link to={`/tenant-edit/${tenant.tenantId}`}><button className="editButton">Edit</button></Link>
      
       
      
    </Layout>
  );
}

export default TenantDetail;
