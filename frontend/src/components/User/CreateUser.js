import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import LabelInputComponent from './../Utils/LabelInputComponent';

import { createUser } from "../../api/ClientApi";

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
      let result = await createUser(newUser);
      if (result === false) throw new Error();
        alert("User created successfully!");
      navigate("/user");
    } catch (error) {
      console.error("Error creating user:", error);
      // Fehlermeldung falls der User nicht erstellt werden kann
      alert("Failed to create user. Please try again later.");
    }
  };

  const handleBackClick = () => {
    navigate("/user");
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

  return (
    <Layout pTitle={"Create User"}>
      <button onClick={handleBackClick} className="backButton">
        Back
      </button>
      <form onSubmit={handleSave}>
        <LabelInputComponent lab={"Name"} name="name" val={name} onChange={(e) => setName(e.target.value)} />
        <LabelInputComponent lab={"Username"} name="username" val={username} onChange={(e) => setUsername(e.target.value)} />
        <LabelInputComponent lab={"Email"} name="email" val={email} onChange={(e) => setEmail(e.target.value)} />
        <LabelInputComponent lab={"Password"} name="password" val={password} type={'password'} onChange={(e) => setPassword(e.target.value)} />
        <LabelInputComponent lab={"Admin"} name="admin" checked={admin} type={'checkbox'} onChange={(e) => setAdmin(e.target.checked)} />
        
        <button className="resetButton" onClick={handleReset}>Reset</button>
        <button className="createButton" type="submit">create</button>
      </form>
    </Layout>
  );
}

export default CreateUser;
