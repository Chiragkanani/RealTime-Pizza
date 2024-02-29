const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path")
const expresslayout = require("express-ejs-layouts")
const PORT = process.env.PORT || 8080


app.set("view engine","ejs");
app.use(expresslayout);
app.set("views", path.join(__dirname,'/resources/views'))








app.listen(PORT,()=>{
    console.log("App Running on port ",PORT)
})