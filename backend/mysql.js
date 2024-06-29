const mysql = require('mysql2');



// Verbindung zur MySQL-Datenbank herstellen
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'meine-datenbank',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  

  const selectQuery = (tableName, fields = '*', sortBy = 'id', sortOrder = 'DESC') => {
    return new Promise((resolve, reject) => {
      const query = `SELECT ${fields} FROM ${tableName} ORDER BY ${sortBy} ${sortOrder}`;
      pool.query(query, (err, results) => {
        if (err) {
          console.error('Fehler beim Ausführen der SELECT-Anfrage:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

// Funktion, um Benutzer aus der Datenbank abzurufen
const getUserByUsername = async (username) => {
    const [rows] = await pool.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  };

  
module.exports = {
  pool,
  selectQuery
};


