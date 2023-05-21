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

/*
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const commonService = require('../utils/commonService');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token)
      return commonService.unAuthorizedResponse('Please authenticate', res);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user)
      return commonService.unAuthorizedResponse('Please authenticate', res);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = auth;
*/
