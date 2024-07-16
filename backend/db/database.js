const SQLiteAdapter = require('./SQLiteAdapter');
const sqliteConfig = require('./sqliteConfig');

class Database {
    constructor() {
        this.adapter = new SQLiteAdapter(sqliteConfig);
        this.adapter.connect();
    }

    getUsers(tenantId, callback) {
        this.adapter.getUsers(tenantId, callback);
    }

    getUserById(tenantId, id, callback) {
        this.adapter.getUserById(tenantId, id, callback);
    }

    getUserByUsername(username, callback) {
        this.adapter.getUserByUsername(username, callback);
    }

    getUserByApiKey(apikey, callback) {
        this.adapter.getUserByApiKey(apikey, callback);
    }


    createUser(tenantId, user, callback) {
        this.adapter.createUser(tenantId, user, callback);
    }

    updateUserById(tenantId, id, userData, callback) {
        this.adapter.updateUserById(tenantId, id, userData, callback);
    }

    deleteUserById(tenantId, id, callback) {
        this.adapter.deleteUserById(tenantId, id, callback);
    }

    getEmployees (tenantId, callback){
        this.adapter.getEmployees(tenantId, callback);
    }

    getEmployeeById (tenantId, employeeId, callback) {
        this.adapter.getEmployeeById(tenantId, employeeId, callback);
    }

    createEmployee (tenantId, newEmployee, callback) {
        this.adapter.createEmployee(tenantId, newEmployee, callback);
    }

    updateEmployeeById (tenantId, employeeId, updatedEmployee, callback) {
        this.adapter.updateEmployeeById(tenantId, employeeId, updatedEmployee, callback);
    }

    deleteEmployeeById (tenantId, employeeId, callback) {
        this.adapter.deleteEmployeeById(tenantId, employeeId, callback);
    }

    getTenants (callback) {
        this.adapter.getTenants(callback);
    }
    getTenantById (tenantId, callback) {
        this.adapter.getTenantById(tenantId, callback);
    }
    createTenant (newTenant, callback) {
        this.adapter.createTenant(newTenant, callback);
    }
    updateTenantById (tenantId, updatedTenant, callback) {
        this.adapter.updateTenantById(tenantId, updatedTenant, callback);
    }
    deleteTenantById (tenantId, callback) {
        this.adapter.deleteTenantById(tenantId, callback);
    }
}

module.exports = new Database();
