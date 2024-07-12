import React from 'react';

const EmployeesPerDepartment = ({ employees }) => {
  // Funktion zur Berechnung der Anzahl der Mitarbeiter pro Abteilung
  const calculateEmployeesPerDepartment = (employees) => {
    const departmentCount = {};

    employees.forEach(employee => {
      const department = employee.department;
      if (departmentCount[department]) {
        departmentCount[department]++;
      } else {
        departmentCount[department] = 1;
      }
    });

    return departmentCount;
  };

  // Berechne die Anzahl der Mitarbeiter pro Abteilung
  const employeesPerDepartment = calculateEmployeesPerDepartment(employees);

  return (
    <div>
      <h2>Employees per Department:</h2>
      <ul>
        {Object.keys(employeesPerDepartment).map(department => (
          <li key={department}>
            {department}: {employeesPerDepartment[department]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesPerDepartment;
