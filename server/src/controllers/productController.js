const Product = require('../models/productModel.js');
const asyncHandler = require('express-async-handler');

// GET all products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ _id: -1 });
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
  // res.json(products);
});

// GET single Product
const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// PRODUCT REVIEW
const productReview = asyncHandler(async (req, res) => {
  const { ratings, comment } = req.body;
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product Already Reviewed');
    }
    const review = {
      name: req.user.name,
      ratings: Number(ratings),
      comment,
      user: req.user.id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((acc, item) => item.ratings + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Reviews Addedd' });
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

module.exports = { getProduct, getProducts, productReview };
