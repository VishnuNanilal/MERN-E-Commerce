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
    price:{
        type: Number,
        required: true
    },
    description: String,
    image_url: String,
    category: String
})

module.exports = mongoose.model('products', productSchema)