const errorResponse = require("../utils/errorResponse");
const ErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // console.log(err.stack.red);
  console.log(err);
  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new errorResponse(message, 404);
  }
  //Duplicate Key error
  if (err.code === 11000) {
    const message = "Duplicate fields value entered";
    error = new errorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
module.exports = ErrorHandler;
