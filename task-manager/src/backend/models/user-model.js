const pool = require('../config/database');

// Modify these as needed to fit the db needs
const userTable = 'users';
const usernameCol = 'username';
const passwordCol = 'password';
const returningCols = '*';

const CREATE_USER_QUERY = `INSERT INTO ${userTable} (${insertCols}) VALUES (${valuePlaceholders}) RETURNING ${returningCols}`
const FIND_USER_QUERY = `SELECT ${selectCols} FROM ${userTable} WHERE ${whereClause}`;

const createUser = async (username, hashedPassword) => {
    const insertCols = `${usernameCol}, ${passwordCol}`;
    const valuePlaceholders = '$1, $2';
    const queryFormat =
        CREATE_USER_QUERY

    const values = [username, hashedPassword];
    const res = await pool.query(queryFormat, values);
    return res.rows[0];
};

const findUser = async (username) => {
    // Defining the parts for SELECT
    const selectCols = '*';
    const whereClause = `${usernameCol} = $1`;
    const queryFormat =
        FIND_USER_QUERY

    const values = [username];
    const res = await pool.query(queryFormat, values);
    return res.rows[0] || null;
};

module.exports = {
    createUser,
    findUser
}
