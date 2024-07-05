import { checkUrlExists, getBarLevelsForScore, getColorForLevel, renderStars, getCurrentDomain, setPageTitle, saveEmployee } from '../Utils/Utils';
import {getEmployees} from '../../api/ClientApi'

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Layout from '../Layout/Layout';


const EmployeeEdit = () => {

  
  const title ="Employee Edit Page";
  const { id } = useParams();
  const navigate = useNavigate();


  const [employeeData, setEmployeeData] = useState(null);
  const [layout, setLayout] = useState("simple");
  const [editEmployee, setEditEmployee] = useState({});
  const [originalEmployee, setOriginalEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getEmployees(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        const apiLayout = data.layout;
        //setHRData(data); // Setzen der empfangenen Daten in den State
        
        setEmployeeData(data);
        setLayout(apiLayout); 
        setPageTitle(title);

        const employeeIndex = data.employees.findIndex(emp => emp.pers_id === id);
        const employee = data.employees[employeeIndex];
        setOriginalEmployee(employee);
        setEditEmployee(employee);

      } catch (error) {
        console.error('Error fetching HR data:', error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die getHRData aufruft

  }, [id, title]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!employeeData) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }


 
  const employeeIndex = employeeData.employees.findIndex(emp => emp.pers_id === id);
  const employee = employeeData.employees[employeeIndex];
 //const imgUrl = checkUrlExists(employeeData.public_image_path) == true ? employeeData.public_image_path : "." + employeeData.noimage_url;

  

 
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be saved. Are you sure?")) {
      saveEmployee (editEmployee);
      alert("All data have been saved.");
      navigate(`/employee/${employee.pers_id}`);
     
    }
  };


  const handleReset = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be resetted. Are you sure?")) {
      setEditEmployee(originalEmployee);
      alert("All data have been resetted.");
    } else {
      alert("Nothing has been changed.") 
    }
  };

  const handleBackClick = () => {
    navigate(`/employee/${employee.pers_id}`);
  };



  if (!employee) {
    return <div>Item not Found</div>;
  }



  return (
    <Layout>
    
      <button onClick={handleBackClick}>Back</button>
      
     

      
      

      <div className="edit-form" >
          
          <div>
            <label>
              First Name:
              <input type="text" name="first_name" value={editEmployee.first_name || employee.first_name} onChange={handleInputChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="last_name" value={editEmployee.last_name || employee.last_name} onChange={handleInputChange} />
            </label>
            <label>
              Date of Birth:
              <input type="date" name="birthdate" value={editEmployee.birthdate || employee.birthdate} onChange={handleInputChange} />
            </label>
            <label>
              Entry Date:
              <input type="date" name="entry_date" value={editEmployee.entry_date || employee.entry_date} onChange={handleInputChange} />
            </label>
            <label>
              Position:
              <input type="text" name="position" value={editEmployee.position || employee.position} onChange={handleInputChange} />
            </label>
            <label>
              Department:
              <input type="text" name="department" value={editEmployee.department || employee.department} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editEmployee.email || employee.email} onChange={handleInputChange} />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" value={editEmployee.phone || employee.phone} onChange={handleInputChange} />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={editEmployee.address || employee.address} onChange={handleInputChange} />
            </label>
            <label>
              Sick Days:
              <input type="number" name="sick_days" value={editEmployee.sick_days || employee.sick_days} onChange={handleInputChange} />
            </label>
            <label>
              Salary:
              <input type="number" name="salary" value={editEmployee.salary || employee.salary} onChange={handleInputChange} />
            </label>
          </div>
        </div>

      
      <div className="skills" >
      <h3>Skills:</h3>
      <ul>
      <li><label> Teamwork: <input type="number" name="teamwork" min="1" max="10" value={editEmployee.teamwork || employee.skills.soft_skills.teamwork} onChange={handleInputChange}/> </label></li>
      <li><label> Communication: <input type="number" name="communication" min="1" max="10" value={editEmployee.communication || employee.skills.soft_skills.communication} onChange={handleInputChange}/> </label></li>
      <li><label> Leadership: <input type="number" name="leadership" min="1" max="10" value={editEmployee.leadership || employee.skills.soft_skills.leadership} onChange={handleInputChange}/> </label></li>
      <li><label> Problem Solving: <input type="number" name="problem_solving" min="1" max="10" value={editEmployee.problem_solving || employee.skills.soft_skills.problem_solving} onChange={handleInputChange}/> </label></li>
      <li><label> Adaptability: <input type="number" name="adaptability" min="1" max="10" value={editEmployee.adaptability || employee.skills.soft_skills.adaptability} onChange={handleInputChange}/> </label></li>
      <li><label> Punctuality: <input type="number" name="punktuality" min="1" max="10" value={editEmployee.punctuality || employee.skills.personal_skills.punctuality} onChange={handleInputChange}/> </label></li>
      <li><label> Friendliness: <input type="number" name="friendliness" min="1" max="10" value={editEmployee.friendliness || employee.skills.personal_skills.friendliness} onChange={handleInputChange}/> </label></li>
      <li><label> Creativity: <input type="number" name="creativity" min="1" max="10" value={editEmployee.creativity || employee.skills.personal_skills.creativity} onChange={handleInputChange}/> </label></li>
      <li><label> Reliability: <input type="number" name="reliability" min="1" max="10" value={editEmployee.reliability || employee.skills.personal_skills.reliability} onChange={handleInputChange}/> </label></li>
      <li><label> Initiative: <input type="number" name="initiative" min="1" max="10" value={editEmployee.initiative || employee.skills.personal_skills.initiative} onChange={handleInputChange}/> </label></li>
        
      
      </ul>



    </div>

   
    <button onClick={handleSave}>Save</button>
    <button onClick={handleReset}>Reset</button>
    </Layout>
  );
}

export default EmployeeEdit;