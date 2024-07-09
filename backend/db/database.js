const SQLiteAdapter = require('./SQLiteAdapter');
const sqliteConfig = require('./sqliteConfig');

class Database {
    constructor() {
        this.adapter = new SQLiteAdapter(sqliteConfig);
        this.adapter.connect();
    }

    getUsers(callback) {
        this.adapter.getUsers(callback);
    }

    getUserById(id, callback) {
        this.adapter.getUserById(id, callback);
    }
}

module.exports = new Database();
