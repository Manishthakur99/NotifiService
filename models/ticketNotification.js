/**
 * Mongoose model for TicketNotification.
 * 
 * Defines the schema for notification tickets stored in MongoDB.
 * Each ticket represents an email notification to be sent to one or more recipients.
 */

const mongoose = require('mongoose');

/**
 * Schema for a notification ticket.
 * 
 * Fields:
 * - subject: Email subject line (required)
 * - content: Email body text (required)
 * - recepientEmails: Array of recipient email addresses (required)
 * - status: Delivery status - SUCCESS, FAILED, or PENDING (default: PENDING)
 * 
 * timestamps: Automatically adds createdAt and updatedAt fields.
 */
const ticketNotificationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true // Subject line is required for every notification
    },
    content: {
        type: String,
        required: true  // Email body content is required
    },
    recepientEmails: {
        type: [String], // Array of email address strings
        required: true  // At least one recipient is required
    },
    status: {
        type: String,
        enum: {
            values: ["SUCCESS", "FAILED", "PENDING"],
            message: "invalid ticket status"
        },
        default: "PENDING", // New tickets start as PENDING
        required: true
    }
}, {timestamps: true});

// Create and export the Mongoose model for TicketNotification
const ticketNotificationModel = mongoose.model('TicketNotification', ticketNotificationSchema);
module.exports = ticketNotificationModel;
