class ErrorHandler extends Error{
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode;

        //Here Error is node default error class

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;