const express = require('express');
const router = express.Router();
const fs = require('fs')

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


// Funktion, um die HR-Daten auszulesen
function getHR(req) {
    const jsonData = fs.readFileSync("./data/employees.json") // Muss später durch Std. bzw. Extende-Daten ersetzt werden. Wie, noch unklar.
   

    const retJson = JSON.parse(jsonData);

  

    return retJson;
}



// Beispiel-Endpunkt GET /api/example
router.get('/', (req, res) => {
  res.json({ message: 'GET request to /api/example' });
});

// Beispiel-Endpunkt POST /api/example
router.post('/', (req, res) => {
  const { body } = req;
  res.json({ message: 'POST request to /api/example', data: body });
});


// GET all endpoint für HTTP-Requests
router.get('/employee', (req, res) => {
    const list = getHR();
    res.status(200).json(list);
})

// GET by ID endpoint für HTTP-Requests
router.get('/employee/:id', (req, res) => {
    const details = getHR(req);
    const persID = req.params.id;
    const detail = details.employees.find(t => t.pers_id == persID);
    
   /* const fullImagePath = public_image_path + detail.image;
    detail.public_image_path = fullImagePath;*/
    if(!detail){
        res.status(404).send("Employee not found!")
    } else {
      
     
     
        res.status(200).json(detail);
    }
})




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
