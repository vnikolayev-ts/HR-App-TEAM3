import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { setPageTitle } from "../Utils/Utils";

// import { createUser } from "../../api/ClientApi";


 

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        name,
        username,
        email,
        password,
        admin,
      };

      // Aufruf der Funktion createUser aus der API, um den Benutzer zu erstellen
      // await createUser(newUser);

      alert("User created successfully!");
      navigate("/user"); // Beispiel für Weiterleitung zur Benutzerliste oder einer anderen relevanten Seite
    } catch (error) {
      console.error("Error creating user:", error);
      // Fehlermeldung falls der User nicht erstellt werden kann
      alert("Failed to create user. Please try again later.");
    }
  };

    /* Back Button navigation zurück zum /dashboard */


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


  setPageTitle("Create User");

  return (
    <Layout>
      <form onSubmit={handleSave}>
      <button onClick={handleBackClick} className="viewButton">
        Back
      </button>
      <button className="save" onClick={handleSave}>
                Save
              </button>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Admin</label>
          <input
            type="checkbox"
            checked={admin}
            onChange={(e) => setAdmin(e.target.checked)}
          />
        </div>
        <div className="button-container">
          <button className="save" type="submit">
            Create User
          </button>
          <button className="reset" onClick={handleReset}>
                Reset
              </button>
        </div>
      </form>
    </Layout>
  );
}

export default CreateUser;
