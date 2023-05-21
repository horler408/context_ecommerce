const asyncHandler = require('express-async-handler');
const jwtDecode = require('jwt-decode');

const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const joiSchema = require('../utils/joiSchema.js');

// GETTING ALL THE USERS
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GETTING SINGLE USER
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// USER LOGIN
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // const { password, ...rest } = user;
    // const userInfo = Object.assign({}, { ...rest });
    const { firstName, lastName, email, phone, role } = user;
    const userInfo = { firstName, lastName, email, phone, role };

    const token = generateToken(user);
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    res.json({
      message: 'Authentication successful!',
      token,
      userInfo,
      expiresAt,
    });
  } else {
    res.status(401).json({
      message: 'Invalid Email or password!',
    });
    throw new Error('Invalid email or password');
  }
});

// GETTING USER REGISTERED
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, role, password } = req.body;
  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error('User already exists');
  }

  const userData = {
    email,
    phone,
    firstName,
    lastName,
    password,
    role,
  };

  const user = await User.create(userData);
  if (user) {
    const token = generateToken(user);
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    const { firstName, lastName, phone, email, role } = user;

    const userInfo = {
      firstName,
      lastName,
      email,
      phone,
      role,
    };

    // sendWelcomeEmail({
    //   email,
    //   subject: `Thanks for signing up with us ${firstName}`,
    //   message: 'You can start shopping now',
    // });
    res.status(201).json({
      message: 'User created successfully!',
      token,
      userInfo,
      expiresAt,
    });
  } else {
    res.status(400);
    throw new Error('Error occurred!');
  }
});

// USER PROFILE UPDATE
const userProfile = asyncHandler(async (req, res) => {
  const { firstName, email, password } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.firstName = firstName || user.firstName;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      timeCreated: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// DELETE USER
const removeUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ id: req.params.id });
    res.status(200).json('User removed successfully!');
  }
});

module.exports = {
  registerUser,
  removeUser,
  userProfile,
  authUser,
  getUser,
  getUsers,
};
