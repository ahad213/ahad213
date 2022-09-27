const catchAsyncError = require("../middleware/catchAsyncError");
const Courses = require("../models/courses");
const Bootcamp = require("../models/Bootcamp");
const errorResponse = require("../utils/errorResponse");
const advancedResult = require("../middleware/advancedResult");

//@desc get course
// route  Get/api/v1/course
//route    get/api/v1/bootcamp/:bootcamp/course

exports.getCourse = catchAsyncError(async (req, res, next) => {
  //   console.log(query);

  if (req.params.bootcampId) {
    const course = await Courses.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: course.length,
      data: course,
    });
  } else {
    res.status(200).json(res.advancedResult);
  }
});

//@desc create Course
// @route Post/api/v1/bootcamp/:bootcampId/course
// @access  Private
exports.createCourse = catchAsyncError(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new errorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404),
    );
  }

  const course = await Courses.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});

//@desc   Single Course
// route  GET/api/v1/course/:id

exports.singleCourse = catchAsyncError(async (req, res, next) => {
  const course = await Courses.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new errorResponse(`Course not found with id of  ${req.params.id}`, 404),
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

exports.updateCourse = catchAsyncError(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);

  if (!course) {
    return next(new errorResponse(`No Course id found with ${req.params.id}`));
  }

  course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

exports.deleteCourse = catchAsyncError(async (req, res, next) => {
  const course = await Courses.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(
      new errorResponse(`No course found with  if of ${req.params.id}`),
    );
  }

  res.status(200).json({
    success: true,
    data: {},
    message: "Deleted Course Successfully",
  });
});
