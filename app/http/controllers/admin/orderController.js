const Order = require("../../../models/orders");
const moment = require('moment')
const User = require("../../../models/user")

const orderController = ()=>{
    return {
          async  index(req,res){
            try {
                let data = await Order.find({ status:{$ne:'completed'} }, null, { sort: { 'createdAt': -1 } }).populate('customer_id','-password')
                if (req.xhr) {
                   return res.json(data);
                }else{
                    return res.render("admin/orders", { orders: data, moment: moment })
                }
            } catch (error) {
                console.log(error)
            }
            },
            async changeStatus(req,res){
               
            }
    }
}

module.exports = orderController