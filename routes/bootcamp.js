const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcampConroller");
const router = express.Router();

router.route("/").get(getBootcamps);

router.route("/:id").get(getBootcamp);

router.route("/").post(createBootcamp);

router.route("/:id").put(updateBootcamp);

router.route("/:id").delete(deleteBootcamp);

module.exports = router;
