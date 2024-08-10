const USER_SCHEMA=require("../models/userModel");
const asyncHandler=require("express-async-handler");
const {generateToken}=require("../utils/createToken");

exports.registerUser=asyncHandler(async(req,res)=>{
    let {name,email,password}=req.body;
    const existUser=await USER_SCHEMA.findOne({email});
    if(existUser){
        res.status(400).json({message:"User already exists"});
    }
    let addUser=await USER_SCHEMA.create({name,email,password});
    res.status(200).json({success:true,message:"User registered"})
});

exports.login=asyncHandler(async(req,res)=>{
    let {email,password}=req.body;
    const user=await USER_SCHEMA.findOne({email});
    if(!user)
    {
        res.status(400).json({message:"user not found"});
    }
    let isMatched=user.matchPassword(password);

    if(!isMatched){
        res.status(400).json({message:"Invalid password"});
    }
    let token=generateToken(user._id);


    res.cookie("token",token,{httpOnly:true,expires:new Date(Date.now()+ 1000 * 60 * 60 * 24)})
    res.status(200).json({message:"logged in successfully",token});
})

exports.logOut=asyncHandler(async(req,res)=>{
    res.clearCookie("token","",{expiresIn:0});
    res.status(200).json({message:"User Logged Out"});
})
