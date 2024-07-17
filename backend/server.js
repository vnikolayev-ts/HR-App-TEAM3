const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const morgan = require('morgan'); // Modul für HTTP-Logging

const apiRouter = require('./routes/ApiRoute');
const employeeRoute = require('./routes/employeeRoute');
const tenantRoute = require('./routes/tenantRoute');
const userRoute = require('./routes/userRoute');

// Port als Parameter übergeben, Standardwert 3001
const PORT = process.argv[2] || 3001;
const IMAGE_PATH_PUBLIC = "/images/personal/";

let SERVER_URL_PUBLIC = "";

// Middleware für HTTP-Logging mit Morgan
app.use(morgan('dev'));

// Middleware für JSON-Parser
app.use(bodyParser.json());

//Frontend-Verbindung ermöglichen
app.use(cors());

//Aufruf für JSON und API (body)
app.use(express.json());
app.use(express.static('public')); // Public Ordner einbinden

// Funktion, um die öffentliche IP-Adresse abzurufen
const getPublicIP = async () => {
  try {
    const response = await axios.get('https://ifconfig.me/ip');
    return response.data.trim();
  } catch (error) {
    console.error("Fehler beim Abrufen der öffentlichen IP-Adresse:", error);
    return null;
  }
};

// Verwende die API-Routen unter /api
app.use('/user', userRoute);
app.use('/api', apiRouter);
app.use('/employee', employeeRoute);
app.use('/tenant', tenantRoute);

// Server starten, nachdem die öffentliche IP-Adresse abgerufen wurde
getPublicIP().then(ip => {
  if (ip) {
    SERVER_URL_PUBLIC = `http://${ip}`;
  } else {
    console.warn("Konnte die öffentliche IP-Adresse nicht abrufen. Verwende die Standard-URL.");
    SERVER_URL_PUBLIC = "http://localhost";
  }

  const public_image_path = `${SERVER_URL_PUBLIC}:${PORT}${IMAGE_PATH_PUBLIC}`;

  app.listen(PORT, () => {
    console.log(`Der Server läuft auf ${SERVER_URL_PUBLIC}:${PORT}`);
    console.log(`Public Image Path: ${public_image_path}`);
  });
});
