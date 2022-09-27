const express = require("express");

const {
  getCourse,
  createCourse,
  singleCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const Course = require("../models/courses");

const advancedResult = require("../middleware/advancedResult");

const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResult(Course, { path: "bootcamp", select: "name description" }),
    getCourse,
  );
router.route("/").post(protect, createCourse);
router.route("/:id").get(singleCourse);
router.route("/:id").put(protect, updateCourse);
router.route("/:id").delete(protect, deleteCourse);

module.exports = router;
