const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();
app.use(bodyParser.json());

// Middleware to extract tenantId from query params or headers
app.use((req, res, next) => {
    req.tenantId = req.query.tenantId || req.headers['tenant-id'];
    if (!req.tenantId) {
        return res.status(400).send('tenantId is required');
    }
    next();
});

app.get('/users', (req, res) => {
    const tenantId = req.tenantId;
    database.getUsers(tenantId, (err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(users);
    });
});

app.get('/users/:id', (req, res) => {
    const tenantId = req.tenantId;
    const userId = req.params.id;
    database.getUserById(tenantId, userId, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(user);
    });
});

app.post('/users', (req, res) => {
    const tenantId = req.tenantId;
    const newUser = req.body;
    database.createUser(tenantId, newUser, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('User created');
    });
});

app.put('/users/:id', (req, res) => {
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

app.delete('/users/:id', (req, res) => {
    const tenantId = req.tenantId;
    const userId = req.params.id;
    database.deleteUserById(tenantId, userId, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User deleted');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
