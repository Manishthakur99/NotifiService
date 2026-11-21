const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const routes = require('./routes/ticket.routes');

const app = express();

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log('Notification Server Started on port', PORT);
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
});
