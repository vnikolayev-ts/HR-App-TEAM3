import React from 'react';

const BirthdaysInNextTimeframe = ({ employees }) => {
  const today = new Date();
  const future2WeeksDate = new Date();
  future2WeeksDate.setDate(future2WeeksDate.getDate() + 14);

  const futureMonthDate = new Date();
  futureMonthDate.setMonth(futureMonthDate.getMonth() +31);

  const future6MonthsDate = new Date();
  future6MonthsDate.setMonth(future6MonthsDate.getMonth() + 6);

  // Funktion zum Formatieren des Datums in YYYY-MM-DD
  const formatDate = (date) => {
    return date.toLocaleDateString('de-DE'); // Adjust 'en-CA' to your desired locale if needed
  };

  const formatDateNoYear = (dateString, local='en-US') => {
    const date = new Date(dateString);
    const month = date.toLocaleString(local, { month: 'short' });
    const day = date.getDate();
    return ` ${day}.${month}`;
  };

  // Funktion zur Anzeige der Monatsbezeichnung
  const formatMonthsLabel = (months) => {
    if (months === 1) {
      return '1 Monat';
    } else {
      return `${months} Monate`;
    }
  };

  // Filter für Geburtstage in den nächsten 2 Wochen
  const upcomingBirthdays2Weeks = employees.filter(employee => {
    const birthdate = new Date(employee.birthdate);
    if (isNaN(birthdate)) return false;
    birthdate.setFullYear(today.getFullYear());
    return birthdate > today && birthdate <= future2WeeksDate;
  });

  // Filter für Geburtstage im nächsten 3 Monate, falls keine in den nächsten 2 Wochen gefunden wurden
  const upcomingBirthdaysMonth = upcomingBirthdays2Weeks.length === 0
    ? employees.filter(employee => {
      const birthdate = new Date(employee.birthdate);
      if (isNaN(birthdate)) return false;
      birthdate.setFullYear(today.getFullYear());
      return birthdate > today && birthdate <= futureMonthDate;
    })
    : [];

  // Filter für Geburtstage im nächsten halben Jahr, falls keine in den nächsten 2 Wochen oder im nächsten Monat gefunden wurden
  const upcomingBirthdays6Months = upcomingBirthdays2Weeks.length === 0 && upcomingBirthdaysMonth.length === 0
    ? employees.filter(employee => {
      const birthdate = new Date(employee.birthdate);
      if (isNaN(birthdate)) return false;
      birthdate.setFullYear(today.getFullYear());
      return birthdate > today && birthdate <= future6MonthsDate;
    })
    : [];

  return (
    <div>
      <h2>Upcoming Birthdays</h2>
      {upcomingBirthdays2Weeks.length > 0 && (
        <div>
          <h3>Next 2 Weeks:</h3>
          <ul>
            {upcomingBirthdays2Weeks.map(employee => (
              <li key={employee.id}>
                <label>{employee.last_name}, {employee.first_name}:</label> {formatDateNoYear(new Date(employee.birthdate))}
              </li>
            ))}
          </ul>
        </div>
      )}
      {upcomingBirthdays2Weeks.length === 0 && upcomingBirthdaysMonth.length > 0 && (
        <div>
          <h3>Next {formatMonthsLabel(3)}:</h3>
          <ul>
            {upcomingBirthdaysMonth.map(employee => (
              <li key={employee.id}>
             <label>{employee.last_name}, {employee.first_name}:</label> {formatDateNoYear(new Date(employee.birthdate))}
              </li>
            ))}
          </ul>
        </div>
      )}
      {(upcomingBirthdays2Weeks.length === 0 && upcomingBirthdaysMonth.length === 0 && upcomingBirthdays6Months.length > 0) && (
        <div>
          <h3>Next {formatMonthsLabel(6)}:</h3>
          <ul>
            {upcomingBirthdays6Months.map(employee => (
              <li key={employee.id}>
            <label>{employee.last_name}, {employee.first_name}:</label> {formatDateNoYear(new Date(employee.birthdate))}
              </li>
            ))}
          </ul>
        </div>
      )}
      {upcomingBirthdays2Weeks.length === 0 && upcomingBirthdaysMonth.length === 0 && upcomingBirthdays6Months.length === 0 && (
        <p>No upcoming birthdays in the next 6 months.</p>
      )}
    </div>
  );
};

export default BirthdaysInNextTimeframe;
