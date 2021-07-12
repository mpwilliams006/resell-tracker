const crypto = require('crypto');
const multer = require('multer');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
let ObjectID = require('mongodb').ObjectID;
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!111'
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!222'
  });
};
exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body.email);
  const newUser = await User.create({
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    discordHandle: req.body.discordHandle,
    email: req.body.email,
  });

  createSendToken(newUser, 201, res);
});

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!333'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!444'
  });
};
exports.addItem = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.body.userId, { $push: { id: new ObjectID(), items: req.body } }, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
exports.getAllItems = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find({ "items.0": { "$exists": true } }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const items = await features.query;

  // SEND RESPONSE
  res.status(200)
    .json({
      status: 'success',
      results: items.length,
      data: {
        items
      }
    });
});

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
