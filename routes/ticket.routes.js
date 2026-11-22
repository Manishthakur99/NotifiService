/**
 * Route definitions for the Notification Service API.
 * 
 * This module mounts all notification-related endpoints on the Express app.
 * Base path: /notiservice/api/v1/notifications
 */

// Controller handling the business logic for each route
const notificationController = require('../controllers/ticket.controller');
// Middleware for validating notification creation requests
const ticketMiddlewares = require('../middlewares/ticket.middlewares');

/**
 * Mounts all notification routes on the Express application.
 * @param {Express.Application} app - The Express application instance
 */
const routes = (app) => {
    /**
     * POST /notiservice/api/v1/notifications
     * Create a new notification ticket.
     * 
     * Middleware: verifyTicketNotificationCreateRequest - validates subject, content, and recepientEmails
     * Controller: createTicket - creates the notification in database
     */
    app.post(
        '/notiservice/api/v1/notifications',
        ticketMiddlewares.verifyTicketNotificationCreateRequest,
        notificationController.createTicket
    );

    /**
     * GET /notiservice/api/v1/notifications
     * Retrieve all notifications, sorted by creation date (newest first).
     * 
     * Controller: getAllNotifications - fetches all tickets from database
     */
    app.get(
        '/notiservice/api/v1/notifications',
        notificationController.getAllNotifications
    );

    /**
     * GET /notiservice/api/v1/notifications/:id
     * Retrieve a single notification by its MongoDB ObjectId.
     * 
     * Controller: getNotificationById - finds ticket by ID, returns 404 if not found
     */
    app.get(
        '/notiservice/api/v1/notifications/:id',
        notificationController.getNotificationById
    );

    /**
     * PUT /notiservice/api/v1/notifications/:id
     * Update the status of a notification (SUCCESS, FAILED, PENDING).
     * 
     * Controller: updateNotificationStatus - updates status field, returns 404 if not found
     */
    app.put(
        '/notiservice/api/v1/notifications/:id',
        notificationController.updateNotificationStatus
    );

    /**
     * DELETE /notiservice/api/v1/notifications/:id
     * Delete a notification from the database.
     * 
     * Controller: deleteNotification - removes ticket by ID, returns 404 if not found
     */
    app.delete(
        '/notiservice/api/v1/notifications/:id',
        notificationController.deleteNotification
    );
};

module.exports = routes;
