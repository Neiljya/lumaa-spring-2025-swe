const express = require('express');
const tasksController = require('../controllers/tasks-controller');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth-middleware');

router.use(authenticateJWT)
router.use('/', tasksController);

module.exports = router;