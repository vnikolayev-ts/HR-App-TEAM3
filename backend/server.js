const express = require ("express");
const app = express();
const cors = require ('cors');

const fs = require('fs')

const SERVER_URL_PUBLIC = "http://127.0.0.1";
const PORT = 3001;
const IMAGE_PATH_PUBLIC = "/images/personal/";

//Frontend-Verbindung ermöglichen
app.use(cors());
//Aufruf für JSON u. API (body)
app.use(express.json());


// Funktion, um die HR-IMAGE path  anzupassen
const updateImagePaths = (data) => {
    if (data && Array.isArray(data.employees)) {
      data.employees = data.employees.map(employee => {
        if (employee.image) {
          employee.public_image_path = `${SERVER_URL_PUBLIC}${IMAGE_PATH_PUBLIC}${employee.image}`;
        }
        return employee;
      });
    }
    return data;
  };

// Funktion, um die HR-Daten auszulesen
function getHR() {
    const jsonData = fs.readFileSync("./data/hr-data.json") // Muss später durch Std. bzw. Extende-Daten ersetzt werden. Wie, noch unklar.
    const public_image_path = `${SERVER_URL_PUBLIC}:${PORT}${IMAGE_PATH_PUBLIC}`;

    const retJson = JSON.parse(jsonData);
    retJson['public_image_path'] = public_image_path;

    return retJson;
}

// GET all endpoint für HTTP-Requests
app.get('/employee', (req, res) => {
    const list = getHR();
    res.status(200).json(list);
})

// GET by ID endpoint für HTTP-Requests
app.get('/employee/:id', (req, res) => {
    const details = getHR();
    const persID = req.params.id;
    const detail = details.find(t => t.id == persID);

    if(!detail){
        res.status(404).send("Person nicht gefunden!")
    } else {
        res.status(200).json(detail);
    }
})

// Server starten
app.listen(PORT, () => {
    console.log(`Der Server läuft auf http://127.0.0.1:${PORT}`) // `` -> backticks
})