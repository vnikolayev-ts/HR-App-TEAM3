// BaseAdapter.js

class BaseAdapter {
    constructor(config) {
        this.config = config;
    }

    connect() {
        throw new Error('connect() method must be implemented');
    }

    disconnect() {
        throw new Error('disconnect() method must be implemented');
    }

    getUsers() {
        throw new Error('getUsers() method must be implemented');
    }

    getUserById(id) {
        throw new Error('getUserById() method must be implemented');
    }
}

module.exports = BaseAdapter;
