const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');
const env = require('../config/env');

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  if (err.name === 'ValidationError') {
    statusCode = 422;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
    const field = Object.keys(err.keyPattern || {})[0];
    errors = [{ field, message: `${field} already exists` }];
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource ID';
  }

  if (env.nodeEnv === 'development') {
    logger.error(`${statusCode} - ${message} - ${req.method} ${req.originalUrl}`);
    if (err.stack) logger.debug(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(env.nodeEnv === 'development' && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
