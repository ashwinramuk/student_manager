const express = require("express")
const app = express();
const classRoute = require("./routes/classRoute.js")


app.use(express.json())
app.use(express.urlencoded())
app.use("/v1/myClass",classRoute)

module.exports = app;