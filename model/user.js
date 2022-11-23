const mongoose =require("mongoose");

const userSchema =new mongoose.Schema(
    {
        user_name:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        otp:{
            type:String
        },
        expireotp:{
            type:Date
        }
    });

const usermodel=mongoose.model("user",userSchema);

module.exports=usermodel;
