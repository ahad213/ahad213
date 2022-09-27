const express = require("express");
const {
  authRegister,
  authLogin,
  getMe,
  authLogOut,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/logout", authLogOut);
router.get("/me", protect, getMe);

module.exports = router;
