/**
 * HTTP status code constants for the Notification Service.
 * 
 * Centralizes all status codes used across the application
 * for consistent error handling and response building.
 */

const STATUS = {
    OK: 200,                          // Request succeeded
    INTERNAL_SERVER_ERROR: 500,       // Server error
    CREATED: 201,                     // Resource created successfully
    UNAUTHORISED: 401,                // Authentication required
    NOT_FOUND: 404,                   // Resource not found
    BAD_REQUEST: 400,                 // Invalid request parameters
    FORBIDDEN: 403,                   // Access forbidden
    UNPROCESSABLE_ENTITY: 422,        // Validation error
    GONE: 410,                        // Resource no longer available
    PAYMENT_REQUIRED: 402             // Payment required
}

module.exports = {
    STATUS
}
