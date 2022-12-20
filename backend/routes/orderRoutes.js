const express = require('express');
const {
  newOrder,
  getSingleOrder,
  getMyOrders,
  updateOrder,
  deleteOrder,
  getAllOrders,
} = require('../controllers/orderController');
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

// Create a order
router.route('/order/new').post(isAuthenticatedUser, newOrder);

// Get single order
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

// Get logged in user's orders
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders);

// ! Admin -> Get all orders
router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAllOrders);

// ! Admin -> Update order status
router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);

module.exports = router;
