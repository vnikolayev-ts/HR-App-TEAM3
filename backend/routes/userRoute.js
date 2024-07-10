const express = require('express');
const database  = require('../db/database'); 

const router = express.Router();

router.use((req, res, next) => {
    req.tenantId = req.query.tenantId || req.headers['tenant-id'];
    if (!req.tenantId) {
        return res.status(400).send('tenantId is required');
    }
    next();
  });
  
  router.get('/', (req, res) => {
    const tenantId = req.tenantId;
    database.getUsers(tenantId, (err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(users);
    });
  });
  
  router.get('/:id', (req, res) => {
    const tenantId = req.tenantId;
    const userId = req.params.id;
    database.getUserById(tenantId, userId, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(user);
    });
  });
  
  router.post('/', (req, res) => {
    const tenantId = req.tenantId;
    const newUser = req.body;
    database.createUser(tenantId, newUser, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('User created');
    });
  });
  
  router.put('/:id', (req, res) => {
    const tenantId = req.tenantId;
    const userId = req.params.id;
    const updateUser = req.body;
    database.updateUserById(tenantId, userId, updateUser, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User updated');
    });
  });
  
  router.delete('/:id', (req, res) => {
    const tenantId = req.tenantId;
    const userId = req.params.id;
    database.deleteUserById(tenantId, userId, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User deleted');
    });
  });