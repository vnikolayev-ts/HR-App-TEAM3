import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import { getUserById } from "../../api/ClientApi";
import LabelValueComponent from './../Utils/LabelValueComponent';

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function UserDetail() {
  // const isView = true;
  const { id } = useParams();

  const [name, setName] = useState("");


  const [title, setTitle] = useState('User Detail Page');


  const [foundUser, setFoundUser] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [tenantId, setTenantId] = useState(null);

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();




  const handleBackClick = () => {
    navigate("/user");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {


        const fUser = await getUserById(id);
        setFoundUser(fUser);
        if (foundUser) {
          setTitle(`User Details ${foundUser.name}`);
          setName(foundUser.name);
          setUsername(foundUser.username);
          setEmail(foundUser.email);

          setAdmin(foundUser.admin);
          setTenantId(foundUser.tenantId);
        }

        // const title = "Detail Page";
        // setPageTitle(title);
      } catch (error) {
        console.error("Error fetching HR data:", error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  }, [foundUser]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!foundUser) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }


  if (!foundUser) {
    return <div>User not found {id}</div>;
  }

  return (
    <Layout pTitle={title}>
      <button onClick={handleBackClick} className="backButton"> Back </button>
      <LabelValueComponent label={"ID"} value={id} />
      <LabelValueComponent label={"Tenant-ID"} value={tenantId} />
      <LabelValueComponent label={"Name"} value={name} />
      <LabelValueComponent label={"Username"} value={username} />
      <LabelValueComponent label={"E-mail"} value={email} />
      <LabelValueComponent label={"Password"} value={"******"} />
      <LabelValueComponent label={"Admin"} value={admin} />
      <LabelValueComponent label={"Name"} value={name} />

      <Link to={`/user-edit/${id}`}><button className="editButton">Edit</button>  </Link>

    </Layout>
  );
}

export default UserDetail;
