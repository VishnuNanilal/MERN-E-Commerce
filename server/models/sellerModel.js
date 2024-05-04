const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: String,
    rating: Number,
    address: String,
    inventory: [{type: String}] //temporary String type, change to below later.
    // inventory: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'products'
    // }]
})

module.exports = mongoose.model('sellers', sellerSchema)