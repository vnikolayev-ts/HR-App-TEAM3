import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userData from "../../data/users.json";
import Navbar from '../Layout/NavBar';

const readOnlyText = "readOnly";

function EditUser({ isView = true }) {
  // const isView = true;
  const { userId } = useParams();
  // const { view } = useParams();
  // console.log("view:" + view);
  // isView = view === "edit" ? false : true;
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(isView);

  useEffect(() => {
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
  }, [userId]);

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
    return <div>User not found</div>;
  }

  return (
    <div className="container">
        <Navbar/>
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
  );
}

export default EditUser;
