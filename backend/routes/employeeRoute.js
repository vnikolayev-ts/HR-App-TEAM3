const express = require('express');
const database = require('../db/database');

const router = express.Router();


function generateRandomImageName(gender) {
    const genders = ['male', 'female'];
    if (!genders.includes(gender)) {
        throw new Error('Ungültiges Geschlecht');
    }

    const randomNumber = Math.floor(Math.random() * 10); // Zufällige Zahl von 0 bis 5
    return `${gender}_bild_${randomNumber}.jpg`;
}


// Middleware to extract tenantId from query params or headers
router.use((req, res, next) => {
    const apiKey = req.headers['apikey'];

    if (!apiKey) {
        return res.status(400).send('API key is required');
    }

    // Beispiel: Annahme, dass Sie die TenantId und UserId aus dem req-Objekt erhalten
   // const tenantId = req.query.tenantId || req.headers['tenant-id']; // angenommen, dies wird irgendwo gesetzt
  //  const userId = req.user.id; // angenommen, dass der Benutzer irgendwo im req-Objekt vorhanden ist

    // Beispiel: Funktion zum Abrufen des Benutzers basierend auf tenantId und userId
    database.getUserByApiKey(apiKey, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(404).send('User not found');
        }
        req.user = user; // Benutzer dem req-Objekt hinzufügen
        next();
    });
});

// Get all employees
router.get('/', (req, res) => {
    let tenantId = req.user.tenantId;

    database.getEmployees(tenantId, (err, employees) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(employees);
    });
});

// Get employee by ID
router.get('/:id', (req, res) => {
    let tenantId = req.user.tenantId;
    let public_image_path = req.public_image_path;
    let request_image_path = req.req_image_url;

    const employeeId = req.params.id;
    database.getEmployeeById(tenantId, employeeId, (err, employee) => {
        if (err) {
            return res.status(500).send(err);
        }

        const rImage =  generateRandomImageName(employee.gender);
        if (public_image_path) {
            let newPath = public_image_path + rImage;
            employee.imagePath = newPath;
        }

        if (request_image_path) {
            let newPath = request_image_path + rImage;
            employee.imagePath2 = newPath;
        }
        console.log('Public Image Path:', public_image_path);
        res.send(employee);
    });
});

// Create a new employee
router.post('/', (req, res) => {
    let tenantId = req.user.tenantId;

    const newEmployee = req.body;
    database.createEmployee(tenantId, newEmployee, (err, employeeId) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: employeeId });
    });
});

// Update an employee by ID
router.put('/:id', (req, res) => {
    let tenantId = req.user.tenantId;

    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    database.updateEmployeeById(tenantId, employeeId, updatedEmployee, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

// Delete an employee by ID
router.delete('/:id', (req, res) => {
    let tenantId = req.user.tenantId;

    const employeeId = req.params.id;
    database.deleteEmployeeById(tenantId, employeeId, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

module.exports = router;
