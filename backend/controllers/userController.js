const User = require('../models/User');
const Product = require('../models/Product');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'e-avatars',
    width: 150,
    crop: 'scale',
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // Generating token and storing in cookies
  const token = user.generateToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(201).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
});

// Login a user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, 'Please enter email and password'));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler(403, 'Invalid user or password'));
  }

  const isAuthenticated = await user.authenticate(password);

  if (!isAuthenticated) {
    return next(new ErrorHandler(403, 'Invalid user or password'));
  }

  // Generating token and storing in cookies
  const token = user.generateToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
});

// Logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, 'User not found'));
  }

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is : \n\n${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'E-Commerce password recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(500, error.message));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = req.params.token.toString();

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler(400, 'Token invalid or expired'));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, 'Password does not match'));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // Logging in the user
  const token = user.generateToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
});

// Get User details
exports.getMyDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Change user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  const isAuthenticated = await user.authenticate(req.body.oldPassword);

  if (!isAuthenticated) {
    return next(new ErrorHandler(403, 'old password is incorrect'));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(403, 'Password does not match'));
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = user.generateToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
});

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // TODO: Add Cloudinary
  if (req.body.avatar !== undefined) {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'e-avatars',
      width: 150,
      crop: 'scale',
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// ! Admin -> Get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

// ! Admin -> Get single user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(404, `User does not exist with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// ! Admin -> Update user role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorHandler(404, `User does not exist with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// ! Admin -> Delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(404, `User does not exist with id: ${req.params.id}`)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
