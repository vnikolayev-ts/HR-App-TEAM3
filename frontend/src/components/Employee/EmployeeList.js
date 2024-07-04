
import { getBarLevelsForScore, getColorForLevel , setPageTitle} from '../Utils/Utils'; 
import {getEmployees} from '../../api/ClientApi'

import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../Layout/Layout';
 


const EmployeeList = () => {
    
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
       
        
        const title = `Employee List ${employeeData.company}`;
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
return (
  
    <Layout>
 
  
    
    <ul class="list" >
      {employeeData.employees.map(employee => (
        <li class="listItem" key={employee.pers_id} >
            <div class="persdate" >
            
              <div class="fname">{employee.first_name}</div>
              <div class="separator" >|</div>
              <div class="lname">{employee.last_name}</div>
              <div class="separator">|</div>
              <div class="persid">{employee.pers_id}</div>
              <div class="separator">|</div>
              <div class="edate">{employee.entry_date}</div>
              <div class="separator">|</div>
              <div class="bdate">{employee.position}</div>
              <div class="separator">|</div>
            
              <div class="score">
                {getBarLevelsForScore(employee.ma_score).map((level, index) => (
                  <div class="scoreItem"
                    key={index}
                    style={{ 
                      flex: `${level}%`, 
                      backgroundColor: getColorForLevel(employee.ma_score, index),
                      borderRight: getColorForLevel(employee.ma_score, index) !== 'white' ? 'none' : 'none'
                      }}
                  ></div>
                ))}
              </div>
              
              
                          
              <div class="action-list-item">
                  <Link to={`/employee/${employee.pers_id}`} > <button class="viewButton"  >Details</button> </Link>
                  <Link to={`/employee-edit/${employee.pers_id}`} > <button class="EditButton"  >Edit</button> </Link>
              </div>
          </div>
        </li>
      ))}
    </ul>

  </Layout>
);
}

export default EmployeeList;