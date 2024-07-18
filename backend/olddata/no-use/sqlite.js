const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config(); // Lädt Umgebungsvariablen aus .env-Datei

const sqliteConfig = {
  filename: process.env.SQLITE_FILENAME // Pfad zur SQLite-Datenbankdatei
};

const connection = new sqlite3.Database(sqliteConfig.filename);

// Verbindung zur SQLite-Datenbank herstellen
connection.serialize(() => {
  console.log('Connected to SQLite database');
});

module.exports = connection;
