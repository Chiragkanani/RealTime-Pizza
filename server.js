const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path")
const expresslayout = require("express-ejs-layouts")
const PORT = process.env.PORT || 8080

const session = require("express-session")
const flash = require('express-flash')
const MongoDbStore = require("connect-mongo");
const passport = require('passport')


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ReamTimePizza');
const connection = mongoose.connection;
connection.once ('open',()=>{
        console.log("Database connected...")
})




app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb://localhost:27017/ReamTimePizza',
        collection: 'sessions'
    }),
    cookie: { maxAge:1000*60*60 }
}))

const passportinit = require("./app/config/passport")
passportinit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use((req,res,next)=>{
    if (req.session.cart) {
        res.locals.totalQty = req.session.cart.totalQty;
    }else{
        res.locals.totalQty = '';
    }
    if (req.session.passport) {
        res.locals.user = req.session.passport.user
    }else{
        res.locals.user = false
    }
    next()
})
app.use(flash());


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(expresslayout);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,'/resources/views'))

require("./routes/web")(app)



app.listen(PORT,()=>{
    console.log("App Running on port ",PORT)
})