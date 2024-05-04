const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        required: true
    },
    name: {
        type: String,
        require: true
    },
    description: String,
    image_url: String,
    price:Number,
    quantity: Number,
    category: String
})

module.exports = mongoose.model('products', productSchema)