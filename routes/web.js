const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customer/cartController")
const homeController = require("../app/http/controllers/homeController")



function initRoutes (app){
    app.get("/",homeController().index)
    app.get("/cart",cartController().index)
    app.get("/register",authController().register)
    app.get("/login",authController().login)
    app.post("/update-cart",cartController().updateCart)
} 

module.exports = initRoutes