import {validationResult} from 'express-validator';

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

const validationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(', ');
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
};

export {errorHandler, notFoundHandler, validationErrors};
