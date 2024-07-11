import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import LabelInputComponent from '../Utils/LabelInputComponent';
import { createEmployee } from '../../api/ClientApi';

const EmployeeCreate = () => {
  const navigate = useNavigate();

  // State-Hooks für jedes Eingabefeld
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


  const handleCreate = async (e) => {
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
      teamwork,
      communication,
      leadership,
      problem_solving:problemSolving,
      adaptability,
      punctuality,
      friendliness,
      creativity,
      reliability,
      initiative,
      image
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
       <LabelInputComponent lab={"Img Url"} name="image" val={image} onChange={(e) => setImage(e.target.value)}/>
        <LabelInputComponent lab="First Name: " name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <LabelInputComponent lab="Last Name: " name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <LabelInputComponent lab="Date of Birth: " name="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        <LabelInputComponent lab="Date of Entry: " name="entry_date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
        <LabelInputComponent lab="Position" name="position" value={position} onChange={(e) => setPosition(e.target.value)} />
        <LabelInputComponent lab="Department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <LabelInputComponent lab="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <LabelInputComponent lab="Phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <LabelInputComponent lab="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <LabelInputComponent lab="Sick Days" name="sick_days" value={sickDays} onChange={(e) => setSickDays(e.target.value)} />
        <LabelInputComponent lab="Salary" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />

        <h3>Skills:</h3>
        <LabelInputComponent lab="Teamwork" name="teamwork" type="number" min="1" max="10" value={teamwork} onChange={(e) => setTeamwork(e.target.value)} />
        <LabelInputComponent lab="Communication" name="communication" type="number" min="1" max="10" value={communication} onChange={(e) => setCommunication(e.target.value)} />
        <LabelInputComponent lab="Leadership" name="leadership" type="number" min="1" max="10" value={leadership} onChange={(e) => setLeadership(e.target.value)} />
        <LabelInputComponent lab="Problem Solving" name="problem_solving" type="number" min="1" max="10" value={problemSolving} onChange={(e) => setProblemSolving(e.target.value)} />
        <LabelInputComponent lab="Adaptability" name="adaptability" type="number" min="1" max="10" value={adaptability} onChange={(e) => setAdaptability(e.target.value)} />
        <LabelInputComponent lab="Punctuality" name="punctuality" type="number" min="1" max="10" value={punctuality} onChange={(e) => setPunctuality(e.target.value)} />
        <LabelInputComponent lab="Friendliness" name="friendliness" type="number" min="1" max="10" value={friendliness} onChange={(e) => setFriendliness(e.target.value)} />
        <LabelInputComponent lab="Creativity" name="creativity" type="number" min="1" max="10" value={creativity} onChange={(e) => setCreativity(e.target.value)} />
        <LabelInputComponent lab="Reliability" name="reliability" type="number" min="1" max="10" value={reliability} onChange={(e) => setReliability(e.target.value)} />
        <LabelInputComponent lab="Initiative" name="initiative" type="number" min="1" max="10" value={initiative} onChange={(e) => setInitiative(e.target.value)} />
          </div>

        <button className="resetButton" onClick={handleReset}>Reset</button>
        <button className="createButton" type="submit">create</button>

      </form>
    </Layout>
  );
};

export default EmployeeCreate;
