const express = require ('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const transport = require('./services/email.service');
const app = express();

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, async() =>{
    console.log('Notification Server Started');
    transport.sendMail({
        from: process.env.EMAIL,
        to: 'skillboostmanish@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email from the notification service.'
    })
    try{
         await mongoose.connect(process.env.DB_URL);
    }
     catch(err){
        console.error(err);
    }
})