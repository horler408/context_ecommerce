const express = require('express');
const router = express.Router();

const {
  getOrder,
  createOrder,
  paidOrder,
  userLoginOrder,
} = require('../controllers/orderController.js');
const auth = require('../middlewares/authMiddleware.js');

router.get('/:id', auth, getOrder);
router.post('/:id', auth, createOrder);
router.get('/', auth, userLoginOrder);
router.put('/:id/pay', auth, paidOrder);

module.exports = router;
