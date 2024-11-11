const express = require('express');
const router = express.Router();
const CartController = require('../Controllers/CartController');
const OrderController = require('../Controllers/OrderController');

router 
  .route('/successPayments/:userId')
  .get(CartController.getSuccessPayment)

router
  .route('/checkout-session/:userId')
  .get(CartController.getCheckoutSession);

router
  .route('/:id/cart')
  .get(CartController.getCart);

router
  .route('/:id/cart/:itemId')
  .delete(CartController.deleteProductFromCart);

router
  .route('/:userId/cart/update')
  .patch(CartController.updateProductQuantity); 


module.exports = router;
