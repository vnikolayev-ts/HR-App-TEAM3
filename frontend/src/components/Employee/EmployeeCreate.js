//import { renderStar } from '../Utils/Utils';
import { setPageTitle,saveEmployee } from "../Utils/Utils";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const EmployeeCreate = ({ addEmployee}) => {
  const title ="Employee Create Page";
  const navigate = useNavigate();
  
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    birthdate: '',
    entry_date: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    address: '',
    sick_days: '',
    salary: '',
    skills: {
      soft_skills: {
        teamwork: 0,
        communication: 0,
        leadership: 0,
        problem_solving: 0,
        adaptability: 0,
      },
      personal_skills: {
        punctuality: 0,
        friendliness: 0,
        creativity: 0,
        reliability: 0,
        initiative: 0,
      },
    },
  });


  const handleBackClick = () => {
    navigate("/employee");
  };

  
  const handleResetButton = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be resetted. Are you sure?")) {
      window.location.reload(true);
      alert("All data have been resetted.");
    } else {
      alert("Nothing has been changed.");
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  
  const handleStarClick = (category, skill, value) => {
    setNewEmployee((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: {
          ...prev.skills[category],
          [skill]: value,
        },
      },
    }));
  };

  const handleCreate = () => {
   
    
  saveEmployee (newEmployee);

  

   // addEmployee(newEmployee);
    alert('Employee added successfully!');
    navigate("/employee");

    console.log('Create new employee');
    // navigate to employee list or details page after creation
  };

  const handleReset = () => {
    setNewEmployee({
      first_name: '',
      last_name: '',
      birthdate: '',
      entry_date: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      address: '',
      sick_days: '',
      salary: '',
      skills: {
        soft_skills: {
          teamwork: 0,
          communication: 0,
          leadership: 0,
          problem_solving: 0,
          adaptability: 0,
        },
        personal_skills: {
          punctuality: 0,
          friendliness: 0,
          creativity: 0,
          reliability: 0,
          initiative: 0,
        },
      },
    });
  };
  
  setPageTitle(title); 
  return (
    <Layout>
      <div className="create-form">
        
        <button onClick={handleBackClick}>Back</button>
        <div>
          <label>
            First Name:
            <input type="text" name="first_name" value={newEmployee.first_name} onChange={handleInputChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" value={newEmployee.last_name} onChange={handleInputChange} />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="birthdate" value={newEmployee.birthdate} onChange={handleInputChange} />
          </label>
          <label>
            Entry Date:
            <input type="date" name="entry_date" value={newEmployee.entry_date} onChange={handleInputChange} />
          </label>
          <label>
            Position:
            <input type="text" name="position" value={newEmployee.position} onChange={handleInputChange} />
          </label>
          <label>
            Department:
            <input type="text" name="department" value={newEmployee.department} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={newEmployee.email} onChange={handleInputChange} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={newEmployee.phone} onChange={handleInputChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={newEmployee.address} onChange={handleInputChange} />
          </label>
          <label>
            Sick Days:
            <input type="number" name="sick_days" value={newEmployee.sick_days} onChange={handleInputChange} />
          </label>
          <label>Salary:</label><input type="number" name="salary" value={newEmployee.salary} onChange={handleInputChange} />
          <div className="form-buttons">
            
          </div>
        </div>
      </div>
      <div className="skills">
        <h3>Skills:</h3>
        <ul>
        

      <li><label> Teamwork: <input type="number" name="teamwork" min="1" max="10" value={newEmployee.teamwork || newEmployee.skills.soft_skills.teamwork} onChange={handleInputChange}/> </label></li>
      <li><label> Communication: <input type="number" name="communication" min="1" max="10" value={newEmployee.communication || newEmployee.skills.soft_skills.communication} onChange={handleInputChange}/> </label></li>
      <li><label> Leadership: <input type="number" name="leadership" min="1" max="10" value={newEmployee.leadership || newEmployee.skills.soft_skills.leadership} onChange={handleInputChange}/> </label></li>
      <li><label> Problem Solving: <input type="number" name="problem_solving" min="1" max="10" value={newEmployee.problem_solving || newEmployee.skills.soft_skills.problem_solving} onChange={handleInputChange}/> </label></li>
      <li><label> Adaptability: <input type="number" name="adaptability" min="1" max="10" value={newEmployee.adaptability || newEmployee.skills.soft_skills.adaptability} onChange={handleInputChange}/> </label></li>
      <li><label> Punctuality: <input type="number" name="punktuality" min="1" max="10" value={newEmployee.punctuality || newEmployee.skills.soft_skills.punctuality} onChange={handleInputChange}/> </label></li>
      <li><label> Friendliness: <input type="number" name="friendliness" min="1" max="10" value={newEmployee.friendliness || newEmployee.skills.soft_skills.friendliness} onChange={handleInputChange}/> </label></li>
      <li><label> Creativity: <input type="number" name="creativity" min="1" max="10" value={newEmployee.creativity || newEmployee.skills.soft_skills.creativity} onChange={handleInputChange}/> </label></li>
      <li><label> Reliability: <input type="number" name="reliability" min="1" max="10" value={newEmployee.reliability || newEmployee.skills.soft_skills.reliability} onChange={handleInputChange}/> </label></li>
      <li><label> Initiative: <input type="number" name="initiative" min="1" max="10" value={newEmployee.initiative || newEmployee.skills.soft_skills.initiative} onChange={handleInputChange}/> </label></li>
        
        </ul>
      </div>
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleResetButton}>Reset</button>
    </Layout>
  );
};

export default EmployeeCreate;