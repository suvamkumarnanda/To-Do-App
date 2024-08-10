const jwt=require("jsonwebtoken");
const USER_SCHEMA=require("../models/userModel")
const { JWT_SECRET } = require("../config");



exports.protect=async(req,res,next)=>{
    let token=""
    if(req.cookies.token)
      {
        let cookie=req.cookies.token;
       token=jwt.verify(cookie,JWT_SECRET);
       let user=await USER_SCHEMA.findById(token.id);
       if(!user){
        return res.status(400).json({message:"user not found"});
       }
       req.user=user;
       next();
      }else{
         res.status(400).json({message:"No token found"});
      }
};