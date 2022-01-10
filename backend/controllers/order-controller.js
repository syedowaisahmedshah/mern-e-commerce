const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/error-handler');
const asyncErrorHandler = require('../middlewares/async-error-handler');
const APIFeatures = require('../utils/api-features');

exports.newOrder = asyncErrorHandler(async (req, res, next) => {
    const { 
        orderItems, 
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems, 
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(), 
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

exports.getSingleOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (!order) {
        return next(new ErrorHandler(`Order with id ${req.params.id} was not found`, 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

exports.getUserOrders = asyncErrorHandler(async (req, res, next) => {
    const resultsPerPage = 4;
    const ordersCount = await Order.find({ user: req.user.id });
    const apiFeatures = new APIFeatures(Order.find({user: req.user.id}), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage);

    const orders = await apiFeatures.query;
    
    res.status(200).json({
        success: true,
        count: orders.length,
        totalCount: ordersCount.length,
        orders
    });
});

exports.getOrders = asyncErrorHandler(async (req, res, next) => {

    const resultsPerPage = 4;
    const ordersCount = await Order.countDocuments();
    const apiFeatures = new APIFeatures(Order.find(), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage);

    const orders = await apiFeatures.query;
    const totalAmount = orders.reduce((runningTotalPrice, order) => runningTotalPrice + order.totalPrice, 0);
    
    res.status(200).json({
        success: true,
        count: orders.length,
        totalCount: ordersCount,
        totalAmount,
        orders
    });
});

exports.updateOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order with id ${req.params.id} was not found`, 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler(`Order has already been delivered`, 404));
    }

    order.orderItems.forEach(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity);
    });

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    });
});

exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order with id ${req.params.id} was not found`, 404));
    }

    await order.remove();

    res.status(200).json({
        success: true
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false});
}
