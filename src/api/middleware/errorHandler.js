class ErrorHandler extends Error {
   constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.isOperational = true;
   }
}

module.exports = { ErrorHandler };
