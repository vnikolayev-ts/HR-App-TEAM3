  


    export const checkUrlExists = async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        return false;
      }
    };

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
           if (newEmployee.communication)  ausgabe += "\nCommunikation: " + newEmployee.communication ;
           if (newEmployee.leadership)  ausgabe += "\nLeadership: " + newEmployee.leadership ;
           if (newEmployee.problem_solving)  ausgabe += "\nProblem solving: " + newEmployee.problem_solving ;
           if (newEmployee.adaptability)  ausgabe += "\nAdaptability: " + newEmployee.adaptability ;
           if (newEmployee.punctuality)  ausgabe += "\nPunktuality: " + newEmployee.punctuality ;

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
