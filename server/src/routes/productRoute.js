const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware.js');

const {
  getProducts,
  getProduct,
  productReview,
} = require('../controllers/productController.js');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/:id/review', auth, productReview);

module.exports = router;
