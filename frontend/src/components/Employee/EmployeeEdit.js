import { saveEmployee } from '../Utils/Utils';
import { deleteEmployee, getEmployeeById, updateEmployee } from '../../api/ClientApi'
import LabelInputComponent from '../Utils/LabelInputComponent';
import LabelValueComponent from './../Utils/LabelValueComponent';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLogUser } from '../../api/ClientApi';


import Layout from '../Layout/Layout';


const EmployeeEdit = () => {

   
 
  const { id } = useParams();
  const navigate = useNavigate();


  const [employee, setEmployee] = useState(null);
  const [title, setTitle] = useState("Employee Edit Page");


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const fEmp = await getEmployeeById(id); 
        
        setEmployee(fEmp);
        setTitle(title); 


      } catch (error) {
        console.error('Error fetching HR data:', error);
        // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
        return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
      }
    };

    fetchData(); // Aufruf der fetchData Funktion, die getHRData aufruft

  }, []); 

  if (!employee) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }



 
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const result = await updateEmployee(id,employee);
      if (result === false) throw new Error();
      if (result.error) {
        throw new Error(`Error: ${result.error}`);
      } else {
        alert('Employee saved successfully!');
        navigate('/employee');
      }
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Failed to save employee. Please try again later.');
    }



    if (window.confirm("All data will be saved. Are you sure?")) {
    
      alert("All data have been saved.");
      navigate(`/employee/${employee.pers_id}`);
     
    }
  };


  const handleReset = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be resetted. Are you sure?")) {
     
      alert("All data have been resetted.");
    } else {
      alert("Nothing has been changed.") 
    }
  };

  const handleDelete = async () => {


    try {
      const result = await deleteEmployee(id);
      if (result === false) throw new Error();
      if (result.error) {
        throw new Error(`Error: ${result.error}`);
      } else {
        alert('Employee deleted successfully!');
        navigate('/employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again later.');
    }
    
  };

  const handleBackClick = () => {
    navigate(`/employee/${employee.pers_id}`);
  };



  if (!employee) {
    return <div>Item not Found</div>;
  }



  return (
    <Layout  pTitle={title}>
    
      <button className="backButton" onClick={handleBackClick}>Back</button>
      
     <div className="create-form">
       
        
        <LabelInputComponent lab={"Img Url"} name="image" val={employee.image} onChange={handleInputChange}/>
        <LabelInputComponent lab={"First Name"} name="first_name" val={employee.first_name} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Last Name"} name="last_name" val={employee.last_name} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Date of Birth"} name="birthdate" val={employee.birthdate} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Date of Entry"} name="entry_date" val={employee.entry_date} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Position"} name="position" val={employee.position} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Department"} name="department" val={employee.department} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Email"} name="email" val={employee.email} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Phone"} name="phone" val={employee.phone} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Address"} name="address" val={employee.address} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Sick Days"} name="sick_days" val={employee.sick_days} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Salary"} name="salary" val={employee.salary} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Position"} name="position" val={employee.position} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Position"} name="ma_score" val={employee.ma_score} onChange={handleInputChange}/>
  
        <h3>Skills:</h3>
        <LabelInputComponent lab={"Teamwork"}  name="teamwork" type="number"  min={1} max={10} val={employee.softskill_teamwork} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Communication"}  name="communication" type="number"  min={1} max={10} val={employee.softskill_communication} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Leadership"}  name="leadership" type="number"  min={1} max={10} val={employee.softskill_leadership} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Problem Solving"}  name="problem_solving" type="number"  min={1} max={10} val={employee.softskill_problem_solving} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Adaptability"}  name="adaptability" type="number"  min={1} max={10} val={employee.softskill_adaptability} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Punctuality"}  name="punctuality" type="number"  min={1} max={10} val={employee.softskill_punctuality} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Friendliness"}  name="friendliness" type="number"  min={1} max={10} val={employee.perskill_friendliness} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Creativity"}  name="creativity" type="number"  min={1} max={10} val={employee.perskill_creativity} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Reliability"}  name="reliability" type="number"  min={1} max={10} val={employee.perskill_reliability} onChange={handleInputChange}/>
        <LabelInputComponent lab={"Initiative"}  name="initiative" type="number"  min={1} max={10} val={employee.perskill_initiative} onChange={handleInputChange}/>




   
        <button className="resetButton" onClick={handleReset}>Reset</button>
        <button className="saveButton" onClick={handleSave}>Save</button>
        <button className="deleteButton" onClick={handleDelete}>Delete</button>
    </div>
    </Layout>
  );
}

export default EmployeeEdit;