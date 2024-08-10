const TASK_SCHEMA=require("../models/taskModel");
const asyncHandler=require("express-async-handler");

exports.addTask=asyncHandler(async(req,res)=>{
    const {title,description,status,user}=req.body;

    let addTask=await TASK_SCHEMA.create({title,description,status,user:req.user._id})
    res.status(201).json({success:true,message:"Task Added"});

})


exports.getTasks=asyncHandler(async(req,res)=>{
  let tasks=await TASK_SCHEMA.find({user:req.user._id}).populate("user");
  res.status(200).json({tasks})
})
