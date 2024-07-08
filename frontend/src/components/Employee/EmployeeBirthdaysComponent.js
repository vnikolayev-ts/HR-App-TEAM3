import React, { useState, useEffect } from 'react';
import { getFilteredEmployees, getTenant } from '../../api/ClientApi';

const EmployeeBirthdaysComponent = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 350); // Minus 5 Tage vom heutigen Datum
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 350); // Plus 5 Tage vom heutigen Datum

        const employeesData = await getFilteredEmployees(startDate,endDate);

        // Filtern der Mitarbeiter mit Geburtstagen in den nächsten 5 Tagen


        // Setzen der gefilterten Mitarbeiter
        setFilteredEmployees(employeesData);

        // Abrufen und Setzen der Tenant-Daten
        const tenantData = await getTenant();
        setTenant(tenantData);
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
      <h2>Employees with Birthdays in the Next 5 Days</h2>
      {tenant && <p>Tenant: {tenant.name}</p>}
      <ul>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (
            <li key={index}>
              {employee.first_name} {employee.last_name} - {formatDate(employee.birthdate)}
            </li>
          ))
        ) : (
          <p>No employees have birthdays in the next 5 days</p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeBirthdaysComponent;
