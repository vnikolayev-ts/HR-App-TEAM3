const express = require ("express");
const app = express();
const cors = require ('cors');
const PORT = 3001;
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
        res.status(200).json(todo);
    }
})

// Server starten
app.listen(PORT, () => {
    console.log(`Der Server läuft auf http://127.0.0.1:${PORT}`) // `` -> backticks
})