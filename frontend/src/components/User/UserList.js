import React from "react";
import { useEffect, useState } from "react";

import { getUsers, getLogUser } from "../../api/ClientApi";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";







const UserList = () => {
  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState('User List Page');

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

  //setlogUser(getLogUser());

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  /* User Create Funktion bringt mich nach /user-create */
  const handleCreateClick = () => {
    navigate("/user-create");
  };

  useEffect(() => { 
    const fetchData = async () => {
      try {
        
        const data = await getUsers(); // Aufruf der async Funktion getEmployees -API
        setUserData(data);
        setTitle('User List')

      } catch (error) {
        console.error("Error fetching HR data:", error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  }, []); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!userData) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }

  //console.log(userData);
  return (
    <Layout pTitle={title}>
      <button onClick={handleBackClick}>Back</button>
      <button onClick={handleCreateClick}>Create User</button>
      <ul class="list">
        {userData.map((user) => (
          <li className="listItem">
            <div key={user.userId}>
              <div className="persdate">
                <div className="UID">{user.userId}</div>               
                <div className="TID">{user.tenantId}</div>               
                <div className="name">{user.name}</div>               
                <div className="usname">{user.username}</div>                         
                <div className="mail">{user.email}</div>

                {user.admin && (
                  <div>
                   
                    <div className="admin"> Administrator </div>
                  </div>
                )}
              </div>
            </div>
            <div className="action-list-item">
              <Link to={`/user/${user.userId}`}>
                <button className="viewButton">Details</button>
              </Link>

            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default UserList;
