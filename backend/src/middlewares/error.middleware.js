const { ZodError } = require('zod');
const { Prisma } = require('@prisma/client');

/**
 * Error handler middleware for the application
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors = null;

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  }
  // Handle Prisma errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle unique constraint violation
    if (err.code === 'P2002') {
      statusCode = 409;
      const field = err.meta?.target?.[0];
      message = field 
        ? `A booking with this ${field} already exists`
        : 'Duplicate entry';
    }
    // Handle not found
    else if (err.code === 'P2025') {
      statusCode = 404;
      message = 'The requested resource was not found';
    }
    // Handle other Prisma errors
    else {
      message = 'Database Error';
    }
  }
  // Handle custom application errors
  else if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
    statusCode = err.statusCode;
    message = err.message;
    if (err.errors) {
      errors = err.errors;
    }
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 Not Found handler middleware
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });};

module.exports = {
  errorHandler,
  notFoundHandler,
};
