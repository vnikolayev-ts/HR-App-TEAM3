const knex = require('knex');

class SQLiteAdapter {
    constructor(config) {
        this.knex = knex(config);
    }

    connect() {
        // Hier ist kein weiterer Code nötig, da knex automatisch verbindet
    }

    getUsers(tenantId, callback) {
        this.knex('users').select('*').where({ tenantId })
            .then(users => callback(null, users))
            .catch(err => callback(err));
    }

    getUserById(tenantId, id, callback) {
        this.knex('users').where({ tenantId, userId: id }).first()
            .then(user => callback(null, user))
            .catch(err => callback(err));
    }

    getUserByUsername(uname, callback) {
        this.knex('users').where({ username: uname }).first()
            .then(user => callback(null, user))
            .catch(err => callback(err));
    }
    
    getUserByApiKey(apikey, callback) {
        this.knex('users').where({ apikey : apikey }).first()
            .then(user => callback(null, user))
            .catch(err => callback(err));
    }

    createUser(tenantId, user, callback) {
        user.tenantId = tenantId;  // Ensure the tenantId is set
        this.knex('users').insert(user)
            .then(() => callback(null))
            .catch(err => callback(err));
    }

    updateUserById(tenantId, id, userData, callback) {
        this.knex('users').where({ tenantId, userId: id }).update(userData)
            .then(() => callback(null))
            .catch(err => callback(err));
    }

    deleteUserById(tenantId, id, callback) {
        this.knex('users').where({ tenantId, userId: id }).del()
            .then(() => callback(null))
            .catch(err => callback(err));
    }

    getEmployees(tenantId, callback) {
        this.knex('employees').where('tenantId', tenantId).select('*')
            .then(rows => callback(null, rows))
            .catch(err => callback(err));
    }

    getEmployeeById(tenantId, employeeId, callback) {
        this.knex('employees').where({ tenantId, pers_id: employeeId }).first()
            .then(row => callback(null, row))
            .catch(err => callback(err));
    }

    createEmployee(tenantId, newEmployee, callback) {
        newEmployee.tenantId = tenantId;
        this.knex('employees').insert(newEmployee)
            .then(result => callback(null, result[0]))
            .catch(err => callback(err));
    }

    updateEmployeeById(tenantId, employeeId, updatedEmployee, callback) {
        this.knex('employees').where({ tenantId, pers_id: employeeId }).update(updatedEmployee)
            .then(() => callback(null))
            .catch(err => callback(err));
    }

    deleteEmployeeById(tenantId, employeeId, callback) {
        this.knex('employees').where({ tenantId, pers_id: employeeId }).delete()
            .then(() => callback(null))
            .catch(err => callback(err));
    }

    getTenants(callback) {
        this.knex('tenants').select('*')
            .then(rows => callback(null, rows))
            .catch(err => callback(err));
    }

    getTenantById(tenantId, callback) {
        this.knex('tenants').where('tenantId', tenantId).first()
            .then(row => callback(null, row))
            .catch(err => callback(err));
    }

    createTenant(newTenant, callback) {
        this.knex('tenants').insert(newTenant)
            .then(result => callback(null, result[0]))
            .catch(err => callback(err));
    }

    updateTenantById(tenantId, updatedTenant, callback) {
        this.knex('tenants').where('tenantId', tenantId).update(updatedTenant)
            .then(() => callback(null))
            .catch(err => callback(err));
    }

    deleteTenantById(tenantId, callback) {
        this.knex('tenants').where('tenantId', tenantId).delete()
            .then(() => callback(null))
            .catch(err => callback(err));
    }
}

module.exports = SQLiteAdapter;
