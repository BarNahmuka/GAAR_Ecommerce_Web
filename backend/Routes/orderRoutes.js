const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController');

router
    .route('/createOrder/:userId')
    .post(OrderController.createNewOrder)

router  
    .route('/:userId/myOrders')
    .get(OrderController.getAllOrders)

module.exports = router;