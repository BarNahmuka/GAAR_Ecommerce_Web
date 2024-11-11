const User = require('../Models/userModal');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../src/Utills/catchAsync'); 
const AppError = require('../../src/Utills/appError'); 
const bcrypt = require('bcryptjs');
const Email = require('../../src/Utills/email');

exports.createUser = catchAsync(async (req, res, next) => {
  const { userName, email, password, passwordConfirm } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError('Email already exists', 400));
  }

  if (password !== passwordConfirm) {
    return next(new AppError('Passwords are not the same!', 400));
  }

  const newUser = new User({ userName, email, password, passwordConfirm, myCart: [] });
  await newUser.save(); 

  const url = `http://localhost:3000/login`;  
  await new Email(newUser, url).sendWelcome();

  res.status(201).json({ status: 'success', data: newUser });
});


exports.loginUser =  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
      if (!user) {
        return next(new AppError('User not found',400));
      }
      const isMatch = await user.correctPassword(password, user.password);

      if (!isMatch) {
        return next(new AppError('Invalid credentials',400));
      }
      
      const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
      res.json({ token, user });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError('User not found',400));
    }
    res.status(200).json({
      status: 'success',
      data: { user }
    });
});

exports.updateUser =  catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return next(new AppError('User not found',400));
    }
    res.status(200).json({
      status: 'success',
      data: { user }
    });
});

exports.deleteUser =  catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError('User not found',400));
    }
    res.status(200).json({
      status: 'success',
      data: null
    });
});

