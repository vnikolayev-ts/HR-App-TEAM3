// MySQLAdapter.js

const mysql = require('mysql');
const BaseAdapter = require('./BaseAdapter');

class MySQLAdapter extends BaseAdapter {
    constructor(config) {
        super(config);
        this.connection = mysql.createConnection(config);
    }

    connect() {
        this.connection.connect();
    }

    disconnect() {
        this.connection.end();
    }

    getUsers(callback) {
        const query = 'SELECT * FROM users';
        this.connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }

    getUserById(id, callback) {
        const query = 'SELECT * FROM users WHERE userId = ?';
        this.connection.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                callback(new Error('User not found'), null);
                return;
            }
            callback(null, results[0]);
        });
    }
}

module.exports = MySQLAdapter;
