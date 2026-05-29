const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../Controllers/authController.js");
const {validateRegister,validateLogin}=require("../middleware/errorMiddleware.js");
const protect = require("../middleware/authMiddleware.js");

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

// Get current user


module.exports = router;