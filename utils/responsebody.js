/**
 * Standardized response body templates for the Notification Service API.
 * 
 * These objects define a consistent structure for success and error responses
 * returned by the API endpoints.
 */

// Template for successful API responses
const successResponseBody = {
    data: null,   // Payload data (varies by endpoint)
    message: ''   // Human-readable success message
};

// Template for error API responses
const errorResponseBody = {
    err: null     // Error message or validation error details
};

module.exports = {
    successResponseBody,
    errorResponseBody
};
