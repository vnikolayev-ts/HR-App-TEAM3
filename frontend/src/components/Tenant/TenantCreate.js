import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import LabelInputComponent from "../Utils/LabelInputComponent";
import { createTenant } from "../../api/ClientApi";



const TenantCreate = () => {
  const navigate = useNavigate();

  // State-Hooks für alle Eingabefelder
  const [Name, setName] = useState(null);

  const[title] = useState('Tenant Create Page');

  const handleBackClick = () => {
    navigate('/tenant');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newTenant = {
      tenant_name: Name,
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

  return (
    <Layout pTitle={title}>
      <button className="backButton" onClick={handleBackClick} > Back </button>
        <form>        
            <LabelInputComponent lab={"Name"} val={ Name } onChange={(e) => setName(e.target.value)}/>
            <button className="saveButton" onClick={handleCreate}>Save</button>
            <button className="resetButton" onClick={handleReset}> Reset </button>
        </form>
    </Layout>
  );   
};

export default TenantCreate;
