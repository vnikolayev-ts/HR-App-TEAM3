import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import { getUserById,updateUser,deleteUser } from "../../api/ClientApi";

import LabelInputComponent from './../Utils/LabelInputComponent';

import { getLogUser } from '../../api/ClientApi';



function EditUser() {

  const { id } = useParams();

  const loggedInUser = getLogUser();
  let isAdmin = false;
  let isSuperAdmin = false;
  let isHimSelf = false;
  if (loggedInUser.admin === 1) isAdmin = true;
  if (loggedInUser.superadmin === 1) isSuperAdmin = true;
  if (String(loggedInUser.userId) === String(id)) isHimSelf = true;


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
       
        if (fUser) {
          setTitle(`User Details ${fUser.name}`);
       
          setName(fUser.name);
          setUsername(fUser.username);
          setEmail(fUser.email);
          setPassword(fUser.password);
          setAdmin(fUser.admin);
          setUserId(fUser.userId);
        }

        // const title =  "Edit Page";
        // setPageTitle(title);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return <p>Loading... Error</p>;
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
     

        const uspdateUser = {
          name,
          username,
          email,
          password,
          admin
        };

        
      const result = await updateUser(id,uspdateUser);
      if (result === false) throw new Error();
      if (result.error) {
        throw new Error(`Error: ${result.error}`);
      } else {
       // alert('User saved successfully!');
        navigate('/user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again later.');
    }


alert("User data saved!");
    navigate("/user/"+ userId);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteUser(id);
      if (result === false) throw new Error();
      if (result.error) {
        throw new Error(`Error: ${result.error}`);
      } else {
        //alert('User deleted successfully!');
        navigate('/user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again later.');
    }
     
  };

  return (
    <Layout pTitle={title}> 
      <button onClick={handleBackClick} className="backButton">Back</button>
      
      <form>
        
        <LabelInputComponent lab={"Name"} name="name" val={name} onChange={(e) => setName(e.target.value)} /> 
        <LabelInputComponent lab={"Username"} name="username" val={username} onChange={(e) => setUsername(e.target.value)} />
        <LabelInputComponent lab={"Email"} name="email" val={email} onChange={(e) => setEmail(e.target.value)} />
        <LabelInputComponent lab={"Password"} name="password" val={password} type={'password'} onChange={(e) => setPassword(e.target.value)} />
        {isAdmin === true && (
         <LabelInputComponent lab={"Admin"} name="admin" checked={admin} type={'checkbox'} onChange={(e) => setAdmin(e.target.checked)} />
        )}
        <button className="resetButton" onClick={handleReset}>Reset</button>
        <button className="saveButton" onClick={handleSave}>Save</button>
        {isHimSelf === false && (
         <button className="deleteButton" onClick={handleDelete}>Delete</button>
      )}

       
      </form>
    </Layout>
  );
}

export default EditUser;
