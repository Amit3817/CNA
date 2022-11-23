const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const User=require("../model/user");
const regex=require("../middleware/validate");
const {Auth} = require('two-step-auth');

const signup=async (req,res)=>{
    try{
    const {user_name,email,password}=req.body;
    if(!(user_name&&email&&password))
      return  res.status(400).send("All inputs are required");
    if(!regex.validateemail(email))
      return res.status(400).send("Invalid email");
    if(!regex.validatepassword(password))
      return res.status(400).send("Password is weak");
    const olduser=await User.findOne({user_name});
    if(olduser)
      return  res.status(400).send("User name already exists");
    const oldmail=await User.findOne({email});
    if(oldmail)
     return res.status(400).send("Email already exists");
    
    const encpassword =await bcrypt.hash(password,12);

    login(email);

async function login(emailId){
    const res = await Auth(emailId, "CNS");
    if(res)
    {
      console.log("mail sent");
      const otp=res.OTP;
      const expireotp=Date.now()+300000;

      const user= User.create({
        user_name,
        email:email.toLowerCase(),
        password:encpassword,
        otp,
        expireotp
      });

      return res.json(msg="User created successfully");
    }
    else{
      console.log("mail not sent");
      return res.json(msg="mail not sent");
    }
}
}
catch(err)
{
    console.log(err);
    res.json(err);
}
}

module.exports={
  signup
}