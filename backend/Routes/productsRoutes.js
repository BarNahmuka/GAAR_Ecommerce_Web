const express = require('express');
const router = express.Router();
const ProductsController = require('../Controllers/ProductsController');

router
  .route('/')
  .post(ProductsController.createNewProduct)
  .delete(ProductsController.deleteProduct)
  .get(ProductsController.getAllProducts);

router
  .route('/productsByCategory/:category')
  .get(ProductsController.getAllProductsByCategory);

router  
  .route('/import')
  .post(ProductsController.importAllProductsFromApi);

router
  .route('/:productId')
  .get(ProductsController.getProduct)
  .patch(ProductsController.updateProduct)

module.exports = router;
