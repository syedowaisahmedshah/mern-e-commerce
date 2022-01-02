const asyncErrorHandler = require('../middlewares/async-error-handler');
const User = require('../models/user');
const ErrorHandler = require('../utils/error-handler');
const sendToken = require('../utils/jwt-token');
const APIFeatures = require('../utils/api-features');

exports.getUserProfile = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });

    res.status(200).json({
        success: true,
        user
    });
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email }).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    
    await user.save();
    
    sendToken(user, 200, res);
});

exports.updateUserProfile = asyncErrorHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    
    res.status(200).json({
        success: true,
        user
    });
});

exports.getUsers = asyncErrorHandler(async (req, res, next) => {

    const resultsPerPage = 4;
    const usersCount = await User.countDocuments(); 

    const apiFeatures = new APIFeatures(User.find(), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage);

    const users = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: users.length,
        totalCount: usersCount,
        users
    });
});

exports.getUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User was not found with this id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user
    });
});

exports.updateUser = asyncErrorHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email, 
        role: req.body.role
    };
    
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    
    res.status(200).json({
        success: true,
        user
    });
});

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return next(new ErrorHandler(`User was not found with this id: ${req.params.id}`, 400));
    }

    if (user.id === req.params.id) {
        return next(new ErrorHandler(`You cannot delete your user while your are logged in`, 400));
    }

    await user.remove();

    res.status(200).json({
        success: true
    });
});