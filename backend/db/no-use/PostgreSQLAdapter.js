// PostgreSQLAdapter.js

const { Pool } = require('pg');
const BaseAdapter = require('../BaseAdapter');

class PostgreSQLAdapter extends BaseAdapter {
    constructor(config) {
        super(config);
        this.pool = new Pool(config);
    }

    async connect() {
        // PostgreSQL wird bei Bedarf verbunden, normalerweise ist dies nicht notwendig, da der Pool beim Erstellen erstellt wird
    }

    async disconnect() {
        await this.pool.end();
    }

    async getUsers() {
        const query = 'SELECT * FROM users';
        const { rows } = await this.pool.query(query);
        return rows;
    }

    async getUserById(id) {
        const query = 'SELECT * FROM users WHERE userId = $1';
        const { rows } = await this.pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error('User not found');
        }
        return rows[0];
    }
}

module.exports = PostgreSQLAdapter;
