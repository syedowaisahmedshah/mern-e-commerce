const Product = require('../models/product');
const ErrorHandler = require('../utils/error-handler');
const asyncErrorHandler = require('../middlewares/async-error-handler');
const APIFeatures = require('../utils/api-features');

exports.newProduct = asyncErrorHandler(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success: true,
        product
    });
});

exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    
    const resultsPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        totalCount: productsCount,
        products
    });
});

exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }  
    
    res.status(200).json({
        success: true,
        product
    });
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }  

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }  

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    });
});