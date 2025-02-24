const express = require('express');
const authController = require('../controllers/auth-controller');

const AUTH_MOUNT = '/';

const router = express.Router();
router.use(AUTH_MOUNT, authController);

module.exports = router;