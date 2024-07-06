import { checkUrlExists, getBarLevelsForScore, getColorForLevel, renderStars, getCurrentDomain } from '../Utils/Utils';
import {getEmployees} from '../../api/ClientApi'
import ScoreComponent from '../Utils/ScoreComponent';
import StarsComponent from '../Utils/StarsComponent';
import LabelValueComponent from './../Utils/LabelValueComponent';

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Layout from '../Layout/Layout';


const EmployeeDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();



  const [employeeData, setEmployeeData] = useState(null);
  const [layout, setLayout] = useState("simple");
  const [title, setTitle] = useState("Employee Detail Page");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getEmployees(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        const apiLayout = data.layout;
        //setHRData(data); // Setzen der empfangenen Daten in den State
        
        setEmployeeData(data);
        setLayout(apiLayout); 
        setTitle(title); 

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

 

  const domain = getCurrentDomain();
  const employeeIndex = employeeData.employees.findIndex(emp => emp.pers_id === id);
  const employee = employeeData.employees[employeeIndex];
  const imgUrl = checkUrlExists(employeeData.public_image_path) == true ? employeeData.public_image_path : "." + employeeData.noimage_url;

  const handleBackClick = () => { 
    navigate('/employee');
  };

 

 
  const handleEditClick = () => {
    navigate(`/employee-edit/${employee.pers_id}`);
  };

  if (!employee) {
    return <div>Item not Found</div>;
  }



  return (
    
    <Layout  pTitle={title}>
    <button onClick={handleBackClick} >Back</button>
    



      
      <img class="pimage"  
        
        
          src={`${imgUrl}`} alt={`${employee.first_name} ${employee.last_name}`} 
       />
         <div className="person-details" >
     
      
        
   

      <LabelValueComponent value={<ScoreComponent score={employee.ma_score} />} className={"ma-score"} />
      <LabelValueComponent label={"MA-Score"} value={employee.ma_score } />
      <LabelValueComponent label={"Pers-ID"} value={employee.pers_id}  />
      <LabelValueComponent label={"First Name"} value={employee.first_name}  />
      <LabelValueComponent label={"Last Name"} value={employee.last_name}  />
      <LabelValueComponent label={"Date of Birth"} value={employee.birthdate}  />
      <LabelValueComponent label={"Entry"} value={employee.entry_date}  />
      <LabelValueComponent label={"Position"} value={employee.position}  />
      <LabelValueComponent label={"Department"} value={employee.department}  />
      <LabelValueComponent label={"Email"} value={employee.email}  />
      <LabelValueComponent label={"Phone"} value={employee.phone}  />
      <LabelValueComponent label={"Address"} value={employee.address}  />
      <LabelValueComponent label={"Sick Days"} value={employee.sick_days}  />
      <LabelValueComponent label={"Salary / Year (€)"} value={employee.salary}  />

      </div>
      
      
      <div className="skills" >
      <h3>Skills:</h3>
      <LabelValueComponent label={"Teamwork"} value={<StarsComponent value={employee.skills.soft_skills.teamwork} /> } />
      <LabelValueComponent label={"Communication"} value={<StarsComponent value={employee.skills.soft_skills.communication} /> } />
      <LabelValueComponent label={"Leadership"} value={<StarsComponent value={employee.skills.soft_skills.leadership} /> } />
      <LabelValueComponent label={"Problem Solving"} value={<StarsComponent value={employee.skills.soft_skills.problem_solving} /> } />
      <LabelValueComponent label={"Adaptability"} value={<StarsComponent value={employee.skills.soft_skills.adaptability} /> } />
      <LabelValueComponent label={"Punctuality"} value={<StarsComponent value={employee.skills.personal_skills.punctuality} /> } />
      <LabelValueComponent label={"Friendliness"} value={<StarsComponent value={employee.skills.personal_skills.friendliness} /> } />
      <LabelValueComponent label={"Creativity"} value={<StarsComponent value={employee.skills.personal_skills.creativity} /> } />
      <LabelValueComponent label={"Reliability"} value={<StarsComponent value={employee.skills.personal_skills.reliability} /> } />
      <LabelValueComponent label={"Initiative"} value={<StarsComponent value={employee.skills.personal_skills.initiative} /> } />
  



    </div>

    
      <button onClick={handleEditClick} >Edit</button>
    
    </Layout>
  );
}

export default EmployeeDetails; 