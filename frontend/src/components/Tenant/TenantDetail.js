import React, { useState, useEffect } from "react";
import LabelValueComponent from './../Utils/LabelValueComponent';
import Layout from "../Layout/Layout";
import { getTenantById, getLogUser } from '../../api/ClientApi';
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
  const [title, setTitle] = useState('Tenant Detail Page');

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/tenant");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundTenant = await getTenantById(id);

        if (foundTenant) {
          // Zustand nur aktualisieren, wenn sich die Daten geändert haben
          if (foundTenant.name !== name) setName(foundTenant.name);
          if (foundTenant.tenantId !== tenantId) setTenantId(foundTenant.tenantId);
          if (foundTenant !== tenant) setTenant(foundTenant);
          if (`Tenant Details ${foundTenant.name}` !== title) setTitle(`Tenant Details ${foundTenant.name}`);
        }
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchData();
  }, [id]); // Beachte, dass id hier die einzige Abhängigkeit ist

  if (!tenant) {
    return <p>Loading...</p>;
  }

  return (
    <Layout pTitle={title}>
      {isSuperAdmin && (
        <button onClick={handleBackClick} className="backButton">Back</button>
      )}
      <LabelValueComponent label={"Tenant-ID"} value={tenantId} />
      <LabelValueComponent label={"Name"} value={name} />
      {isAdmin && (
        <Link to={`/tenant-edit/${tenant.tenantId}`}><button className="editButton">Edit</button></Link>
      )}
    </Layout>
  );
}

export default TenantDetail;
