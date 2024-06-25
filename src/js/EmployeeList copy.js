import React from 'react';
import data from '../data/hr-data.json'; // Passe den Pfad entsprechend an

const EmployeeList = () => {
  return (
    <div>
     
      <h2>Mitarbeiterliste von {data.company}</h2>
      <ul>
        {data.employees.map(employee => (
          <li key={employee.pers_id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={employee.image} alt={employee.first_name} style={{ width: 100, height: 100, borderRadius: '50%', marginRight: 20 }} />
              <div>
                <h3>{employee.first_name} {employee.last_name}</h3>
                <p>{employee.title} </p>
                <p>{employee.position}</p>
                <p>Email: {employee.email}</p>
                <p>Telefon: {employee.phone}</p>
                <p>Alter: {employee.age}</p>
                <p>Einstellungsdatum: {employee.entry_date}</p>
                {employee.exit_date && <p>Austrittsdatum: {employee.exit_date}</p>}
                <p>Urlaubstage pro Jahr: {employee.vacation_days}</p>
                <p>Schulnoten: {employee.ma_score}</p>
                <p>Krankheitstage: {employee.sick_days}</p>
                <p>Gehalt: {employee.salary} €</p>
                {employee.skills && (
                  <>
                    <h4>Fähigkeiten:</h4>
                    <p>Teamwork: {employee.skills.soft_skills.teamwork}</p>
                    <p>Kommunikation: {employee.skills.soft_skills.communication}</p>
                    <p>Führung: {employee.skills.soft_skills.leadership}</p>
                    <p>Problemlösung: {employee.skills.soft_skills.problem_solving}</p>
                    <p>Anpassungsfähigkeit: {employee.skills.soft_skills.adaptability}</p>
                    <h4>Persönliche Fähigkeiten:</h4>
                    <p>Pünktlichkeit: {employee.skills.personal_skills.punctuality}</p>
                    <p>Freundlichkeit: {employee.skills.personal_skills.friendliness}</p>
                    <p>Kreativität: {employee.skills.personal_skills.creativity}</p>
                    <p>Zuverlässigkeit: {employee.skills.personal_skills.reliability}</p>
                    <p>Initiative: {employee.skills.personal_skills.initiative}</p>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
