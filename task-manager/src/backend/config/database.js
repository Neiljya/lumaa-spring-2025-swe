const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

require('dotenv').config({ debug: true });

//console.log("Loaded .env file from:", path.resolve(__dirname, '../.env')); // Debugging

const pool = new Pool({
    host: String(process.env.PG_HOST),
    port: Number(process.env.PG_PORT),
    user: String(process.env.PG_USER),
    password: String(process.env.PG_PASSWORD),
    database: String(process.env.PG_DATABASE)
});

pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL db');
        client.release();
    })
    .catch(error => console.error('Error connecting to PostgreSQL', error));

module.exports = pool;

