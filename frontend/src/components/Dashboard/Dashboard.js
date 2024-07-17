import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { formatCurrency, round } from '../Utils/Utils';
import { getEmployees, getUsers, getTenantById } from '../../api/ClientApi'
import JokeComponent from '../Utils/JokeComponent'; 
import EmployeeBirthdaysComponent from '../Employee/EmployeeBirthdaysComponent'; 
import EmployeesPerDepartment from '../Employee/EmployeesPerDepartment';

const imgUrl = '../images/logo/neues_logo.png';
const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [userData, setUserData] = useState(null);
  const [eLength, setELength] = useState(0);
  const [uLength, setULength] = useState(0);
  const [salarySUM, setSalarySUM] = useState(0);
  const [sickDays, setSickDays] = useState(0);
  const [title, setTitle] = useState("AA");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Daten von der API abrufen        
        const dataEmployee = await getEmployees();
        const dataUser = await getUsers();
        const tenantId = dataUser[0].tenantId;
        const tenant = await getTenantById(tenantId);
        setCompanyName(tenant.name);
        setTitle(companyName);
        
        const salSum = dataEmployee.reduce((total, employee) => total + employee.salary, 0);
        const sikDaysSum = dataEmployee.reduce((total, employee) => total + employee.sick_days, 0);
        // Daten setzen
        setEmployeeData(dataEmployee);
        setELength(dataEmployee.length);

        setUserData(dataUser);
        setULength(dataUser.length);
        setSalarySUM((salSum));
        setSickDays((sikDaysSum));

 

      } catch (error) {
        console.error('Error fetching HR data:', error);
      }
    };

    fetchData();
  }, [title]); // Leeres Abhängigkeits-Array sorgt dafür, dass useEffect nur einmal ausgeführt wird

  if (!employeeData || !userData ) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }

  return (
    <div>
      <Layout pTitle={title}>
      <div className="logo-container"> 
      <img src={imgUrl} alt="Logo" className="logo" />
      </div>
      <div className="dashboard-container">
          <div className="birthday-component">
                   <EmployeeBirthdaysComponent employees={employeeData}/>
                   </div>
          <div className="actives">
            <h1 className='dashTitle'>Actives</h1>
        <label>Users:</label> {uLength}
        <label>Employees:</label> {eLength}
        <label>Total Salary per Year:</label> {formatCurrency(salarySUM) }
        <label>Average Salary per Year/ Worker:</label> {formatCurrency(salarySUM/eLength) }
        <label>Current Sick Days: </label> {sickDays}
        <label>Average Sick Days per Worker:</label> {round(sickDays/eLength, 0.25)} 
        <EmployeesPerDepartment employees={employeeData} />
          </div>
          <div className="joke-component">
            <JokeComponent />
        </div>           
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;


