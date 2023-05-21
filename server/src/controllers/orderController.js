const asyncHandler = require('express-async-handler');

const Order = require('../models/orderModel.js');

// GET A SINGLE ORDER BY ID
const getOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order Not Found!');
  }
});

// TO CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    shippingPrice,
    itemsPrice,
    paymentMethod,
    totalprice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user_id,
      orderItems,
      shippingAddress,
      shippingPrice,
      itemsPrice,
      paymentMethod,
      totalprice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// USER LOGIN ORDERS
const userLoginOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id }).sort({ id: -1 });

  res.json(order);
});

// ORDER IS PAID
const paidOrder = asyncHandler(async (req, res) => {
  const { id, status, update_time, email_address } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: id,
      status: status,
      update_time: update_time,
      email_address: email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found!');
  }
});

module.exports = { getOrder, createOrder, userLoginOrder, paidOrder };
