const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel.js');

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error('Authorization failed!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this resource');
  }
});

module.exports = auth;
