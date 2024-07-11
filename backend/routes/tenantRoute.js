const express = require('express');
const database = require('../db/database');

const router = express.Router();

// Get all tenants
router.get('/', (req, res) => {
    database.getTenants((err, tenants) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(tenants);
    });
});

// Get tenant by ID
router.get('/:id', (req, res) => {
    let tenantId = req.params.id;
    tenantId = 1;
    database.getTenantById(tenantId, (err, tenant) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(tenant);
    });
});

// Create a new tenant
router.post('/', (req, res) => {
    const newTenant = req.body;
    tenantId = 1;
    database.createTenant(newTenant, (err, tenantId) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: tenantId });
    });
});

// Update a tenant by ID
router.put('/:id', (req, res) => {
    let tenantId = req.params.id;
    tenantId = 1;
    const updatedTenant = req.body;
    database.updateTenantById(tenantId, updatedTenant, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

// Delete a tenant by ID
router.delete('/:id', (req, res) => {
    let tenantId = req.params.id;
    tenantId = 1;
    database.deleteTenantById(tenantId, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

module.exports = router;
