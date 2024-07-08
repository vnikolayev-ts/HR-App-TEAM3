import React, { useState, useEffect } from "react";
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
    <Layout>
      <button onClick={handleBackClick} className="backButton">
        Back
      </button>

        <form>
            <label>Name</label>
            <input
              type="text"
              value={name}
              readOnly={false}
              onChange={(e) => setName(e.target.value)}
              j
            />
              
        </form>
              <button className="resetButton" onClick={handleReset}>
                Reset
              </button>
        <button className="createButton" onClick={handleSave}>
                Save
              </button>
    </Layout>
  );
    
};

export default TenantCreate;
