const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path")
const expresslayout = require("express-ejs-layouts")
const PORT = process.env.PORT || 8080






app.use(express.static("public"))
app.use(expresslayout);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,'/resources/views'))


app.get("/", (req, res) => {
    res.render('home')
})

app.get("/cart", (req, res) => {
    res.render('customer/cart')
})

app.get("/register", (req, res) => {
    res.render('auth/register')
})

app.get("/login", (req, res) => {
    res.render('auth/login')
})


app.listen(PORT,()=>{
    console.log("App Running on port ",PORT)
})