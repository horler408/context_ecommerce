const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.origialUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // const statusCode = res.statusCode === 200 ? 200 : res.statusCode;
  // res.status(400).json({
  //   message: err.message,
  //   stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  // });
  next();
};

module.exports = { errorHandler, notFound };
