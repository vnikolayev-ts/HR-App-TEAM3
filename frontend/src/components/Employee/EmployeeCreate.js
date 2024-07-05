
import { setPageTitle,saveEmployee, getEmptyEmployee } from "../Utils/Utils";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';



const EmployeeCreate = ({ addEmployee}) => {
  
  const navigate = useNavigate();
  
  const [newEmployee, setNewEmployee] = useState(getEmptyEmployee());
  const [title, setTitle] = useState("Employee Create Page");


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
   
    
  var retVal = saveEmployee (newEmployee);

  if (retVal == false){
    alert('Error: Employee was not added :( !');
  }else{

   // addEmployee(newEmployee);
    alert('Employee added successfully!');
    navigate("/employee");

    console.log('Create new employee');
    // navigate to employee list or details page after creation
    }
  };

  const handleReset = () => {
    setNewEmployee(getEmptyEmployee());
  };

 
  return (
   
    <Layout  pTitle={title}>
      <div className="create-form">
        
      <button onClick={handleBackClick}>Back</button>
     
      <label>First Name:</label> <input type="text" name="first_name" value={newEmployee.first_name} onChange={handleInputChange} />
      <label>Last Name:</label> <input type="text" name="last_name" value={newEmployee.last_name} onChange={handleInputChange} />
      <label>Date of Birth:</label> <input type="date" name="birthdate" value={newEmployee.birthdate} onChange={handleInputChange} />
      <label>Entry Date:</label> <input type="date" name="entry_date" value={newEmployee.entry_date} onChange={handleInputChange} />
      <label>Position:</label> <input type="text" name="position" value={newEmployee.position} onChange={handleInputChange} />
      <label>Department:</label> <input type="text" name="department" value={newEmployee.department} onChange={handleInputChange} />
      <label>Email:</label>  <input type="email" name="email" value={newEmployee.email} onChange={handleInputChange} />
      <label>Phone:</label> <input type="text" name="phone" value={newEmployee.phone} onChange={handleInputChange} />
      <label>Address:</label>  <input type="text" name="address" value={newEmployee.address} onChange={handleInputChange} />
      <label>Sick Days:</label> <input type="number" name="sick_days" value={newEmployee.sick_days} onChange={handleInputChange} />  
      <label>Salary:</label><input type="number" name="salary" value={newEmployee.salary} onChange={handleInputChange} />
       
      <h3>Skills:</h3>
      <label>Teamwork:</label><input type="number" name="teamwork" min="1" max="10" value={newEmployee.teamwork || newEmployee.skills.soft_skills.teamwork} onChange={handleInputChange} />
      <label>Communication:</label><input type="number" name="communication" min="1" max="10" value={newEmployee.communication || newEmployee.skills.soft_skills.communication} onChange={handleInputChange} />
      <label>Leadership:</label><input type="number" name="leadership" min="1" max="10" value={newEmployee.leadership || newEmployee.skills.soft_skills.leadership} onChange={handleInputChange} />
      <label>Problem Solving:</label><input type="number" name="problem_solving" min="1" max="10" value={newEmployee.problem_solving || newEmployee.skills.soft_skills.problem_solving} onChange={handleInputChange} />
      <label>Adaptability:</label><input type="number" name="adaptability" min="1" max="10" value={newEmployee.adaptability || newEmployee.skills.soft_skills.adaptability} onChange={handleInputChange} />
      <label>Punctuality:</label><input type="number" name="punctuality" min="1" max="10" value={newEmployee.punctuality || newEmployee.skills.soft_skills.punctuality} onChange={handleInputChange} />
      <label>Friendliness:</label><input type="number" name="friendliness" min="1" max="10" value={newEmployee.friendliness || newEmployee.skills.soft_skills.friendliness} onChange={handleInputChange} />
      <label>Creativity:</label><input type="number" name="creativity" min="1" max="10" value={newEmployee.creativity || newEmployee.skills.soft_skills.creativity} onChange={handleInputChange} />
      <label>Reliability:</label><input type="number" name="reliability" min="1" max="10" value={newEmployee.reliability || newEmployee.skills.soft_skills.reliability} onChange={handleInputChange} />
      <label>Initiative:</label><input type="number" name="initiative" min="1" max="10" value={newEmployee.initiative || newEmployee.skills.soft_skills.initiative} onChange={handleInputChange} />

      </div>
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleResetButton}>Reset</button>
    </Layout>
  );
};

export default EmployeeCreate;