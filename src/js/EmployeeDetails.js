import data from '../data/hr-data.json'; 

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getBarLevelsForScore, getColorForLevel, renderStars } from './Utils';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employeeIndex = data.employees.findIndex(emp => emp.pers_id === id);
  const employee = data.employees[employeeIndex];

  const handleBackClick = () => {
    navigate('/');
  };

  const handleNextClick = () => {
    if (employeeIndex < data.employees.length - 1) {
      const nextEmployeeId = data.employees[employeeIndex + 1].pers_id;
      navigate(`/employee/${nextEmployeeId}`);
    }
  };

  const handlePreviousClick = () => {
    if (employeeIndex > 0) {
      const previousEmployeeId = data.employees[employeeIndex - 1].pers_id;
      navigate(`/employee/${previousEmployeeId}`);
    }
  };

  if (!employee) {
    return <div>Item not Found</div>;
  }



  return (
    
    <div >
            <div class="action header">
        <button onClick={handleBackClick}>Zurück</button>
        <button onClick={handlePreviousClick} disabled={employeeIndex === 0}>Vorheriger</button>
        <button onClick={handleNextClick} disabled={employeeIndex === data.employees.length - 1}>Nächster</button>
      </div>
      <div class ="content" style={{ border: '1px solid #ccc', padding: 20, marginTop: 20,  marginBottom: 20 }}>

      <h3>Details for {employee.first_name} {employee.last_name}</h3>
      <img class="pimage" src={`../images/personal/${employee.image}`} alt={`${employee.first_name} ${employee.last_name}`} 
      style={{ height: '250px', marginBottom: 10 }} />
            <p><strong>MA-Score:</strong> {employee.ma_score}</p>
      <div style={{ display: 'flex', height: 20, width: '50%', marginBottom: 5, border: '1px solid gray' }}>
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
      <p><strong>Pers-ID:</strong> {employee.pers_id}</p>
      <p><strong>First Name:</strong> {employee.first_name}</p>
      <p><strong>Last Name:</strong> {employee.last_name}</p>
      <p><strong>Date of Birth:</strong> {employee.birthdate}</p>
      <p><strong>Entry:</strong> {employee.entry_date}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      <p><strong>Address:</strong> {employee.address}</p>

      <p><strong>Sick Days:</strong> {employee.sick_days} Tage</p>
      <p><strong>Salary / Year :</strong> {employee.salary} €</p>
      <p><strong>Skills:</strong></p>
      <ul>
        <li><strong>Teamwork:</strong> {renderStars(employee.skills.soft_skills.teamwork)}</li>
        <li><strong>Communication:</strong> {renderStars(employee.skills.soft_skills.communication)}</li>
        <li><strong>Leadership:</strong> {renderStars(employee.skills.soft_skills.leadership)}</li>
        <li><strong>Problem Solving:</strong> {renderStars(employee.skills.soft_skills.problem_solving)}</li>
        <li><strong>Adaptability:</strong> {renderStars(employee.skills.soft_skills.adaptability)}</li>
        <li><strong>Punctuality:</strong> {renderStars(employee.skills.personal_skills.punctuality)}</li>
        <li><strong>Friendliness:</strong> {renderStars(employee.skills.personal_skills.friendliness)}</li>
        <li><strong>Creativity:</strong> {renderStars(employee.skills.personal_skills.creativity)}</li>
        <li><strong>Reliability:</strong> {renderStars(employee.skills.personal_skills.reliability)}</li>
        <li><strong>Initiative:</strong> {renderStars(employee.skills.personal_skills.initiative)}</li>
      </ul>



    </div>

    <div class="action footer">
        <button onClick={handleBackClick}>Zurück</button>
        <button onClick={handlePreviousClick} disabled={employeeIndex === 0}>Vorheriger</button>
        <button onClick={handleNextClick} disabled={employeeIndex === data.employees.length - 1}>Nächster</button>
      </div>
    </div>
  );
}

export default EmployeeDetails;