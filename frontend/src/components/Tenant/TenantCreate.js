import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import LabelInputComponent from "../Utils/LabelInputComponent";
import { createTenant } from "../../api/ClientApi";



const TenantCreate = () => {
  const navigate = useNavigate();

  // State-Hooks für alle Eingabefelder
  const [name, setName] = useState(null);

  const[title] = useState('Tenant Create Page');

  const handleBackClick = () => {
    navigate('/tenant');
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be resetted. Are you sure?")) {
      window.location.reload(true);
      alert("All data have been resetted.");
    } else {
      alert("Nothing has been changed.");
    }
  };


  const handleCreate = async (e) => {
    e.preventDefault();
    const newTenant = {
      tenant_name: name,
    }
  
  try {
      const result = await createTenant(newTenant);
      if (result === false) throw new Error();
      if (result.error) {
        throw new Error(`Error: ${result.error}`);
      } else {
        alert('Tenant created successfully!')
        navigate ('/tenant');
      }
    } catch (error) {
      console.error('Error creating tenant:', error);
      alert('Failed to create tenant. Please try again later.');
    }  
  }; 
    
 
  return (
    <Layout pTitle={title}>
      <button onClick={handleBackClick} className="backButton">
        Back
      </button>

        <LabelValueComponent label={"Tenant-ID"} value={tenantId } onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Name"} val={name } onChange={(e) => setName(e.target.value)}/>


              <button className="resetButton" onClick={handleReset}>Reset</button>
              <button className="createButton" onClick={handleCreate}>Save</button>

    </Layout>
  );
    
};

export default TenantCreate;
