const express = require('express');
const router = express.Router();
const fs = require('fs');
const { authenticateUser } = require('../auth'); // Passe den Pfad zu auth.js an
const database  = require('../db/database'); // Annahme, dass SQLiteAdapter die SQLite-Datenbanklogik enthält



// Funktion, um die HR-IMAGE path  anzupassen
const updateImagePaths = (data) => {
    if (data && Array.isArray(data.employees)) {
      data.employees = data.employees.map(employee => {
        if (employee.image) {
         
        }
        return employee;
      });
    }
    return data;
  };







// Login-Endpunkt für die Benutzerauthentifizierung
router.get('/login', async (req, res) => {

  const authHeader = req.headers['authorization'];

  if (authHeader) {
      const authString = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
      const [username, password] = authString.split(':');
      req.auth = { username, password };
  
  
    try {
      const { token } = await authenticateUser(username, password);
      res.json({ token });
    } catch (error) {
      console.error('Fehler bei der Benutzerauthentifizierung:', error.message);
      res.status(401).json({ error: error.message });
    }
  }
  });


  // Geschützter Endpunkt für Benutzerdaten
  router.get('/user2', (req, res) => {
    // Mittelware für JWT-Überprüfung hier hinzufügen, um sicherzustellen, dass der Token gültig ist
    res.json({ message: 'Geschützter Inhalt nur für angemeldete Benutzer zugänglich' });
  });

  // Health-Endpunkt
  router.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

router.get('/log', (req, res) => {
  const tenantId = 1;
  const userId = 101;
  database.getUserById(tenantId, userId, (err, user) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.send(user);
  }); 
});


module.exports = router;
