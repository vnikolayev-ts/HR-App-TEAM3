const express = require('express');
const router = express.Router();
const fs = require('fs')
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
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const { token } = await authenticateUser(username, password);
      res.json({ token });
    } catch (error) {
      console.error('Fehler bei der Benutzerauthentifizierung:', error.message);
      res.status(401).json({ error: error.message });
    }
  });


  // Geschützter Endpunkt für Benutzerdaten
  router.get('/user', (req, res) => {
    // Mittelware für JWT-Überprüfung hier hinzufügen, um sicherzustellen, dass der Token gültig ist
    res.json({ message: 'Geschützter Inhalt nur für angemeldete Benutzer zugänglich' });
  });

  // Health-Endpunkt
  router.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});


module.exports = router;
