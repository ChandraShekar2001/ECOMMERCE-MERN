const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.body.images.length);   
  // res.status(401).json({
  //   success: false,
  // })
  let images = [];
  // console.log(req.body);
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  console.log(images.length);
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  // console.log(imagesLinks);

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const data = req.body;
  // console.log(req.body);
  try {
    const product = await Product.create({
      name: data.name,
      description: data.description,
      images: imagesLinks,
      price: data.price,
      Stock: data.Stock,
      category: data.category,
      user: req.user
    });
    res.status(201).json({
      success: true,
      product,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
  
  const products = await Product.find();

});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  // console.log(apiFeature);
  let products = await apiFeature.query;
  // console.log(products);

  let filteredProductsCount = products.length;

  apiFeature.pagination(8);

  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // console.log(product);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  // console.log("productBeforeUpdate",product);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // console.log("productAfterUpdate",product);
  const allProducts=await Product.find()
  // console.log(allProducts);
  res.status(200).json({
    success: true,
    product,
    allProducts
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // console.log(product);
  // console.log('hi');
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  // console.log(product);
  
  await product.remove();
  const allProducts=await Product.find()
  // console.log(allProducts);

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
    allProducts
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const { rating, comment, id } = req.body.reviewData;
  // console.log(req.body);
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  // console.log(review);
  const product = await Product.findById(id);
  console.log(product);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
    // console.log(isReviewed);
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

  product.ratings = avg / product.reviews.length;
  // console.log(product);
  await product.save({ validateBeforeSave: false });
  const allProducts=await Product.find()
  res.status(200).json({
    success: true,
    rating:comment,
    // allProducts //comment afterwads
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review


exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  const allProducts=await Product.find()
  res.status(200).json({
    success: true,
    allProducts
  });
});

