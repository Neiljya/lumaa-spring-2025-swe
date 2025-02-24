const express = require('express');
const authController = require('../controllers/auth-controller');

const router = express.Router();
router.use('/', authController);

module.exports = router;