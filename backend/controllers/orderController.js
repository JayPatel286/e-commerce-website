const Order = require('../models/Order');
const Product = require('../models/Product');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler(404, 'Order not found'));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Logged in user's orders
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// ! Admin -> Get All orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({}).populate('user').sort({ createdAt: -1 });

  let totalAmount = 0;

  orders.forEach(async (order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// ! Admin -> Update order status
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, 'Order not found'));
  }

  if (order.orderStatus === 'Deliverd') {
    return next(new ErrorHandler(404, 'Order has already been delivered'));
  }

  if (req.body.status === 'Shipped') {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;
  if (req.body.status === 'Deliverd') {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Status has been updated successfully',
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// ! Admin -> Delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, 'Order not found'));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully',
  });
});
