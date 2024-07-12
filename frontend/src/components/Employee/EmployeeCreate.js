import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import LabelInputComponent from '../Utils/LabelInputComponent';
import { createEmployee } from '../../api/ClientApi';

const EmployeeCreate = () => {
  const navigate = useNavigate();

  // State-Hooks für jedes Eingabefeld
  const [employee, setEmployee] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [sickDays, setSickDays] = useState('');
  const [salary, setSalary] = useState('');
  const [teamwork, setTeamwork] = useState('');
  const [communication, setCommunication] = useState('');
  const [leadership, setLeadership] = useState('');
  const [problemSolving, setProblemSolving] = useState('');
  const [adaptability, setAdaptability] = useState('');
  const [punctuality, setPunctuality] = useState('');
  const [friendliness, setFriendliness] = useState('');
  const [creativity, setCreativity] = useState('');
  const [reliability, setReliability] = useState('');
  const [initiative, setInitiative] = useState('');
  const [image, setImage] = useState('');

  const [title] = useState('Create Employee');

  const handleBackClick = () => {
    navigate('/employee');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const result = await createEmployee(employee);
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
  }

  const handleCreateOld = async (e) => {
    e.preventDefault();
    const newEmployee = {
      first_name:firstName,
      last_name:lastName,
      birthdate,
      entry_date: entryDate,
      position,
      department,
      email,
      phone,
      address,
      sick_days: sickDays,
      salary,
      softskill_teamwork: teamwork,
      softskill_communication: communication,
      softskill_leadership: leadership,
      softskill_problem_solving:problemSolving,
      softskill_adaptability:adaptability,
      perskill_punctuality:punctuality,
      perskill_friendliness:friendliness,
      perskill_creativity:creativity,
      perskill_reliability:reliability ,
      perskill_initiative:initiative ,
      imgUrl:image
    };

    try {
      const result = await createEmployee(newEmployee);
      if (result === false) throw new Error();
      if (result.error) {
        throw new Error(`Error: ${result.error}`);
      } else {
        alert('Employee created successfully!');
        navigate('/employee');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee. Please try again later.');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (window.confirm("All data will be resetted. Are you sure?")) {
      window.location.reload(true);
      alert("All data have been resetted.");
    } else {
      alert("Nothing has been changed.");
    }
  };

  return (
    <Layout pTitle={title}>
      <button onClick={handleBackClick} className='backButton'>Back</button>
      <form onSubmit={handleCreate}>
      <div className="createItem">
       <LabelInputComponent lab={"Img Url"} name="image" val={image} onChange={handleInputChange}/>
        <LabelInputComponent lab="First Name " name="first_name" value={firstName} onChange={handleInputChange} />
        <LabelInputComponent lab="Last Name " name="last_name" value={lastName} onChange={handleInputChange} />
        <LabelInputComponent lab="Date of Birth " name="birthdate" type="date" onChange={handleInputChange} />
        <LabelInputComponent lab="Date of Entry " name="entry_date" type="date" onChange={handleInputChange} />
        <LabelInputComponent lab="Position" name="position" value={position} onChange={handleInputChange} />
        <LabelInputComponent lab="Department" name="department" value={department} onChange={handleInputChange} />
        <LabelInputComponent lab="Email" name="email" value={email} onChange={handleInputChange} />
        <LabelInputComponent lab="Phone" name="phone" value={phone} onChange={handleInputChange} />
        <LabelInputComponent lab="Address" name="address" value={address} onChange={handleInputChange} />
        <LabelInputComponent lab="Sick Days" name="sick_days" type="number"  min="1" onChange={handleInputChange} />
        <LabelInputComponent lab="Salary" name="salary" type="number"  min="1" onChange={handleInputChange} />

        <h3>Skills:</h3>
        <LabelInputComponent lab="Teamwork" name="teamwork" type="number" min="1" max="10" value={teamwork} onChange={handleInputChange} />
        <LabelInputComponent lab="Communication" name="communication" type="number" min="1" max="10" value={communication} onChange={handleInputChange} />
        <LabelInputComponent lab="Leadership" name="leadership" type="number" min="1" max="10" value={leadership} onChange={handleInputChange} />
        <LabelInputComponent lab="Problem Solving" name="problem_solving" type="number" min="1" max="10" value={problemSolving} onChange={handleInputChange} />
        <LabelInputComponent lab="Adaptability" name="adaptability" type="number" min="1" max="10" value={adaptability} onChange={handleInputChange} />
        <LabelInputComponent lab="Punctuality" name="punctuality" type="number" min="1" max="10" value={punctuality} onChange={handleInputChange} />
        <LabelInputComponent lab="Friendliness" name="friendliness" type="number" min="1" max="10" value={friendliness} onChange={handleInputChange} />
        <LabelInputComponent lab="Creativity" name="creativity" type="number" min="1" max="10" value={creativity} onChange={handleInputChange} />
        <LabelInputComponent lab="Reliability" name="reliability" type="number" min="1" max="10" value={reliability} onChange={handleInputChange} />
        <LabelInputComponent lab="Initiative" name="initiative" type="number" min="1" max="10" value={initiative} onChange={handleInputChange} />
          </div>

        <button className="resetButton" onClick={handleReset}>Reset</button>
        <button className="createButton" type="submit">create</button>

      </form>
    </Layout>
  );
};

export default EmployeeCreate;
