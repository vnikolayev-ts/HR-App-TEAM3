import employeeData from '../data/employees.json';
import userData from '../data/users.json'; 
import tenantData from '../data/tenants.json'; 

//const apiServerPort = 3001;
//const apiServerUrl = "http://localhost";

let logUser = null;


//fetch(`localhost:${apiport}`), {method:'POST', headers: {'Content-Type': 'application/json'}},
//body: 

 export  const  getEmployees2 = async  () => {
   return await getFileHrData(); //Todo warten bis backend da ist
 /* try {
    const apiUrl = `${apiServerUrl}:${apiServerPort}`;
   // const response = await fetch(apiUrl);
   // const data = await response.json();

    const response = await  fetch(apiUrl);
    const data =  await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
    
  }*/
}

export const getEmployees = async () => {
  let foundEmps = null;
  const loggedInUser = getLogUser();
  const tId = loggedInUser ? loggedInUser.tenantId : null;
  const empList = employeeData.employees;

  if (!tId) {
    foundEmps = empList;
  } else {
    foundEmps = employeeData.employees.filter(el => el.tenantId === tId);
   
  }
  return foundEmps;
};


export  const  getEmployeeById = async (id) => {
  var fEmployee = null;

  const empList = await getEmployees();
  fEmployee = empList.find((el) => el.pers_id === (id));

  return fEmployee;

}


function getFileHrData () {

  
  
    return employeeData;
} 


export  const  getTenants = async  () => {


  let foundTnList = null;
  const loggedInUser = getLogUser();
  const tId = loggedInUser ? loggedInUser.tenantId : null;
  const tnList = tenantData.tenants;


  if (!tId){
    foundTnList = tnList;
  } else 
  foundTnList = tnList.filter((tl) => tl.tenantId === parseInt(tId));


  return foundTnList;
}

export  const  getTenant = async  () => {
  var fTn = null;
  var id = getLogUser().tenantId;
  const tList = await getTenants();
  fTn = tList.find((tl) => tl.tenantId === parseInt(id));
  return fTn;
}


export  const  getUsers = async  () => {

  var foundUsers = null;
  var tenantId = getLogUser().tenantId;

  const userList = userData.users;
  if (!tenantId){
    foundUsers = userList;
  } else 
  foundUsers = userList.filter((ul) => ul.tenantId === parseInt(tenantId));
  return foundUsers;
}




export  const  getUserById = async (id) => {
  var foundUser = null;

  const userList = await getUsers();
  foundUser = userList.find((u) => u.userId === parseInt(id));
  return foundUser;

}

export function getLogUser(){
  const lUser = localStorage.getItem('loginUser');
  const loginUser = JSON.parse(lUser);
  return loginUser;
}

export  const  apiLogin = async (username, password) => {
//export async function  apiLogin (username, password) {


  const userList = userData.users;
  //const userList = await getUsers(); // Aufruf der async Funktion getEmployees -API
  const foundUser = userList.find((u) => u.username === username);

  if (!foundUser) return null;

  if (foundUser.password === password){

    delete foundUser.password;
    
    logUser = foundUser;
    return logUser;
  }


  return null;
}
