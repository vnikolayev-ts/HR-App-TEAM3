const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs")

// const connection = require('./mysql.js'); // Pfad zu mysql-connect.js
// const bodyParser = require('body-parser');
const { authenticateUser } = require('./auth.js'); // Passe den Pfad zu auth.js an
const router = require('./routes/route.js');

// Middleware für JSON-Parser


//Frontend-Verbindung ermöglichen
app.use(cors());
//Aufruf für JSON u. API (body)
app.use(express.json());
app.use(express.static('public')); // Public ordenr einbinden


// Verwende die API-Routen unter /api
app.use('/', router);

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



// Get Funktion
function getUsers() {
  const data = fs.readFileSync("./data/users.json")
  return JSON.parse(data)
}


// Save Funktion
function saveUsers(users) {
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2))
}


// Holt mir alle users
app.get("/users", (req, res) => {
  let users = getUsers()
  res.json(users);
});


// Holt mir ein bestimmtes Element aus der User Liste
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




// app.put("/newUser", (req, res) => {
//   let users = getUsers()
//   const newUser = req.body.user;
//   if (newUser) {
//     users.users.push(newUser);
//     res
//       .status(201)
//       .send({ message: "Dein User wurde erfolgreich hinzugefügt" });
//     saveUsers(users)
//   } else {
//     res.status(400).send({
//       message: "Bitte einen User in form von {'user':'neuer user'} hinzufügen",
//     });




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




  }
});
//Delete User
app.delete("/users/:id", (req, res) => {
  let users = getUsers()
  const id = parseInt(req.params.id);
  if (id > 0) {
    users.users = users.users.filter((user) => user.userId !== id);
    res.json({ message: "User wurde erfolgreich gelöscht" });
    saveUsers(users)
  } else {
    res.status(400).json({ message: "Bitte einen gültige ID angeben" })
  }
});







// Server starten
app.listen(PORT, () => {
  console.log(`Der Server läuft auf ${SERVER_URL_PUBLIC}:${PORT}`) // `` -> backticks
})
