const asyncErrorHandler = require('../middlewares/async-error-handler');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/error-handler');
const User = require('../models/user');

module.exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {

    if (!req.cookies || !req.cookies.token) {
        return next(new ErrorHandler('Please login first to access the resource', 401));
    }

    const { token } = req.cookies;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

module.exports.isAuthorizedRoles = (...roles) => {
    return (async (req, res, next) => {
        const { user } = req;
        
        if (!roles.includes(user.role)) {
            next(new ErrorHandler(`Role {${user.role}} does not have permission to access this resource`, 403));
        }

        next();
    });
};