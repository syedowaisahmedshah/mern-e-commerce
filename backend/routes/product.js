const express = require('express');
const router = express.Router();
const { 
        getProducts, 
        newProduct, 
        getSingleProduct, 
        updateProduct, 
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteProductReview
      } = require('../controllers/product-controller');
const { 
        isAuthenticated, 
        isAuthorizedRoles 
      } = require('../utils/auth.js');

router.route('/products/:id').get(getSingleProduct);
router.route('/products').get(getProducts);
router.route('/admin/products/new').post(isAuthenticated, isAuthorizedRoles('admin'), newProduct);
router.route('/admin/products/:id')
        .put(isAuthenticated, isAuthorizedRoles('admin'), updateProduct)
        .delete(isAuthenticated, isAuthorizedRoles('admin'), deleteProduct);
router.route('/products/:id/reviews/:reviewId')
        .put(isAuthenticated, createProductReview)
        .get(isAuthenticated, getProductReviews)
        .delete(isAuthenticated, deleteProductReview);

module.exports = router;