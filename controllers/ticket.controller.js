/**
 * Controller for handling notification ticket HTTP requests.
 * 
 * This module contains all route handlers for the notification CRUD operations.
 * Each handler delegates to the notification service and returns standardized responses.
 */

// Service layer for notification business logic
const notificationService = require('../services/notification.service');
// Standardized response objects
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
// HTTP status code constants
const { STATUS } = require('../utils/constants');

/**
 * POST /notifications - Create a new notification ticket.
 * 
 * Expects: { subject, content, recepientEmails[] } in request body
 * Returns: Created ticket with 201 status, or validation error with 422
 */
const createTicket = async (req, res) => {
    try {
        // Delegate ticket creation to service layer
        const response = await notificationService.create(req.body);
        // Build success response
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a notification ticket';
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch (error) {
        // Handle validation errors (422) vs other errors (500)
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

/**
 * GET /notifications - Retrieve all notifications.
 * 
 * Returns: Array of all tickets sorted by createdAt descending, with 200 status
 */
const getAllNotifications = async (req, res) => {
    try {
        const response = await notificationService.getAll();
        successResponseBody.data = response;
        successResponseBody.message = 'Notifications fetched successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

/**
 * GET /notifications/:id - Retrieve a single notification by ID.
 * 
 * Params: id - MongoDB ObjectId of the notification
 * Returns: Ticket object with 200 status, or 404 if not found
 */
const getNotificationById = async (req, res) => {
    try {
        const response = await notificationService.getById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Notification fetched successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

/**
 * PUT /notifications/:id - Update notification status.
 * 
 * Params: id - MongoDB ObjectId of the notification
 * Body: { status } - Must be one of: SUCCESS, FAILED, PENDING
 * Returns: Updated ticket with 200 status, 400 if status missing, 404 if not found
 */
const updateNotificationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        // Validate required status field
        if (!status) {
            errorResponseBody.err = 'Status is required';
            return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
        }
        const response = await notificationService.updateStatus(req.params.id, status);
        successResponseBody.data = response;
        successResponseBody.message = 'Notification status updated successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

/**
 * DELETE /notifications/:id - Delete a notification.
 * 
 * Params: id - MongoDB ObjectId of the notification
 * Returns: Success message with 200 status, or 404 if not found
 */
const deleteNotification = async (req, res) => {
    try {
        await notificationService.remove(req.params.id);
        successResponseBody.data = null;
        successResponseBody.message = 'Notification deleted successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

module.exports = {
    createTicket,
    getAllNotifications,
    getNotificationById,
    updateNotificationStatus,
    deleteNotification
};
