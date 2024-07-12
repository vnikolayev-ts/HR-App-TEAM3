import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { getTenantById, deleteTenant, updateTenant } from "../../api/ClientApi";
import LabelValueComponent from './../Utils/LabelValueComponent';
import LabelInputComponent from '../Utils/LabelInputComponent';
import { getLogUser } from '../../api/ClientApi';




function TenantEdit() {
  const loggedInUser = getLogUser();
  let isAdmin = false;
  let isSuperAdmin = false;
  if (loggedInUser.admin === 1) isAdmin = true;
  if (loggedInUser.superadmin === 1) isSuperAdmin = true;

  const { id } = useParams();
  const [tenantId, setTenantId] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [name, setName] = useState("");
  const[title] = useState('Tenant Edit Page')

  const navigate = useNavigate();

  /* Back Button navigation zurück zu "/tenant/:id" TenantDetail  */
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
        const fTenant = await getTenantById(id); // Aufruf der async Funktion getEmployees -API
        setTenant (fTenant);
        
        if (fTenant) {
          setTenantId(fTenant.tenantId);
          setName(fTenant.name);
        }
        
        

      } catch (error) {
        console.error("Error fetching Tenant-Data:", error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  //}, [tenant, id]); 
  }, []); 

  if (!tenant) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenant ((prev) => ({
      ...prev,
      [name]: value,
      
    }));
  };
    


  const handleSave = async (e)  => {
    e.preventDefault();
    try {

      const newTenant = {
        name
      };

      if (window.confirm("Tenant data have been saved. Are you sure?")) {
        
        const result = await updateTenant(id, newTenant);
        if (result === false) throw new Error();
        if (result.error) {
          throw new Error(`Error: ${result.error}`);
        } else {
          alert('Tenant deleted successfully!');
          navigate('/tenant');
        }
      }
    } catch (error) {
      console.error('Error deleting Tenant:', error);
      alert("Failed to delete user. Please try again later.");
    }  
  };

  if (!tenant) {
    return <div>Tenant not found {id}</div>;
  }
  

  const handleDelete = async (e)  => {
    e.preventDefault();
    try {
      const result = await deleteTenant(id);
      if (result === false) throw new Error();
      if (result.error) {
        throw new Error(`Error: ${result.error}`);
      } else {
        alert('Tenant deleted successfully!');
        navigate('/tenant');
      }
    } catch (error) {
      console.error('Error deleting Tenant:', error);
      alert("Failed to delete user. Please try again later.");
    }  
  };

  if (!tenant) {
    return <div>Tenant not found {id}</div>;
  }

  return (
    <Layout pTitle={title}>
      <button  className="backButton" onClick={handleBackClick}> Back </button>

        <form>
         
        <LabelValueComponent label={"Tenant-ID"} value={tenantId } onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Name"} val={name } onChange={(e) => setName(e.target.value)}/>
        <button className="resetButton" onClick={handleReset}> Reset </button>
        {isAdmin === true && (
        <button className="saveButton" onClick={handleSave}>Save</button>
      )}

        {isSuperAdmin === true && (
          <button className="deleteButton" onClick={handleDelete}> Delete</button>
        )}

        </form>
      
    </Layout>
  );
}

export default TenantEdit;
