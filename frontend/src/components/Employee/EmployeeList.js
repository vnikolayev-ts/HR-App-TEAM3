
import {getEmployees, getTenant} from '../../api/ClientApi'
import ScoreComponent from '../Utils/ScoreComponent';


import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../Layout/Layout';
 

const EmployeeList = () => {
    
  const [employeeData, setEmployeeData] = useState(null);
  const [title, setTitle] = useState("Employee List");
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const data = await getEmployees(); 
        setEmployeeData(data);

        const tData =  await getTenant();
         setTenant(tData);
      
        setTitle(`Employee List ${tenant.name}`);
        
       

      } catch (error) { 
        console.error('Error fetching HR data:', error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die getHRData aufruft

  }, []); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

  if (!employeeData) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }
return (
  
  <Layout pTitle={title}>
 
 
        <Link to="/employee-create">
          <button className="createButton">Create </button>
        </Link>
      
    
    <ul className="list" >
      {employeeData.map(employee => (
        <li className="listItem" key={employee.pers_id} >


              <div className="fname">{employee.first_name}</div>                     
              <div className="lname">{employee.last_name}</div>                     
              <div className="persid">{employee.pers_id}</div>                   
              <div className="edate">{employee.entry_date}</div>                   
              <div className="bdate">{employee.position}</div>             
              
           
              <ScoreComponent score={employee.ma_score} />
              
              <Link to={`/employee/${employee.pers_id}`} > <button className="viewButton"  >Details</button> </Link>
                          
              
                  
             
                  
          
        </li>
        
      ))}
    </ul>
  
  </Layout>
);
}

export default EmployeeList;