const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const os = require('os');

const apiRouter = require('./routes/ApiRoute');
const employeeRoute = require('./routes/employeeRoute');
const tenantRoute = require('./routes/tenantRoute');
const userRoute = require('./routes/userRoute');

const PORT = process.argv[2] || 3001;
const IMAGE_PATH_PUBLIC = "/images/personal/";

let LOCAL_IP_ADDRESS = "";
let PUBLIC_IP_ADDRESS = "";

// Middleware für JSON-Parser
app.use(bodyParser.json());

// Frontend-Verbindung ermöglichen
app.use(cors());

// Aufruf für JSON und API (body)
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

// Funktion, um die lokale IP-Adresse zu ermitteln
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];
    for (const i of interface) {
      if (i.family === 'IPv4' && !i.internal) {
        return i.address;
      }
    }
  }
  return null;
};

// Verwende die API-Routen unter /api
app.use('/user', userRoute);
app.use('/api', apiRouter);
app.use('/employee', employeeRoute);
app.use('/tenant', tenantRoute);

// Server starten, nachdem die IP-Adressen ermittelt wurden
Promise.all([getPublicIP(), getLocalIP()]).then(([publicIP, localIP]) => {
  if (publicIP) {
    PUBLIC_IP_ADDRESS = publicIP;
  } else {
    console.warn("Konnte die öffentliche IP-Adresse nicht abrufen. Verwende die Standard-URL.");
    PUBLIC_IP_ADDRESS = "localhost";
  }

  if (localIP) {
    LOCAL_IP_ADDRESS = localIP;
  } else {
    console.warn("Konnte die lokale IP-Adresse nicht ermitteln. Verwende die Standard-IP-Adresse.");
    LOCAL_IP_ADDRESS = "127.0.0.1";
  }

  const public_image_path = `http://${PUBLIC_IP_ADDRESS}:${PORT}${IMAGE_PATH_PUBLIC}`;

  app.listen(PORT, () => {
    console.log(`Der Server läuft lokal auf ${LOCAL_IP_ADDRESS}:${PORT}`);
    console.log(`Öffentlicher Zugriff auf ${public_image_path}`);
  });
});
