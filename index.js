const express=require("express");
const mongoose=require("mongoose");
const authroutes=require("./controller/userauth");
const user=require("./routes/auth/user");

require('dotenv').config();

const app=express();

app.use(express.json());

mongoose.connect(process.env.dburi).then(()=>{
    console.log("Connected");
    app.listen(process.env.PORT);
}).catch((err)=>{
    console.log(err);
});

app.use('/auth/user',user);