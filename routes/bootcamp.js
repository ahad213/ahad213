const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
  bootcampUploadPhoto,
} = require("../controllers/bootcampConroller");
const Bootcamp = require("../models/Bootcamp");
const advancedResult = require("../middleware/advancedResult");

const courseRouter = require("./courses");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use("/:bootcampId/course", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampInRadius);

router.route("/").get(advancedResult(Bootcamp, "courses"), getBootcamps);

router.route("/:id").get(getBootcamp);

router.route("/").post(protect, createBootcamp);

router.route("/:id").put(protect, updateBootcamp);
router.route("/:id/photo").put(protect, bootcampUploadPhoto);

router.route("/:id").delete(protect, deleteBootcamp);

module.exports = router;
