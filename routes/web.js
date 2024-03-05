const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customer/cartController")
const homeController = require("../app/http/controllers/homeController")
const guestMiddleWare = require("../app/http/middlewares/guest")


function initRoutes (app){
    app.get("/",homeController().index)
    app.get("/cart",cartController().index)
    app.get("/register",guestMiddleWare,authController().register)
    app.post("/register",authController().addUser)
    app.get("/login",guestMiddleWare,authController().login)
    app.post("/login",authController().postlogin)
    app.get("/logout",authController().logout)
    app.post("/update-cart",cartController().updateCart)
} 

module.exports = initRoutes