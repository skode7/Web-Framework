const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

const notFoundHandler = (req, res, next) => {
  console.log('not found handleriin mentiin!');
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export {errorHandler, notFoundHandler};
