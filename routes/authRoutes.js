const express = require("express");
const { registerController, loginController } = require("../controller/authController");

const router = express.Router();

// signup
router.post("/signup", registerController);

// login
router.post("/login", loginController)

// protected routes

module.exports = router;