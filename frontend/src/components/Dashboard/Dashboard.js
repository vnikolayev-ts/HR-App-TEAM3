import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { getEmployees, getUsers, getTenant } from '../../api/ClientApi';
import JokeComponent from '../Utils/JokeComponent'; 
import EmployeeBirthdaysComponent from '../Employee/EmployeeBirthdaysComponent'; 


const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [eLength, setELength] = useState(0);
  const [uLength, setULength] = useState(0);
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Daten von der API abrufen
        const dataEmployee = await getEmployees();
        const dataUser = await getUsers();
        const dataTenant = await getTenant();

        // Daten setzen
        setEmployeeData(dataEmployee);
        setELength(dataEmployee.length);

        setUserData(dataUser);
        setULength(dataUser.length);

        setTenant(dataTenant);

      } catch (error) {
        console.error('Error fetching HR data:', error);
      }
    };

    fetchData();
  }, []); // Leeres Abhängigkeits-Array sorgt dafür, dass useEffect nur einmal ausgeführt wird

  if (!employeeData || !userData || !tenant) {
    return <p>Loading...</p>; // Anzeige während des Ladens der Daten
  }

  return (
    <div>
      <Layout pTitle={`Dashboard - ${tenant.name}`}>
        <label>Users:</label> {uLength}
        <label>Employees:</label> {eLength}
        <div>
                   <JokeComponent />
                   <EmployeeBirthdaysComponent />
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
