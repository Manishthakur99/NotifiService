const notificationService = require('../services/notification.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');

const createTicket = async (req, res) => {
    try {
        const response = await notificationService.create(req.body);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a notification ticket';
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

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

const updateNotificationStatus = async (req, res) => {
    try {
        const { status } = req.body;
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
