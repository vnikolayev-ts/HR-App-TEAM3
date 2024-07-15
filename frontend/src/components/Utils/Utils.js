

export const showAlertFromData = (data, type) => {
  if (typeof data !== 'object' || data === null) {
    // Falls data kein Objekt ist, Ausgabe als String
    console.log(data);
    alert(`Type: ${type} \n-------------\nVAL: ${data}`);
  } else {
    // Ausgabe der Benutzerdaten im Format name: value in der Konsole
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    // Erzeugen der Alert-Nachricht für ein Objekt
    alert(`Type: ${type} \n-------------\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}`);
  }
}



export const checkUrlExists = async (url) => {
  // Überprüfen, ob die URL mit "http://" oder "https://" beginnt
  if (!/^https?:\/\//i.test(url)) {
    return false;
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    return true;
  } catch (error) {
    return false;
  }
};


export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};


export function round(value, step=0.5) {
  step || (step = 1.0);
  var inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

    export const getCurrentDomain = () => {
      try {
        const { hostname } = window.location;
        return hostname;
      } catch (error) {
        return null; // Return null if something goes wrong
      }
    };

    export const getCurrentDate = (separator='')=> {

      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      
      return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
      };

      export const getCurrentYear = ()=> {

        let newDate = new Date()
        let year = newDate.getFullYear();
        
        return `${year}`
        };


        export const setPageTitle = (title='')=> {
          const titleElement = document.getElementById('pTitle');
          const msg = "ich wurde veändert, schau Employee List. Variable Title und Layout Component\n setPageTitle nicht verwenden";
          if (titleElement) {
            titleElement.textContent = msg;
            titleElement.style.color =  "red" ;
          } 
        };

        export const renderStar = (rating, onStarClick) => { 
          const stars = [];
        
          for (let i = 1; i <= 10; i++) {
            stars.push(
              <span
                key={i}
                style={{ cursor: 'pointer', color: i <= rating ? 'gold' : 'gray' }}
                onClick={() => onStarClick(i)}
              >
                ★
              </span>
            );
          }
        
          return <div>{stars}</div>;
        };

        export const saveEmployee2 = (newEmployee)=> {
          var ausgabe = "Employee added.";
           if (newEmployee.first_name)  ausgabe += "\nVorname: " + newEmployee.first_name; else return false;
           if (newEmployee.last_name)  ausgabe += "\nName: " + newEmployee.last_name; else return false;
           if (newEmployee.birthdate)  ausgabe += "\nBirthdate: " + newEmployee.birthdate; else return false;
           if (newEmployee.entry_date)  ausgabe += "\nEntrydate: " + newEmployee.entry_date; else return false;
           if (newEmployee.position)  ausgabe += "\nPosition: " + newEmployee.position;
           if (newEmployee.department)  ausgabe += "\nDepartment: " + newEmployee.department;
           if (newEmployee.email)  ausgabe += "\nEmail: " + newEmployee.email;
           if (newEmployee.phone)  ausgabe += "\nPhone: " + newEmployee.phone;
           if (newEmployee.address)  ausgabe += "\nAddress: " + newEmployee.address;
           if (newEmployee.sick_days)  ausgabe += "\nSickdays: " + newEmployee.sick_days;
           if (newEmployee.salary)  ausgabe += "\nSalary: " + newEmployee.salary;

           if (newEmployee.teamwork)  ausgabe += "\nTeamwork: " + newEmployee.teamwork ;
           if (newEmployee.communication)  ausgabe += "\nCommunication: " + newEmployee.communication ;
           if (newEmployee.leadership)  ausgabe += "\nLeadership: " + newEmployee.leadership ;
           if (newEmployee.problem_solving)  ausgabe += "\nProblem solving: " + newEmployee.problem_solving ;
           if (newEmployee.adaptability)  ausgabe += "\nAdaptability: " + newEmployee.adaptability ;
           if (newEmployee.punctuality)  ausgabe += "\nPunctuality: " + newEmployee.punctuality ;

           if (newEmployee.friendliness)  ausgabe += "\nFriendliness: " + newEmployee.friendliness ;
           if (newEmployee.creativity)  ausgabe += "\nCreativity: " + newEmployee.creativity ;
           if (newEmployee.reliability)  ausgabe += "\nReliability: " + newEmployee.reliability ;
           if (newEmployee.initiative)  ausgabe += "\nInitiative: " + newEmployee.initiative ;
          
      
      
          alert(ausgabe );
        }


        export const getEmptyEmployee = ()=> {

          return {
            first_name: '',
            last_name: '',
            birthdate: '',
            entry_date: '',
            position: '',
            department: '',
            email: '',
            phone: '',
            address: '',
            sick_days: 0,
            salary: '',
            teamwork: 3,
            communication:1,
            leadership: 1,
            problem_solving: 1,
            adaptability: 1,
            punctuality: 1,
            friendliness: 1,
            creativity: 1,
            reliability: 1,
            initiative: 1
            }
        }
