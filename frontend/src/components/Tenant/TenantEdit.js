import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../Utils/Utils";

import LabelInputComponent from '../Utils/LabelInputComponent';
import LabelValueComponent from './../Utils/LabelValueComponent';

import Layout from "../Layout/Layout";
import { getTenant } from "../../api/ClientApi";

import { useNavigate } from "react-router-dom";

function TenantEdit() {
  // const isView = true;
  const { id } = useParams();
  const [name, setName] = useState("");
  const [tenant, setTenant] = useState(null);
  const [tenantId, setTenantId] = useState(null);

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/tenant/"+ tenantId);
  };

  /* Cancel Button Funktion */
  const handleReset = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be resetted. Are you sure?")) {
      window.location.reload(true);
      alert("All data have been resetted.");
    } else {
      alert("Nothing has been changed.");
    }
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

        const title = "Tenant Edit";
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


  const handleSave = (e) => {
    e.preventDefault();
    // Logik zum Speichern der Daten
    alert("Tenant data saved!");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // Logik zum Löschen der Daten
    alert("Tenant data deleted!");
  };

  if (!tenant) {
    return <div>Tenant not found {id}</div>;
  }

  return (
    <Layout>
      <button  className="backButton" onClick={handleBackClick}> Back </button>

        <form>
         
        <LabelValueComponent label={"Tenant-ID"} value={tenantId } onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Name"} val={name } onChange={(e) => setName(e.target.value)}/>
        <button className="saveButton" onClick={handleSave}>Save</button>
        <button className="deleteButton" onClick={handleDelete}> Delete</button>
        <button className="resetButton" onClick={handleReset}> Reset </button>
      
        </form>
      
    </Layout>
  );
}

export default TenantEdit;
