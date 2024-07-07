import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { setPageTitle } from "../Utils/Utils";

import Layout from "../Layout/Layout";
import { getUserById, getUsers } from "../../api/ClientApi";

import LabelValueComponent from './../Utils/LabelValueComponent';
import LabelInputComponent from './../Utils/LabelInputComponent';

import { useNavigate } from "react-router-dom";

function EditUser({ isView = true }) {
  // const isView = true;
  const { id } = useParams();
  const [tenantId, setTenantId] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const [userId, setUserId] = useState(null);

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/user/"+ userId);
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

  const title = isView ? "Detail Page" : "Edit Page";
  setPageTitle(title);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const fUser = await getUserById(id); // Aufruf der async Funktion getEmployees -API
        setUser(fUser);

        if (user) {
          setTenantId(user.tenantId);
          setName(user.name);
          setUsername(user.username);
          setEmail(user.email);
          setPassword(user.password);
          setAdmin(user.admin);
          setUserId(user.userId)
 
        }

        const title = isView ? "Detail Page" : "Edit Page";
        setPageTitle(title);
      } catch (error) {
        console.error("Error fetching HR data:", error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  }, [user]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!user) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }


  const handleSave = (e) => {
    e.preventDefault();
    // Logik zum Speichern der Daten
    alert("User data saved!");
    navigate("/user/"+ userId);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // Logik zum Löschen der Daten
    alert("User data deleted!");
  };

  if (!user) {
    return <div>User not found {id}</div>;
  }

  return (
    <Layout>
      <button onClick={handleBackClick} className="backButton">Back</button>
      
      <form>
        <LabelValueComponent label={"Tenant-ID"} value={tenantId } />
        <LabelInputComponent lab={"Name"} name="name" val={name} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Username"} name="username" val={name} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Email"} name="name" val={email} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Password"} name="name" val={password} type={'password'} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Admin"} name="name" val={admin} checked={admin} type={'checkbox'} onChange={(e) => setName(e.target.value)}/>
        
          
        <button className="resetButton" onClick={handleReset}>Reset</button>
        <button className="saveButton" onClick={handleSave}>Save </button>
        
        </form>
    </Layout>
  );
}

export default EditUser;
