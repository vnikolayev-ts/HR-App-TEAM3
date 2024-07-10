const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config(); // Lädt Umgebungsvariablen aus .env-Datei

// PostgreSQL Konfiguration aus Umgebungsvariablen laden
const postgresConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
};

// Verbindung zum PostgreSQL-Server herstellen
const client = new Client(postgresConfig);

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => {
    console.error('PostgreSQL connection error:', err.stack);
    process.exit(1); // Anwendung bei Fehler beenden
  });

module.exports = client;
