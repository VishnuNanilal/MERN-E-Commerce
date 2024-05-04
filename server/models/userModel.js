const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    address: {
        type: String,
    },
    phone_no: {
        type: Number,
        required: true
    },
    city: String
})

module.exports = mongoose.model('users', usersSchema)