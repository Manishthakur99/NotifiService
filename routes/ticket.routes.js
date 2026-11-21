const notificationController = require('../controllers/ticket.controller');
const ticketMiddlewares = require('../middlewares/ticket.middlewares');

const routes = (app) => {
    app.post(
        '/notiservice/api/v1/notifications',
        ticketMiddlewares.verifyTicketNotificationCreateRequest,
        notificationController.createTicket
    );

    app.get(
        '/notiservice/api/v1/notifications',
        notificationController.getAllNotifications
    );

    app.get(
        '/notiservice/api/v1/notifications/:id',
        notificationController.getNotificationById
    );

    app.put(
        '/notiservice/api/v1/notifications/:id',
        notificationController.updateNotificationStatus
    );

    app.delete(
        '/notiservice/api/v1/notifications/:id',
        notificationController.deleteNotification
    );
};

module.exports = routes;
