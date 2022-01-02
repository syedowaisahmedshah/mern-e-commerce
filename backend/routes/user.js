const express = require('express');
const router = express.Router();
const { 
        isAuthenticated, 
        isAuthorizedRoles 
    } = require('../utils/auth.js');
const { 
        getUserProfile, 
        updatePassword, 
        updateUserProfile, 
        getUsers, 
        getUser, 
        updateUser, 
        deleteUser 
    } = require('../controllers/user-controller');

router.route('/user-profile').get(isAuthenticated, getUserProfile);
router.route('/update-password').put(isAuthenticated, updatePassword);
router.route('/update-profile').put(isAuthenticated, updateUserProfile);
router.route('/admin/users').get(isAuthenticated, isAuthorizedRoles('admin'), getUsers);
router.route('/admin/users/:id')
    .get(isAuthenticated, isAuthorizedRoles('admin'), getUser)
    .put(isAuthenticated, isAuthorizedRoles('admin'), updateUser)
    .delete(isAuthenticated, isAuthorizedRoles('admin'), deleteUser);

module.exports = router;