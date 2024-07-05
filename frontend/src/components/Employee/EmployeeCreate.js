import { renderStar, setPageTitle } from '../Utils/Utils';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const EmployeeCreate = ({ addEmployee}) => {
  const title = "Employee Create Page";
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
    var ausgabe = "Employee added.";
    ausgabe += "\nVor Name: " + newEmployee.first_name;
    ausgabe += "\nName: " + newEmployee.last_name;
    ausgabe += "\nBirthdate: " + newEmployee.birthdate;
    ausgabe += "\nEntrydate: " + newEmployee.entry_date;
    ausgabe += "\nPosition: " + newEmployee.position;
    ausgabe += "\nDepartment: " + newEmployee.department;
    ausgabe += "\nEmail: " + newEmployee.email;
    ausgabe += "\nPhone: " + newEmployee.phone;
    ausgabe += "\nAddress: " + newEmployee.address;
    ausgabe += "\nSickdays: " + newEmployee.sick_days;
    ausgabe += "\nSalary: " + newEmployee.salary;
    alert(ausgabe );
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

  return (
    <Layout>
      <div className="create-form">
        <h2 className="pageTitle">Create New Employee</h2>
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
          <label>
            Salary:
            <input type="number" name="salary" value={newEmployee.salary} onChange={handleInputChange} />
          </label>
          <div className="form-buttons">
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
      <div className="skills">
        <p><label>Skills:</label></p>
        <ul>
          <li>
            <label>Teamwork:</label>
            {renderStar(newEmployee.skills.soft_skills.teamwork, (value) => handleStarClick('soft_skills', 'teamwork', value))}
          </li>
          <li>
            <label>Communication:</label>
            {renderStar(newEmployee.skills.soft_skills.communication, (value) => handleStarClick('soft_skills', 'communication', value))}
          </li>
          <li>
            <label>Leadership:</label>
            {renderStar(newEmployee.skills.soft_skills.leadership, (value) => handleStarClick('soft_skills', 'leadership', value))}
          </li>
          <li>
            <label>Problem Solving:</label>
            {renderStar(newEmployee.skills.soft_skills.problem_solving, (value) => handleStarClick('soft_skills', 'problem_solving', value))}
          </li>
          <li>
            <label>Adaptability:</label>
            {renderStar(newEmployee.skills.soft_skills.adaptability, (value) => handleStarClick('soft_skills', 'adaptability', value))}
          </li>
          <li>
            <label>Punctuality:</label>
            {renderStar(newEmployee.skills.personal_skills.punctuality, (value) => handleStarClick('personal_skills', 'punctuality', value))}
          </li>
          <li>
            <label>Friendliness:</label>
            {renderStar(newEmployee.skills.personal_skills.friendliness, (value) => handleStarClick('personal_skills', 'friendliness', value))}
          </li>
          <li>
            <label>Creativity:</label>
            {renderStar(newEmployee.skills.personal_skills.creativity, (value) => handleStarClick('personal_skills', 'creativity', value))}
          </li>
          <li>
            <label>Reliability:</label>
            {renderStar(newEmployee.skills.personal_skills.reliability, (value) => handleStarClick('personal_skills', 'reliability', value))}
          </li>
          <li>
            <label>Initiative:</label>
            {renderStar(newEmployee.skills.personal_skills.initiative, (value) => handleStarClick('personal_skills', 'initiative', value))}
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default EmployeeCreate;