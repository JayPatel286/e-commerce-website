const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getMyDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const router = express.Router();

// Register a user
router.route('/register').post(registerUser);

// Login user
router.route('/login').post(loginUser);

// Forgot password
router.route('/password/forgot').post(forgotPassword);

// Reset password
router.route('/password/reset/:token').put(resetPassword);

// Logout user
router.route('/logout').get(logoutUser);

// Get my details
router.route('/me').get(isAuthenticatedUser, getMyDetails);

// Update Password
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// Update Profile
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// ! Admin -> Get all users
router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAllUsers);

// ! Admin -> Get single user details / Update Role / Delete User
router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser);

module.exports = router;
