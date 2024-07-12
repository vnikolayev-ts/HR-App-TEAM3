import React, { useState, useEffect } from "react";
import LabelValueComponent from './../Utils/LabelValueComponent';

import Layout from "../Layout/Layout";
import { getTenantById } from "../../api/ClientApi";
import { getLogUser } from '../../api/ClientApi';

import { Link, useNavigate, useParams } from "react-router-dom";

function TenantDetail() {

  const { id } = useParams();
  const loggedInUser = getLogUser();
  let isAdmin = false;
  let isSuperAdmin = false;
  let isHimSelf = false;
  if (loggedInUser.admin === 1) isAdmin = true;
  if (loggedInUser.superadmin === 1) isSuperAdmin = true;
  if (String(loggedInUser.tenantId) === String(id)) isHimSelf = true;

  const [name, setName] = useState("");
  const [tenant, setTenant] = useState(null);
  const [tenantId, setTenantId] = useState(null);
  const [title, setTitel] = useState('Tenant Detail Page');

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/tenant");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
   
        const foundTenant = await getTenantById(id); // Aufruf der async Funktion getEmployees -API
      
          

        if (foundTenant) {
          setTitel(`Tenant Details ${foundTenant.name}`)
          setName(foundTenant.name);
          setTenantId(foundTenant.tenantId);
          setTenant(foundTenant);
        }

      } catch (error) {
        console.error("Error fetching HR data:", error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  }, [id, title]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!tenant) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }



  if (!tenant) {
    return <div>Tenant not found {id}</div>;
  }

  return (
    <Layout pTitle={title}>
       {isSuperAdmin === true && (
           <button onClick={handleBackClick} className="backButton">Back</button>
        )}
    
      <LabelValueComponent label={"Tenant-ID"} value={tenantId } />
      <LabelValueComponent label={"Name"} value={name } />

      {isAdmin === true && (
        <Link to={`/tenant-edit/${tenant.tenantId}`}><button className="editButton">Edit</button></Link>
      )}


      
     </Layout>
  );
}

export default TenantDetail;
