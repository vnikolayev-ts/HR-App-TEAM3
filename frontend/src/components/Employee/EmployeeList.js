
import {getEmployees} from '../../api/ClientApi'
import ScoreComponent from '../Utils/ScoreComponent';


import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../Layout/Layout';
 

const EmployeeList = () => {
    
  const [employeeData, setEmployeeData] = useState(null);
  const [title, setTitle] = useState("Employee List");
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
        setTitle(`Employee List ${employeeData.company}`);
        
       

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
return (
  
  <Layout pTitle={title}>
 
 
        <Link to="/employee-create">
          <button className="createButton">Create Employee</button>
        </Link>
      
    
    <ul class="list" >
      {employeeData.employees.map(employee => (
        <li class="listItem" key={employee.pers_id} >
    
              <div class="fname">{employee.first_name}</div>             
              <div class="lname">{employee.last_name}</div>            
              <div class="persid">{employee.pers_id}</div>          
              <div class="edate">{employee.entry_date}</div>       
              <div class="bdate">{employee.position}</div>        
              <ScoreComponent score={employee.ma_score} />
              
              
                          
              
                  <Link to={`/employee/${employee.pers_id}`} > <button className="viewButton"  >Details</button> </Link>
                 
       
          
        </li>
      ))}
    </ul>

  </Layout>
);
}

export default EmployeeList;