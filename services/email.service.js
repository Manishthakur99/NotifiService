/**
 * Email service for sending notifications via SMTP.
 * 
 * This module configures a Nodemailer transporter using Gmail service
 * and exposes a sendMail function to send email notifications.
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a reusable Nodemailer transporter using Gmail SMTP
// Credentials are loaded from environment variables (EMAIL and EMAIL_PASS)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,    // Sender email address
        pass: process.env.EMAIL_PASS // Sender email password / app password
    }
});

/**
 * Send an email using the configured transporter.
 * 
 * @param {Object} mailData - Email data in Nodemailer format
 * @param {String} mailData.from - Sender email address
 * @param {String|Array} mailData.to - Recipient email address(es)
 * @param {String} mailData.subject - Email subject line
 * @param {String} mailData.text - Email body text (plain text)
 * @returns {Promise} Resolves with sendMail info, rejects on error
 */
const sendMail = (mailData) => {
    return transporter.sendMail(mailData);
};

module.exports = { sendMail };
