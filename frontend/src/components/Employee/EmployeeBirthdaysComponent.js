import React, { useState, useEffect } from 'react';
import { getEmployees, getTenant } from '../../api/ClientApi';

const EmployeeBirthdaysComponent = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 350); // Minus 5 Tage vom heutigen Datum
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 350); // Plus 5 Tage vom heutigen Datum

        const employeesData = await getEmployees();

        // Setzen der gefilterten Mitarbeiter
        setFilteredEmployees(employeesData);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEmployeeData();
  }, []); // Leeres Dependency Array für einmaliges Laden beim Mounten

  // Funktion zum Formatieren des Datums in "YYYY-MM-DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h3 className="dashTitle">Employees birthdays in the next 5 Days</h3>
    
      <ul>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (
            <ul key={index}>
              {employee.first_name} {employee.last_name} - {formatDate(employee.birthdate)}
            </ul>
          ))
        ) : (
          <p>No employees have birthdays in the next 5 days</p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeBirthdaysComponent;
