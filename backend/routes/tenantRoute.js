const express = require('express');
const database = require('../db/database');

const router = express.Router();


function isUserHimself(user, id){
    const retVal = user.tenantId === parseInt(id)?  true : false;

    return retVal;
}

function isUserAdmin(user){
    const retVal = user.admin === 1 ?  true : false;
    return retVal;
}

function isUserSuperAdmin(user){

    return user.superadmin === 1 ?  true : false;
}


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

// Get all tenants
router.get('/', (req, res) => {

    const user = req.user;
    const userId = req.params.id;
    const tenantId = user.tenantId;
    if(isUserSuperAdmin(user)){

        database.getTenants((err, tenants) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(tenants);
        });
       
    } else {
        database.getTenantById(tenantId, (err, tenants) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(tenants);
        });
    }
   


  
});

// Get tenant by ID
router.get('/:id', (req, res) => {


    const user = req.user;
    const id = req.params.id;
    const tenantId = user.tenantId;
    if(!isUserSuperAdmin(user)){
        if(!isUserHimself(user, id)){
            return res.status(401).send('Only for Super-Admins');
        }
    }
    
    database.getTenantById(id, (err, tenant) => {
        if (err) {
            return res.status(500).send(err);
        }
        if(!tenant)  return res.status(404).send('tenant not found');
        res.send(tenant);
    });
});

// Create a new tenant
router.post('/', (req, res) => {
    const newTenant = req.body;
    
    const user = req.user;
   
   
    if(!isUserSuperAdmin(user)){
       
            return res.status(401).send('Only for Super-Admins');
        
    }

    database.createTenant(newTenant, (err, tenantId) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: tenantId });
    });
});

// Update a tenant by ID
router.put('/:id', (req, res) => {
    
    const user = req.user;
    const id = req.params.id;
  
    if(!isUserSuperAdmin(user)){
        if(!isUserHimself(user, id)){
            return res.status(401).send('Only for Super-Admins');
        }
    }


    const updatedTenant = req.body;
    database.updateTenantById(id, updatedTenant, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

// Delete a tenant by ID
router.delete('/:id', (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const tenantId = user.tenantId;
    if(!isUserSuperAdmin(user)){
        if(!isUserHimself(user, id)){
             return res.status(401).send('User can not delete own Tenant');
        }
        return res.status(401).send('Only for Super-Admins');
    }


    database.deleteTenantById(id, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

module.exports = router;
