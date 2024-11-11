const User = require('../Models/userModal');
const Order = require('../Models/orderModal');
const catchAsync = require('../../src/Utills/catchAsync'); 
const AppError = require('../../src/Utills/appError'); 

  exports.createNewOrder = catchAsync(async (req, res, next) => {
    try {
      const { address, phoneNumber, totalPurchase } = req.body;
    
      const totalPurchaseAmount = parseFloat(totalPurchase);
      if (isNaN(totalPurchaseAmount)) {
        return next(new AppError('Invalid total purchase amount', 400));
      }
  
      const user = await User.findById(req.params.userId);
      if (!user) {
        return next(new AppError('User not found', 404));
      }
  
      const order = new Order({
        user: req.params.userId,
        products: user.myCart.map(item => ({
          product_title: item.product_title,
          quantity: item.quantity
        })),
        date_order: new Date(),
        address,
        phoneNumber,
        total_purchase: totalPurchaseAmount
      });

      await order.save({ validateBeforeSave: false });
      
      user.myCart = [];
      await user.save({ validateBeforeSave: false });
  
      res.status(200).json({ status: 'success', message: 'Order created successfully' });
    } catch (err) {
      console.error('Error in createNewOrder:', err);
      return next(new AppError('Internal server error', 500));
    }
  });

exports.getAllOrders = catchAsync(async (req, res, next) => {
  try {
    const orders = await Order.find({user:req.params.userId}).populate('user', 'userName email');;
    console.log(orders);
  
    if (!orders.length) {
      return next(new AppError('Orders not found', 404));
    }
    res.status(200).json({orders});
  }catch{
    console.error('Error in getAllOrders:', err);
    return next(new AppError('Internal server error', 500));
  }
});
  