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
      <form>
      <button className="backButton" onClick={handleBackClick}>Back</button>
      <button className="creatButton" onClick={handleCreateClick}>Create </button>
      <ul className="list">
        {userData.map((user) => (
          <li className="listItem" key={user.userId}>
           
              
                          
                <div className="name">{user.name}</div> 
                <div className="separator"></div>           
                <div className="usname">{user.username}</div> 
                <div className="separator"></div>                        
                <div className="mail">{user.email}</div>
                <div className="separator"></div>

                {user.admin && (
                  
                   
                    <div className="admin"> Administrator </div>
                  
                )}
              
            
            
              <Link to={`/user/${user.userId}`}>
                <button className="viewButton">Details</button>
              </Link>

          
          </li>
        ))}
      </ul>
      </form>
    </Layout>
  );
};

export default UserList;
