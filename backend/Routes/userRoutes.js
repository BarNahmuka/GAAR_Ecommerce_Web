const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/AuthController');

router
  .route('/forgotPassword')
  .post(AuthController.forgotPassword)

router
  .route('/resetPassword/:token')
  .patch(AuthController.resetPassword)

router
  .route('/register')
  .post(UserController.createUser)

router
  .route('/log')
  .post(UserController.loginUser);

router
  .route('/users/:id') 
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
