const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAdminProducts,
  getAdminReviews,
  deleteReview,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const router = express.Router();

router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizedRoles('admin'), createProduct);

router.route('/products').get(getAllProducts);

router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAdminProducts);

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

router.route('/product/:id').get(getProductDetails);

// Create a review
router.route('/review').put(isAuthenticatedUser, createProductReview);

router
  .route('/admin/reviews')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAdminReviews);

router
  .route('/admin/review/:id')
  .put(isAuthenticatedUser, authorizedRoles('admin'), deleteReview);

module.exports = router;
