const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const errorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// Protect routes

exports.protect = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if(req.cookies.token){
  //     token = req.cookies.token
  // }

  // Make sure token exists
  if (!token) {
    return next(new errorResponse("Not authorize to access this route", 401));
  }
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new errorResponse("Not authorize to acces this route", 401));
  }
});
