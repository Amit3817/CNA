const express=require("express");
const mongoose=require("mongoose");
const authroutes=require("./controller/authroutes");

require('dotenv').config();

const app=express();

mongoose.connect(process.env.dburi).then(()=>{
    console.log("Connected");
    app.listen(process.env.PORT);
}).catch((err)=>{
    console.log(err);
});

app.use(authroutes);