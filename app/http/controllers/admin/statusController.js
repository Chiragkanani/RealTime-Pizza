const Order = require("../../../models/orders");


const statusController = () => {
    return {
        async update(req,res){
            try {
                let result = await Order.updateOne({ _id: req.body.order_id }, { status: req.body.status });
                if (result) {

                    const eventEmitter = req.app.get('eventEmitter');
                    eventEmitter.emit('orderUpdated',{id:req.body.order_id,status:req.body.status});

                    
                  return  res.redirect("/admin/orders")
                }

            } catch (error) {
             console.log(error)   
            }
           
        }
    }
}

module.exports = statusController