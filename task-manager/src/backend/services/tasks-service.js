const taskModel = require('../models/task-model');

const getAllTasks = async (id) => {
    return await taskModel.getTasksByUser(id);
};

const addTask = async (title, description, id) => {
    return await taskModel.createTask(title, description, id);
}

const updateTask = async (id, fields) => {
    return await taskModel.updateTask(id, fields);
}

const removeTask = async (id) => {
    await taskModel.deleteTask(id);
};

module.exports = {
    getAllTasks,
    addTask,
    updateTask,
    removeTask
};