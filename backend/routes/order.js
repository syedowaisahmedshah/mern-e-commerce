const express = require('express');
const router = express.Router();
const { isAuthenticated, isAuthorizedRoles } = require('../utils/auth');
const { 
        newOrder, 
        getSingleOrder, 
        getUserOrders, 
        getOrders,
        updateOrder,
        deleteOrder 
    } = require('../controllers/order-controller');

router.route('/orders/new').post(isAuthenticated, newOrder);
router.route('/orders/:id').get(isAuthenticated, getSingleOrder);
router.route('/orders').get(isAuthenticated, getUserOrders);
router.route('/admin/orders').get(isAuthenticated, isAuthorizedRoles('admin'), getOrders);
router.route('/admin/orders/:id')
    .put(isAuthenticated, isAuthorizedRoles('admin'), updateOrder)
    .delete(isAuthenticated, isAuthorizedRoles('admin'), deleteOrder);

module.exports = router;

