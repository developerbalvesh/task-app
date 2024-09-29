const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");
// var unirest = require("unirest");

// config dotenv
dotenv.config();

const registerController = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name) {
      return res
        .status(200)
        .send({ success: false, message: "Name is required" });
    }
    if (!phone) {
      return res
        .status(200)
        .send({ success: false, message: "Phone is required" });
    }
    if (phone.length < 10) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid phone number" });
    }
    if (!password) {
      return res
        .status(200)
        .send({ success: false, message: "Password is required" });
    }
    const existingUser = await userModel.findOne({ phone });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Phone number is already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      phone,
      password: hashedPassword,
    }).save();

    res.status(200).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong!",
    });
  }
};

// user login
const loginController = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(500).send({
        success: false,
        message: "Empty field not allowed",
      });
    }

    const user = await userModel.findOne({ phone });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Phone not registered",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Logged in",
      user: {
        name: user.name,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "Error in login api",
      success: false,
    });
  }
};

const sendOtpController = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).send({
        message: "Please enter your number",
        success: false,
      });
    }
    const apiKey = process.env.FAST_SMS;

    const otp = Math.floor(Math.random() * 9999 + 1000);
    const message = `Hello there, your OTP to recover password from TaskApp is ${otp}`;
    const phoneNumber = "8208940419";
    const smsData = {
      sender_id: "TASKAPP",
      message: message,
      language: "english",
      route: "q",
      numbers: phone,
    };

    const hashedOTP = await hashPassword(JSON.stringify(otp));
    // console.log(hashedOTP)

    const user = await userModel.find({ phone });

    // console.log(user)
    if (!user[0]) {
      return res.status(400).send({
        success: false,
        message: "No user found with this number",
      });
    }

    // fast2sms api
    axios
      .post("https://www.fast2sms.com/dev/bulkV2", smsData, {
        headers: {
          Authorization: apiKey,
        },
      })

      .then((response) => {
        // console.log("sms sent successfully", response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    // fast2sms api end

    res.status(200).send({
      success: true,
      message: "OTP Sent",
      otp: hashedOTP,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error,
      success: false,
      message: "Internal server error",
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { otp, vOtpInput } = req.body;

    const verified = await comparePassword(vOtpInput, otp);

    // console.log(verified);

    if (verified) {
      res.status(200).send({
        success: true,
        message: "OTP verified! now set password",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      success: false,
      message: "Error in OTP",
    });
  }
};

const setNewPassController = async (req, res) => {
  try {
    const { phone, nPass } = req.body;

    const user = await userModel.find({ phone });

    const hashedPassword = await hashPassword(nPass);


    const success = await userModel.findByIdAndUpdate(user[0]._id, {
      password: hashedPassword,
    });


    if (success) {
      res.status(200).send({
        success: true,
        message: "Password reseted",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Error while updating password",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      success: false,
      message: "Can't reset password",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  sendOtpController,
  verifyOtpController,
  setNewPassController,
};
