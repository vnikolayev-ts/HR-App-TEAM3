import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { setPageTitle } from "../Utils/Utils";

import Layout from "../Layout/Layout";
import { getTenants } from "../../api/ClientApi";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function TenantCreate({ isView = false }) {
  // const isView = true;
  const { id } = useParams();
  const [name, setName] = useState("");
  const [tenant, setTenant] = useState(null);
  const [tenantId, setTenantId] = useState(null);

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
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


        const title = "Create Tenant";
        setPageTitle(title);
      } 
      ); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  


  const handleSave = (e) => {
    e.preventDefault();
    // Logik zum Speichern der Daten
    alert("Tenant data saved!");
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
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button className="reset" onClick={handleReset}>
                Reset
              </button>
        </form>
    </Layout>
  );
}

export default TenantCreate;
