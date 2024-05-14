const User = require('../models/userModel')
const Order = require('../models/orderModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        let { name, email, password, address, phone_no, city } = req.body;
        let response = await User.findOne({ email })
        if (response) {
            res.status(404).send({
                success: false,
                message: "Email already in use."
            })
            return;
        }

        response = await User.findOne({ phone_no })
        if (response) {
            res.status(404).send({
                success: false,
                message: "Phone number already in use."
            })
            return;
        }

        let salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)

        response = await User.create(req.body)
        if (response) {
            res.status(201).send({
                success: true,
                message: "User registered successfully.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User registration failed.",
            })
        }
    }
    catch (err) {
        console.log("User registration failed on DB.")
    }
}

const signIn = async (req, res) => {
    try {
        let { email, phone_no, password } = req.body;
        let emailResponse = await User.findOne({ email })
        let phoneResponse = await User.findOne({ phone_no })
        if (!emailResponse && !phoneResponse) {
            res.status(404).send({
                success: false,
                message: "Wrong credentials."
            })
            return;
        }

        let response = emailResponse || phoneResponse;
        console.log("sign in response: ", response)

        let isVerified = await bcrypt.compare(password, response.password)
        if (isVerified) {
            //create jwt and send to front end
            response = jwt.sign({ id: response._id, password }, process.env.jwt_key)
            res.status(201).send({
                success: true,
                message: "User signed in successfully.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Wrong credentials.",
            })
        }
    }
    catch (err) {
        console.log("User registration failed on DB.")
    }
}

const authorize = async (req, res) => {
    try {
        let response = await User.findById(req.body.id).select("-password")
            .populate("orders")
            .exec()

        if (response) {
            res.status(201).send({
                success: true,
                message: "User authorization successful.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "User authorization failed.",
            })
        }
    }
    catch (err) {
        console.log("User authorization failed on DB.")
    }
}

    const MakeOrder = async (req, res) => {
    let { user_id, product_id, delivery_date, shipping_address, quantity, amount } = req.body
    try {
        let response = await Order.create({
            product_id,
            delivery_date,
            shipping_address,
            quantity,
            amount,
            status: "Pending"
        })

        if (response) {
            await AUXAddItemToUserOrders(user_id, response.id)
            res.status(201).send({
                success: true,
                message: "Order creation successful.",
                data: response
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Order creation failed.",
            })
        }
    }
    catch (err) {
        console.log("Order creation failed on BE.")
    }
}

async function AUXAddItemToUserOrders(user_id, order_id) {
    /* data: {
        user_id:
        order_id:
    }
    */

    try {
        let response = await User.findByIdAndUpdate(user_id, { $push: { orders: order_id } }, { new: true })
        if (response) {
            console.log("Order was added to user order list.")
        }
        else {
            console.log("Order was not added to user order list.")
        }
    }
    catch (err) {
        console.log("Adding item to user orders failed on DB.")
    }
}

const RemoveOrder = async (req, res)=> {
    let { user_id, order_id } = req.body
    try {
        let response = await User.findByIdAndUpdate(user_id, { $pull: { orders: order_id } }, { new: true })

        if (response) {
            await AUXDeleteOrder(order_id)
            res.status(201).send({
                success: true,
                message: "Order removal successful.",
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "Order removal failed.",
            })
        }
    }
    catch (err) {
        console.log("Order creation failed on BE.")
    }
}

async function AUXDeleteOrder(order_id) {
    try {
        let response = await Order.findByIdAndDelete(order_id)
        if (response) {
            console.log("Order was removed from DB")
            return true
        }
        else {
            console.log("Order removal from DB failed.")
            return false
        }
    }
    catch (err) {
        console.log("Order Deletion failed on DB.")
    }
}

module.exports = {
    register,
    signIn,
    authorize,
    MakeOrder,
    RemoveOrder
}