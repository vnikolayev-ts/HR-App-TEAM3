// sqliteConfig.js

const path = require('path');

module.exports = {
    client: 'sqlite3',                           // Datenbank-Client (hier SQLite3)
    connection: {
        filename: path.join(__dirname, '../data/mydb.sqlite')   // Pfad zur SQLite-Datenbankdatei
    },
    useNullAsDefault: true                       // SQLite-Einstellung: NULL-Werte zulassen
};
