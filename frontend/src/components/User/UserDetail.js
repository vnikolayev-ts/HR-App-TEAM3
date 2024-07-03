import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userData from "../../data/users.json";
import Layout from '../Layout/Layout';
import { getUsers } from "../../api/ClientApi";


function EditUser({ isView = true }) {
  // const isView = true;
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(isView);
  const [tenantId, setTenantId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getUsers(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        const foundUser = data.users.find(
          (u) => u.userId === parseInt(id)
        );

        if (foundUser) {
          setUser(foundUser);
          setName(foundUser.name);
          setUsername(foundUser.username);
          setEmail(foundUser.email);
          setPassword(foundUser.password);
          setAdmin(foundUser.admin);
          setIsReadOnly(isView);
        }
    
  
      } catch (error) {
        console.error('Error fetching HR data:', error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };
  
    fetchData(); // Aufruf der fetchData Funktion, die daten aufruft
  
  }, [user]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird
  
  if (!user) {
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
    alert("User data saved!");
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
    <div className="container">
    
      <div className="header">
        <h1>{isView ? "Detail Page" : "Edit Page"}</h1>
      </div>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            readOnly={isReadOnly}
            onChange={(e) => setName(e.target.value)}
            j
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            readOnly={isReadOnly}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            readOnly={isReadOnly}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            readOnly={isReadOnly}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Admin</label>
          <input
            type="checkbox"
            checked={admin}
            readOnly={isReadOnly}
            onChange={(e) => setAdmin(e.target.checked)}
          />
        </div>
        {!isView && (
          <div className="button-container">
            <button className="save" onClick={handleSave}>
              Save
            </button>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </form>
    </div>
    </Layout>
  );
}

export default EditUser;
