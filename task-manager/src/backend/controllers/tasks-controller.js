// This import fixes a 'no overload found' issue with the routes
const express = require('express');
const router = express.Router();
const tasksService = require('../services/tasks-service');

router.get('/', async (req, res) => {
    try {
        const userId = req.user?.id;

        // Check if userId is possibly undefined first
        if (userId === undefined) {
            return res.status(401).json({ message: 'User ID not found' });
        }

        const tasks = await tasksService.getAllTasks(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        // set by auth middleware
        const userId = req.user?.id;

        const { title, description } = req.body;

        // Check if userId is possibly undefined first
        if (userId === undefined) {
            return res.status(401).json({ message: 'User ID not found' });
        }

        const task = await tasksService.addTask(title, description, userId);
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const task = await tasksService.updateTask(id, req.body);
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await tasksService.removeTask(id);
        res.json({ message: 'Task successfully deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
