const express = require ("express");
const app = express();
const cors = require ('cors');
const fs = require ("fs");
const { v4: uuidv4 } = require('uuid');
uuidv4();



//const connection = require('./mysql'); // Pfad zu mysql-connect.js
const bodyParser = require('body-parser');
//const { authenticateUser } = require('./auth'); // Passe den Pfad zu auth.js an
//const router = require('./routes/route');



var SERVER_URL_PUBLIC = "http://127.0.0.1";

const PORT = 3001;
const IMAGE_PATH_PUBLIC = "/images/personal/";

var public_image_path = `${SERVER_URL_PUBLIC}:${PORT}${IMAGE_PATH_PUBLIC}`;

 /* //update public url
  var userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress ||  null;
  SERVER_URL_PUBLIC = req.protocol + "://"+  req.get('host');
  public_image_path = `${SERVER_URL_PUBLIC}${IMAGE_PATH_PUBLIC}`;
  console.log( `Request from [${userIP}] on [${SERVER_URL_PUBLIC}]`);
*/

// Middleware für JSON-Parser  --> ist mittlerweile in express enthalten.
app.use(bodyParser.json());

//Frontend-Verbindung ermöglichen
app.use(cors());
//Aufruf für JSON u. API (body)
app.use(express.json());
app.use(express.static('public')); // Public ordenr einbinden


// Verwende die API-Routen unter /api
//app.use('/', router);

// Get-Funktion: Tenants einlesen
// Pfad zur Json-Datei: backend/data/tenants.json
function getTenants(){
  const dataTenant= fs.readFileSync("./data/tenants.json")
  return JSON.parse(dataTenant)
}

// Save Funktion: Für die Erfassung neuer Tenants
function saveTenants(tenants){
  fs.writeFileSync("./data/tenants.json",JSON.stringify(tenants,null,2))
}

// Get-Funktion: Holt mir alle Tenants
app.get("/tenant", (req, res) => {
  let tenants = getTenants()
  res.json(tenants);
});

// Get-Funktion: Holt mir ein bestimmtes Element aus der Tenants Liste
app.get("/tenants/:id",(req,res) => {
  let tenants = getTenants()
  console.log(tenants.tenants)
  const id = parseInt(req.params.id)
  const tenant = tenants.tenants.find((t,i) => t.tenantId === id)
  
  if (tenant) {
    res.json(tenant)
}   else {
    res.status(404).send({
      message: "Tenant not found!"
    });
}
});

// Put-Funktion: Aktualisierung der Daten eines Tenants z.B. bei Firmennamen-Änderung Rechtsform o.ä.
app.put("/tenant/:id", (req, res) => {
  let tenants = getTenants();
  const id = parseInt(req.params.id);
  const updatedTenant = req.body.tenant;

  const tenantIndex = tenants.tenants.findIndex((tenant) => tenant.tenantId === id);

  if (tenantIndex !== -1 && updatedTenant) {
    tenants.tenants[tenantIndex] = { ...tenants.tenants[tenantIndex], ...updatedTenant };
    saveTenants(tenants);
    res.status(200).send({ message: "Tenant erfolgreich aktualisiert"});
  } else {
    res.status(400).send({
     message: "Please chose a valid Company in form of {'tenant':'updated Company'} or enter a valid ID!"  
    });
  }
});



// Post-Funktion: Speichern neu angelegter Tenants mit Prüfung auf Vorhandensein des Namenfelds als Zielfeld
app.post("/newTenant", (req, res) => {
  //let newID = uuidv4()
  const apiKey = req.header("api-key");
  let tenants = getTenants()
  const newTenant = req.body;
  if (newTenant && newTenant.name)   {
    newTenant.apiKey = apiKey;
    tenants.tenants.push(newTenant);
    saveTenants(tenants)
    res
      .status(201)
      .send({ message: "Your Company was successfully added!"});
  } else {
    res.status(400).send({
      message: "Please add the Name of you Company."
    })
  }
});

// Delete-Funktion: Löschen eines Tenant
app.delete("/tenant/:id", (req, res) => {
  let tenants = getTenants();
  const id = parseInt(req.params.id);
  const tenantIndex = tenants.tenants.findIndex((tenant) => tenant.tenantId);

  if (tenantIndex !== -1) {
    tenants.tenants = tenants.tenants.filter((tenant) => tenant.tenantId !== id);
    saveTenants(tenants);
    res.json({ message: "Tenant was deleted successfully!"});
  } else {
    res.status(404).json({ message: "Tenant-ID not found!"});
  }
});

app.get("/headers", (req, res) => {
  // Auslesen aller Header
  const headers = req.headers;
  console.log("Headers:", headers);

  // Spezifischer Header
  const specificHeader = req.header("custom-header"); // Beispiel für einen benutzerdefinierten Header

  res.json({
    message: "Headers received",
    headers: headers,
    customHeader: specificHeader
  });
});



// Beispiel-Objekt, um den API-Key zu speichern
let apiKeyStorage = {};

// Beispiel-Route zum Auslesen des API-Keys aus den Headern und Speichern im Objekt
app.get("/save-api-key", (req, res) => {
  const apiKey = req.header("api-key");

  if (apiKey) {
    apiKeyStorage.key = apiKey; // API-Key im Objekt speichern

    // API-Key in einer Datei speichern
    fs.writeFileSync("./data/apiKey.json", JSON.stringify(apiKeyStorage, null, 2));

    res.json({ message: "API-Key wurde erfolgreich gespeichert", apiKey: apiKeyStorage.key });
  } else {
    res.status(400).json({ message: "API-Key fehlt im Header" });
  }
});

// Route zum Abrufen des gespeicherten API-Keys (optional)
app.get("/get-api-key", (req, res) => {
  try {
    const data = fs.readFileSync("./data/apiKey.json");
    const storedApiKey = JSON.parse(data);
    res.json(storedApiKey);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen des API-Keys" });
  }
});



// Server starten
app.listen(PORT, () => {
    console.log(`Der Server läuft auf ${SERVER_URL_PUBLIC}:${PORT}`) // `` -> backticks
})
