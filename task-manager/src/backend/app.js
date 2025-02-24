const authRoutes = require('./routes/auth-routes');
const tasksRoutes = require('./routes/tasks-routes');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Allow frontend to access the backend
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Establish API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

module.exports = app;