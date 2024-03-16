
const Order = require("../../../models/orders");
const moment = require('moment')

function orderController (){
    return {
                async store(req,res){
                    const {phone , address} = req.body;
                    if (!phone || !address) {
                        req.flash("error","All field are require")
                       return res.redirect("/cart")
                    }
                    const data = new Order({
                        customer_id:req.user._id,
                        items: req.session.cart.items,
                        phone:phone,
                        address:address
                    });

                   data.save().then((result)=>{
                    if (result) {
                        req.flash("success", "Order placed Successfully")
                        delete req.session.cart;
                        const eventEmitter = req.app.get('eventEmitter');
                        eventEmitter.emit('orderarrived');
                      return  res.redirect("/customer/orders")
                    }
                   }).catch(e=>{
                    req.flash("error","Something went wrong")
                    console.log(e)
                    return res.redirect("/cart")
                   })
        },
        async getOrders(req,res){
            try {
                let data = await Order.find({ customer_id: req.user._id }, null, { sort: { 'createdAt': -1 } })
                req.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-stale-0,post-check=0,pre-check=0')
                return res.render("customer/orders", { orders: data, moment: moment })
            } catch (error) {
                console.log(error)
            }
          
        },
        async getSingleOrder(req,res){
            try {
                let result =await Order.find({ _id: req.params.id });
                
                if (req.user._id.toString() === result[0].customer_id.toString()) {
                   return res.render("customer/singleOrder",{result:result[0]});
                }
                return  res.redirect("/")
                
            } catch (error) {
                console.log(error)
            }
           
        }
    }
}

module.exports = orderController