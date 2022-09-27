const errorResponse = require("../utils/errorResponse");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/User");
const sendToken = require("../utils/jwtToken");

//@desc Register user
// route Get/api/v1/auth/register
//@access Public
exports.authRegister = catchAsyncError(async (req, res, next) => {
  const { name, role, email, password } = req.body;

  const user = await User.create({ email, password, name, role });
  sendToken(user, 201, res);
});

exports.authLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorResponse("Please enter an email and password", 404));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new errorResponse("User no exit with this email and password", 404),
    );
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new errorResponse("Email and Password not correct", 404));
  }

  sendToken(user, 200, res);
});

exports.authLogOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expireIn: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// @desc get current logged in user
//@route POST/api/v1/auth/me
// @access Private

exports.getMe = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
