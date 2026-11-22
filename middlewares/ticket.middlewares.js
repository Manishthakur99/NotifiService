/**
 * Middleware for validating notification creation requests.
 * 
 * This module exports a single middleware function that validates
 * the request body for the create notification endpoint.
 * It ensures subject, content, and recepientEmails are present and valid.
 */

const { STATUS } = require('../utils/constants');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');

/**
 * Middleware to validate the ticket notification create request body.
 * 
 * Checks that the request contains:
 * - subject: A non-empty subject line
 * - content: Non-empty email content
 * - recepientEmails: A non-empty array of recipient email addresses
 * 
 * If any field is missing or invalid, returns a 400 Bad Request response.
 * Otherwise, calls next() to proceed to the controller.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyTicketNotificationCreateRequest = async (req, res, next) =>{
    // Validate subject is provided
    if(!req.body.subject) {
        errorResponseBody.err = 'No subject given for the email';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // Validate content is provided
    if(!req.body.content) {
        errorResponseBody.err = 'No content given for the email'
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // Validate recepientEmails is a non-empty array
    if(!req.body.recepientEmails || !(req.body.recepientEmails instanceof Array) || 
        req.body.recepientEmails.length <= 0
    ) {
        errorResponseBody.err = 'No recepitent emails given';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // All validations passed, proceed to next middleware/controller
    next();
}

module.exports = {
    verifyTicketNotificationCreateRequest
}
