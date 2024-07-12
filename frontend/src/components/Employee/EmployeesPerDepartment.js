import React from 'react';



const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};



const EmployeesPerDepartment = ({ employees }) => {
  // Funktion zur Berechnung der Anzahl der Mitarbeiter und der Gehaltssumme pro Abteilung
  const calculateEmployeesPerDepartment = (employees) => {
    const departmentStats = {};

    employees.forEach(employee => {
      const department = employee.department;
      const salary = employee.salary;

      if (departmentStats[department]) {
        departmentStats[department].count++;
        departmentStats[department].salarySum += salary;
      } else {
        departmentStats[department] = {
          count: 1,
          salarySum: salary
        };
      }
    });

    return departmentStats;
  };

  // Berechne die Anzahl der Mitarbeiter und Gehaltssumme pro Abteilung
  const employeesPerDepartment = calculateEmployeesPerDepartment(employees);

  return (
    <div>
      <h2>Employees per Department:</h2>
      <ul>
        {Object.keys(employeesPerDepartment).map(department => (
          <li key={department}>
            <label>{department}:</label> {employeesPerDepartment[department].count} Worker,
            Salary: {formatCurrency(employeesPerDepartment[department].salarySum)} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesPerDepartment;
