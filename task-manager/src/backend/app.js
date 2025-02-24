const authRoutes = require('./routes/auth-routes');
const tasksRoutes = require('./routes/tasks-routes');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

/** EXPRESS CONFIGURATIONS **/
const ORIGIN = 'http://localhost:5173';
const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
const ALLOWEDHEADERS = ['Content-Type', 'Authorization'];
const CREDENTIALS = true;
/**************************/

/*** API ROUTES ***/
const AUTH_API_ROUTE = '/api/auth';
const TASK_API_ROUTE = '/api/tasks';

/*****************/

// Allow frontend to access the backend
app.use(cors({
    origin: ORIGIN,
    methods: METHODS,
    allowedHeaders: ALLOWEDHEADERS,
    credentials: CREDENTIALS
}));

// Middleware
app.use(express.json());

// Establish API Routes
app.use(AUTH_API_ROUTE, authRoutes);
app.use(TASK_API_ROUTE, tasksRoutes);

module.exports = app;