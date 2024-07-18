const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); // Lädt Umgebungsvariablen aus .env-Datei

const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

const connection = mysql.createConnection(mysqlConfig);

// Verbindung zur MySQL-Datenbank herstellen
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
