import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setPageTitle } from "../Utils/Utils";
import Layout from "../Layout/Layout";
import { getUserById } from "../../api/ClientApi";
import LabelValueComponent from './../Utils/LabelValueComponent';
import LabelInputComponent from './../Utils/LabelInputComponent';

function EditUser() {
  const { id } = useParams();
  const [tenantId, setTenantId] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  const [title, setTitle] = useState('EditUser Page');

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/user/"+ userId);
  };

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
        const fUser = await getUserById(id);
        setUser(fUser);
        setPageTitle('Edit User ${user.name}')
        if (fUser) {
          
          setTenantId(fUser.tenantId);
          setName(fUser.name);
          setUsername(fUser.username);
          setEmail(fUser.email);
          setPassword(fUser.password);
          setAdmin(fUser.admin);
          setUserId(fUser.userId);
        }

        const title =  "Edit Page";
        setPageTitle(title);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return <p>Loading... Error</p>;
      }
    };

    fetchData();
  }, [user, id]);

  if (!user) {
    return <p>Loading...</p>;
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

  return (
    <Layout pTitle={title}> 
      <button onClick={handleBackClick} className="backButton">Back</button>
      
      <form>
        <LabelValueComponent label={"Tenant-ID"} value={tenantId} />
        <LabelInputComponent lab={"Name"} name="name" val={name} onChange={(e) => setName(e.target.value)} /> 
        <LabelInputComponent lab={"Username"} name="username" val={username} onChange={(e) => setUsername(e.target.value)} />
        <LabelInputComponent lab={"Email"} name="email" val={email} onChange={(e) => setEmail(e.target.value)} />
        <LabelInputComponent lab={"Password"} name="password" val={password} type={'password'} onChange={(e) => setPassword(e.target.value)} />
        <LabelInputComponent lab={"Admin"} name="admin" checked={admin} type={'checkbox'} onChange={(e) => setAdmin(e.target.checked)} />
        
        <button className="resetButton" onClick={handleReset}>Reset</button>
        <button className="saveButton" onClick={handleSave}>Save</button>
        <button className="deleteButton" onClick={handleDelete}>Delete</button>
      </form>
    </Layout>
  );
}

export default EditUser;
