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

export const getFilteredEmployees = async () => {
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

function showAlertFromData(data, type) {
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


export async function  createUser(data){
  
    showAlertFromData(data, "create user");
    
  return false;

  
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

export async function  updateUser(id, data){
    
  showAlertFromData(data, "update user id:[" + id + "]");
  
return false;
}

export async function  deleteUser(id){

  showAlertFromData(id, "delte user id:[" + id + "]");
  
return false;
}


export async function  createEmployee(data){

  showAlertFromData(data, "create employee");
  
  
return false;
}


export async function  updateEmployee(id, data){

  showAlertFromData(data, "update " + id + " employee");
  
return false;
}

export async function  deleteEmployee(id){

  
  showAlertFromData(id, "delte employee id:[" + id + "]");
  

 
  
return false;
}

export async function createTenant(data){


  showAlertFromData(data, "create tenant");
  
return false;
}

export async function updateTenant(id, data){

  showAlertFromData(data, "update tenant id:[" + id + "]");
  
return false;
}



export async function  deleteTenant(id){

  showAlertFromData(id, "delte tenant id:[" + id + "]");
  
return false;
}
