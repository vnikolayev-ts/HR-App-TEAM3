import React from 'react';

const BirthdaysInNextTimeframe = ({ employees }) => {
  const today = new Date();
  const future2WeeksDate = new Date();
  future2WeeksDate.setDate(future2WeeksDate.getDate() + 14);

  const futureMonthDate = new Date();
  futureMonthDate.setMonth(futureMonthDate.getMonth() + 1);

  const future6MonthsDate = new Date();
  future6MonthsDate.setMonth(future6MonthsDate.getMonth() + 3);

  // Funktion zum Formatieren des Datums in YYYY-MM-DD
  const formatDate = (date) => {
    return date.toLocaleDateString('de-DE'); // Adjust 'de-DE' to your desired locale if needed
  };

  const formatDateNoYear = (dateString, local = 'en-US') => {
    const date = new Date(dateString);
    const month = date.toLocaleString(local, { month: 'short' });
    const day = date.getDate();
    return `${day}.${month}`;
  };

  // Funktion zur Anzeige der Monatsbezeichnung
  const formatMonthsLabel = (months) => {
    if (months === 1) {
      return '1 Month';
      return '1 month';
    } else {
      return `${months} Monate`;
    }
  };

  // Funktion zur Sortierung nach Datum
  const sortByDate = (a, b) => {
    const dateA = new Date(a.birthdate);
    const dateB = new Date(b.birthdate);
    dateA.setFullYear(today.getFullYear());
    dateB.setFullYear(today.getFullYear());
    return dateA - dateB;
  };

  // Filter für Geburtstage in den nächsten 2 Wochen
  const upcomingBirthdays2Weeks = employees.filter(employee => {
    const birthdate = new Date(employee.birthdate);
    if (isNaN(birthdate)) return false;
    birthdate.setFullYear(today.getFullYear());
    return birthdate > today && birthdate <= future2WeeksDate;
  }).sort(sortByDate);

  // Filter für Geburtstage im nächsten Monat, falls keine in den nächsten 2 Wochen gefunden wurden
  const upcomingBirthdaysMonth = upcomingBirthdays2Weeks.length === 0
    ? employees.filter(employee => {
      const birthdate = new Date(employee.birthdate);
      if (isNaN(birthdate)) return false;
      birthdate.setFullYear(today.getFullYear());
      return birthdate > today && birthdate <= futureMonthDate;
    }).sort(sortByDate)
    : [];

  // Filter für Geburtstage im nächsten halben Jahr, falls keine in den nächsten 2 Wochen oder im nächsten Monat gefunden wurden
  const upcomingBirthdays6Months = upcomingBirthdays2Weeks.length === 0 && upcomingBirthdaysMonth.length === 0
    ? employees.filter(employee => {
      const birthdate = new Date(employee.birthdate);
      if (isNaN(birthdate)) return false;
      birthdate.setFullYear(today.getFullYear());
      return birthdate > today && birthdate <= future6MonthsDate;
    }).sort(sortByDate)
    : [];

  return (
    <div>
      <h2 className='dashTitle'>Upcoming Birthdays</h2>
      {upcomingBirthdays2Weeks.length > 0 && (
        <div>
          <h3 className='dashTiltle1'>Next 3 months:</h3>
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
          <h3>Next {formatMonthsLabel(1)}:</h3>
          <h3 className='dashtitle1'>Next {formatMonthsLabel(3)}:</h3>
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
          <h3>Next {formatMonthsLabel(3)}:</h3>
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
