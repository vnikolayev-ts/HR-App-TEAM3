import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { setPageTitle } from "../Utils/Utils";

import Layout from "../Layout/Layout";
import { getTenants } from "../../api/ClientApi";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function TenantEdit({ isView = false }) {
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
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getTenants(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        const foundTenant = data.tenants.find((t) => t.tenantId === parseInt(id));

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
  }, [tenant]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!tenant) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }

  /*useEffect(() => {
    const foundUser = userData.users.find(
      (user) => user.userId === parseInt(userId)
    );
    if (foundUser) {
      setUser(foundUser);
      setName(foundUser.name);
      setUsername(foundUser.username);
      setEmail(foundUser.email);
      setPassword(foundUser.password);
      setAdmin(foundUser.admin);
    }
  }, [userId]);*/

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
      <button onClick={handleBackClick} className="backButton">
        Back
      </button>
      <Link to={`/tenant-edit/${tenant.tenantId}`}>
        <button className="editButton">Edit</button>
      </Link>

      <div className="container">
        <div className="header"></div>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              readOnly={false}
              onChange={(e) => setName(e.target.value)}
              j
            />
          </div>
          <div className="form-group">
            <label>Tenant-ID</label>
            {tenantId}
          </div>
          {!isView && (
            <div className="button-container">
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
              <button className="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}

export default TenantEdit;
