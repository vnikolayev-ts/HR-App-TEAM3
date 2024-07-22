const express = require('express');
const database = require('../db/database');
const { authenticateUser, getCryprtPasswort } = require('../auth'); // Passe den Pfad zu auth.js an


const router = express.Router();


function isUserHimself(user, id){
    const retVal = user.userId === parseInt(id)?  true : false;

    return retVal;
}

function isUserAdmin(user){
    const retVal = user.admin === 1 ?  true : false;
    return retVal;
}

function isUserSuperAdmin(user){

    return user.superadmin === 1 ?  true : false;
}


// Login-Endpunkt für die Benutzerauthentifizierung
router.get('/login', async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ error:'Authorization header is missing'});
    }

    const authString = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    const [username, password] = authString.split(':');
    req.auth = { username, password };

    try {
        database.getUserByUsername(username, (err1, user) => {
            if (err1) {
                console.error('Database error:', err1);
                return res.status(500).send({ error:'Database error'});
            }

            if (!user) {
                return res.status(404).send({ error:'User not found'});
            }

            const token = authenticateUser(username, password, user);
            if (!token) {
                return res.status(401).send({ error:'Invalid credentials'});
            }

            const data = { "apikey": token };

            database.updateUserById(user.tenantId, user.userId, data, (err2) => {
                if (err2) {
                    console.error('Update user error:', err2);
                    return res.status(500).send({ error:'Error updating user(apikey)'});
                }

                database.getUserById(user.tenantId, user.userId, (err, newUser) => {
                    if (err) {
                        console.error('Get user by id error:', err);
                        return res.status(500).send({ error:'Error fetching user'});
                    }

                    if (!newUser) {
                        return res.status(404).send({ error:'User not found'});
                    }

                    res.send(newUser);
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Internal server error');
    }
});



    
    router.use((req, res, next) => {
        const apiKey = req.headers['apikey'];
    
        if (!apiKey) {
            return res.status(400).send({ error:'API key is required'});
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

    router.get('/logout', async (req, res) => {


   
         const apiKey = req.headers['apikey'];
      
         try {
    
            database.getUserByApiKey( apiKey, (err, user) => {
                if (err) {
                    return res.status(500).send(err);
                }
    
                const  token  = authenticateUser(username, password, user);
               
               
                res.json({ user });
               
    
    
            });
        
        
          
    
          } catch (error) {
            console.error('Fehler bei der Benutzerauthentifizierung:', error.message);
            res.status(401).json({ error: error.message });
          }
        
        });


router.get('/', (req, res) => {
    const user = req.user;
  
    if(!isUserAdmin(user)){
       
        database.getUserById(user.tenantId, user.userId, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            if(!user)  return res.status(404).send('User not found');
            res.send([user]);
        });
    } else {
  
    database.getUsers(user.tenantId, (err, users) => {
        if (err) {
            return res.status(500).send(err);
        } 
        res.send(users); 
    });
    }
}); 

  

router.get('/:id', (req, res) => {
   
    const user = req.user;
    const userId = req.params.id;
    const tenantId = user.tenantId;
    if(!isUserAdmin(user)){
        if(!isUserHimself(user, userId))  return res.status(401).send('User not himself');
    }
   


    database.getUserById(tenantId, userId, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        if(!user)  return res.status(404).send('User not found');
        res.send(user);
    });
});

router.post('/', (req, res) => {
    const user = req.user;
    const userId = req.params.id;
    const tenantId = user.tenantId;
    if(!isUserAdmin(user)){
        return res.status(401).send('Only for Admins');
    }
   
    const newUser = req.body;
    const nUserCryptPass = getCryprtPasswort(newUser);

    database.createUser(tenantId, nUserCryptPass, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('User created');
    });
});

router.put('/:id', (req, res) => {
    const user = req.user;
    const userId = req.params.id;
    const tenantId = user.tenantId;

    if(!isUserAdmin(user)){
        if(!isUserHimself(user, userId))  return res.status(401).send('User cupdat not himself');
    }

    const updateUser = req.body;

   
    const nUserCryptPass = getCryprtPasswort(updateUser);


    database.updateUserById(tenantId, userId, nUserCryptPass, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User updated');
    });
});

router.delete('/:id', (req, res) => {
    const user = req.user;
    const userId = req.params.id;
    const tenantId = user.tenantId;
    if(!isUserAdmin(user)){
        if(isUserHimself(user, userId))  return res.status(401).send('User can not delete himself');
        return res.status(401).send('Only for Admins');
    }
    database.deleteUserById(tenantId, userId, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User deleted');
    });
});




module.exports = router;