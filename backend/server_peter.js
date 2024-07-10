const express = require ("express");
const app = express();
const cors = require ('cors');
const fs = require ("fs");


const connection = require('./mysql'); // Pfad zu mysql-connect.js
const bodyParser = require('body-parser');
const { authenticateUser } = require('./auth'); // Passe den Pfad zu auth.js an
const router = require('./routes/route');



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
app.use('/', router);

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
app.get("/tenant/:id",(req,res) => {
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
app.put("tenant/:id", (req, res) => {
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
  let tenants = getTenants()
  const newTenant = req.body.tenant;
  if (newTenant && newTenant.name)   {
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
  const tenantIndex = tenants.tenants.findIndex((user) => tenant.tenantId);

  if (tenantIndex !== -1) {
    tenants.tenats = tenants.tenants.filter((tenant) => tenant.tenantId !== id);
    saveTenants(tenants);
    res.json({ message: "Tenant was deleted successfully!"});
  } else {
    res.status(404).json({ message: "Tenant-ID not found!"});
  }
});



// Server starten
app.listen(PORT, () => {
    console.log(`Der Server läuft auf ${SERVER_URL_PUBLIC}:${PORT}`) // `` -> backticks
})
