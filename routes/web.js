const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customer/cartController")
const orderController = require("../app/http/controllers/customer/orderController")
const AdminOrderController = require("../app/http/controllers/admin/orderController")
const homeController = require("../app/http/controllers/homeController")
const guestMiddleWare = require("../app/http/middlewares/guest")
const auth = require("../app/http/middlewares/auth")
const admin = require("../app/http/middlewares/admin")
const statusController = require("../app/http/controllers/admin/statusController")


function initRoutes (app){
    app.get("/",homeController().index)
    app.get("/cart",cartController().index)
    app.get("/register",guestMiddleWare,authController().register)
    app.post("/register",authController().addUser)
    app.get("/login",guestMiddleWare,authController().login)
    app.post("/login",authController().postlogin)
    app.get("/logout",authController().logout)
    app.post("/update-cart",cartController().updateCart)


    app.post("/orders",auth,orderController().store)
    app.get("/customer/orders",auth,orderController().getOrders)
    app.get("/customer/orders/:id",auth,orderController().getSingleOrder)


    app.get("/admin/orders",admin,AdminOrderController().index);
    app.post("/admin/orders/status",admin,statusController().update);
} 

module.exports = initRoutes