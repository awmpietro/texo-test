const ErrorHandler = require('./ErrorHandler');
/**
 * Middleware for handling errors in Express.
 * This middleware function logs the error stack to the console and sends a 500 internal server error response.
 *
 * @param {Object} err - The error object that was thrown in any of the preceding middleware or routes.
 * @param {Object} req - Express's request object. Provided by Express, but not used in this middleware.
 * @param {Object} res - Express's response object. Used to send the error response to the client.
 * @param {Function} next - Express's next function. It's not used here because this is error handling middleware.
 */

// Error handling middleware
module.exports = (err, req, res, next) => {
   console.error(err.stack);

   if (err instanceof ErrorHandler) {
      res.status(err.statusCode).send({
         error: err.message,
      });
   } else {
      // For unhandled errors (not instances of ErrorHandler)
      res.status(500).send({
         error: 'Internal Server Error',
         message: 'An unexpected error occurred',
      });
   }
};
