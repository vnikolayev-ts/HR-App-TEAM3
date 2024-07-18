const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Lädt Umgebungsvariablen aus .env-Datei

// MongoDB Verbindungs-URL aus Umgebungsvariablen laden
const mongoUrl = process.env.MONGO_URL;

// Verbindung zur MongoDB herstellen
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

// Eventlistener für erfolgreiche Verbindung
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Eventlistener für Verbindungsfehler
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Anwendung bei Fehler beenden
});

module.exports = db;
