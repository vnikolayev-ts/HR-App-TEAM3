//import data from '../data/hr-data.json'; 
import { getBarLevelsForScore, getColorForLevel } from '../js/Utils'; 

import React from 'react';
import { Link } from 'react-router-dom';



const EmployeeList = () => {
  return (
    <div>
       <img src='./images/logo/apple-touch-icon.png'/>
      <h2>Mitarbeiterliste von {data.company}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.employees.map(employee => (
          <li key={employee.pers_id} style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
            <div class="persdate" style={{ marginBottom: 10 }}>
            
              <div class="fname">{employee.first_name}</div>
              <div class="lname">{employee.last_name}</div>
              <div class="persid">{employee.pers_id}</div>
              <div class="edate">{employee.entry_date}</div>
              <div class="bdate">{employee.birthdate}</div>
             
              <div style={{ display: 'flex', height: 20, width: '150px', marginBottom: 5, border: '1px solid gray' }}>
                {getBarLevelsForScore(employee.ma_score).map((level, index) => (
                  <div
                    key={index}
                    style={{
                      flex: `${level}%`,
                      backgroundColor: getColorForLevel(employee.ma_score, index),
                      borderRight: getColorForLevel(employee.ma_score, index) !== 'white' ? '1px solid gray' : 'none'
                    }}
                  ></div>
                ))}
              </div>
              <div class="score">{employee.ma_score}</div>
            </div>
            <div>
              <Link to={`/employee/${employee.pers_id}`}>
                <button>Details</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;