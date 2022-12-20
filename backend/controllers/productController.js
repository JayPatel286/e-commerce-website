const Product = require('../models/Product');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const cloudinary = require('cloudinary');

// ! Admin -> Create a new Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;

  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products ()
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredCount = products.length;

  apiFeature.pagination(resultsPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultsPerPage,
    filteredCount,
  });
});

// !Admin -> Get all products ()
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// ! Admin -> Update a Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, 'Product not found'));
  }

  if (req.body.images) {
    // Delete from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products',
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// ! Admin -> Delete a Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, 'Product not found'));
  }

  // Delete from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

  if (!product) {
    return next(new ErrorHandler(404, 'Product not found'));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create a new Review or update an existing Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: isReviewed
      ? 'Review updated successfully'
      : 'Review added successfully',
  });
});

// ! Admin -> Get all reviews
exports.getAdminReviews = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({}).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

  let reviews = [];
  products.forEach((product) => {
    let p_reviews = [];

    product.reviews.forEach((r) => {
      p_reviews.push({
        _id: r._id,
        reviewer: r.name,
        reviewer_img: r.user.avatar.url,
        comment: r.comment,
        product: product.name,
        product_id: product._id,
        product_img: product.images[0].url,
        rating: r.rating,
      });
    });

    reviews = reviews.concat(p_reviews);
  });

  res.status(200).json({
    success: true,
    reviews,
  });
});

// ! Admin -> Get all reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);

  if (!product) {
    return next(new ErrorHandler(404, 'Product not found'));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.params.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;
  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.body.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
