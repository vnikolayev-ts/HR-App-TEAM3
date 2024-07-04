import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { setPageTitle } from "../Utils/Utils";

import Layout from "../Layout/Layout";
import { getUsers } from "../../api/ClientApi";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

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
        const data = await getUsers(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        const foundUser = data.users.find((u) => u.userId === parseInt(id));

        if (foundUser) {
          setUser(foundUser);
          setName(foundUser.name);
          setUsername(foundUser.username);
          setEmail(foundUser.email);
          setPassword(foundUser.password);
          setAdmin(foundUser.admin);
          setIsReadOnly(isView);
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
      <button onClick={handleBackClick} className="viewButton">
        Back
      </button>
      <Link to={`/user-edit/${user.userId}`}>
        <button className="viewButton">Edit</button>
      </Link>

      <div className="container">
        <div className="header"></div>
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

export default EditUser;
