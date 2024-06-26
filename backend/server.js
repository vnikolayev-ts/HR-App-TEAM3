const express = require ("express");
const app = express();
const cors = require ('cors');

const fs = require('fs')

var SERVER_URL_PUBLIC = "http://127.0.0.1";

const PORT = 3001;
const IMAGE_PATH_PUBLIC = "/images/personal/";

var public_image_path = `${SERVER_URL_PUBLIC}:${PORT}${IMAGE_PATH_PUBLIC}`;





//Frontend-Verbindung ermöglichen
app.use(cors());
//Aufruf für JSON u. API (body)
app.use(express.json());
app.use(express.static('public')); // Public ordenr einbinden

// Funktion, um die HR-IMAGE path  anzupassen
const updateImagePaths = (data) => {
    if (data && Array.isArray(data.employees)) {
      data.employees = data.employees.map(employee => {
        if (employee.image) {
         
        }
        return employee;
      });
    }
    return data;
  };

// Funktion, um die HR-Daten auszulesen
function getHR(req) {
    const jsonData = fs.readFileSync("./data/hr-data.json") // Muss später durch Std. bzw. Extende-Daten ersetzt werden. Wie, noch unklar.
   

    const retJson = JSON.parse(jsonData);

    //update public url
    var userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress ||  null;
    SERVER_URL_PUBLIC = req.protocol + "://"+  req.get('host');
    public_image_path = `${SERVER_URL_PUBLIC}${IMAGE_PATH_PUBLIC}`;
    console.log( `Request from [${userIP}] on [${SERVER_URL_PUBLIC}]`);

    return retJson;
}

// GET all endpoint für HTTP-Requests
app.get('/employee', (req, res) => {
    const list = getHR();
    res.status(200).json(list);
})

// GET by ID endpoint für HTTP-Requests
app.get('/employee/:id', (req, res) => {
    const details = getHR(req);
    const persID = req.params.id;
    const detail = details.employees.find(t => t.pers_id == persID);
    
    const fullImagePath = public_image_path + detail.image;
    detail.public_image_path = fullImagePath;
    if(!detail){
        res.status(404).send("Employee not found!")
    } else {
      
     
     
        res.status(200).json(detail);
    }
})

// Server starten
app.listen(PORT, () => {
    console.log(`Der Server läuft auf ${SERVER_URL_PUBLIC}:${PORT}`) // `` -> backticks
})
