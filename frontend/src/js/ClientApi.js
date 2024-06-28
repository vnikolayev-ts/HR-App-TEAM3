import employeeData from '../data/employees.json'; 
import userData from '../data/tenants.json'; 
import tenantData from '../data/users.json'; 

const apiServerPort = 3001;
const apiServerUrl = "http://localhost";


//fetch(`localhost:${apiport}`), {method:'POST', headers: {'Content-Type': 'application/json'}},
//body: 

 export  const  getEmployees = async  (json=true) => {
if (json === true)   return getFileHrData(); //Todo warten bis backend da ist
  try {
    const apiUrl = `${apiServerUrl}:${apiServerPort}`;
   // const response = await fetch(apiUrl);
   // const data = await response.json();

    const response = await  fetch(apiUrl);
    const data =  await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error
    return null;
  }
}


function getFileHrData () {
  
    return employeeData;
}


export  const  getTenats = async  (json=true) => {

  return tenantData;
}


export  const  getUsers = async  (json=true) => {

  return userData;
}

