const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`); // create an error message
  res.status(404); // set the status code
  next(error); // pass to the next middleware - which is Error handler here from stmt above.
};

//eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; //when it gets to error middleware with a 200, it is due to any other error caused in the app - so set it to 500/internal server error
  res.status(statusCode);
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Error with your request 🙅🏻‍♀️"
        : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
