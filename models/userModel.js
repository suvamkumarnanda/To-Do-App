const {Schema,model}=require("mongoose");
  const bcrypt=require("bcrypt");

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true 
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
},{timestamps:true})

userSchema.pre("save",async function(){
    let salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword=async function(enteredpassword){
      return await bcrypt.compare(enteredpassword,this.password);
}


module.exports=model("User",userSchema);