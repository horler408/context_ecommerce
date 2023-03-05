const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware.js');

const {
  getUsers,
  getUser,
  authUser,
  registerUser,
  userProfile,
} = require('../controllers/userController.js');

router.get('/', getUsers);
router.get('/:id', auth, getUser);
router.post('/login', authUser);
router.post('/register', registerUser);
router.put('/profile', auth, userProfile);

module.exports = router;
