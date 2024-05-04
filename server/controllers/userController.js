const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req, res) {
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
    catch(err){
        console.log("User registration failed on DB.")
    }
}

async function signIn(req, res) {
    try {
        let { email, phone_no, password } = req.body;
        console.log("reached")
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
        
        response = await bcrypt.compare(password, response.password)
        if (response) {
            //create jwt and send to front end
            response = jwt.sign({credential: email||phone_no, password}, process.env.jwt_key)
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
    catch(err){
        console.log("User registration failed on DB.")
    }
}

module.exports = {
    register,
    signIn
}