const ErrorHandler = require('../utils/error-handler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    if (process.env.NODE_ENV.trim() === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err,
            stack: err.stack 
        });
    } else if (process.env.NODE_ENV.trim() === 'PRODUCTION') {

        // Handle mongoose invalid object Id
        if (err.name === 'CastError') {
            const message = `Resource not found: Invalid ${err.path}`;
            err = new ErrorHandler(message, 400);
        }

        // Handle mongoose ValidationError
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(error => error.message);
            err = new ErrorHandler(message, 400);
        }

        // Handle mongoose Duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            err = new ErrorHandler(message, 400);
        }

        // Invalid JWT Token
        if (err.name === 'JsonWebTokenError') {
            const message = 'JWT token is not valid. Try with valid JWT token';
            err = new ErrorHandler(message, 400);
        }

        // Expired JWT Token
        if (err.name === 'TokenExpiredError') {
            const message = 'JWT token is expired';
            err = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error'
        });
    }
}