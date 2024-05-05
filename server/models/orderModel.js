const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    delivery_date: String,
    current_location: String,
    shipping_address: String,
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    amount: {
        type: Number,
        required: true
    },
    status: String
})

module.exports = mongoose.model("orders", orderSchema)