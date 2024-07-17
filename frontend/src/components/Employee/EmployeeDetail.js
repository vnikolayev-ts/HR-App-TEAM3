import React from 'react';
import { checkUrlExists } from '../Utils/Utils';
import { getEmployeeById } from '../../api/ClientApi';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ScoreComponent from '../Utils/ScoreComponent';
import StarsComponent from '../Utils/StarsComponent';
import LabelValueComponent from './../Utils/LabelValueComponent';
import Layout from '../Layout/Layout';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [title, setTitle] = useState("Employee Detail Page");
  const noimage_url = "../images/noimage.jpg"; // Standardbild-Pfad
  const [imgUrl, setImgUrl] = useState(noimage_url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fEmp = await getEmployeeById(id);
        setEmployee(fEmp);
        setTitle(title);

        // Überprüfen, ob die Bild-URL existiert
        const exists = await checkUrlExists(fEmp.imagePath2);
        const imgFullPath = exists ? fEmp.imagePath2 : noimage_url;
        setImgUrl(imgFullPath);

      } catch (error) {
        console.error('Error fetching HR data:', error);
        return <p>Loading... Error</p>;
      }
    };

    fetchData(); 
  }, [id, title]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  const handleBackClick = () => {
    navigate('/employee');
  };

  const handleEditClick = () => {
    navigate(`/employee-edit/${employee.pers_id}`);
  };

  return (
    <Layout pTitle={title}>
      <button onClick={handleBackClick} className="backButton">Back</button>
      <div className="employee-details-container">
        <div className="employee-main">
          <div className="employee-left">
            <div className="employee-image-info">
              <img className="pimage" src={imgUrl} alt={`${employee.first_name} ${employee.last_name}`} />
              <LabelValueComponent value={<ScoreComponent score={employee.ma_score} />} className={"ma-score"} />
            </div>
            <div className="employee-info">
              <LabelValueComponent label={"MA-Score"} value={employee.ma_score} />
              <LabelValueComponent label={"Pers-ID"} value={employee.pers_id} />
              <LabelValueComponent label={"First Name"} value={employee.first_name} />
              <LabelValueComponent label={"Last Name"} value={employee.last_name} />
              <LabelValueComponent label={"Date of Birth"} value={employee.birthdate} />
              <LabelValueComponent label={"Entry"} value={employee.entry_date} />
              <LabelValueComponent label={"Position"} value={employee.position} />
              <LabelValueComponent label={"Department"} value={employee.department} />
              <LabelValueComponent label={"Email"} value={employee.email} />
              <LabelValueComponent label={"Phone"} value={employee.phone} />
              <LabelValueComponent label={"Address"} value={employee.address} />
              <LabelValueComponent label={"Sick Days"} value={employee.sick_days} />
              <LabelValueComponent label={"Salary / Year (€)"} value={employee.salary} />
            </div>
          </div>
          <div className="employee-skills">
            <h3>Skills:</h3>
            <LabelValueComponent label={"Teamwork"} value={<StarsComponent value={employee.softskill_teamwork} />} />
            <LabelValueComponent label={"Communication"} value={<StarsComponent value={employee.softskill_communication} />} />
            <LabelValueComponent label={"Leadership"} value={<StarsComponent value={employee.softskill_leadership} />} />
            <LabelValueComponent label={"Problem Solving"} value={<StarsComponent value={employee.softskill_problem_solving} />} />
            <LabelValueComponent label={"Adaptability"} value={<StarsComponent value={employee.softskill_adaptability} />} />
            <LabelValueComponent label={"Punctuality"} value={<StarsComponent value={employee.perskill_punctuality} />} />
            <LabelValueComponent label={"Friendliness"} value={<StarsComponent value={employee.perskill_friendliness} />} />
            <LabelValueComponent label={"Creativity"} value={<StarsComponent value={employee.perskill_creativity} />} />
            <LabelValueComponent label={"Reliability"} value={<StarsComponent value={employee.perskill_reliability} />} />
            <LabelValueComponent label={"Initiative"} value={<StarsComponent value={employee.perskill_initiative} />} />
          </div>
        </div>
      </div>
      <button onClick={handleEditClick} className="editButton">Edit</button>
    </Layout>
  );
};

export default EmployeeDetails;
