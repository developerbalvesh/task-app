const express = require("express");
const { registerController, loginController, sendOtpController, verifyOtpController, setNewPassController } = require("../controller/authController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

// signup
router.post("/signup", registerController);

// login
router.post("/login", loginController)

// forgot password
// get otp
router.post('/get-otp', sendOtpController)

// verify otp
router.post('/verify-otp', verifyOtpController)

// set new pass
router.post('/new-pass', setNewPassController)

// protected route
router.get('/user-auth', requireSignIn, (req, res)=>{
    res.status(200).send({ok:true})
})

module.exports = router;