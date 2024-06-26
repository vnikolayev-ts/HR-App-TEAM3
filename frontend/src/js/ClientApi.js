import hrData from '../data/hr-data.json'; 

const apiServerPort = 3001;
const apiServerUrl = "http://localhost";


//fetch(`localhost:${apiport}`), {method:'POST', headers: {'Content-Type': 'application/json'}},
//body: 

 export  const  getHRData = async  (json=true) => {
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
  
    return hrData;
}

