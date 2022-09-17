const AppError = require('../utils/appError');

const handelCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handelDuplicateFieldDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handelValidatorErrorDB = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handelJWTError = (err) =>
  new AppError('Invalid token. Please login again!', 401);

const handelJWTExpiredError = (err) =>
  new AppError('Expired token. Please login again!', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handelCastErrorDB(error);
    if (err.code === 11000) error = handelDuplicateFieldDB(error);
    if (err.name === 'ValidationError') error = handelValidatorErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handelJWTError(error);
    if (err.name === 'TokenExpiredError') error = handelJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};
