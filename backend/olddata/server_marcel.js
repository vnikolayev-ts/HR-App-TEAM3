const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs")

// const connection = require('./mysql.js'); // Pfad zu mysql-connect.js
// const bodyParser = require('body-parser');
// const { authenticateUser } = require('./auth.js'); // Passe den Pfad zu auth.js an
// const router = require('./routes/route.js');

// Middleware für JSON-Parser


//Frontend-Verbindung ermöglichen
app.use(cors());
//Aufruf für JSON u. API (body)
app.use(express.json());
app.use(express.static('public')); // Public ordenr einbinden


// Verwende die API-Routen unter /api
// app.use('/', router);

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
    fs.writeFileSync("./data/marcel.apiKey.json", JSON.stringify(apiKeyStorage, null, 2));

    res.json({ message: "API-Key wurde erfolgreich gespeichert", apiKey: apiKeyStorage.key });
  } else {
    res.status(400).json({ message: "API-Key fehlt im Header" });
  }
});

// Route zum Abrufen des gespeicherten API-Keys (optional)
app.get("/get-api-key", (req, res) => {
  try {
    const data = fs.readFileSync("./data/marcel.apiKey.json");
    const storedApiKey = JSON.parse(data);
    res.json(storedApiKey);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen des API-Keys" });
  }
});





// Get Funktion
function getUsers() {
  const data = fs.readFileSync("./data/users.json")
  return JSON.parse(data)
}


// SAVE Funktion
function saveUsers(users) {
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2))
}


// Funktion Holt mir alle users
app.get("/users", (req, res) => {
  let users = getUsers()
  res.json(users);
});


// Holt mir ein bestimmten User aus der User Liste
app.get("/users/:id", (req, res) => {
  let users = getUsers()
  console.log(users.users)
  const id = parseInt(req.params.id)
  const user = users.users.find((user) => user.userId === id)

  if (user) {

    res.json(user)
  } else {
    res.status(404).send({
      message: "User  not found",
    });
  }
});

// POST- Funktion  (neuen User erstellen)
app.post("/newUser", (req, res) => {
  let users = getUsers()
  const newUser = req.body.user;
  if (newUser) {
    users.users.push(newUser);
    res
      .status(201)
      .send({ message: "Dein User wurde erfolgreich hinzugefügt" });
    saveUsers(users)
  } else {
    res.status(400).send({
      message: "Bitte einen User in form von {'user':'neuer user'} hinzufügen",
    });



    // PUT Funktion (Aktualisiert einen bestehenden Benutzer)
    app.put("/users/:id", (req, res) => {
      let users = getUsers();
      const id = parseInt(req.params.id);
      const updatedUser = req.body.user;

      const userIndex = users.users.findIndex((user) => user.userId === id);

      if (userIndex !== -1 && updatedUser) {
        users.users[userIndex] = { ...users.users[userIndex], ...updatedUser };
        saveUsers(users);
        res.status(200).send({ message: "User erfolgreich aktualisiert" });
      } else {
        res.status(400).send({
          message: "Bitte einen gültigen User in form von {'user':'updated user'} hinzufügen oder eine gültige ID angeben",
        });
      }
    });


  }
});
// DELETE User Funktion
app.delete("/users/:id", (req, res) => {
  let users = getUsers();
  const id = parseInt(req.params.id);

  const userIndex = users.users.findIndex((user) => user.userId === id);

  if (userIndex !== -1) {
    users.users = users.users.filter((user) => user.userId !== id);
    saveUsers(users);
    res.json({ message: "User wurde erfolgreich gelöscht" });
  } else {
    res.status(404).json({ message: "User mit dieser ID nicht gefunden" });
  }
});







// Server starten
app.listen(PORT, () => {
  console.log(`Der Server läuft auf ${SERVER_URL_PUBLIC}:${PORT}`) // `` -> backticks
})
