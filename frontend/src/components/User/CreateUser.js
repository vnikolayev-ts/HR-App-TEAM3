import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { setPageTitle } from "../Utils/Utils";

// import { createUser } from "../../api/ClientApi";


import LabelValueComponent from './../Utils/LabelValueComponent';
import LabelInputComponent from './../Utils/LabelInputComponent';

 

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
       navigate("/user");
     } catch (error) {
       console.error("Error creating user:", error);
       // Fehlermeldung falls der User nicht erstellt werden kann
       alert("Failed to create user. Please try again later.");
     }
   };
  //  const handleCreate = () => {
  //    saveUser (newUser);

  //     alert('User added successfully!');
  //    navigate("/user");

  // };


    /* Back Button navigation zurück zum /dashboard */


    const handleBackClick = () => {
      navigate("/user");
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
      <button onClick={handleBackClick} className="backButton">
        Back
      </button>
      <form onSubmit={handleSave}>

     
        <LabelInputComponent lab={"Name"} name="name" val={name} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Username"} name="username" val={name} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Email"} name="name" val={email} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Password"} name="name" val={password} type={'password'} onChange={(e) => setName(e.target.value)}/>
        <LabelInputComponent lab={"Admin"} name="name" val={admin} checked={admin} type={'checkbox'} onChange={(e) => setName(e.target.value)}/>
        


      </form>
    </Layout>
  );
}

export default CreateUser;
