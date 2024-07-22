const express = require("express");
const path = require('path');
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
const PUBLIC_PORT = 10000 + PORT;
const IMAGE_PATH_PUBLIC = "/images/personal/";

let LOCAL_IP_ADDRESS = "";
let PUBLIC_IP_ADDRESS = "";

// Middleware für JSON-Parser
app.use(bodyParser.json());

// Frontend-Verbindung ermöglichen
app.use(cors());

// Aufruf für JSON und API (body)
app.use(express.json());
//app.use(express.static('public')); // Public Ordner einbinden
app.use(express.static(path.join(__dirname, 'public')));

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


// Funktion, um Hyperlinks in der Konsole zu erstellen
const clickableLink = (text, link) => {
  return `\u001b]8;;${link}\u0007${text}\u001b]8;;\u0007`;
};

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
  
  const public_url = `http://${PUBLIC_IP_ADDRESS}:${PUBLIC_PORT}`;
  const public_image_path = `${public_url}${IMAGE_PATH_PUBLIC}`;
  const local_server_url = `http://${LOCAL_IP_ADDRESS}:${PORT}`;
 




  app.use('/employee', (req, res, next) => {
    req.public_image_path = public_image_path; // Füge die "publicimage" URL dem req-Objekt hinzu
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    req.req_image_url = `${baseUrl}${IMAGE_PATH_PUBLIC}`;
    next();
});

  
  // Verwende die API-Routen unter /api
  app.use('/user', userRoute);
  app.use('/api', apiRouter);
  app.use('/employee', employeeRoute);
  app.use('/tenant', tenantRoute);
  
  app.listen(PORT, () => {
    console.log(`Der Server läuft lokal auf ${clickableLink(local_server_url, local_server_url)}`);
    console.log(`Öffentlicher Zugriff auf ${clickableLink(public_url, public_url)}`);
    console.log(`Öffentlicher Zugriff auf Images ${clickableLink(public_image_path, public_image_path)}`);
  });
});
