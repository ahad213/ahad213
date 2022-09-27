const path = require("path");
const catchAsyncError = require("../middleware/catchAsyncError");
const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utils/geocoder");
const errorResponse = require("../utils/errorResponse");
const advancedResult = require("../middleware/advancedResult");

// @desc Get all bootcamps
// @route GET/api/v1/bootcamps
// @access  Public

exports.getBootcamps = catchAsyncError(async (req, res, next) => {
  res.status(200).json(res.advancedResult);
});

// @desc Get single bootcamps
// @route get /api/v1/bootcamps
// @access  Private

exports.getBootcamp = catchAsyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new errorResponse("Bootcamp Id not found", 400));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc create new bootcamps
// @route POST /api/v1/bootcamps
// @access  Public

exports.createBootcamp = catchAsyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(201)
    .json({ success: true, data: bootcamp, message: "Create new bootcamp" });
});

// @desc update bootcamps
// @route Put /api/v1/bootcamps/:id
// @access  Public

exports.updateBootcamp = catchAsyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(new errorResponse(" not found that Bootcamp Id", 400));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc delete bootcamp
// @route Delete /api/v1/bootcamps/:id
// @access  Public

exports.deleteBootcamp = catchAsyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new errorResponse("bootcamp Id not found ", 404));
  }
  bootcamp.remove();
  res
    .status(200)
    .json({ success: true, data: {}, message: "successfully deleted" });
});

exports.getBootcampInRadius = catchAsyncError(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lang/lat from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calc radius using radians
  //Divide distance by radius of earthz
  //Earth radius = dis/3963

  const radius = distance / 3963;

  const bootcamp = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamp.length,
    data: bootcamp,
  });
});

// @desc upload photo
// route /api/v1/bootcamp/:id/photo
//access  Private

exports.bootcampUploadPhoto = catchAsyncError(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new errorResponse(`bootcamp Id not found ${re.params.id}`, 404),
    );
  }
  if (!req.files) {
    return next(new errorResponse("please upload a photo", 400));
  }
  const file = req.files.file;
  // Make sure the image is a photo

  if (!file.mimetype.startsWith("image")) {
    return next(new errorResponse("please add a image file", 400));
  }
  // console.log(req.files);
  //Check fileSize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new errorResponse(
        `please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    );
  }
  //create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
    if (error) {
      console.log(error);
      return next(new errorResponse(`Problem with file upload`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  console.log(file.name);
});
