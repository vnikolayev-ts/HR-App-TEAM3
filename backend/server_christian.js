const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs")

// const connection = require('./mysql.js'); // Pfad zu mysql-connect.js
// const bodyParser = require('body-parser');
//const { authenticateUser } = require('./auth.js'); // Passe den Pfad zu auth.js an
//const router = require('./routes/route.js');

// Middleware für JSON-Parser


//Frontend-Verbindung ermöglichen
app.use(cors());
//Aufruf für JSON u. API (body)
app.use(express.json());
app.use(express.static('public')); // Public ordenr einbinden


// Verwende die API-Routen unter /api
//app.use('/', router);

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
function getEmployees() {
  const data = fs.readFileSync("./data/employees.json")
  return JSON.parse(data)
}


// Save Funktion
function saveEmployees(employees) {
  fs.writeFileSync("./data/employees.json", JSON.stringify(employees, null, 2))
}


// Holt mir alle users
app.get("/employees", (req, res) => {
  let employees = getEmployees()
  res.json(employees);
});


// Holt mir ein bestimmtes Element aus der User Liste
app.get("/employees/:id", (req, res) => {
  let employees = getEmployees()
  console.log(employees.employees)
  const id = parseInt(req.params.id)
  const employee = employees.employees.find((employee) => employee.pers_id === id)

  if (employee) {

    res.json(employee)
  } else {
    res.status(404).send({
      message: "Employee not found",
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




app.post("/newEmployee", (req, res) => {
  let employees = getEmployees()
  const newEmployee = req.body.employee;
  if (newEmployee) {
    employees.employees.push(newEmployee);
    res
      .status(201)
      .send({ message: "Dein Mitarbeiter wurde erfolgreich hinzugefügt" });
    saveEmployees(employees)
  } else {
    res.status(400).send({
      message: "Bitte einen Employee in form von {'employee':'neuer employee'} hinzufügen",
    });




  }
});
//Delete User
app.delete("/employee/:id", (req, res) => {
  let employees = getEmployees()
  const id = parseInt(req.params.id);
  if (id > 0) {
    employees.employees = employees.employees.filter((employee) => employee.pers_id !== id);
    res.json({ message: "Employee wurde erfolgreich gelöscht" });
    saveEmployees(employees)
  } else {
    res.status(400).json({ message: "Bitte einen gültige ID angeben" })
  }
});

app.put("/employee/:id", (req, res) => {
  let employees = getEmployees();
  const id = parseInt(req.params.id);
  const updatedEmployee = req.body;

  const employeeIndex = employees.employees.findIndex((employee) => employee.pers_id === id);

  if (employeeIndex !== -1 && updatedEmployee) {
    employees.employees[employeeIndex] = { ...employees.employees[employeeIndex], ...updatedEmployee };
    saveEmployees(employees);
    res.status(200).send({ message: "Employee erfolgreich aktualisiert"});
  } else {
    res.status(400).send({
     message: "Please chose a valid Employee in form of {'employee':'updated Employee'} or enter a valid ID!"  
    });
  }
});





// Server starten
app.listen(PORT, () => {
  console.log(`Der Server läuft auf ${SERVER_URL_PUBLIC}:${PORT}`) // `` -> backticks
})
