import { checkUrlExists, getBarLevelsForScore, getColorForLevel, renderStars, getCurrentDomain, setPageTitle, saveEmployee } from '../Utils/Utils';
import {getEmployees} from '../../api/ClientApi'
import LabelInputComponent from '../Utils/LabelInputComponent';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Layout from '../Layout/Layout';


const EmployeeEdit = () => {

   
 
  const { id } = useParams();
  const navigate = useNavigate();


  const [employeeData, setEmployeeData] = useState(null);
   const [editEmployee, setEditEmployee] = useState({});
  const [originalEmployee, setOriginalEmployee] = useState({});
  const [title, setTitle] = useState("Employee Edit Page");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getEmployees(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        const apiLayout = data.layout;
        //setHRData(data); // Setzen der empfangenen Daten in den State
        
        setEmployeeData(data);
    
     

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
    <Layout  pTitle={title}>
    
      <button className="backButton" onClick={handleBackClick}>Back</button>
      
     

      
      

      <div className="create-form">
        
       

        <LabelInputComponent lab={"First Name"} name="first_name" val={employee.first_name} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Last Name"} name="last_name" val={employee.last_name} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Date of Birth"} name="birthdate" val={employee.birthdate} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Date of Entry"} name="entry_date" val={employee.entry_date} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Position"} name="position" val={employee.position} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Department"} name="department" val={employee.department} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Email"} name="email" val={employee.email} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Phone"} name="phone" val={employee.phone} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Address"} name="address" val={employee.address} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Sick Days"} name="sick_days" val={employee.sick_days} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Salary"} name="salary" val={employee.salary} onChange={handleInputChange}/>

        <LabelInputComponent lab={"Position"} name="position" val={employee.position} onChange={handleInputChange}/>
    
        <LabelInputComponent
        lab={"Number (1-10)"}
        name="numberInput"

        type="number"
        min={1}
        max={10}
      />
         
        <h3>Skills:</h3>
        <label>Teamwork:</label><input type="number" name="teamwork" min="1" max="10" value={employee.skills.soft_skills.teamwork} onChange={handleInputChange} />
        <label>Communication:</label><input type="number" name="communication" min="1" max="10" value={employee.communication || employee.skills.soft_skills.communication} onChange={handleInputChange} />
        <label>Leadership:</label><input type="number" name="leadership" min="1" max="10" value={employee.leadership || employee.skills.soft_skills.leadership} onChange={handleInputChange} />
        <label>Problem Solving:</label><input type="number" name="problem_solving" min="1" max="10" value={employee.problem_solving || employee.skills.soft_skills.problem_solving} onChange={handleInputChange} />
        <label>Adaptability:</label><input type="number" name="adaptability" min="1" max="10" value={employee.adaptability || employee.skills.soft_skills.adaptability} onChange={handleInputChange} />
        <label>Punctuality:</label><input type="number" name="punctuality" min="1" max="10" value={employee.skills.soft_skills.punctuality} onChange={handleInputChange} />
        <label>Friendliness:</label><input type="number" name="friendliness" min="1" max="10" value={employee.friendliness || employee.skills.soft_skills.friendliness} onChange={handleInputChange} />
        <label>Creativity:</label><input type="number" name="creativity" min="1" max="10" value={employee.creativity || employee.skills.soft_skills.creativity} onChange={handleInputChange} />
        <label>Reliability:</label><input type="number" name="reliability" min="1" max="10" value={employee.reliability || employee.skills.soft_skills.reliability} onChange={handleInputChange} />
        <label>Initiative:</label><input type="number" name="initiative" min="1" max="10" value={employee.initiative || employee.skills.soft_skills.initiative} onChange={handleInputChange} />
  
        </div>

   
    <button onClick={handleSave}>Save</button>
    <button onClick={handleReset}>Reset</button>
    </Layout>
  );
}

export default EmployeeEdit;