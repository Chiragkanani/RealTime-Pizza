const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType:{
        type:String,
        default:"COD"
    },
    status:{
        type:String,
        default : 'order_placed'
    }

}, { timestamps: true })

module.exports = mongoose.model('orders', ordersSchema)