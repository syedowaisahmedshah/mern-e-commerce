const ErrorHandler = require('../utils/error-handler');
const asyncErrorHandler = require('../middlewares/async-error-handler');
const User = require('../models/user');
const sendToken = require('../utils/jwt-token');
const sendEmail = require('../utils/send-email');
const crypto = require('crypto');

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 200, res);
});

exports.loginUser = asyncErrorHandler(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter username and password', 400));
    }

    const user = await User.findOne({email}).select('+password');
    
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
});

exports.logoutUser = asyncErrorHandler(async(req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'User logged out'
    });
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
        return next(new ErrorHandler('user not found with this email address', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.host}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follows: \n\n${resetUrl}. \n\nIf you have not requested this, please ignore this email`;

    try {
        await sendEmail({
            email: req.body.email,
            subject: 'Mern-E-Commerce: Reset your forgotten password', 
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${req.body.email}`
        });

    } catch( error ) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Invalid reset password token, or token has been expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password and Confirm Password do not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});