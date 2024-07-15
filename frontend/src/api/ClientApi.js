
import { showAlertFromData } from '../components/Utils/Utils'; 
import { v4 as uuidv4 } from 'uuid';

const apiServerPort = 3001;
// const apiServerUrl = `http://3.67.177.230:${apiServerPort}/`;
const apiBaseUrl = 'http://3.67.177.230';

const apiBackendUrl = `${apiBaseUrl}:${apiServerPort}`;

let logUser = null;



async function  getData(endPoint, isDebugOn=false){

  if(isDebugOn)  showAlertFromData(endPoint, "get / List");

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}`); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }


}

async function  getDatabyId(endPoint, id, isDebugOn=false){

  if(isDebugOn)  showAlertFromData(endPoint, "get / List");

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}/${id}`); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }


}

async function  createData(endPoint, data, isDebugOn=true){

   if(isDebugOn)  showAlertFromData(data, "create " + endPoint);

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error creating " + {endPoint} + ":", error);
    return false;
    // Optional: throw error; // Uncomment if you want to re-throw the error
  }


}

async function  updateData(endPoint, id, data, isDebugOn=false){

  if(isDebugOn)  showAlertFromData(data, "update ["+id+"] " + endPoint);


  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating " + {endPoint} + ":", error);
    return false;
  }


}


export async function deleteData(endPoint, id, isDebugOn=false) {

  if(isDebugOn)  showAlertFromData(id, "delete ["+id+"] " + endPoint);

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting " + {endPoint} + ":", error);
    return false;
  }
}




///----------------------------------------------------

export function getLogUser() {
  const lUser = localStorage.getItem('loginUser');
  const loginUser = JSON.parse(lUser);
  return loginUser;
}

export async function  apiLogin (username, password) {


  try {
    const apiUrl = `${apiBackendUrl}/user`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const foundUser = data.find((u) => u.username === username);
    
    return foundUser;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
    
  }

  return null;
}




///----------------------------------------------------

export const getUsers = async () => {
  return getData("user");
}


export const getUserById = async (id) => {
 return getDatabyId("user", id);

}

export async function createUser(data) {

  data.userId = uuidv4();

  return createData("user", data);

}

export async function updateUser(id, data) {

  return updateData("user", id, data);
}

export async function deleteUser(id) {

  return deleteData("user", id);

}


///----------------------------------------------------

export const getEmployees = async () => {
  return getData("employee");
}


export const getEmployeeById = async (id) => {
 return getDatabyId("employee", id);

}

export async function createEmployee(data) {

  data.pers_id = uuidv4();

  return createData("employee", data);

}

export async function updateEmployee(id, data) {

  return updateData("employee", id, data, true);
}

export async function deleteEmployee(id) {

  return deleteData("employee", id);

}


/*
export const getEmployees = async () => {
  try {
    const response = await fetch(`${apiBackendUrl}/employee`); // Beispiel-Endpunkt für Employees
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
  }
}


export const getEmployeeById = async (id) => {
  try {
    const response = await fetch(`${apiBackendUrl}/employee/${id}`); // Beispiel-Endpunkt für Employees
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
  }
};


export async function createEmployee(data) {

  showAlertFromData(data, "create employee");


  return false;
}


export async function updateEmployee(id, data) {

  showAlertFromData(data, "update " + id + " employee");

  return false;
}

export async function deleteEmployee(id) {


  showAlertFromData(id, "delte employee id:[" + id + "]");




  return false;
}
*/
///----------------------------------------------------
export const getTenants = async () => {
  return getData("tenant");
}


export const getTenantById = async (id) => {
 return getDatabyId("tenant", id);

}

export async function createTenant(data) {

  data.tenatId = uuidv4();

  return createData("tenant", data);

}

export async function updateTenant(id, data) {

  return updateData("tenant", id, data);
}

export async function deleteTenant(id) {

  return deleteData("tenant", id);

}
