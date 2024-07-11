const express = require('express');
const database = require('../db/database');

const router = express.Router();

// Middleware to extract tenantId from query params or headers
// router.use((req, res, next) => {
//     req.tenantId = req.query.tenantId || req.headers['tenant-id'];
//     if (!req.tenantId) {
//         return res.status(400).send('tenantId is required');
//     }
//     next();
// });

// Get all employees
router.get('/', (req, res) => {
    const tenantId = req.tenantId;
    tenantId = 1;
    database.getEmployees(tenantId, (err, employees) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(employees);
    });
});

// Get employee by ID
router.get('/:id', (req, res) => {
    const tenantId = req.tenantId;
    tenantId = 1;
    const employeeId = req.params.id;
    database.getEmployeeById(tenantId, employeeId, (err, employee) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(employee);
    });
});

// Create a new employee
router.post('/', (req, res) => {
    const tenantId = req.tenantId;
    tenantId = 1;
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
    const tenantId = req.tenantId;
    tenantId = 1;
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
    const tenantId = req.tenantId;
    tenantId = 1;
    const employeeId = req.params.id;
    database.deleteEmployeeById(tenantId, employeeId, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

module.exports = router;
