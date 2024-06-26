
import { getBarLevelsForScore, getColorForLevel } from './Utils'; 
import {getHRData} from './ClientApi'

import React from 'react';
import { Link } from 'react-router-dom';




const EmployeeList = () => {

 const  data = getHRData();

 return (
  <div class="extended">
     <img src='./images/logo/apple-touch-icon.png' alt=""/>
    <h2 style={{textShadow:'2px 2px 7px'}}>Mitarbeiterliste von {data.company}</h2>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {data.employees.map(employee => (
        <li key={employee.pers_id} style={{ marginBottom: 20, backgroundColor: 'rgb(204, 204, 204)', border: 'none', borderRadius: '5px', boxShadow: '3px 3px 7px', padding: 10 }}>
          <div class="persdate" style={{ marginBottom: 10, display: 'flex', alignItems: 'center'}}>
          
            <div class="fname">{employee.first_name}</div>
            <div style={{margin: '0 10px'}} className="separator">|</div>
            <div class="lname">{employee.last_name}</div>
            <div style={{margin: '0 10px'}} className="separator">|</div>
            <div class="persid">{employee.pers_id}</div>
            <div style={{margin: '0 10px'}}className="separator">|</div>
            <div class="edate">{employee.entry_date}</div>
            <div style={{margin: '0 10px'}}className="separator">|</div>
            <div class="bdate">{employee.birthdate}</div>
            <div style={{margin: '0 10px'}}className="separator">|</div>
           
            <div style={{ display: 'flex', height: 15, width: '350px', marginBottom: 5, border: 'none' }}>
              {getBarLevelsForScore(employee.ma_score).map((level, index) => (
                <div
                  key={index}
                  style={{ border: 'none', borderRadius: '5px', boxShadow: '2px 2px 7px', marginRight: '2px',
                    flex: `${level}%`,
                    backgroundColor: getColorForLevel(employee.ma_score, index),
                    borderRight: getColorForLevel(employee.ma_score, index) !== 'white' ? 'none' : 'none'
                  }}
                ></div>
              ))}
            </div>
            
            <div style={{margin: '0 10px'}} class="score">{employee.ma_score}</div>
                        
           <div>
            
            <Link to={`/employee/${employee.pers_id}`} >
            
              <button style={{ marginLeft: '50px',borderRadius: '3px', border: 'none', boxShadow: '2px 2px 7px',}} >Details</button>
              
            </Link>
            
          </div>
        </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default EmployeeList;