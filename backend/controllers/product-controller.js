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
    
    const resultsPerPage = 10;
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
    
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }  
    
    res.status(200).json({
        success: true,
        product
    });
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
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
    
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }  

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    });
});

exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const review = {
        user: req.user.id,
        rating: Number(rating),
        comment,
        productId,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler(`Product with id ${productId} was not found`, 404));
    }

    const existingReview = product.reviews.find((r) => {
        return r.user.toString() === req.user._id.toString();
    });
    
    if (existingReview) {
        existingReview.comment = comment;
        existingReview.rating = rating;
    } else {
        product.reviews.push(review);
        product.totalReviews = product.reviews.length;
    }   

    if (product.reviews.length > 0) {
        product.ratings = product.reviews.reduce((totalReviews, currentReview) => totalReviews + currentReview.rating, 0) / product.reviews.length;
    }

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

exports.deleteProductReview = asyncErrorHandler(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);
    const reviewId = req.params.reviewId;

    if (!product) {
        return next(new ErrorHandler(`Product with id ${productId} was not found`, 404));
    }

    const review = product.reviews.find((r) => r._id.toString() === reviewId.toString());
    if (!review) {
        return next(new ErrorHandler(`Product review with id ${reviewId} was not found`, 404));
    }
    
    product.reviews.remove(review);

    product.totalReviews = product.reviews.length;

    if (product.reviews.length > 0) {
        product.ratings = product.reviews.reduce((totalReviews, currentReview) => totalReviews + currentReview.rating, 0) / product.reviews.length;
    }

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});