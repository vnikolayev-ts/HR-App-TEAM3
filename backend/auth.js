// auth.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByUsername } = require('./mysql'); // Passe den Pfad zu mysql.js an

const secretKey = 'geheimnis'; // Geheimes Schlüssel für das Signieren des JWTs

// Funktion zum Erstellen eines JWTs
const generateToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};

// Funktion zur Überprüfung von Benutzername und Passwort
const authenticateUser = async (username, password) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error('Falsches Passwort');
    }

    return { token: generateToken(user) };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  authenticateUser
};
