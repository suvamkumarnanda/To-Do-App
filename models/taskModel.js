const {Schema,model}=require("mongoose");

const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:["To Do", "In Progress", "Done"],
        default:"To Do"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})




module.exports=model("Task",taskSchema);