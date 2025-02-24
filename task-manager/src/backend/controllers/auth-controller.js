const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');

router.post('/register', async (req, res) => {
    console.log("Register req.body: ", req.body);
    try {
        const user = await authService.register(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: (error).message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: (error).message })
    }
});

module.exports = router;