import { checkUrlExists, getBarLevelsForScore, getColorForLevel, renderStars, getCurrentDomain } from './Utils';
import {getEmployees} from './ClientApi'

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Navbar from './NavBar';


const EmployeeDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  const [employeeData, setEmployeeData] = useState(null);
  const [layout, setLayout] = useState("simple");
  const [editEmployee, setEditEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataFromLocal = true;
        const data = await getEmployees(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
        const apiLayout = data.layout;
        //setHRData(data); // Setzen der empfangenen Daten in den State
        
        setEmployeeData(data);
        setLayout(apiLayout); 

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
    navigate('/');
  };

  const handleNextClick = () => {
    if (employeeIndex < employeeData.employees.length - 1) {
      const nextEmployeeId = employeeData.employees[employeeIndex + 1].pers_id;
      navigate(`/employee/${nextEmployeeId}`);
    }
  };

  const handlePreviousClick = () => {
    if (employeeIndex > 0) {
      const previousEmployeeId = employeeData.employees[employeeIndex - 1].pers_id;
      navigate(`/employee/${previousEmployeeId}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log('Save employee data', editEmployee);
  };

  if (!employee) {
    return <div>Item not Found</div>;
  }



  return (
    
    <div class={layout}>
        <Navbar />
            <div class="action header">
        <button class= "home" onClick={handleBackClick} >Home</button>
        <button class= "zurueck" onClick={handlePreviousClick} disabled={employeeIndex === 0}>Zurück</button>
        <button class= "naechster" onClick={handleNextClick}  disabled={employeeIndex === employeeData.employees.length - 1}>Next</button>
      </div>
      <div class ="content" style={{ display: 'flex', flexDirection: 'row' }}>



      
      <img class="pimage"  
        style={{
          height: '500px',
          boxShadow: '5px 5px 9px',
          borderRadius: '35px',
          margin: '10px'}} 
        
          src={`${imgUrl}`} alt={`${employee.first_name} ${employee.last_name}`} 
       />
         <div className="person-details" style={{ marginLeft: '20px' }}>
       <h2 class="pageTitle">Details for {employee.first_name} {employee.last_name}</h2>
            
      <div style={{ display: 'flex', height: 20, width: '350px', marginBottom: 5, border: 'none' }}>
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
      <div>
      <p><strong>MA-Score:</strong> {employee.ma_score}</p>
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
      </div>
      </div>
      <div className="skills" style={{ marginTop: '20px' }}>
      <p><strong>Skills:</strong></p>
      </div>

      <div className="edit-form" style={{ marginLeft: '20px' }}>
          <h2 className="pageTitle">Edit Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
              First Name:
              <input type="text" name="first_name" value={editEmployee?.first_name || employee.first_name} onChange={handleInputChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="last_name" value={editEmployee?.last_name || employee.last_name} onChange={handleInputChange} />
            </label>
            <label>
              Date of Birth:
              <input type="date" name="birthdate" value={editEmployee?.birthdate || employee.birthdate} onChange={handleInputChange} />
            </label>
            <label>
              Entry Date:
              <input type="date" name="entry_date" value={editEmployee?.entry_date || employee.entry_date} onChange={handleInputChange} />
            </label>
            <label>
              Position:
              <input type="text" name="position" value={editEmployee?.position || employee.position} onChange={handleInputChange} />
            </label>
            <label>
              Department:
              <input type="text" name="department" value={editEmployee?.department || employee.department} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editEmployee?.email || employee.email} onChange={handleInputChange} />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" value={editEmployee?.phone || employee.phone} onChange={handleInputChange} />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={editEmployee?.address || employee.address} onChange={handleInputChange} />
            </label>
            <label>
              Sick Days:
              <input type="number" name="sick_days" value={editEmployee?.sick_days || employee.sick_days} onChange={handleInputChange} />
            </label>
            <label>
              Salary:
              <input type="number" name="salary" value={editEmployee?.salary || employee.salary} onChange={handleInputChange} />
            </label>
            <button onClick={handleSave}>Save</button>
          </div> 

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
        <button class="home" onClick={handleBackClick}>Home</button>
        <button class="zurueck" onClick={handlePreviousClick} disabled={employeeIndex === 0}>Zurück</button>
        <button class="naechster" onClick={handleNextClick} disabled={employeeIndex === employeeData.employees.length - 1}>Nächster</button>
      </div>
    </div>
    </div>

  );
}

export default EmployeeDetails;