const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: String,
    rating: Number,
    inventory: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
})

module.exports = mongoose.model('sellers', sellerSchema)