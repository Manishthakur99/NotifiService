/**
 * Entry point for the Notification Service application.
 * 
 * This file initializes the Express server, connects to MongoDB,
 * configures middleware, and mounts the notification routes.
 * It also starts the cron job for processing pending notifications.
 */

// Core dependencies
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Application routes
const routes = require('./routes/ticket.routes');

// Cron job for sending pending notifications
const { mailerCron } = require('./crons/cron');

// Initialize Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded request bodies (extended syntax for nested objects)
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all notification routes under the app
routes(app);

// Server port from environment or default to 3001
const PORT = process.env.PORT || 3001;

// Start the HTTP server and connect to MongoDB
app.listen(PORT, async () => {
    console.log('Notification Server Started on port', PORT);
    try {
        // Connect to MongoDB using the connection string from environment
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
        
        // Start the cron job to process pending notifications every 2 minutes
        mailerCron();
        console.log('Cron job started for processing pending notifications');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
});
