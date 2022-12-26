const express = require("express")
const mongoose = require("mongoose")
const app = require("./src/app.js")
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.MONGO_URI,()=>{console.log("Database successfully connected")})

app.listen(process.env.PORT||5000,()=>{console.log("server successfully started")})