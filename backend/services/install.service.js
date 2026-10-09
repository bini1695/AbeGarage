const fs = require('fs');
const path = require('path');
const db = require('../config/db.config');

async function install() {
    console.log('install service called');

    // path to the SQL file in Resources
    const sqlFilePath = path.resolve(__dirname, '../../../..', 'Ressources', 'DB Designs', 'initial-queries.sql');
    if (!fs.existsSync(sqlFilePath)) {
        const msg = `SQL file not found at ${sqlFilePath}`;
        console.error(msg);
        return { status: 500, message: msg };
    }

    let sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    // remove line comments starting with -- and block comments /* */
    sqlContent = sqlContent.replace(/--.*$/gm, '');
    sqlContent = sqlContent.replace(/\/\*[\s\S]*?\*\//g, '');
    const queries = sqlContent
        .split(';')
        .map(q => q.trim())
        .filter(q => q);

    // test DB connectivity first
    if (db && typeof db.testConnection === 'function') {
        const test = await db.testConnection();
        if (!test.ok) {
            const errMsg = test.error && (test.error.sqlMessage || test.error.message) ? (test.error.sqlMessage || test.error.message) : JSON.stringify(test.error);
            console.error('DB connectivity check failed:', errMsg);
            return { status: 503, message: `Database unreachable: ${errMsg}` };
        }
    }

    for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        try {
            await db.executeQuery(q);
            console.log('Executed query', i);
        } catch (err) {
            console.error('Failed to execute query index', i);
            console.error('SQL:', q);
            console.error('Error:', err && (err.sqlMessage || err.message) ? (err.sqlMessage || err.message) : err);
            return { status: 500, message: 'Not all tables are created: ' + (err && (err.sqlMessage || err.message) ? (err.sqlMessage || err.message) : err) };
        }
    }

    return { status: 200, message: 'All tables are created successfully' };
}

module.exports = { install };
