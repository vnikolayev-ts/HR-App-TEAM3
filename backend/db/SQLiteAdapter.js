const fs = require('fs')
const knex = require('knex');

class SQLiteAdapter {
    constructor(config) {
        this.config = config;
        this.db = null;
    }

    connect() {
        this.db = knex(this.config);
    }

    getUsers(callback) {

         this.db.select('*').from('users')
            .then(users => {
                callback(null, users);
            })
            .catch(err => {
                callback(err);
            });
    }

    getUserById(id, callback) {
        this.db.select('*').from('users').where('userId', id)
            .then(user => {
                if (user.length > 0) {
                    callback(null, user[0]);
                } else {
                    callback(new Error('User not found'));
                }
            })
            .catch(err => {
                callback(err);
            });
    }
}

module.exports = SQLiteAdapter;
