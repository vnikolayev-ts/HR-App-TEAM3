// MongoDBAdapter.js

const { MongoClient, ObjectId } = require('mongodb');
const BaseAdapter = require('../BaseAdapter');

class MongoDBAdapter extends BaseAdapter {
    constructor(config) {
        super(config);
        this.client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = null;
    }

    async connect() {
        await this.client.connect();
        this.db = this.client.db(config.dbName);
    }

    async disconnect() {
        await this.client.close();
        this.db = null;
    }

    async getUsers() {
        const users = await this.db.collection('users').find({}).toArray();
        return users;
    }

    async getUserById(id) {
        const user = await this.db.collection('users').findOne({ _id: ObjectId(id) });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

module.exports = MongoDBAdapter;
