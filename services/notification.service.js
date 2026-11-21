const Ticket = require('../models/ticketNotification');

const { STATUS } = require('../utils/constants');

const create = async (data) => {
    try {
        const ticket = await Ticket.create(data);
        return ticket;
    } catch (error) {
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

const getAll = async () => {
    return await Ticket.find().sort({ createdAt: -1 });
};

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

const updateStatus = async (id, status) => {
    const ticket = await Ticket.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
    if (!ticket) {
        throw {
            err: 'Notification not found',
            code: STATUS.NOT_FOUND
        };
    }
    return ticket;
};

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
