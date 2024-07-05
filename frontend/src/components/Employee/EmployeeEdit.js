import { checkUrlExists, getBarLevelsForScore, getColorForLevel, renderStars, getCurrentDomain, setPageTitle } from '../Utils/Utils';
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

      } catch (error) {
        console.error('Error fetching HR data:', error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die getHRData aufruft

  }, [employeeData, layout]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!employeeData) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }


 
  const employeeIndex = employeeData.employees.findIndex(emp => emp.pers_id === id);
  const employee = employeeData.employees[employeeIndex];
 const imgUrl = checkUrlExists(employeeData.public_image_path) == true ? employeeData.public_image_path : "." + employeeData.noimage_url;

  

 
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log('Save employee data', editEmployee);
  };

  const handleCancel = () => {
    setEditEmployee(originalEmployee);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be resetted. Are you sure?")) {
      window.location.reload(true);
      alert("All data have been resetted.");
    } else {
      alert("Nothing has been changed.")
    }
  };

  const handleDetailClick = () => {
    navigate(`/employee/${employee.pers_id}`);
  };



  if (!employee) {
    return <div>Item not Found</div>;
  }



  return (
    <Layout>
    
      
     

      
      

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
            <button onClick={handleSave}>Save</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleDetailClick}>Detail</button>
          </div>
        </div>

      
      <div className="skills" >
      <p><label>Skills:</label></p>
      <ul>
        <li><label>Teamwork:</label> {renderStars(employee.skills.soft_skills.teamwork)}</li>
        <li><label>Communication:</label> {renderStars(employee.skills.soft_skills.communication)}</li>
        <li><label>Leadership:</label> {renderStars(employee.skills.soft_skills.leadership)}</li>
        <li><label>Problem Solving:</label> {renderStars(employee.skills.soft_skills.problem_solving)}</li>
        <li><label>Adaptability:</label> {renderStars(employee.skills.soft_skills.adaptability)}</li>
        <li><label>Punctuality:</label> {renderStars(employee.skills.personal_skills.punctuality)}</li>
        <li><label>Friendliness:</label> {renderStars(employee.skills.personal_skills.friendliness)}</li>
        <li><label>Creativity:</label> {renderStars(employee.skills.personal_skills.creativity)}</li>
        <li><label>Reliability:</label> {renderStars(employee.skills.personal_skills.reliability)}</li>
        <li><label>Initiative:</label> {renderStars(employee.skills.personal_skills.initiative)}</li>
      </ul>



    </div>

   
    </Layout>
  );
}

export default EmployeeEdit;