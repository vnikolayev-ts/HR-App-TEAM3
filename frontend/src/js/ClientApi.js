import hrData from '../data/hr-data.json'; 

const apiServerPort = 3001;
const apiServerUrl = "http://localhost";


//fetch(`localhost:${apiport}`), {method:'POST', headers: {'Content-Type': 'application/json'}},
//body: 

 export  const  getHRData = () => {

    return getFileHrData(); //Todo wartrn bis back da ist
  try {
    const apiUrl = apiServerUrl+ ":" + apiServerPort;
   // const response = await fetch(apiUrl);
   // const data = await response.json();

    const response =  fetch(apiUrl);
    const data =  response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


function getFileHrData () {
  
    return hrData;
}

