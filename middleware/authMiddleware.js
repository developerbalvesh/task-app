const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

// protected route
const requireSignIn = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    // const auth = req.body.token;
    if(!auth){
        return res.status(400).send({
            success:false,
            message:'Require SignIn for this'
        })
    }
    const decode = JWT.verify(auth, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(500).send({
        success: false,
        message: "Require SignIn for this",
      });
    }

    req.user = decode;
    next();
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in authMiddleware",
    });
  }
};


module.exports = { requireSignIn };