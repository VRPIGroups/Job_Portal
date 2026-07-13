// backend/src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Catch body-parser JSON SyntaxErrors (e.g. invalid JSON sent with application/json header)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON format in request body.'
    });
  }

  // Log full stack in development
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error Stack:', err.stack);
  } else {
    console.error('API Error:', err.message);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'An unexpected server error occurred.';

  // PostgreSQL Error Handlers
  if (err.code) {
    switch (err.code) {
      case '23505': // unique_violation
        statusCode = 400;
        message = 'A resource with this information already exists.';
        break;
      case '23503': // foreign_key_violation
        statusCode = 400;
        message = 'Referenced record was not found or is currently protected.';
        break;
      case '22P02': // invalid_text_representation
        statusCode = 400;
        message = 'Invalid data formatting supplied.';
        break;
      default:
        break;
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

module.exports = errorHandler;
