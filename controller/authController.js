const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require('jsonwebtoken')


const registerController = async(req, res)=>{
    try {
        const {name, phone, password} = req.body;
        if(!name){
            return res.status(200).send({success:false, message:'Name is required'})
        }
        if(!phone){
            return res.status(200).send({success:false, message:'Phone is required'})
        }
        if(!password){
            return res.status(200).send({success:false, message:'Password is required'})
        }
        const existingUser = await userModel.findOne({phone});

        
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Phone number is already registered'
            })
        }
        
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name, 
            phone, 
            password: hashedPassword
        }).save()

        res.status(200).send({
            success:true,
            message:'Registration successful'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            error,
            message:'error in register api'
        })
    }
}

// user login
const loginController = async(req, res)=>{
    try {
        const {phone, password} = req.body;
        if(!phone || !password){
            return res.status(500).send({
                success:false,
                message:'Empty field not allowed'
            })
        }

        const user = await userModel.findOne({phone});

        if(!user){
            return res.status(404).send({
                success:false,
                message:'Phone not registered'
            })
        }

        const isMatch = await comparePassword(password, user.password)

        if(!isMatch){
            return res.status(400).send({
                success:false,
                message:'Invalid Username or Password'
            })
        }

        // token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        res.send({
            success:true,
            message:'Logged in',
            user:{
                name: user.name,
                phone: user.phone
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
            message:'Error in login api',
            success:false
        })
    }
}

module.exports = {registerController, loginController};