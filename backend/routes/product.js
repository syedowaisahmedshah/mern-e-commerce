const express = require('express');
const router = express.Router();
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/product-controller');
const { isAuthenticated, isAuthorizedRoles } = require('../utils/auth.js');

router.route('/products/:id').get(isAuthenticated, getSingleProduct);
router.route('/products').get(isAuthenticated, getProducts);
router.route('/admin/products/new').post(isAuthenticated, isAuthorizedRoles('admin'), newProduct);
router.route('/admin/products/:id')
        .put(isAuthenticated, isAuthorizedRoles('admin'), updateProduct)
        .delete(isAuthenticated, isAuthorizedRoles('admin'), deleteProduct);

module.exports = router;