const pool = require('../config/database');

const tableName = 'tasks';

const cols = {
    title: 'title',
    description: 'description',
    id: 'id',
    isComplete: '"isComplete"'
};

const selectCols = '*';
const orderBy = 'id';

const getTasksByUser = async (id) => {
    const queryFormat =
        `SELECT ${selectCols} from ${tableName} WHERE ${cols.id} = $1 ORDER BY ${orderBy}`;

    const values = [id];
    const res = await pool.query(queryFormat, values);

    return res.rows;
};

const createTask = async (title, description, id) => {
    const insertCols = `${cols.title}, ${cols.description}, ${cols.id}, ${cols.isComplete}`;
    const valuePlaceholders = '$1, $2, $3, $4';
    const queryFormat =
        `INSERT INTO ${tableName} (${insertCols}) VALUES (${valuePlaceholders}) RETURNING ${selectCols}`;

    const values = [title, description, id, false];
    const res = await pool.query(queryFormat, values);
    return res.rows[0];
};

const updateTask = async (id, fields) => {
    console.log(fields);
    const existingTaskQuery = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);

    if (!existingTaskQuery.rows.length) {
        throw new Error("Task not found");
    }

    const existingTask = existingTaskQuery.rows[0];
    console.log(existingTask);

    const updatedTitle = fields.title || existingTask.title;
    const updatedDescription = fields.description || existingTask.description;
    const updatedIsComplete = fields.isComplete !== undefined ? fields.isComplete : existingTask.isComplete;

    if (updatedTitle === undefined) {
        throw new Error("Updated title is undefined");
    }

    const queryFormat = `UPDATE ${tableName} SET title = $1, description = $2, ${cols.isComplete} = $3 WHERE id = $4 RETURNING ${selectCols}`;
    const values = [updatedTitle, updatedDescription, updatedIsComplete, id];
    const res = await pool.query(queryFormat, values);
    return res.rows[0];
};

const deleteTask = async (id) => {
    const queryText = `DELETE FROM ${tableName} WHERE id = $1`;
    const values = [id];
    await pool.query(queryText, values);
};

module.exports = {
    getTasksByUser,
    createTask,
    updateTask,
    deleteTask
};