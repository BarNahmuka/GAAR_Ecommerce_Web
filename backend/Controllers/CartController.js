const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../Models/userModal');
const catchAsync = require('../../src/Utills/catchAsync'); 
const AppError = require('../../src/Utills/appError'); 

exports.getCheckoutSession = catchAsync(async(req, res, next) => { 
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(new AppError('No user found with this ID', 404));
    }
  
    const lineItems = user.myCart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.product_title },
        unit_amount: Math.round(parseFloat(item.product_price) * 100),
      },
      quantity: item.quantity,
    }));
 ;
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.protocol}://localhost:3000/successPayments/${req.params.userId}?${new URLSearchParams(req.query).toString()}`,
      cancel_url: `${req.protocol}://localhost:3000/api/users/${req.params.userId}/cart`,
      customer_email: user.email,
      client_reference_id: req.params.userId,
    });
    console.log('Stripe session created:', session);
  
    res.status(200).json({
      status: 'success',
      session
    });
    next();
  });
  
exports.getSuccessPayment = catchAsync((req, res, next) => {
  const { userId } = req.params;
  const { address, phoneNumber, total_purchase } = req.query;

  console.log(`User ID: ${userId}`);
  console.log(`Address: ${address}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Total Purchase: ${total_purchase}`);

  res.status(200).send('Payment was successful. Thank you for your purchase!');

  next();
});

exports.getCart = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json({ cart: user.myCart });
});

exports.deleteProductFromCart = catchAsync(async (req, res) => {
    const { id, itemId } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }
 
    console.log('Before update:', user.myCart);
    user.myCart = user.myCart.filter(item => item._id.toString() !== itemId);

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ cart: user.myCart});
});

exports.updateProductQuantity = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const { itemId, updatedQuantity } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const item = user.myCart.find(item => item._id.toString() === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  item.quantity = updatedQuantity;
  await user.save({ validateBeforeSave: false }); 

  res.status(200).json({
    status: 'success',
    cart: user.myCart,
  });
});


