import { checkUrlExists, getBarLevelsForScore, getColorForLevel, renderStars, getCurrentDomain, setPageTitle } from '../Utils/Utils';
import {getEmployees} from '../../api/ClientApi'

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Layout from '../Layout/Layout';


const EmployeeDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const title ="Employee Detail Page"

  const [employeeData, setEmployeeData] = useState(null);
  const [layout, setLayout] = useState("simple");

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
    
    <Layout>
    <button onClick={handleBackClick} >Back</button>
    



      
      <img class="pimage"  
        
        
          src={`${imgUrl}`} alt={`${employee.first_name} ${employee.last_name}`} 
       />
         <div className="person-details" >
     
      
            
      <div className='score'>
        {getBarLevelsForScore(employee.ma_score).map((level, index) => (
          <div
            key={index}
            style={{ borderRadius: '5px',
              flex: `${level}%`,
              backgroundColor: getColorForLevel(employee.ma_score, index),
              borderRight: getColorForLevel(employee.ma_score, index) !== 'white' ? 'none' : 'none', boxShadow: '2px 2px 5px', marginRight: 2,
            }}
          ></div>
        ))}
      </div>
      <p><label>MA-Score:</label> {employee.ma_score}</p>
      <p><label>Pers-ID:</label> {employee.pers_id}</p>
      <p><label>First Name:</label> {employee.first_name}</p>
      <p><label>Last Name:</label> {employee.last_name}</p>
      <p><label>Date of Birth:</label> {employee.birthdate}</p>
      <p><label>Entry:</label> {employee.entry_date}</p>
      <p><label>Position:</label> {employee.position}</p>
      <p><label>Department:</label> {employee.department}</p>
      <p><label>Email:</label> {employee.email}</p>
      <p><label>Phone:</label> {employee.phone}</p>
      <p><label>Address:</label> {employee.address}</p>

      <p><label>Sick Days:</label> {employee.sick_days} Tage</p>
      <p><label>Salary / Year :</label> {employee.salary} €</p>
      </div>
      
      
      <div className="skills" >
      <h3>Skills:</h3>
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

    
      <button onClick={handleEditClick} >Edit</button>
    
    </Layout>
  );
}

export default EmployeeDetails; 