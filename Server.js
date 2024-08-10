const express=require("express");
const { PORT } = require("./config");

const morgan = require("morgan");
const cookieParser=require("cookie-parser")
const userRouter=require("./router/userRouter");
const taskRouter=require("./router/taskRouter")
const { error } = require("./middleware/error");
const { connectDB } = require("./config/databse");

connectDB()

const app=express();
app.use(express.json())
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/users",userRouter);
app.use("/tasks",taskRouter);









app.use(error);
app.listen(PORT,(err)=>{
    if(err) throw err
    console.log("Server is running at port",PORT);
})