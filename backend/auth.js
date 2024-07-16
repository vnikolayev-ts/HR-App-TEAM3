// auth.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const database  = require('./db/database'); 


const secretKey = 'geheimnis'; // Geheimes Schlüssel für das Signieren des JWTs

// Funktion zum Erstellen eines JWTs
const generateToken = (user) => {
  //return jwt.sign({ userId: user.userId, username: user.username }, secretKey, { expiresIn: '1h' });
  return jwt.sign({ secretKey }, secretKey, { expiresIn: '1h' });
};


function computeMd5Hash(input) {
  // Create MD5 hash object
  const hash = crypto.createHash('md5');

  // Update hash object with input string
  hash.update(input);

  // Calculate hash digest in hexadecimal format
  const md5Hash = hash.digest('hex');

  return md5Hash;
}


// Funktion zur Überprüfung von Benutzername und Passwort
const authenticateUser =  (username, password, userObj) => {

  try {
   
   
      if (username === userObj.username){

       
        const md5HashPW = computeMd5Hash(password);

        passwordMatch = md5HashPW === userObj.password ? true : false;
      if (!passwordMatch) {
        throw new Error('Falsches Passwort');
      }
      
      return  generateToken(userObj);
      }

      

    
  } catch (error) {
    throw new Error(error.message);
  }
};

// Funktion zur Überprüfung von Benutzername und Passwort
const authenticateByApiKey =  (apiKey, userObj) => {

  try {
   
   
      if (apiKey === userObj.api-key){

        return userObj;
      } else {
        throw new Error('Falsches ApiKey');

      }
      
  

      

    
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  authenticateUser
};
  