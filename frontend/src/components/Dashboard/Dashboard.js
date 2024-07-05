import React from 'react';
import Layout from  '../Layout/Layout';
import {getEmployees, getUsers} from '../../api/ClientApi';
import { useEffect, useState } from "react";


const Dashboard = () => {

  
const [employeeData, setEmployeeData] = useState(null);
const [userData, setUserData] = useState(null);
const [eLenght, setELenght] = useState(0);
const [uLenght, setULenght] = useState(0);



useEffect(() => {
  const fetchData = async () => {
    try {
      const isDataFromLocal = true;
      const dataEmployee = await getEmployees(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
      const dataUser = await getUsers(isDataFromLocal); // Aufruf der async Funktion getEmployees -API
      //setHRData(data); // Setzen der empfangenen Daten in den State
      
      setEmployeeData(dataEmployee);
      let getLen = Object.keys(dataEmployee.employees).length;
      setELenght(getLen);

      setUserData(dataUser);
      getLen = Object.keys(dataUser.users).length;
      setULenght(getLen);
 

    } catch (error) {
      console.error('Error fetching HR data:', error);
      // Hier könntest du zusätzliche Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
      return <p>Loading... Error </p>; // Anzeige während des Ladens der Daten
    }
  };

  fetchData(); // Aufruf der fetchData Funktion, die getHRData aufruft

}, [employeeData, userData]); // Leeres Array als zweites Argument für useEffect bedeutet, dass es nur einmalig beim Laden der Komponente ausgeführt wird

if (!employeeData) {
  return <p>Loading...</p>; // Anzeige während des Ladens der Daten
}



  return (

    <div>
        <Layout pTitle={"Dashboard"}>
          <label>Users:</label> {uLenght}
          <label>Employee:</label> {eLenght}
      </Layout>
    </div>
  
  );
};

export default Dashboard;
