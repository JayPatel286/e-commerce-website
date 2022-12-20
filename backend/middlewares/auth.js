const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, 'Please login to access this route'));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not authorized to access this route`
        )
      );
    }

    next();
  };
};
