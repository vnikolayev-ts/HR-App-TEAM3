const express = require ("express");
const app = express();
const cors = require ('cors');
const port = 3001;
const fs = require('fs')

//Frontend-Verbindung ermöglichen
app.use(cors());
//Aufruf für JSON u. API (body)
app.use(express.json());

// Funktion, um die HR-Daten auszulesen
function getHR() {
    const data = fs.readFileSync("../src/data/hr-data.json") // Muss später durch Std. bzw. Extende-Daten ersetzt werden. Wie, noch unklar.
    return JSON.parse(data)

}

// GET all endpoint für HTTP-Requests
app.get('/', (req, res) => {
    const todos = readTodos();
    res.status(200).json(todos);
})


