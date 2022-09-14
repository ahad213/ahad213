const Bootcamp = require("../models/Bootcamp");
const errorResponse = require("../utils/errorResponse");
// @desc Get all bootcamps
// @route GET/api/v1/bootcamps
// @access  Public

exports.getBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res.status(200).json({ success: true, data: bootcamp });
};

// @desc Get single bootcamps
// @route get /api/v1/bootcamps
// @access  Private

exports.getBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new errorResponse("Bootcamp Id not found", 400));
  }
  res.status(200).json({ success: true, data: bootcamp });
};

// @desc create new bootcamps
// @route POST /api/v1/bootcamps
// @access  Public

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({ success: true, data: bootcamp, message: "Create new bootcamp" });
  } catch (error) {
    next(error);
  }
};

// @desc update bootcamps
// @route Put /api/v1/bootcamps/:id
// @access  Public

exports.updateBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(new errorResponse(" not found that Bootcamp Id", 400));
  }
  res.status(200).json({ success: true, data: bootcamp });
};

// @desc delete bootcamp
// @route Delete /api/v1/bootcamps/:id
// @access  Public

exports.deleteBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(new errorResponse("bootcamp Id not found ", 404));
  }
  res
    .status(200)
    .json({ success: true, data: {}, message: "successfully deleted" });
};
