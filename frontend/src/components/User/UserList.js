import React from "react";
import { useEffect, useState } from "react";

import { getUsers } from "../../api/ClientApi";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { setPageTitle } from "../Utils/Utils";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [userData, setUserData] = useState(null);

  /* Back Button navigation zurück zum /dashboard */
  const navigate = useNavigate();

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
        const isDataFromLocal = true;
        const data = await getUsers(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        setUserData(data);
        const title = "User List";
        setPageTitle(title);
      } catch (error) {
        console.error("Error fetching HR data:", error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  }, [userData]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!userData) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }

  console.log(userData);
  return (
    <Layout>
      <button onClick={handleBackClick}>Back</button>
      <button onClick={handleCreateClick}>Create User</button>
      <ul class="list">
        {userData.users.map((user) => (
          <li class="listItem">
            <div key={user.userId}>
              <div class="persdate">
                <div class="UID">{user.userId}</div>
                <div class="separator">|</div>
                <div class="TID">{user.tenantId}</div>
                <div class="separator">|</div>
                <div class="name">{user.name}</div>
                <div class="separator">|</div>
                <div class="usname">{user.username}</div>
                <div class="separator">|</div>
                <div class="pw">{user.password}</div>
                <div class="separator">|</div>
                <div class="mail">{user.email}</div>

                {user.admin && (
                  <>
                    <div class="separator">|</div>
                    <div class="admin"> Administrator </div>
                  </>
                )}
              </div>
            </div>
            <div class="action-list-item">
              <Link to={`/user/${user.userId}`}>
                <button class="viewButton">Details</button>
              </Link>
              {/* <Link to={`/user-edit/${user.userId}`}>
                <button class="viewButton">Edit</button>
              </Link> */}
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default UserList;
