/**
 * Service layer for notification ticket business logic.
 * 
 * This module encapsulates all database operations for the TicketNotification model.
 * It provides a clean API for the controller layer and handles error formatting.
 */

// Mongoose model for ticket notifications
const Ticket = require('../models/ticketNotification');
// HTTP status code constants
const { STATUS } = require('../utils/constants');

/**
 * Create a new notification ticket in the database.
 * 
 * @param {Object} data - Ticket data { subject, content, recepientEmails[], status? }
 * @returns {Object} Created ticket document
 * @throws {Object} Validation error with code 422 if required fields missing/invalid
 */
const create = async (data) => {
    try {
        const ticket = await Ticket.create(data);
        return ticket;
    } catch (error) {
        // Handle Mongoose validation errors specifically
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE_ENTITY
            };
        }
        throw error;
    }
};

/**
 * Retrieve all notifications sorted by creation date (newest first).
 * 
 * @returns {Array} Array of all ticket documents
 */
const getAll = async () => {
    return await Ticket.find().sort({ createdAt: -1 });
};

/**
 * Retrieve a single notification by its MongoDB ObjectId.
 * 
 * @param {String} id - MongoDB ObjectId of the ticket
 * @returns {Object} Ticket document
 * @throws {Object} Not found error with code 404 if ticket doesn't exist
 */
const getById = async (id) => {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
        throw {
            err: 'Notification not found',
            code: STATUS.NOT_FOUND
        };
    }
    return ticket;
};

/**
 * Update the status of a notification ticket.
 * 
 * @param {String} id - MongoDB ObjectId of the ticket
 * @param {String} status - New status (SUCCESS, FAILED, PENDING)
 * @returns {Object} Updated ticket document
 * @throws {Object} Not found error with code 404 if ticket doesn't exist
 */
const updateStatus = async (id, status) => {
    const ticket = await Ticket.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
    );
    if (!ticket) {
        throw {
            err: 'Notification not found',
            code: STATUS.NOT_FOUND
        };
    }
    return ticket;
};

/**
 * Delete a notification ticket from the database.
 * 
 * @param {String} id - MongoDB ObjectId of the ticket
 * @returns {Object} Deleted ticket document
 * @throws {Object} Not found error with code 404 if ticket doesn't exist
 */
const remove = async (id) => {
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
        throw {
            err: 'Notification not found',
            code: STATUS.NOT_FOUND
        };
    }
    return ticket;
};

module.exports = {
    create,
    getAll,
    getById,
    updateStatus,
    remove
};
