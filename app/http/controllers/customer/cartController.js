const cartController = () => {

    return {
        index(req, res) {
            let empty;
            let cart;
            if (req.session.cart) {
                 cart = req.session.cart;
                empty = false;
            }else{
                empty = true
            }
            
            res.render('customer/cart', { cartData: cart, empty })
            
        },
        updateCart(req,res){
           

            if (!req.session.cart) {
                req.session.cart = {
                    items: {
                        [req.body._id] : { item: req.body, qty: 1 }

                    },
                    totalQty: 1,
                    totalPrice: Number(req.body.price)
                }
               

            }else{
                let cart = req.session.cart
                if (!cart.items[req.body._id]) {
                    cart.items[req.body._id] = {item:req.body,qty:1}
                    cart.totalQty++;
                    cart.totalPrice = cart.totalPrice + Number(req.body.price)
                    req.session.cart = cart;
                   
                }else{
                    cart.items[req.body._id].qty++;
                    cart.totalQty++;
                    cart.totalPrice = cart.totalPrice + Number(req.body.price)
                    req.session.cart = cart;
                }
            }

            res.send({totalQty:req.session.cart.totalQty})
        }
    }
}

module.exports = cartController