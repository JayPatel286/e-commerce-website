const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

const stripe = require('stripe')(
  'sk_test_51LlZlKSBs81qlxwMaYtypjKefQHp43lOPmBMkP2J0mPIKQMoBpexkBKtT2asxeuHS76TaMt74tRkKzS72SeDLJgd00edfxLKRw'
);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'INR',
  });

  res.status(201).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripe_api_key: process.env.STRIPE_API_KEY,
  });
});
