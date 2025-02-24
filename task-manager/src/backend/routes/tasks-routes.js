const express = require('express');
const tasksController = require('../controllers/tasks-controller');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth-middleware');

const TASK_MOUNT = '/';

router.use(authenticateJWT)
router.use(TASK_MOUNT, tasksController);

module.exports = router;