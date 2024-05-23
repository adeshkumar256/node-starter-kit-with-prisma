const { Prisma } = require('@prisma/client');
const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  var statusCode = err.statusCode || 500;
  var response = {
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
  };
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    switch (err.code) {
      case 'P2002':
        const fields = err.meta.target;
        statusCode = 400;
        response.message = `A record with this ${fields.join(',')} already exists`;
        break;
      case 'P2025':
        statusCode = 404;
        response.message = 'Record not found';
        break;
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    response.message = `Unknown error: ${err.message}`;
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    response.message = `Rust panic: ${err.message}`;
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    response.message = `Initialization error: ${err.message}`;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    response.message = `Validation error: ${err.message}`;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;