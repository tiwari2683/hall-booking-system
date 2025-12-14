const { validationResult } = require('express-validator');

/**
 * Middleware to validate the request using express-validator
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.errors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    return next(error);
  }
  
  next();
};

module.exports = {
  validateRequest,
};
