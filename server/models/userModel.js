const mongoose=require("mongoose");


//route handler
const userSchema=new mongoose.Schema({
	name:{type: String,required:true,default:'null'},
	email:{type: String,required:true,default:'null'},
	website:{type:String},
	phone:{type: Number,required:true,default:'null'},
	like:{type: Boolean},
}

);
module.exports=mongoose.model("userData",userSchema);