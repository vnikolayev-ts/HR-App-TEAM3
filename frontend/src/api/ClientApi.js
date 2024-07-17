import { showAlertFromData } from '../components/Utils/Utils';
import { v4 as uuidv4 } from 'uuid';

const apiServerPort = 3001;
//const apiBaseUrl = 'http://18.199.10.90'; // Beispiel-URL deines API-Servers

const apiBaseUrl = 'http://78.94.156.45:3001'; // Beispiel-URL deines API-Servers Debian Server

//const apiBaseUrl = 'http://127.0.0.1'; // Alternative Basis-URL (falls benötigt)
const apiBackendUrl = `${apiBaseUrl}:${apiServerPort}`;


// Funktion zum Abrufen von Benutzerdaten aus dem Local Storage
const getUser = () => {
  const user = localStorage.getItem('loginUser');
  return user ? JSON.parse(user) : null;
};

async function getData(endPoint, isDebugOn = false) {
   // Token aus dem Local Storage holen
  const user = getUser(); // Benutzerdaten aus dem Local Storage holen
  const token = user.apikey;


  if (isDebugOn) showAlertFromData(endPoint, 'get / List');

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}`, {
      headers: {
        'apikey': token,
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });


    

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

async function getDatabyId(endPoint, id, isDebugOn = false) {
  const user = getUser();
  const token = user.apikey;

  if (isDebugOn) showAlertFromData(endPoint, 'get / List');

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}/${id}`, {
      headers: {
        'apikey': token,
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

async function createData(endPoint, data, isDebugOn = true) {
  const user = getUser();
  const token = user.apikey;
 
  if (isDebugOn) showAlertFromData(data, `create ${endPoint}`);

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}`, {
      method: 'POST',
      headers: {
        'apikey': token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Error creating ${endPoint}:`, error);
    return false;
  }
}

async function updateData(endPoint, id, data, isDebugOn = false) {
  const user = getUser();
  const token = user.apikey;
  delete data.tenatId;

  if (isDebugOn) showAlertFromData(data, `update [${id}] ${endPoint}`);

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}/${id}`, {
      method: 'PUT',
      headers: {
        'apikey': token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Error updating ${endPoint}:`, error);
    return false;
  }
}

export async function deleteData(endPoint, id, isDebugOn = false) {
  const user = getUser();
  const token = user.apikey;

  if (isDebugOn) showAlertFromData(id, `delete [${id}] ${endPoint}`);

  try {
    const response = await fetch(`${apiBackendUrl}/${endPoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting ${endPoint}:`, error);
    return false;
  }
}

// Export der restlichen Funktionen (getLogUser, apiLogin, usw.)

export function getLogUser() {
  const lUser = localStorage.getItem('loginUser');
  const loginUser = JSON.parse(lUser);
  return loginUser;
}


export async function apiLogin(username, password) {
  try {
    const apiUrl = `${apiBackendUrl}/user/login`;
    const credentials = btoa(`${username}:${password}`); // Kodieren der Anmeldedaten in Base64

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`, // Hinzufügen der Anmeldedaten zum Authorization-Header
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });

    if (!res.ok) {
      let errorMessage = 'An unexpected error occurred. Please try again later.';
    
      if (res.status === 401) {
        errorMessage = 'Invalid username or password. Please try again.';
      } else if (res.status === 404) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // Handle JSON response
          try {
            const errorData = await res.json();
            errorMessage = errorData.message || 'User not found';
          } catch (error) {
            console.error('Error parsing JSON response:', error);
            errorMessage = 'User not found';
          }
        } else {
          // Handle plain text response
          errorMessage = 'User not found';
        }
      } else if (res.status === 500) {
        errorMessage = 'Internal server error. Please try again later.';
      } else {
        errorMessage = 'Unexpected error occurred. Please try again later.';
      }
    
      throw new Error(errorMessage || 'Login failed');
    }

    const data = await res.json();
    return data; // Angenommen, die Antwort enthält Benutzerinformationen und möglicherweise ein Token
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}


// Restliche API-Funktionen für Nutzer, Mitarbeiter und Tenants (getUsers, getUserById, usw.)




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

  delete data.imagePath; 
  delete data.imagePath2; 
  

  return updateData("employee", id, data, false);
}

export async function deleteEmployee(id) {

  return deleteData("employee", id);

}


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
