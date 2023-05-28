const express = require('express');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel.js');
const Product = require('../models/productModel.js');
const users = require('../data/users.js');
const products = require('../data/products.js');

const ImportData = express.Router();

ImportData.post(
  '/users',
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUsers = await User.insertMany(users);

    res.send({ importUsers });
  })
);

ImportData.post(
  '/products',
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);

    res.send({ importProducts });
  })
);

module.exports = ImportData;
